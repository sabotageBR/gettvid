package com.gettvid.util;

public class UtilURLEmbedVideo {

	
	public static String getUrlEmbed(String url) {
		String retorno = "";
		if(url != null) {
			if(url.contains("youtube")) {
				if(url.contains("shorts")) {
					if(url.contains("?")) {	
						retorno = url.substring(0,url.indexOf(".com/")+5)+"embed/"+url.substring(url.indexOf("shorts/")+7,url.indexOf("?"));
					}else {
						retorno = url.substring(0,url.indexOf(".com/")+5)+"embed/"+url.substring(url.indexOf("shorts/")+7,url.length());
					}
					
				}else if(url.contains("&")) {
					retorno = url.substring(0,url.indexOf(".com/")+5)+"embed/"+url.substring(url.indexOf("v=")+2,url.length());
				}else {
					retorno = url.substring(0,url.indexOf(".com/")+5)+"embed/"+url.substring(url.indexOf("v=")+2,url.length());
				}
			}else if(url.contains("youtu.be")) {
				//https://youtu.be/tBqs6osMpnM
				if(url.contains("&")) {
					retorno = "https://www.youtube.com/embed/"+url.substring(url.indexOf("be/")+3,url.indexOf("&"));
				}else {
					retorno = "https://www.youtube.com/embed/"+url.substring(url.indexOf("be/")+3,url.length());
				}
			}else if(url.contains("twitter")) {
				
			}
			else {
				retorno = url;
			}
		}	
		return retorno;
		
		
	}
}
