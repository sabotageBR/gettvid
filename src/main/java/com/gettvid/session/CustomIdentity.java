package com.gettvid.session;

import java.io.Serializable;

import javax.enterprise.context.SessionScoped;
import javax.inject.Named;

@Named
@SessionScoped
public class CustomIdentity implements Serializable{
	
	private static final long serialVersionUID = 7348450650298360640L;
	
	
	
	
	
	private String ipExterno;
	
	

	public String getIpExterno() {
		if (ipExterno == null) {
			ipExterno = new String();
		}
		return ipExterno;
	}

	public void setIpExterno(String ipExterno) {
		this.ipExterno = ipExterno;
	}

}
