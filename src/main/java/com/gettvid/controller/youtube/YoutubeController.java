package com.gettvid.controller.youtube;

import javax.annotation.PostConstruct;
import javax.enterprise.inject.Model;
import javax.inject.Inject;

import com.gettvid.controller.AbstractController;
import com.gettvid.enums.TypeVideoDownload;
import com.gettvid.session.CustomIdentity;
import com.gettvid.to.YoutubeTO;

@Model
public class YoutubeController extends AbstractController<YoutubeTO>{

	private @Inject CustomIdentity customIdentity;
	
	private static final long serialVersionUID = -5104849116507289650L;
	
	@PostConstruct
	private void init() {
		System.out.println(customIdentity.getIpExterno()+"- Nav: VideoDownload");
		comporInformacoesHTTP();
	}
	
	private void comporInformacoesHTTP() {
		getTo().setTipo(TypeVideoDownload.VIDEO);
	}
	
	public void youtube() {
		
	}
	
}
