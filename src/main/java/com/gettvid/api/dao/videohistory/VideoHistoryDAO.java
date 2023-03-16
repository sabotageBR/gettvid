package com.gettvid.api.dao.videohistory;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.TypedQuery;

import com.gettvid.api.dao.AbstractDAO;
import com.gettvid.api.entity.StatusVideoEnum;
import com.gettvid.api.entity.VideoHistory;


@Stateless
public class VideoHistoryDAO extends AbstractDAO<VideoHistory> {

	public List<VideoHistory> searchTop(Integer page, Integer maxRecords){
		StringBuilder sb = new StringBuilder();
		sb.append("select new VideoHistory(count(v.rev),v.id) from VideoHistory v where v.url like :url and v.dateAdd >= :dateadd and v.status = :status group by v.id order by 1 desc");
		TypedQuery<VideoHistory> query = getManager().createQuery(sb.toString(), VideoHistory.class);
		query.setParameter("url", "%youtu%");
		query.setParameter("dateadd", LocalDateTime.now().minus(7,ChronoUnit.DAYS));
		query.setParameter("status", StatusVideoEnum.TRANSFER);
		return query.setFirstResult(page > 1?Integer.valueOf(page * maxRecords)-1:0).setMaxResults(maxRecords).getResultList();
	}
	
	public List<VideoHistory> searchTopDomain(Integer page, Integer maxRecords, String domain){
		StringBuilder sb = new StringBuilder();
		sb.append("select new VideoHistory(count(v.rev),v.id) from VideoHistory v where v.url like :url and v.dateAdd >= :dateadd and v.status = :status group by v.id order by 1 desc");
		TypedQuery<VideoHistory> query = getManager().createQuery(sb.toString(), VideoHistory.class);
		query.setParameter("url", "%"+domain+"%");
		query.setParameter("dateadd", LocalDateTime.now().minus(120,ChronoUnit.DAYS));
		query.setParameter("status", StatusVideoEnum.TRANSFER);
		return query.setFirstResult(page > 1?Integer.valueOf(page * maxRecords)-1:0).setMaxResults(maxRecords).getResultList();
	}
	
}

