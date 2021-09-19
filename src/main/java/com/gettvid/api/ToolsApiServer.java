package com.gettvid.api;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.gettvid.service.youtube.YoutubeService;
import com.gettvid.to.YoutubeTO;

@Path(value="/tools")
public class ToolsApiServer {
	
	
	private @Inject YoutubeService youtubeService;
	@GET
	@Path("/youtube/extract")
	@Produces(MediaType.APPLICATION_JSON)
	public Response extract(@QueryParam(value = "video") String video) throws Exception {
		System.out.println("api-extract-youtube= video:"+video);
		YoutubeTO youtubeTO = new YoutubeTO(video,null);
		youtubeTO.setResultado(youtubeService.executarAPI(youtubeTO));
		return Response.ok().entity(youtubeTO).build();
	}
	
	
}