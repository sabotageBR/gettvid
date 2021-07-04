  package com.gettvid.websocket;
   
  import java.time.LocalDateTime;

import javax.inject.Inject;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.gettvid.enums.TypeVideoDownload;
import com.gettvid.service.youtube.YoutubeService;
import com.gettvid.to.YoutubeTO;
import com.google.gson.Gson;

  
  @ServerEndpoint("/YoutubeServer")
  public class YoutubeServer {
	  
	      private @Inject YoutubeService youtubeService;
	  
           @OnMessage
           public void recebeMensagem(String message, Session session) {
        	    System.out.println("videodownload: "+message);
        	   	YoutubeTO youtube = new Gson().fromJson(message,YoutubeTO.class);
        	   	youtube.setDateTime(LocalDateTime.now());
        	   	if(isDownloadLink(youtube)) {
        	   		youtubeService.executarURL(youtube, session);
        	   	}else {
        	   		youtubeService.executar(youtube, session);
        	   	}
           }
           
           @OnOpen
           public void open(Session session) {
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