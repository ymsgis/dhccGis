package com.dhcc.gis.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.mars.world.helper.SysConstants;

@Controller
@RequestMapping("/gridview")
public class IndexController {
	
	/**
	 * 解决chrome兼容iframe问题
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(HttpServletRequest request) {
		return "index";
	}

	/**
	 * 解决chrome兼容iframe问题
	 * @param request
	 * @return
	 */
	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public String main(HttpServletRequest request) {
		return "gridview/main";
	}
	
	/**
	 * 注销
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/logout")
	public String logout(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.removeAttribute("user");
		session.removeAttribute("_const_cas_assertion_");
		
		String path = request.getContextPath();
		int port = request.getServerPort();
		String basePath = "";
		if(port == 80) {
			basePath = request.getScheme()+"://"+request.getServerName()+path;
		} else {
			basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path;
		}
		String logoutUrl = SysConstants.getConstant("logoutURL", "http://172.23.105.85:8080/cas/logout");
		System.out.println(logoutUrl);
		//log.info("---basePath---"+basePath);
		return "redirect:"+logoutUrl+"?service="+basePath;
	}
}
