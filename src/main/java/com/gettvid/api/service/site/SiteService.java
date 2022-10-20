package com.gettvid.api.service.site;

import java.util.List;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import com.gettvid.api.dao.AbstractDAO;
import com.gettvid.api.dao.site.SiteDAO;
import com.gettvid.api.entity.Site;
import com.gettvid.api.service.AbstractService;

@Stateless
public class SiteService extends AbstractService<Site> {

	private @Inject SiteDAO siteDAO;
	
	@Override
	public AbstractDAO<Site> getDAO() {
		return siteDAO;
	}
	
	public List<Site> search(Site site){
		return siteDAO.search(site);
	}
	
	public Site recoverByUrlName(String urlName) {
		return siteDAO.recoverByUrlName(urlName);
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	@Override
	public void incluir(Site entidade) {
		super.incluir(entidade);
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	@Override
	public void alterar(Site entidade) {
		// TODO Auto-generated method stub
		super.alterar(entidade);
	}
	
	
	
}
