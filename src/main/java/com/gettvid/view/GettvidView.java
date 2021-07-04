package com.gettvid.view;

import com.ocpsoft.pretty.faces.annotation.URLMapping;
import com.ocpsoft.pretty.faces.annotation.URLMappings;

@URLMappings(mappings={
		
		@URLMapping(id = "pt", pattern = "/pt", viewId = "/index.xhtml"),
		@URLMapping(id = "en", pattern = "/en", viewId = "/index.xhtml")
		  
		})
public class GettvidView {
	

}
