package com.gettvid.api.service.video;

import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.inject.Inject;

import com.gettvid.api.dao.AbstractDAO;
import com.gettvid.api.dao.video.VideoDAO;
import com.gettvid.api.entity.Video;
import com.gettvid.api.entity.VideoHistory;
import com.gettvid.api.service.AbstractService;
import com.gettvid.api.service.videohistory.VideoHistoryService;
import com.gettvid.util.UtilURLEmbedVideo;


@Stateless
public class VideoService extends AbstractService<Video> {

	private @Inject VideoDAO videoDAO;
	private @Inject VideoHistoryService videoHistoryService;
	
	@Override
	public AbstractDAO<Video> getDAO() {
		return videoDAO;
	}
	
	public List<Video> search(Video video){
		return videoDAO.search(video);
	}
	
	public List<Video> searchLast(Integer page, Integer maxRecords){
		List<Video> videos = videoDAO.searchLast(page, maxRecords);
		for(Video video:videos) {
			video.setUrlEmbed(UtilURLEmbedVideo.getUrlEmbed(video.getUrl()));
		}
		return videos;
	}
	
	public List<Video> searchTop(Integer page, Integer maxRecords){
	    List<VideoHistory> histories = videoHistoryService.searchTop(page, maxRecords);	
	    List<Video> videos = new ArrayList<Video>();
	    if(histories != null) {
		    for(VideoHistory videoHistory:histories) {
		    	Video video = videoDAO.recuperar(videoHistory.getId());
		    	if(video != null && video.getUrl() != null) {
			    	video.setUrlEmbed(UtilURLEmbedVideo.getUrlEmbed(video.getUrl()));		
			    	videos.add(video);
		    	}	
		    }
	    }    
		return videos;
	}
	
	public Video getByURL(String url) {
		try {
			return videoDAO.getByURL(url);
		}catch(Exception e) {
			return null;
		}
	}
	
	public Video getByFilename(String filename) {
		try {
			return videoDAO.getByFilename(filename);
		}catch(Exception e) {
			return null;
		}	
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	@Override
	public void incluir(Video entidade) {
		// TODO Auto-generated method stub
		super.incluir(entidade);
	}

	@TransactionAttribute(TransactionAttributeType.REQUIRES_NEW)
	@Override
	public void alterar(Video entidade) {
		// TODO Auto-generated method stub
		super.alterar(entidade);
	}
	
	
	
}
