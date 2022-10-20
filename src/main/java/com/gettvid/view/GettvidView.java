package com.gettvid.view;

import com.ocpsoft.pretty.faces.annotation.URLMapping;
import com.ocpsoft.pretty.faces.annotation.URLMappings;

@URLMappings(mappings={
		
		@URLMapping(id = "pt", pattern = "/pt", viewId = "/index-pt.xhtml"),
		
		@URLMapping(id = "en", pattern = "/en", viewId = "/index-en.xhtml"),
		
		@URLMapping(id = "site-view", pattern = "/site/#{site}", viewId = "/pages/site/site-view.xhtml"),
		
		@URLMapping(id = "blog-form", pattern = "/blog/form", viewId = "/pages/blog/blog-form.xhtml"),
		
		@URLMapping(id = "blog-view", pattern = "/blog/#{parameter}", viewId = "/pages/blog/blog-view.xhtml")
		
		})
public class GettvidView {
	

}
