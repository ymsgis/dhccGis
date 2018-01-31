package com.dhcc.gis.common;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.log4j.MDC; 
import org.jasig.cas.client.validation.Assertion;

import com.southgis.cmap.log.common.User;
import com.southgis.cmap.log.common.WebCommon;

/**
 * 自动根据单点登录系统的信息设置本系统的用户信息
 * 
 * @author 
 * @Date 2013.1.16
 */
public class AutoSetUserAdapterFilter implements Filter {

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest) request;

		HttpSession session = httpRequest.getSession();

		Object sessionUser = session.getAttribute("user");

		if (null == sessionUser) {
			Object object = session.getAttribute("_const_cas_assertion_");
			Assertion assertion = (Assertion) object;

			if (null != object) {
				Map<String, Object> attributes = assertion.getPrincipal().getAttributes();
				if (!attributes.isEmpty()) {
					User user = new User();
					String userGuid = attributes.get("USERGUID").toString();
					user.setLoginName(attributes.get("LOGINNAME").toString());
					user.setUserName(attributes.get("USERNAME").toString());
					user.setUserGuid(userGuid);
					user.setOrganGuid(attributes.get("ORGANGUID").toString());
					user.setOrganName(attributes.get("ORGANNAME").toString());

					// 设置日志变量
//					MDC.put("userGuid", userGuid);
//					MDC.put("ipAddress", WebCommon.getIpAddr(httpRequest));

					session.setAttribute("user", user);
					user = null;

				}
			}

		}

		chain.doFilter(request, response);

	}

	@Override
	public void destroy() {

	}

}
