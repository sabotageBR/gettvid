package com.gettvid.service.combo;

import javax.inject.Named;

import com.gettvid.enums.TypeVideoDownload;

@Named
public class CombosBean {

	
	public TypeVideoDownload[] getListTypeVideoDownload() {
		return TypeVideoDownload.values();
	}
	
}
