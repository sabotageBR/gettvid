package com.gettvid.service.combo;

import java.util.List;

import javax.inject.Inject;
import javax.inject.Named;

import com.gettvid.api.entity.Site;
import com.gettvid.api.service.site.SiteService;
import com.gettvid.enums.TypeVideoDownload;

@Named
public class CombosBean {

	private @Inject SiteService siteService; 
	
	public TypeVideoDownload[] getListTypeVideoDownload() {
		return TypeVideoDownload.values();
	}
	
	public List<Site> getSites(){
		return siteService.listar();
	}
	
}
