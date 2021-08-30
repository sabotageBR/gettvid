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
import com.google.gson.Gson;

public class YoutubeURLThread extends Thread{
	
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
		BufferedReader stdInput = null;
		BufferedReader stdError = null;
		String s = null;
		boolean mkv = false;
		StringBuilder sb = new StringBuilder();
		Gson gson = new Gson();
		Video video = null;
		String urlRetorno = null;
		try {
			session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "Gettvid.com: Init Converter...")));
			Runtime rt = Runtime.getRuntime();
			String command = "";
			String nomeArquivo = "gettvid-video-"+UUID.randomUUID().toString();
			String nomeArquivoCompleto = nomeArquivo+".mp4";
			String nomeFinal = "";
			String login = comporUsername(youtube.getHost());
			session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "Extracting....")));
			command = String.format("youtube-dl %s -f best -o %s -g %s",login, nomeArquivoCompleto, youtube.getHost());
			System.out.println(command);
			
			video = comporVideo(nomeArquivoCompleto);
			proc = rt.exec(command);
			stdInput = new BufferedReader(new InputStreamReader(proc.getInputStream()));
			stdError = new BufferedReader(new InputStreamReader(proc.getErrorStream()));
			while ((s = stdInput.readLine()) != null) {
				if(session != null) {
					if(s.contains("http")) {
						session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "button-url-down:"+s)));
						urlRetorno = s;
						session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "Completed!")));
					}
				}	
			}
			while ((s = stdError.readLine()) != null) {
				if(session != null) {
					session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), s)));
				}	
			}
			if(session != null) {
				session.getBasicRemote().sendText(gson.toJson(new YoutubeTO(youtube.getHost(), "FIM")));
				video.setDateFinish(LocalDateTime.now());
				video.setStatus(StatusVideoEnum.TRANSFER);
				video.setUrlReturn(urlRetorno);
				videoService.alterar(video);
			}
			sb.append("https://gettvid.com/download/youtube?file="+nomeFinal);
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

	public VideoService getVideoService() {
		return videoService;
	}

	public void setVideoService(VideoService videoService) {
		this.videoService = videoService;
	}
}
