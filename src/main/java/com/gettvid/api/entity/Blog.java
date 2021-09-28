package com.gettvid.api.entity;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.google.gson.annotations.Expose;

@Entity
@Table(name = "get_blog", schema = "public")
public class Blog implements java.io.Serializable {

	private static final long serialVersionUID = -3714699261681620589L;
	
	@Id
	@SequenceGenerator(name="BLOG_ID_GENERATOR", sequenceName="get_blog_id_seq", allocationSize = 1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="BLOG_ID_GENERATOR") 
	@Expose
	private Integer id;
	
	
	private String title;
	
	@Column(name="date_add")
	private LocalDateTime dateAdd;
	
	@Column(name="url_name")
	private String urlName;
	
	private String text;
	
	private String author;
	
	private String thumb;
	
	private String lang;
	
	private String summary;

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

	public LocalDateTime getDateAdd() {
		return dateAdd;
	}

	public void setDateAdd(LocalDateTime dateAdd) {
		this.dateAdd = dateAdd;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getThumb() {
		return thumb;
	}

	public void setThumb(String thumb) {
		this.thumb = thumb;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}

	public String getUrlName() {
		return urlName;
	}

	public void setUrlName(String urlName) {
		this.urlName = urlName;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}
		
}
