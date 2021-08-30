package com.gettvid.api.dao;

import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;


public class AbstractDAO<T> {

	@PersistenceContext(unitName="gettvid")
	private EntityManager manager;
	
	
	protected EntityManager getManager() {
		return this.manager;
	}
	
	protected CriteriaBuilder getCriteriaBuilder() {
		return this.manager.getCriteriaBuilder();
	}
	
	public void incluir(T entidade){
		getManager().persist(entidade);
	}
	
	public void alterar(T entidade){
		getManager().merge(entidade);
	}
	
	public void excluir(T entidade){
		this.getManager().remove(this.getManager().find(this.getEntityType(),entidade));
	}
	
	public T recuperar(Serializable id){
		T r = (T) this.getManager().find(this.getEntityType(), id);
		if(r == null){
//			throw new BusinessException(ConstantesMensagem.NENHUM_REGISTRO_ENCONTRADO);
		}
		return r;
	}
	
	protected Class getEntityType() {
		ParameterizedType parameterizedType =
				(ParameterizedType) this.getClass().getGenericSuperclass();
		Class entityType =
				(Class) parameterizedType.getActualTypeArguments()[0];
		return entityType;
	}
	
	

	@SuppressWarnings("unchecked")
	public List<T> listar(){
		return this.getManager().createQuery(
				"FROM ".concat(this.getEntityType().getName())).getResultList();
	}
	
	public void incluirLista(List<T> listaEntidade){
		for(T objeto:listaEntidade){
			this.incluir(objeto);
		}
	}
	public void alterarLista(List<T> listaEntidade){
		for(T objeto:listaEntidade){
			this.alterar(objeto);
		}
	}

	
}
