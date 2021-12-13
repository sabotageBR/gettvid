package com.gettvid.controller.blog;

import javax.annotation.PostConstruct;
import javax.enterprise.inject.Model;
import javax.inject.Inject;

import com.gettvid.api.entity.Blog;
import com.gettvid.api.service.blog.BlogService;
import com.gettvid.controller.AbstractController;
import com.gettvid.to.BlogTO;

@Model
public class BlogController extends AbstractController<BlogTO>{

	
	private static final long serialVersionUID = 2301538897523665273L;
	
	private @Inject BlogService blogService;
	
	@PostConstruct
	private void init() {
		
		String parameter = getRequest().getParameter("parameter");
		if(parameter != null && !parameter.equals("new")) {
			getTo().setBlog(blogService.recoverByUrlName(parameter));
		}else if(parameter != null && parameter.equals("new")){
			getTo().setBlog(new Blog());
		}else {
			getTo().setBlogs(blogService.search(new Blog()));	
		}
		
		
		
	}
	
	public void save() {
		if(getTo().getBlog().getId() == null) {
			blogService.incluir(getTo().getBlog());
		}else {
			blogService.alterar(getTo().getBlog());
		}
	}
	
}
