FROM evandromoura/wildfly:nettools-2.0

	LABEL MAINTAINER Evandro Moura <evandromoura@gmail.com>

	SHELL ["/bin/bash", "-c"]

	USER root

	ARG OPENSSL_VERSION=3.0.16
	ARG PYTHON_VERSION=3.12.12

	# O CentOS 7 chegou ao EOL (jun/2024) e o mirror.centos.org saiu do ar: os repos
	# passam a apontar para o vault. EPEL 7 e RPM Fusion el7 tambem foram arquivados,
	# entao ficam desabilitados (o ffmpeg ja vem instalado na imagem base).
	RUN printf '%s\n' \
	      '[base]' 'name=CentOS-7 - Base' 'baseurl=http://vault.centos.org/7.9.2009/os/x86_64/' 'gpgcheck=0' 'enabled=1' '' \
	      '[updates]' 'name=CentOS-7 - Updates' 'baseurl=http://vault.centos.org/7.9.2009/updates/x86_64/' 'gpgcheck=0' 'enabled=1' '' \
	      '[extras]' 'name=CentOS-7 - Extras' 'baseurl=http://vault.centos.org/7.9.2009/extras/x86_64/' 'gpgcheck=0' 'enabled=1' \
	      > /etc/yum.repos.d/CentOS-Base.repo \
	 && printf '%s\n' \
	      '[centos-sclo-rh]' 'name=CentOS-7 - SCLo rh' 'baseurl=http://vault.centos.org/7.9.2009/sclo/x86_64/rh/' 'gpgcheck=0' 'enabled=1' \
	      > /etc/yum.repos.d/CentOS-SCLo-rh.repo \
	 && sed -i 's/^enabled=1/enabled=0/' /etc/yum.repos.d/epel*.repo /etc/yum.repos.d/rpmfusion*.repo \
	 && rm -f /etc/yum.repos.d/CentOS-CR.repo /etc/yum.repos.d/CentOS-Debuginfo.repo \
	          /etc/yum.repos.d/CentOS-Media.repo /etc/yum.repos.d/CentOS-Sources.repo \
	          /etc/yum.repos.d/CentOS-Vault.repo /etc/yum.repos.d/CentOS-fasttrack.repo \
	          /etc/yum.repos.d/CentOS-x86_64-kernel.repo

	# O gcc 4.8.5 do CentOS 7 nao compila Python 3.11+ (falta C11 atomics) -> devtoolset-11
	RUN yum install -y make wget perl perl-core perl-IPC-Cmd \
	      devtoolset-11-gcc devtoolset-11-gcc-c++ devtoolset-11-binutils \
	      bzip2 bzip2-devel libffi-devel zlib-devel xz-devel sqlite-devel \
	      readline-devel ncurses-devel \
	 && yum clean all

	# O Python 3.10+ exige OpenSSL 1.1.1+ e o CentOS 7 so tem 1.0.2k.
	# --libdir=lib e obrigatorio: o configure do Python procura em <prefix>/lib e nunca em lib64.
	RUN cd /usr/src \
	 && curl -fsSL -o openssl.tar.gz "https://github.com/openssl/openssl/releases/download/openssl-${OPENSSL_VERSION}/openssl-${OPENSSL_VERSION}.tar.gz" \
	 && tar xzf openssl.tar.gz \
	 && cd "openssl-${OPENSSL_VERSION}" \
	 && source /opt/rh/devtoolset-11/enable \
	 && ./Configure linux-x86_64 --prefix=/usr/local/openssl3 --openssldir=/usr/local/openssl3/ssl --libdir=lib shared zlib \
	 && make -j"$(nproc)" \
	 && make install_sw \
	 && cd /usr/src && rm -rf openssl.tar.gz "openssl-${OPENSSL_VERSION}"

	# Python 3.12: o yt-dlp atual exige 3.10 ou superior.
	RUN cd /usr/src \
	 && curl -fsSL -o Python.tgz "https://www.python.org/ftp/python/${PYTHON_VERSION}/Python-${PYTHON_VERSION}.tgz" \
	 && tar xzf Python.tgz \
	 && cd "Python-${PYTHON_VERSION}" \
	 && source /opt/rh/devtoolset-11/enable \
	 && ./configure --prefix=/usr/local \
	      --with-openssl=/usr/local/openssl3 --with-openssl-rpath=auto \
	      --with-ensurepip=install \
	 && make -j"$(nproc)" \
	 && make altinstall \
	 && cd /usr/src && rm -rf Python.tgz "Python-${PYTHON_VERSION}"

	# yt-dlp instalado pelo pip do 3.12: o script nasce com shebang absoluto
	# (/usr/local/bin/python3.12), sem precisar sobrescrever o python3 do sistema,
	# que continua sendo o 3.6 usado pelo googler e pelo youtube-dl do yum.
	RUN /usr/local/bin/pip3.12 install --no-cache-dir --upgrade pip \
	 && /usr/local/bin/pip3.12 install --no-cache-dir --upgrade certifi yt-dlp

	# O "make install_sw" nao cria o openssldir, entao o OpenSSL 3 fica sem CA store e
	# TODA verificacao TLS falha com CERTIFICATE_VERIFY_FAILED (o pip nao acusa porque
	# embute o proprio certifi). Aponta o cert.pem para o bundle do certifi, que e
	# atualizavel via pip, e mantem o diretorio do sistema como fallback.
	RUN mkdir -p /usr/local/openssl3/ssl \
	 && ln -sf "$(/usr/local/bin/python3.12 -c 'import certifi; print(certifi.where())')" /usr/local/openssl3/ssl/cert.pem \
	 && ln -sf /etc/pki/tls/certs /usr/local/openssl3/ssl/certs

	# Falha o build se o Python, o TLS ou o yt-dlp nao estiverem funcionais.
	# O urlopen roda sem --no-check-certificates de proposito: YoutubeService e o
	# --get-title do YoutubeThread chamam o yt-dlp sem essa flag.
	RUN /usr/local/bin/python3.12 -V \
	 && /usr/local/bin/python3.12 -c "import ssl; print(ssl.OPENSSL_VERSION)" \
	 && /usr/local/bin/python3.12 -c "import urllib.request as u; assert u.urlopen('https://www.youtube.com', timeout=30).status == 200" \
	 && yt-dlp --version

	#USER jboss

	ARG cliente

	ENV PYTHONIOENCODING=utf-8

	COPY kubernetes/docker-entrypoint.sh $JBOSS_HOME/docker-entrypoint.sh

	#RUN chown jboss $JBOSS_HOME/docker-entrypoint.sh && \
	# 	chmod a+x $JBOSS_HOME/docker-entrypoint.sh

	#KUBE_PING
	#COPY kubernetes/kubeping-module $JBOSS_HOME/modules/system/layers/base/org/jgroups/kubernetes

	#CONEXAO
	COPY kubernetes/standalone.xml $JBOSS_HOME/standalone/configuration/standalone.xml
	COPY kubernetes/postgresql-42.2.23.jre6.jar $JBOSS_HOME/standalone/deployments/

	#BUILD
	COPY /target/gettvid.war $JBOSS_HOME/standalone/deployments/

	#PORTAS
	EXPOSE 8080 8009 9990 7600 8888



	ENTRYPOINT $JBOSS_HOME/docker-entrypoint.sh
