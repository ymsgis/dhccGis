/**
 * 
 */
package com.dhcc.gis.common;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;


/**
 * @comment
 * @company DHCC (C) Copyright
 * @author JemiZhuu(周士淳)
 * @category StringToDateConverter
 * @version 1.0
 * @since 2017年7月24日
 */
public class StringDateParamResolver implements HandlerMethodArgumentResolver {

	private static final DateFormat DATE_FORMAT = new SimpleDateFormat("yyyy/MM/dd");
	private static final DateFormat DATETIME_FORMAT = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");

	private DateFormat dateFormat = DATETIME_FORMAT;

	public Date convert(String source) {
		if (org.apache.commons.lang.StringUtils.isBlank(source)) {
			return null;
		}
		String str = source.toString();
		str = str.replace("T", " ").replace("-", "/");
		try {
			Date result = null;
			if (source.length() < 12) {
				result = DATE_FORMAT.parse(str);
			} else {
				result = dateFormat.parse(str);
			}
			return result;
		} catch (Exception e) {
			throw new IllegalArgumentException(e.getCause());
		}
	}

	@Override
	public boolean supportsParameter(MethodParameter parameter) {
		if (Date.class.isAssignableFrom(parameter.getParameterType())) {
			return true;
		}
		return false;
	}

	@Override
	public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
			NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
		String param = webRequest.getParameter(parameter.getParameterName());
		Date date = convert(param);
		return date;
	}
}
