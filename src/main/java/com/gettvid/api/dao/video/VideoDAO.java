package com.gettvid.api.dao.video;

import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import com.gettvid.api.dao.AbstractDAO;
import com.gettvid.api.entity.StatusVideoEnum;
import com.gettvid.api.entity.Video;


@Stateless
public class VideoDAO extends AbstractDAO<Video> {

	
	
	public List<Video> search(Video video){
		CriteriaQuery<Video> criteria = getCriteriaBuilder().createQuery(Video.class);
		Root<Video> root = criteria.from(Video.class);
		return getManager().createQuery(criteria.select(root)).getResultList();		
	}

	public Video getByURL(String url) {
		try {
			CriteriaQuery<Video> criteria = getCriteriaBuilder().createQuery(Video.class);
			Root<Video> root = criteria.from(Video.class);
			return getManager().createQuery(criteria.select(root).where(getCriteriaBuilder().equal(root.get("url"), url))).getSingleResult();
		}catch(Exception e) {
			return null;
		}
	}

	public Video getByFilename(String filename) {
		try {
			CriteriaQuery<Video> criteria = getCriteriaBuilder().createQuery(Video.class);
			Root<Video> root = criteria.from(Video.class);
			return getManager().createQuery(criteria.select(root).where(getCriteriaBuilder().equal(root.get("fileName"), filename))).getSingleResult();
		}catch(Exception e) {
			return null;
		}	
	}

	public List<Video> searchLast(Integer page, Integer maxRecords) {
		CriteriaQuery<Video> criteria = getCriteriaBuilder().createQuery(Video.class);
		Root<Video> root = criteria.from(Video.class);
		return getManager().createQuery(
				criteria.select(root).where(
							getCriteriaBuilder().like(root.get("url"), "%youtu%"),
							root.get("status").in(StatusVideoEnum.TRANSFER,StatusVideoEnum.FINISH)
							//getCriteriaBuilder().isNotNull(root.get("urlReturn"))
							).orderBy(getCriteriaBuilder().desc(root.get("dateAdd"))))
				.setFirstResult(page > 1?Integer.valueOf(page * maxRecords)-1:0).setMaxResults(maxRecords)
				.getResultList();
	}
	
	public List<Video> searchTop(Integer page, Integer maxRecords) {
		CriteriaQuery<Video> criteria = getCriteriaBuilder().createQuery(Video.class);
		Root<Video> root = criteria.from(Video.class);
		return getManager().createQuery(
				criteria.select(root).where(
							getCriteriaBuilder().like(root.get("url"), "%youtu%"),
							root.get("status").in(StatusVideoEnum.TRANSFER,StatusVideoEnum.FINISH)
							//getCriteriaBuilder().isNotNull(root.get("urlReturn"))
							).orderBy(getCriteriaBuilder().desc(root.get("countDown"))))
				.setFirstResult(page > 1?Integer.valueOf(page * maxRecords)-1:0).setMaxResults(maxRecords)
				.getResultList();
	}
	
	
}

