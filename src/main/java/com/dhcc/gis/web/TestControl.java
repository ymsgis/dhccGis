package com.dhcc.gis.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/test")
public class TestControl {

	@RequestMapping(value = "/saveUser", method = { RequestMethod.POST, RequestMethod.GET })
	@ResponseBody
	public void save() {
	}

	@RequestMapping(value = "/queryError")
	public Object quryError() {
		return "error/500";
	}

}
