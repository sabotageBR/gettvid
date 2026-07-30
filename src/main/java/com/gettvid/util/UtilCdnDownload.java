package com.gettvid.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

public class UtilCdnDownload {

	private static final String CONTENT_DISPOSITION_PARAM = "response-content-disposition";

	public static String forceAttachment(String url, String filename) {
		if (url == null || url.isEmpty()) {
			return url;
		}
		if (url.toLowerCase().contains(CONTENT_DISPOSITION_PARAM)) {
			return url;
		}
		String safeFilename = sanitizeFilename(filename);
		String encoded;
		try {
			encoded = URLEncoder.encode("attachment; filename=\"" + safeFilename + "\"", "UTF-8");
		} catch (UnsupportedEncodingException e) {
			return url;
		}
		char separator = url.indexOf('?') >= 0 ? '&' : '?';
		return url + separator + CONTENT_DISPOSITION_PARAM + "=" + encoded;
	}

	private static String sanitizeFilename(String filename) {
		if (filename == null || filename.isEmpty()) {
			return "video.mp4";
		}
		String cleaned = filename.replaceAll("[\\r\\n\"\\\\]", "").trim();
		return cleaned.isEmpty() ? "video.mp4" : cleaned;
	}
}
