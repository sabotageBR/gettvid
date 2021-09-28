package com.gettvid.to;

import java.util.ArrayList;
import java.util.List;

import com.gettvid.api.entity.Blog;

public class BlogTO {

	private Blog blog;
	private List<Blog> blogs;
	
	public Blog getBlog() {
		if (blog == null) {
			blog = new Blog();
		}
		return blog;
	}
	
	public void setBlog(Blog blog) {
		this.blog = blog;
	}
	
	public List<Blog> getBlogs() {
		if (blogs == null) {
			blogs = new ArrayList<Blog>();
		}
		return blogs;
	}
	
	public void setBlogs(List<Blog> blogs) {
		this.blogs = blogs;
	}
	
}
