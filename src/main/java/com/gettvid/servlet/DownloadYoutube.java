package com.gettvid.servlet;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDateTime;

import javax.inject.Inject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.gettvid.api.entity.StatusVideoEnum;
import com.gettvid.api.entity.Video;
import com.gettvid.api.service.video.VideoService;

@WebServlet({"/download/youtube"})
public class DownloadYoutube extends HttpServlet {

	private static final long serialVersionUID = 4043679811548773728L;

	@Inject
	private VideoService videoService;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		File arquivo = null;
		try {
			
			String nomeArquivo = req.getParameter("file");
			System.out.println(":::Fazendo download do arquivo:"+nomeArquivo);
			arquivo = new File(nomeArquivo);
			Video video = videoService.getByFilename(nomeArquivo);
			if(arquivo.exists()) {
	            resp.setContentType("application/force-download");
	            resp.setHeader("Content-Disposition","attachment; filename=\"" +nomeArquivo+ "\"");
	            int BUFF_SIZE = 1024;
	            byte[] buffer = new byte[BUFF_SIZE];
	            resp.setContentLength((int) arquivo.length());
	            FileInputStream fis = new FileInputStream(arquivo);
	            OutputStream os = resp.getOutputStream();
	            int byteCount = 0;
	
	            do {
	                byteCount = fis.read(buffer);
	                if (byteCount == -1) {
	                    break;
	                }
	                os.write(buffer, 0, byteCount);
	                os.flush();
	            } while (true);
	            
	            if(video != null) {
	            	video.setStatus(StatusVideoEnum.FINISH);
	            	video.setDateDownload(LocalDateTime.now());
	            	videoService.alterar(video);
	            }
			}else {
				System.out.println("Arquivo nao existe: "+arquivo.getAbsolutePath());
			}
        }catch(Exception e) {
        	e.printStackTrace();
        } finally {
        	if(arquivo !=null && arquivo.exists()) {
        	//	arquivo.delete();
        	}
        }
	}
	
}
