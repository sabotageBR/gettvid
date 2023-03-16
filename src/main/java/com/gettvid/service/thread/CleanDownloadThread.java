package com.gettvid.service.thread;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Date;
import java.util.stream.Stream;

import javax.ejb.Schedule;
import javax.ejb.Stateless;

import com.gettvid.util.UtilData;

@Stateless
public class CleanDownloadThread {

	@Schedule(info = "CLEAN_DOWNLOAD", minute = "*", hour = "*", persistent = false)
	private void cleanFiles() {
		try (Stream<Path> paths = Files.list(Paths.get("/opt/jboss"))) {
			paths.filter(arquivo -> Files.isRegularFile(arquivo) && (arquivo.getFileName().toString().contains("mp4")
					|| arquivo.getFileName().toString().contains("mp3"))).forEach(arquivo -> {
						try {
							BasicFileAttributes attr = Files.readAttributes(arquivo, BasicFileAttributes.class);
							long dif  = UtilData.getDiferencaMinutos(new Date(), new Date(attr.lastAccessTime().toMillis()));
							if(dif >= 120) {
								System.out.println(String.format("APAGANDO ARQUIVO: %s : %s : %s",arquivo.getFileName().toString(),attr.lastModifiedTime(),String.valueOf(dif)));
								Files.delete(arquivo);
							}else {
								//System.out.println(dif + "min: " +arquivo.getFileName());
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
					});
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
