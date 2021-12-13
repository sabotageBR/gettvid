package com.gettvid.api.entity;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.envers.AuditTable;
import org.hibernate.envers.Audited;

import com.google.gson.annotations.Expose;

@Audited
@Entity
@Table(name = "get_video_history", schema = "public")
public class VideoHistory implements java.io.Serializable {

	private static final long serialVersionUID = -3714699261681620589L;
	
	@Id
	private Integer rev;
	
	private Integer id;
	
	@Column(name="date_add")
	private LocalDateTime dateAdd;
 	
	private String url;
	
	@Column(name="file_name")
	private String fileName ;
	
	@Column(name="date_finish")
	private LocalDateTime dateFinish;
	
	@Column(name="date_download")
	private LocalDateTime dateDownload;

	@Column(name="count_down")
	private Integer countDown;
	
	@Column(name="url_return")
	private String urlReturn;
	
	@Enumerated(EnumType.STRING)
	private StatusVideoEnum status;
	
	@Transient
	private String urlEmbed;
	
	@Transient
	private Long count;

	public VideoHistory() {
		
	}
	public VideoHistory(LocalDateTime dateAdd,StatusVideoEnum status, String url,String fileName,Integer countDown) {
		setDateAdd(dateAdd);
		setStatus(status);
		setUrl(url);
		setFileName(fileName);
		setCountDown(countDown);
	}
	public VideoHistory(Long count, Integer id) {
		setCount(count);
		setId(id);
	}
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public LocalDateTime getDateAdd() {
		return dateAdd;
	}

	public void setDateAdd(LocalDateTime dateAdd) {
		this.dateAdd = dateAdd;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getFileName() {
		return fileName;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public LocalDateTime getDateFinish() {
		return dateFinish;
	}

	public void setDateFinish(LocalDateTime dateFinish) {
		this.dateFinish = dateFinish;
	}

	public LocalDateTime getDateDownload() {
		return dateDownload;
	}

	public void setDateDownload(LocalDateTime dateDownload) {
		this.dateDownload = dateDownload;
	}

	public Integer getCountDown() {
		return countDown;
	}

	public void setCountDown(Integer countDown) {
		this.countDown = countDown;
	}

	public String getUrlReturn() {
		return urlReturn;
	}

	public void setUrlReturn(String urlReturn) {
		this.urlReturn = urlReturn;
	}
	public StatusVideoEnum getStatus() {
		return status;
	}
	public void setStatus(StatusVideoEnum status) {
		this.status = status;
	}
	public String getUrlEmbed() {
		return urlEmbed;
	}
	public void setUrlEmbed(String urlEmbed) {
		this.urlEmbed = urlEmbed;
	}
	public Integer getRev() {
		return rev;
	}
	public void setRev(Integer rev) {
		this.rev = rev;
	}
	public Long getCount() {
		return count;
	}
	public void setCount(Long count) {
		this.count = count;
	}
	
}
