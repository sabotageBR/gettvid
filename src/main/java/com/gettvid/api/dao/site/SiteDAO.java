package com.gettvid.api.dao.site;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.gettvid.api.dao.AbstractDAO;
import com.gettvid.api.entity.Site;


@Stateless
public class SiteDAO extends AbstractDAO<Site> {

	
	public List<Site> search(Site site){
		CriteriaQuery<Site> criteria = getCriteriaBuilder().createQuery(Site.class);
		Root<Site> root = criteria.from(Site.class);
		return getManager().createQuery(criteria.select(root)).getResultList();		
	}

	public Site recoverByUrlName(String urlName) {
		CriteriaQuery<Site> criteria = getCriteriaBuilder().createQuery(Site.class);
		Root<Site> root = criteria.from(Site.class);
		return getManager().createQuery(criteria.select(root).where(getCriteriaBuilder().equal(root.get("url"), urlName))).setMaxResults(1).getSingleResult();
	}
	
	
}

