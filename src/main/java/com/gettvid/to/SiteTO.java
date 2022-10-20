package com.gettvid.to;

import java.util.ArrayList;
import java.util.List;

import com.gettvid.api.entity.Site;

public class SiteTO {

	private Site site;
	private List<Site> sites;
	
	public Site getSite() {
		if (site == null) {
			site = new Site();
		}
		return site;
	}
	
	public void setSite(Site site) {
		this.site = site;
	}
	
	public List<Site> getSites() {
		if (sites == null) {
			sites = new ArrayList<Site>();
		}
		return sites;
	}
	
	public void setSites(List<Site> sites) {
		this.sites = sites;
	}
	
}
