package com.gettvid.service.youtube;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.time.LocalDateTime;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import javax.websocket.Session;

import com.gettvid.api.entity.StatusVideoEnum;
import com.gettvid.api.entity.Video;
import com.gettvid.api.service.video.VideoService;
import com.gettvid.enums.TypeVideoDownload;
import com.gettvid.to.YoutubeTO;
import com.gettvid.util.UtilCdnDownload;
import com.gettvid.util.UtilString;
import com.google.gson.Gson;

/**
 * Extrai a URL direta do CDN e devolve para o browser do usuario.
 *
 * O servidor NUNCA baixa o video: o yt-dlp roda apenas em modo --print, que
 * implica --simulate, e por isso nao escreve nada em disco nem consome banda
 * de video. O trafego vai direto do CDN para o usuario final.
 */
public class YoutubeURLThread extends Thread{

	// O separador e o "|" porque a URL do CDN nunca contem esse caractere: com
	// split(limite 4) o titulo fica intacto mesmo que ele proprio tenha "|".
	// O template nao pode ter espacos - ele viaja como um unico argumento.
	private static final String PRINT_MARKER = "GETTVID|";
	private static final String PRINT_TEMPLATE = PRINT_MARKER + "%(ext)s|%(urls)s|%(title)s";

	private YoutubeTO youtube;
	private Session session;
	private VideoService videoService;

	public YoutubeURLThread(YoutubeTO youtube, Session session, VideoService videoService){
		try {
			this.youtube = youtube;
			this.session = session;
			this.videoService = videoService;
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void run() {
		Process proc = null;
		BufferedReader stdOutput = null;
		String s = null;
		Gson gson = new Gson();
		Video video = null;
		String urlRetorno = null;
		String nomeArquivo = null;
		try {
			session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "Gettvid.com: Init Converter...")));
			session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "Extracting....")));

			video = comporVideo("gettvid-com-" + UUID.randomUUID().toString());

			// exec(String[]) em vez de exec(String): a URL vem do usuario e no
			// formato de string unica ela e quebrada por espaco, o que permitiria
			// injetar argumentos extras no yt-dlp.
			ProcessBuilder pb = new ProcessBuilder(comporComando());
			// Junta stderr no stdout: com dois pipes e leitura sequencial, o
			// processo travava se um deles enchesse antes de ser lido.
			pb.redirectErrorStream(true);
			proc = pb.start();

			stdOutput = new BufferedReader(new InputStreamReader(proc.getInputStream()));
			while ((s = stdOutput.readLine()) != null) {
				if(!s.startsWith(PRINT_MARKER)) {
					if(session != null) {
						session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), s)));
					}
					continue;
				}
				String[] campos = s.split("\\|", 4);
				if(campos.length < 3 || !campos[2].startsWith("http")) {
					continue;
				}
				nomeArquivo = comporNomeArquivo(campos.length > 3 ? campos[3] : "", campos[1]);
				urlRetorno = UtilCdnDownload.forceAttachment(campos[2], nomeArquivo);
			}
			proc.waitFor(30, TimeUnit.SECONDS);

			if(session != null) {
				if(urlRetorno != null) {
					session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "button-url-down:"+nomeArquivo+"|"+urlRetorno)));
					session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "Completed!")));
					video.setFileName(nomeArquivo);
					video.setUrlReturn(urlRetorno);
					video.setStatus(StatusVideoEnum.TRANSFER);
				}else {
					// Sem URL nao existe plano B: baixar no servidor esta fora de questao.
					session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "button-error:")));
					video.setStatus(StatusVideoEnum.ERROR);
				}
				session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "FIM")));
				video.setDateFinish(LocalDateTime.now());
				videoService.alterar(video);
			}
		} catch (Exception e) {
			if(video != null) {
				video.setDateFinish(LocalDateTime.now());
				video.setStatus(StatusVideoEnum.ERROR);
				videoService.alterar(video);
			}
		} finally {
			try {
				if(stdOutput != null) {
					stdOutput.close();
				}
				if(proc != null) {
					proc.destroy();
				}
			} catch (Exception e) {
				//e.printStackTrace();
			}
		}
	}

	/**
	 * -f b devolve o melhor formato que ja vem com video e audio juntos, e -f ba
	 * o melhor audio isolado. Sao os unicos seletores que resultam em UMA unica
	 * URL: "bv*+ba" daria duas (video e audio separados) e exigiria o merge do
	 * ffmpeg aqui no servidor.
	 */
	private String[] comporComando() {
		String formato = TypeVideoDownload.MP3.equals(youtube.getTipo()) ? "ba" : "b";
		return new String[] {
			"yt-dlp",
			"-f", formato,
			"--no-playlist",
			"--print", PRINT_TEMPLATE,
			youtube.getHost()
		};
	}

	/**
	 * O nome vale so como sugestao de "salvar como" para o browser (via
	 * response-content-disposition), porque nenhum arquivo existe no servidor.
	 * A extensao entra depois de limpar o titulo: retiraCaracteresEspeciais
	 * apaga o ponto.
	 */
	private String comporNomeArquivo(String titulo, String extensao) {
		UtilString utilString = new UtilString();
		String ext = utilString.vazio(extensao) || "NA".equals(extensao) ? "mp4" : extensao;
		String base = "";
		if(!utilString.vazio(titulo) && !"NA".equals(titulo)) {
			base = titulo.replace("-"," ").replace("_"," ");
			base = utilString.removeAcentos(base);
			base = utilString.retiraCaracteresEspeciais(base).trim();
			base = base.replace(" ","_");
			if(base.length() > 100) {
				base = base.substring(0, 100);
			}
		}
		if(utilString.vazio(base)) {
			return "gettvid-com-" + UUID.randomUUID().toString() + "." + ext;
		}
		return base + "_gettvid.com." + ext;
	}

	private Video comporVideo(String nomeArquivoCompleto) {
		Video video = videoService.getByURL(youtube.getHost());
		if(video == null) {
			video = new Video(LocalDateTime.now(),StatusVideoEnum.TO_TRANSFER,youtube.getHost(),nomeArquivoCompleto,1);
			videoService.incluir(video);
		}else {
			video.setCountDown(video.getCountDown() + 1);
			video.setDateAdd(LocalDateTime.now());
			video.setFileName(nomeArquivoCompleto);
			video.setDateDownload(null);
			video.setDateFinish(null);
			video.setUrlReturn(null);
			video.setStatus(StatusVideoEnum.TO_TRANSFER);
			videoService.alterar(video);
		}
		return video;
	}

	public VideoService getVideoService() {
		return videoService;
	}

	public void setVideoService(VideoService videoService) {
		this.videoService = videoService;
	}
}
