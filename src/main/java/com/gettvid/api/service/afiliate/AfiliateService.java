package com.gettvid.api.service.afiliate;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.gettvid.api.dao.AbstractDAO;
import com.gettvid.api.dao.afiliate.AfiliateDAO;
import com.gettvid.api.entity.Afiliate;
import com.gettvid.api.service.AbstractService;


@Stateless
public class AfiliateService extends AbstractService<Afiliate> {

	private @Inject AfiliateDAO afiliateDAO;
	
	
	@Override
	public AbstractDAO<Afiliate> getDAO() {
		return afiliateDAO;
	}
	
}
