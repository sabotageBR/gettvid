package com.gettvid.api.service.videohistory;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;

import com.gettvid.api.dao.AbstractDAO;
import com.gettvid.api.dao.videohistory.VideoHistoryDAO;
import com.gettvid.api.entity.VideoHistory;
import com.gettvid.api.service.AbstractService;


@Stateless
public class VideoHistoryService extends AbstractService<VideoHistory> {

	private @Inject VideoHistoryDAO videoHistoryDAO;
	
	@Override
	public AbstractDAO<VideoHistory> getDAO() {
		return videoHistoryDAO;
	}
	
	public List<VideoHistory> searchTop(Integer page, Integer maxRecords){
		return videoHistoryDAO.searchTop(page, maxRecords);
	}
	
}
