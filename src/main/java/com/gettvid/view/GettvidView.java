package com.gettvid.view;

import com.ocpsoft.pretty.faces.annotation.URLMapping;
import com.ocpsoft.pretty.faces.annotation.URLMappings;

@URLMappings(mappings={
		
		@URLMapping(id = "pt", pattern = "/pt", viewId = "/index-pt.xhtml"),
		@URLMapping(id = "en", pattern = "/en", viewId = "/index-en.xhtml")
		  
		})
public class GettvidView {
	

}
