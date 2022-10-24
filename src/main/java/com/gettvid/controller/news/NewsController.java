package com.gettvid.controller.news;

import javax.annotation.PostConstruct;
import javax.enterprise.inject.Model;

import com.gettvid.controller.AbstractController;
import com.gettvid.to.NewsTO;

@Model
public class NewsController extends AbstractController<NewsTO>{

	
	private static final long serialVersionUID = 7356158494420009797L;

	@PostConstruct
	private void init() {
	
	}
	
	
}
