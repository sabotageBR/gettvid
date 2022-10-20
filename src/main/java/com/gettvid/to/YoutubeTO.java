package com.gettvid.to;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;

import org.ocpsoft.prettytime.PrettyTime;

import com.gettvid.api.entity.Afiliate;
import com.gettvid.api.entity.Video;
import com.gettvid.enums.TypeVideoDownload;
import com.gettvid.util.UtilCollection;
import com.gettvid.util.UtilString;

public class YoutubeTO extends NettoolsTO{

	private static final long serialVersionUID = 5400112879734505569L;

	private String host;
	private String resultado;
	private LocalDateTime dateTime;
	private TypeVideoDownload tipo;
	private List<Video> lastVideos;
	private List<Video> topVideos;
	private List<Afiliate> afiliates;
	private UtilCollection<Video> utilCollection = new UtilCollection<Video>();
	
	public YoutubeTO() {
		
	}
	public YoutubeTO(String host,String resultado) {
		setHost(host);
		setResultado(resultado);
	}
	
	public YoutubeTO(String host, TypeVideoDownload tipo, LocalDateTime dateTime) {
		setHost(host);
		setDateTime(dateTime);
		setTipo(tipo);
	}
	
	public YoutubeTO(List<Video> lastVideos,List<Video> topVideos,List<Afiliate> afiliates) {
		setLastVideos(lastVideos);
		setTopVideos(topVideos);
		setAfiliates(afiliates);
		utilCollection.ordenarListaDesc(getTopVideos(),"countDown");
		utilCollection.ordenarListaDesc(getLastVideos(),"dateAdd");
	}
	
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	
	public String getHostConcat() {
		if(host != null) {
			return UtilString.truncar(host, 20);
		}else {
			return "";
		}
	}
	public String getResultado() {
		return resultado;
	}
	public void setResultado(String resultado) {
		this.resultado = resultado;
	}
	public LocalDateTime getDateTime() {
		return dateTime;
	}
	public void setDateTime(LocalDateTime dateTime) {
		this.dateTime = dateTime;
	}
	public String getDateTimeFormat() {
		PrettyTime p = new PrettyTime(new Locale("pt"));
		return p.format(getDateTime());
	}
	public String getDateTimeOrder() {
		UtilString us = new UtilString();
		if(getDateTime() != null) {
			return String.valueOf(getDateTime().getYear())+
					us.completaComZerosAEsquerda(String.valueOf(getDateTime().getMonth().getValue()),2)+
					us.completaComZerosAEsquerda(String.valueOf(getDateTime().getDayOfMonth()),2)+
					us.completaComZerosAEsquerda(String.valueOf(getDateTime().getHour()),2)+
					us.completaComZerosAEsquerda(String.valueOf(getDateTime().getMinute()),2)+
					us.completaComZerosAEsquerda(String.valueOf(getDateTime().getSecond()),2);
		}else {
			return "";
		}
	}
	public TypeVideoDownload getTipo() {
		return tipo;
	}
	public void setTipo(TypeVideoDownload tipo) {
		this.tipo = tipo;
	}
	public List<Video> getLastVideos() {
		return lastVideos;
	}
	public void setLastVideos(List<Video> lastVideos) {
		this.lastVideos = lastVideos;
	}
	public List<Video> getTopVideos() {
		return topVideos;
	}
	public void setTopVideos(List<Video> topVideos) {
		this.topVideos = topVideos;
	}
	public List<Afiliate> getAfiliates() {
		return afiliates;
	}
	public void setAfiliates(List<Afiliate> afiliates) {
		this.afiliates = afiliates;
	}
	
}
