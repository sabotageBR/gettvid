package com.gettvid.api.dao.blog;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.gettvid.api.dao.AbstractDAO;
import com.gettvid.api.entity.Blog;


@Stateless
public class BlogDAO extends AbstractDAO<Blog> {

	
	public List<Blog> search(Blog blog){
		CriteriaQuery<Blog> criteria = getCriteriaBuilder().createQuery(Blog.class);
		Root<Blog> root = criteria.from(Blog.class);
		return getManager().createQuery(criteria.select(root)).getResultList();		
	}

	public Blog recoverByUrlName(String urlName) {
		CriteriaQuery<Blog> criteria = getCriteriaBuilder().createQuery(Blog.class);
		Root<Blog> root = criteria.from(Blog.class);
		return getManager().createQuery(criteria.select(root).where(getCriteriaBuilder().equal(root.get("urlName"), urlName))).setMaxResults(1).getSingleResult();
	}
	
	
}

