package com.gettvid.service.youtube;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.UUID;

import javax.websocket.Session;

import com.gettvid.api.entity.StatusVideoEnum;
import com.gettvid.api.entity.Video;
import com.gettvid.api.service.video.VideoService;
import com.gettvid.enums.TypeVideoDownload;
import com.gettvid.to.YoutubeTO;
import com.gettvid.util.UtilString;
import com.google.gson.Gson;

public class YoutubeThread extends Thread{
	
	private YoutubeTO youtube;
	private Session session;
	private VideoService videoService;
	
	public YoutubeThread(YoutubeTO youtube, Session session,VideoService videoService){
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
		BufferedReader stdInput = null;
		BufferedReader stdError = null;
		String s = null;
		boolean mkv = false;
		StringBuilder sb = new StringBuilder();
		Gson gson = new Gson();
		Video video = null;
		try {
			session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "Gettvid.com: Init Converter...")));
			Runtime rt = Runtime.getRuntime();
			String command = "";
			String nomeArquivo = generateFileName(youtube);
			String nomeArquivoCompleto = nomeArquivo+".mp4";
			String nomeFinal = "";
			String login = comporUsername(youtube.getHost());
			if(youtube.getTipo().equals(TypeVideoDownload.VIDEO)) {
				command = String.format("yt-dlp %s -f b -o %s %s",login, nomeArquivoCompleto, youtube.getHost());
			}else if(youtube.getTipo().equals(TypeVideoDownload.MP3)) {
				nomeArquivoCompleto = nomeArquivo+".mp3";
				command = String.format("yt-dlp %s -o %s --extract-audio --audio-format mp3 --audio-quality 0 %s",login,nomeArquivoCompleto, youtube.getHost());
			}else {
				command = String.format("yt-dlp %s -o %s %s",login,nomeArquivoCompleto, youtube.getHost());
			}
			System.out.println(command);
			
			video = comporVideo(nomeArquivoCompleto);
			
			proc = rt.exec(command);
			stdInput = new BufferedReader(new InputStreamReader(proc.getInputStream()));
			stdError = new BufferedReader(new InputStreamReader(proc.getErrorStream()));
			while ((s = stdInput.readLine()) != null) {
				if(session != null) {
					if(s.contains(".mkv")) {
						mkv = true;
					}
					session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), s)));
				}	
			}
			
			while ((s = stdError.readLine()) != null) {
				if(session != null) {
					session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), s)));
				}	
			}
			if(session != null) {
				if(new File(nomeArquivoCompleto).exists() && new File(nomeArquivoCompleto).length() > 0) {
					nomeFinal = nomeArquivoCompleto;
				}else if(new File(nomeArquivoCompleto+".mkv").exists() && new File(nomeArquivoCompleto+".mkv").length() > 0) {
					nomeFinal = nomeArquivoCompleto+".mkv";
				}else if(new File(nomeArquivoCompleto+".webm").exists() && new File(nomeArquivoCompleto+".webm").length() > 0) {
					nomeFinal = nomeArquivoCompleto+".webm";
				}else if(new File(nomeArquivo+".mkv").exists() && new File(nomeArquivo+".mkv").length() > 0) {
					nomeFinal = nomeArquivo+".mkv";
				}else if(new File(nomeArquivoCompleto+".ogg").exists() && new File(nomeArquivoCompleto+".ogg").length() > 0) {
					nomeFinal = nomeArquivoCompleto+".ogg";
				
				}else if(new File(nomeArquivoCompleto+".mp3").exists() && new File(nomeArquivoCompleto+".mp3").length() > 0) {
					nomeFinal = nomeArquivoCompleto+".mp3";	
				}
				
				if(!nomeFinal.equals("")) {
					session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "button-down:"+nomeFinal)));
				}else {
					System.out.println("video nao exportado");
					session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "button-error:"+nomeFinal)));
				}
				session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "FIM")));
				video.setDateFinish(LocalDateTime.now());
				video.setStatus(StatusVideoEnum.TRANSFER);
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
				Field f = proc.getClass().getDeclaredField("pid");
				f.setAccessible(true);
				stdInput.close();
				stdError.close();
				proc.destroy();
				proc.destroyForcibly();
			} catch (Exception e) {
				//e.printStackTrace();
			}
		}
	}
	
	public String generateFileName(YoutubeTO youtube) {
		UtilString utilString = new UtilString();
		Process proc = null;
		BufferedReader stdInput = null;
		BufferedReader stdError = null;
		String s = null;
		String retorno = "";
		try{
			Runtime rt = Runtime.getRuntime();
			String command = String.format("yt-dlp --get-title %s", youtube.getHost());
			proc = rt.exec(command);
			stdInput = new BufferedReader(new InputStreamReader(proc.getInputStream()));
			stdError = new BufferedReader(new InputStreamReader(proc.getErrorStream()));
			
			while ((s = stdInput.readLine()) != null) {
				if(!utilString.vazio(s)) {
					retorno = s;
				}
			}
		} catch (Exception e) {
			
		} finally {
			try {
				Field f = proc.getClass().getDeclaredField("pid");
				f.setAccessible(true);
				stdInput.close();
				stdError.close();
				proc.destroy();
				proc.destroyForcibly();
			} catch (Exception e) {
				//e.printStackTrace();
			}
		}
		if(!utilString.vazio(retorno)) {
			retorno = retorno.replace("-"," ");
			retorno = retorno.replace("_"," ");
			retorno = utilString.removeAcentos(retorno);
			retorno = utilString.retiraCaracteresEspeciais(retorno);
			retorno = retorno.replace(" ","_");
			if(retorno.length() > 100) {
				retorno = retorno.substring(0, 100);
			}
			return retorno+"_gettvid.com";
		}else {
			return "gettvid-com-"+UUID.randomUUID().toString();
		}
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
	
	private String comporUsername(String host) {
		return "";
	}
}
