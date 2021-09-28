package com.gettvid.api.service.blog;

import java.time.LocalDateTime;
import java.util.List;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import com.gettvid.api.dao.AbstractDAO;
import com.gettvid.api.dao.blog.BlogDAO;
import com.gettvid.api.entity.Blog;
import com.gettvid.api.service.AbstractService;

@Stateless
public class BlogService extends AbstractService<Blog> {

	private @Inject BlogDAO blogDAO;
	
	@Override
	public AbstractDAO<Blog> getDAO() {
		return blogDAO;
	}
	
	public List<Blog> search(Blog blog){
		return blogDAO.search(blog);
	}
	
	public Blog recoverByUrlName(String urlName) {
		return blogDAO.recoverByUrlName(urlName);
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	@Override
	public void incluir(Blog entidade) {
		entidade.setDateAdd(LocalDateTime.now());
		super.incluir(entidade);
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	@Override
	public void alterar(Blog entidade) {
		// TODO Auto-generated method stub
		super.alterar(entidade);
	}
	
	
	
}
