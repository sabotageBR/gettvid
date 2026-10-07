#!/usr/bin/env bash
#
# Rotina de atualizacao do gettvid: maven -> docker build -> docker push -> kubernetes.
#
#   ./kubernetes/bin/deploy.sh            # incrementa a tag a partir da que esta no cluster
#   ./kubernetes/bin/deploy.sh 2.13       # usa a tag informada
#   ./kubernetes/bin/deploy.sh --rollback # volta para a revisao anterior
#
# Opcoes:
#   --force        reconstroi uma tag que ja existe no Docker Hub (sobrescreve)
#   --no-push      build local apenas, nao envia para o registry nem mexe no cluster
#   --dry-run      mostra o que seria feito e sai
#
# Variaveis de ambiente para sobrescrever os defaults:
#   GV_KUBECONFIG  GV_KUBECTL  GV_ROLLOUT_TIMEOUT  GV_MVN_ARGS
#
set -euo pipefail

IMAGE_REPO="evandromoura/gv"
NAMESPACE="gv"
DEPLOYMENT="gv"
CONTAINER="gv"

KUBECONFIG_FILE="${GV_KUBECONFIG:-/home/trixti/.config/OpenLens/kubeconfigs/70f08c4b-dcca-455b-96b1-b5661c1a2b95}"
KUBECTL_BIN="${GV_KUBECTL:-/home/trixti/.config/OpenLens/binaries/kubectl/1.21.14/kubectl}"
ROLLOUT_TIMEOUT="${GV_ROLLOUT_TIMEOUT:-300s}"
MVN_ARGS="${GV_MVN_ARGS:-clean package}"

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WAR="$REPO_ROOT/target/gettvid.war"

TAG=""
FORCE=0
NO_PUSH=0
DRY_RUN=0
ROLLBACK=0

# ----------------------------------------------------------------- utilidades
c_reset=$'\033[0m'; c_step=$'\033[1;36m'; c_ok=$'\033[1;32m'
c_warn=$'\033[1;33m'; c_err=$'\033[1;31m'

step() { printf '\n%s==> %s%s\n' "$c_step" "$*" "$c_reset"; }
ok()   { printf '%s  ok%s %s\n'   "$c_ok"   "$c_reset" "$*"; }
warn() { printf '%s  aviso%s %s\n' "$c_warn" "$c_reset" "$*"; }
die()  { printf '\n%serro:%s %s\n' "$c_err" "$c_reset" "$*" >&2; exit 1; }

kc() { KUBECONFIG="$KUBECONFIG_FILE" "$KUBECTL_BIN" "$@"; }

# ------------------------------------------------------------------ argumentos
while [ $# -gt 0 ]; do
	case "$1" in
		--force)    FORCE=1 ;;
		--no-push)  NO_PUSH=1 ;;
		--dry-run)  DRY_RUN=1 ;;
		--rollback) ROLLBACK=1 ;;
		-h|--help)  sed -n '2,20p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
		-*)         die "opcao desconhecida: $1" ;;
		*)          [ -z "$TAG" ] || die "tag informada duas vezes: $TAG e $1"; TAG="$1" ;;
	esac
	shift
done

# ------------------------------------------------------------------- preflight
step "Verificando pre-requisitos"

[ -f "$REPO_ROOT/pom.xml" ]    || die "pom.xml nao encontrado em $REPO_ROOT"
[ -f "$REPO_ROOT/Dockerfile" ] || die "Dockerfile nao encontrado em $REPO_ROOT"
command -v mvn >/dev/null      || die "mvn nao esta no PATH"
[ -x "$KUBECTL_BIN" ]          || die "kubectl nao encontrado/executavel: $KUBECTL_BIN"
[ -r "$KUBECONFIG_FILE" ]      || die "kubeconfig ilegivel: $KUBECONFIG_FILE"

# O docker exige sudo nesta maquina. Sem -n o script travaria esperando senha.
sudo -n true 2>/dev/null || die "sudo esta pedindo senha. Rode 'sudo -v' antes de chamar este script."
sudo -n docker version --format '{{.Server.Version}}' >/dev/null 2>&1 \
	|| die "nao consigo falar com o daemon do docker via sudo"
ok "mvn, docker (sudo) e kubectl disponiveis"

kc -n "$NAMESPACE" get deploy "$DEPLOYMENT" >/dev/null 2>&1 \
	|| die "deployment $DEPLOYMENT nao existe no namespace $NAMESPACE (ou o cluster esta inacessivel)"

CURRENT_IMAGE="$(kc -n "$NAMESPACE" get deploy "$DEPLOYMENT" \
	-o jsonpath="{.spec.template.spec.containers[?(@.name=='$CONTAINER')].image}")"
[ -n "$CURRENT_IMAGE" ] || die "nao achei o container '$CONTAINER' no deployment $DEPLOYMENT"
CURRENT_TAG="${CURRENT_IMAGE##*:}"
ok "no cluster agora: $CURRENT_IMAGE"

# ------------------------------------------------------------------- rollback
if [ "$ROLLBACK" -eq 1 ]; then
	step "Rollback para a revisao anterior"
	[ "$DRY_RUN" -eq 0 ] || { echo "  (dry-run) rollout undo deploy/$DEPLOYMENT"; exit 0; }
	kc -n "$NAMESPACE" rollout undo "deploy/$DEPLOYMENT"
	kc -n "$NAMESPACE" rollout status "deploy/$DEPLOYMENT" --timeout="$ROLLOUT_TIMEOUT"
	kc -n "$NAMESPACE" get deploy "$DEPLOYMENT" \
		-o jsonpath="{.spec.template.spec.containers[?(@.name=='$CONTAINER')].image}{'\n'}"
	ok "rollback concluido"
	exit 0
fi

# --------------------------------------------------------------- tag de destino
if [ -z "$TAG" ]; then
	# Incrementa so o ultimo numero: 2.12 -> 2.13. Se a tag atual nao for
	# numerica, exige que a nova venha na linha de comando.
	if [[ "$CURRENT_TAG" =~ ^(.*)\.([0-9]+)$ ]]; then
		TAG="${BASH_REMATCH[1]}.$(( BASH_REMATCH[2] + 1 ))"
		ok "tag calculada automaticamente: $TAG (a partir de $CURRENT_TAG)"
	else
		die "tag atual '$CURRENT_TAG' nao e numerica, informe a nova: $0 <tag>"
	fi
fi

IMAGE="$IMAGE_REPO:$TAG"

if [ "$TAG" = "$CURRENT_TAG" ] && [ "$FORCE" -eq 0 ]; then
	die "a tag $TAG e a que ja esta rodando. O 'set image' nao dispararia rollout nenhum.
       Use uma tag nova, ou --force se realmente quiser reconstruir esta."
fi

# Evita sobrescrever silenciosamente uma tag ja publicada.
if sudo -n docker manifest inspect "$IMAGE" >/dev/null 2>&1; then
	if [ "$FORCE" -eq 0 ]; then
		die "$IMAGE ja existe no Docker Hub. Escolha outra tag ou use --force para sobrescrever."
	fi
	warn "$IMAGE ja existe no Docker Hub e sera sobrescrita (--force)"
fi

if ! git -C "$REPO_ROOT" diff --quiet HEAD 2>/dev/null; then
	warn "ha alteracoes nao commitadas - a imagem sera construida a partir do working tree:"
	git -C "$REPO_ROOT" --no-pager diff --stat HEAD | sed 's/^/        /'
fi

printf '\n  %s -> %s\n' "$CURRENT_IMAGE" "$IMAGE"

if [ "$DRY_RUN" -eq 1 ]; then
	step "dry-run, nada foi executado"
	echo "  1. mvn -f $REPO_ROOT/pom.xml $MVN_ARGS"
	echo "  2. sudo docker build -t $IMAGE $REPO_ROOT"
	echo "  3. sudo docker push $IMAGE"
	echo "  4. kubectl -n $NAMESPACE set image deploy/$DEPLOYMENT $CONTAINER=$IMAGE"
	exit 0
fi

# ----------------------------------------------------------------- 1/4 maven
step "1/4  Maven ($MVN_ARGS)"
BUILD_START="$(date +%s)"
# shellcheck disable=SC2086
mvn -f "$REPO_ROOT/pom.xml" $MVN_ARGS
[ -f "$WAR" ] || die "o build terminou mas $WAR nao existe"
# Garante que o WAR e desta execucao, e nao um resto de build anterior.
[ "$(stat -c %Y "$WAR")" -ge "$BUILD_START" ] || die "$WAR nao foi regerado por este build"
ok "$(basename "$WAR") $(du -h "$WAR" | cut -f1)"

# ---------------------------------------------------------------- 2/4 build
step "2/4  Docker build -> $IMAGE"
# As camadas do Python/OpenSSL vem antes do COPY do WAR no Dockerfile, entao o
# cache do docker as reaproveita e o build costuma levar segundos.
sudo -n docker build -t "$IMAGE" "$REPO_ROOT"
ok "imagem construida: $(sudo -n docker image inspect "$IMAGE" --format '{{.Id}}' | cut -c1-19)"

if [ "$NO_PUSH" -eq 1 ]; then
	step "--no-push: parando aqui. A imagem $IMAGE existe apenas localmente."
	exit 0
fi

# ----------------------------------------------------------------- 3/4 push
step "3/4  Docker push -> $IMAGE"
sudo -n docker push "$IMAGE"
ok "publicada no Docker Hub"

# ------------------------------------------------------------ 4/4 kubernetes
step "4/4  Kubernetes: atualizando deploy/$DEPLOYMENT em $NAMESPACE"
kc -n "$NAMESPACE" set image "deploy/$DEPLOYMENT" "$CONTAINER=$IMAGE"
kc -n "$NAMESPACE" annotate "deploy/$DEPLOYMENT" \
	"kubernetes.io/change-cause=deploy.sh $TAG ($(git -C "$REPO_ROOT" rev-parse --short HEAD 2>/dev/null || echo 'sem-git'))" \
	--overwrite >/dev/null

if ! kc -n "$NAMESPACE" rollout status "deploy/$DEPLOYMENT" --timeout="$ROLLOUT_TIMEOUT"; then
	warn "o rollout falhou. Revertendo para $CURRENT_IMAGE..."
	kc -n "$NAMESPACE" rollout undo "deploy/$DEPLOYMENT" || true
	kc -n "$NAMESPACE" rollout status "deploy/$DEPLOYMENT" --timeout="$ROLLOUT_TIMEOUT" || true
	kc -n "$NAMESPACE" get pods -o wide
	die "rollout revertido. Veja os eventos com:
       kubectl -n $NAMESPACE describe deploy/$DEPLOYMENT"
fi

# ------------------------------------------------------------------ validacao
step "Validando"
# Nao da para usar --field-selector status.phase=Running: um pod em Terminating
# continua com phase=Running, e o items[0] cairia no pod antigo. O que separa os
# dois e o deletionTimestamp, entao filtra por ele e pela imagem esperada.
POD=""
while read -r pod_name pod_image pod_deleting; do
	[ "$pod_image" = "$IMAGE" ] || continue
	[ -z "$pod_deleting" ] || continue
	POD="$pod_name"
	break
done < <(kc -n "$NAMESPACE" get pods -o jsonpath="{range .items[*]}\
{.metadata.name}{' '}{.spec.containers[?(@.name=='$CONTAINER')].image}{' '}{.metadata.deletionTimestamp}{'\n'}{end}")

[ -n "$POD" ] || die "nenhum pod ativo rodando $IMAGE depois do rollout"
ok "pod $POD rodando $IMAGE"

# Smoke test: se o yt-dlp nao responde, a imagem subiu quebrada.
if YTDLP_VERSION="$(kc -n "$NAMESPACE" exec "$POD" -- yt-dlp --version 2>/dev/null)"; then
	ok "yt-dlp responde no pod: $YTDLP_VERSION"
else
	warn "nao consegui rodar 'yt-dlp --version' dentro do pod $POD"
fi

kc -n "$NAMESPACE" get pods -o wide
printf '\n%s  %s no ar.%s  Para reverter: %s --rollback\n' \
	"$c_ok" "$IMAGE" "$c_reset" "${BASH_SOURCE[0]}"
