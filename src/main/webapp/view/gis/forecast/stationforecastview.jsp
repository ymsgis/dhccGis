<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../include.inc.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<script src="${contextPath}/scripts/jquery.min.js"></script>
<link rel="stylesheet" href="${euiPath}/themes/default/easyui-adv.css" />
<link rel="stylesheet" href="${euiPath}/themes/icon.css" />
<link title="blue" href="${contextPath}/css/skinBlue.css" rel="stylesheet" type="text/css" role="skin"/>
<link title="green" href="${contextPath}/css/skinGreen.css" rel="stylesheet" type="text/css" role="skin" disabled="disabled"/>
<link title="orange" href="${contextPath}/css/skinOrange.css" rel="stylesheet" type="text/css" role="skin" disabled="disabled"/>
<script type="text/javascript" src="${euiPath}/jquery.min.js"></script>
<script src="${contextPath}/scripts/jquery.cookie.js"></script>
<script src="${contextPath}/scripts/common/skins.js"></script>
<script type="text/javascript" src="${euiPath}/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
<script src="${arcgisPath}/init.js"></script>
<script src="${contextPath}/scripts/config/config.js"></script>
<%-- <script src="${contextPath}/scripts/gisCommon/symboltool.js"></script> --%>
<script src="${contextPath}/scripts/gisCommon/stationforecastview.js"></script>

</head>
<body>	
	<div id="accordion" class="easyui-accordion" style="width:110px;height:495px;">
	    <div title="滚动预报" data-options="iconCls:'icon-gaowen'" style="overflow:auto;padding:15px;">
	        <input type="radio" name="roll" value="24" checked="checked" onclick="StationForecastView.rollClick()">24小时</input>
			<input type="radio" name="roll" value="48" onclick="StationForecastView.rollClick()">48小时</input>
			<input type="radio" name="roll" value="72" onclick="StationForecastView.rollClick()">72小时</input>
			<input type="radio" name="roll" value="96" onclick="StationForecastView.rollClick()">96小时</input>
			<input type="radio" name="roll" value="120" onclick="StationForecastView.rollClick()">120小时</input>
			<input type="radio" name="roll" value="144" onclick="StationForecastView.rollClick()">144小时</input>
			<input type="radio" name="roll" value="168" onclick="StationForecastView.rollClick()">168小时</input>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="StationForecastView.clear(true)">清除</a>
	    </div>
	    <div title="精细预报" data-options="iconCls:'icon-duoyun'" style="overflow:auto;padding:15px;">
	        <input type="radio" name="city" value="6" checked="checked" onclick="StationForecastView.cityClick()">06小时</input>
			<input type="radio" name="city" value="12" onclick="StationForecastView.cityClick()">12小时</input>
			<input type="radio" name="city" value="18" onclick="StationForecastView.cityClick()">18小时</input>
			<input type="radio" name="city" value="24" onclick="StationForecastView.cityClick()">24小时</input>
			<input type="radio" name="city" value="48" onclick="StationForecastView.cityClick()">48小时</input>
			<input type="radio" name="city" value="72" onclick="StationForecastView.cityClick()">72小时</input>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="StationForecastView.clear(true)">清除</a>
	    </div>
	    <div title="五市预报" data-options="iconCls:'icon-yin'" style="overflow:auto;padding:15px;">
	        <input type="radio" name="five" value="6" checked="checked" onclick="StationForecastView.fiveClick()">06小时</input>
			<input type="radio" name="five" value="12" onclick="StationForecastView.fiveClick()">12小时</input>
			<input type="radio" name="five" value="18" onclick="StationForecastView.fiveClick()">18小时</input>
			<input type="radio" name="five" value="24" onclick="StationForecastView.fiveClick()">24小时</input>
			<input type="radio" name="five" value="48" onclick="StationForecastView.fiveClick()">48小时</input>
			<input type="radio" name="five" value="72" onclick="StationForecastView.fiveClick()">72小时</input>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="StationForecastView.clear(true)">清除</a>
	    </div>
	    <div title="村镇预报" data-options="iconCls:'icon-leizhenyu'" style="overflow:auto;padding:15px;">
	        <input type="radio" name="town" value="6" checked="checked" onclick="StationForecastView.searchTownForecast()">06小时</input>
			<input type="radio" name="town" value="12" onclick="StationForecastView.searchTownForecast()">12小时</input>
			<input type="radio" name="town" value="18" onclick="StationForecastView.searchTownForecast()">18小时</input>
			<input type="radio" name="town" value="24" onclick="StationForecastView.searchTownForecast()">24小时</input>
			<input type="radio" name="town" value="48" onclick="StationForecastView.searchTownForecast()">48小时</input>
			<input type="radio" name="town" value="72" onclick="StationForecastView.searchTownForecast()">72小时</input>
			<input type="radio" name="town" value="96" onclick="StationForecastView.searchTownForecast()">96小时</input>
			<input type="radio" name="town" value="120" onclick="StationForecastView.searchTownForecast()">120小时</input>
			<input type="radio" name="town" value="144" onclick="StationForecastView.searchTownForecast()">144小时</input>
			<input type="radio" name="town" value="168" onclick="StationForecastView.searchTownForecast()">168小时</input>
			<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="StationForecastView.clear(true)">清除</a>
	    </div>
	    <div title="旅游预报" data-options="iconCls:'icon-baoyu',selected:true" style="overflow:auto;padding:15px;">
	       <a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="StationForecastView.clear(true)">清除</a>
	    </div>
    </div>
	
    <div>
    	<form id="searchForm" class="easyui-form" action="" method="post">
    	</form>
    </div>
    
</body>
</html>