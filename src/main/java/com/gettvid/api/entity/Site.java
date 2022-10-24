package com.gettvid.api.entity;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;

@Entity
@Table(name = "get_site", schema = "public")
public class Site implements java.io.Serializable {

	private static final long serialVersionUID = -3714699261681620589L;
	
	@Id
	@SequenceGenerator(name="SITE_ID_GENERATOR", sequenceName="get_site_id_seq", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SITE_ID_GENERATOR") 
	@Expose
	private Integer id;
	private String title;
	
	private String description;
	
	private String url;
	
	private String color;
	
	private String lang;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}
			
}
