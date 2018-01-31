<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>

<c:set var="contextPath" value="${pageContext.request.contextPath}"/>

<%--<c:set var="arcgisPath" value="http://192.168.1.113:800/arcgis/3.19"/>--%>
<c:set var="arcgisPath" value="http://localhost:8080/arcgis/3.19"/>

<%-- <c:set var="arcgisPath" value="https://js.arcgis.com/3.19"/> --%>
<c:set var="euiPath" value="${contextPath}/scripts/easyui" />
<c:set var="extPath" value="${contextPath}/scripts/extjs" />
<c:set var="echartsPath" value="${contextPath}/scripts/echarts"/>