package com.gettvid.controller.site;

import javax.annotation.PostConstruct;
import javax.enterprise.inject.Model;
import javax.inject.Inject;

import com.gettvid.api.entity.Site;
import com.gettvid.api.service.site.SiteService;
import com.gettvid.controller.AbstractController;
import com.gettvid.to.SiteTO;

@Model
public class SiteController extends AbstractController<SiteTO>{

	
	private static final long serialVersionUID = 2301538897523665273L;
	
	private @Inject SiteService siteService;
	
	@PostConstruct
	private void init() {
		
		String parameter = getRequest().getParameter("site");
		if(parameter != null && !parameter.equals("new")) {
			getTo().setSite(siteService.recoverByUrlName(parameter.toLowerCase()));
		}else if(parameter != null && parameter.equals("new")){
			getTo().setSite(new Site());
		}else {
			getTo().setSites(siteService.search(new Site()));	
		}
	}
	
	public void save() {
		if(getTo().getSite().getId() == null) {
			siteService.incluir(getTo().getSite());
		}else {
			siteService.alterar(getTo().getSite());
		}
	}
	
}
