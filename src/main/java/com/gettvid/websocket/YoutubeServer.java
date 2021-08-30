  package com.gettvid.websocket;
   
  import java.time.LocalDateTime;
import java.util.List;

import javax.inject.Inject;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.gettvid.api.entity.Video;
import com.gettvid.api.service.video.VideoService;
import com.gettvid.enums.TypeVideoDownload;
import com.gettvid.service.youtube.YoutubeService;
import com.gettvid.service.youtube.YoutubeThread;
import com.gettvid.service.youtube.YoutubeURLThread;
import com.gettvid.to.YoutubeTO;
import com.google.gson.Gson;

  
  @ServerEndpoint("/YoutubeServer")
  public class YoutubeServer {

	  	   private @Inject VideoService videoService;
	  		
           @OnMessage
           public void recebeMensagem(String message, Session session) {
        	    System.out.println("videodownload: "+message);
        	   	YoutubeTO youtube = new Gson().fromJson(message,YoutubeTO.class);
        	   	youtube.setDateTime(LocalDateTime.now());
        	   	if(isDownloadLink(youtube)) {
        	   		new YoutubeURLThread(youtube, session,videoService).start();
        	   	}else {
        	   		new YoutubeThread(youtube, session,videoService).start();
        	   	}
           }
           
           @OnOpen
           public void open(Session session) {
        	   try {
	        	   List<Video> videosLast = videoService.searchLast(1, 6);
	        	   List<Video> videosTop = videoService.searchTop(1, 6);
	        	   session.getBasicRemote().sendText(new Gson().toJson(new YoutubeTO(videosLast,videosTop)));	   
        	   }catch(Exception e) {
        		   e.printStackTrace();
        	   }
           }
           
            @OnError
           public void error(Session session, Throwable t) {
            System.err.println("Error on session "+session.getId());  
           }
            
            
           @OnClose
           public void closedConnection(Session session) { 
           }
           
           
           private boolean isDownloadLink(YoutubeTO youtubeTO) {
        	   if(youtubeTO.getTipo().equals(TypeVideoDownload.VIDEO) && 
        			   (youtubeTO.getHost().contains("youtube.com") ||
        			   youtubeTO.getHost().contains("youtu.be") ||
        			   youtubeTO.getHost().contains("facebook") ||
        			   youtubeTO.getHost().contains("fb.watch") ||
        			   youtubeTO.getHost().contains("fb.com") ||
        			   youtubeTO.getHost().contains("twitter") ||
        			   youtubeTO.getHost().contains("instagram") 
        			   )) {
        		   return true;
        	   }
        	   return false;
        	   
           }
           
			
           
  }