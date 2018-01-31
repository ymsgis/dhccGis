<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>关键点订正</title>
<link rel="stylesheet" href="${euiPath}/themes/icon.css" />
<link rel="stylesheet" href="${euiPath}/themes/default/easyui-adv.css" />
<link href="${contextPath}/css/public.css" rel="stylesheet" type="text/css" />
<link href="${contextPath}/css/page.css" rel="stylesheet" type="text/css" />
<link href="${contextPath}/css/iconfont.css" rel="stylesheet" type="text/css" />
<link title="blue" href="${contextPath}/css/skinBlue.css" rel="stylesheet" type="text/css" role="skin"/>
<link title="green" href="${contextPath}/css/skinGreen.css" rel="stylesheet" type="text/css" role="skin" disabled="disabled"/>
<link title="orange" href="${contextPath}/css/skinOrange.css" rel="stylesheet" type="text/css" role="skin" disabled="disabled"/>
<script type="text/javascript" src="${contextPath}/scripts/jquery.min.js"></script>
<script src="${contextPath}/scripts/jquery.cookie.js"></script>
<script src="${contextPath}/scripts/common/skins.js"></script>
<script type="text/javascript" src="${euiPath}/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${euiPath}/extension/jquery.edatagrid.js"></script>
<script type="text/javascript" src="${euiPath}/extension/jquery.gridheader.js"></script>
<script type="text/javascript" src="${euiPath}/extension/datagrid-cellediting.js"></script>
<script type="text/javascript" src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">var _ctxPath = '${contextPath}';</script>
<script type="text/javascript" src="../forecast/baseStationForecastView.jsx"></script>
<script type="text/javascript" src="./stationGridDataCorrect.jsx"></script>
<script type="text/javascript" src="./gridCorrectGisSupport.jsx"></script>
<script src="${contextPath}/scripts/grid/gridLoad.js"></script>
<script src="${contextPath}/scripts/grid/gridType.js"></script>
<script src="${contextPath}/scripts/config/config.js"></script>
<script src="${contextPath}/scripts/gisCommon/weatherLegend.js"></script>
<script src="${contextPath}/scripts/config/weatherLegend.js"></script>
<script src="${contextPath}/scripts/grid/gridColor.js"></script>
<script src="${arcgisPath}/init.js"></script>
<style type="text/css">
body,html {
	padding: 0;
	margin: 0;
}
</style>
<script type="text/javascript">
var dataViewer = new StationGridDataCorrectView({}, new GisSupport());
</script>
</head>

<body class="page pgaut" style="height:100%;">
<div class="easyui-layout" fit="true">
	<div class="easyui-panel qhCon" region="north" height="auto" style="overflow:hidden;">
		<div class="qhTit taTitb">
			<ul class="bt ">
				<span class="hover">关键点订正</span>
			</ul>
		</div>	
		<form id="searchForm" method="post" style="padding: 2px;">
			<ul class="formSech">
			<li><label>预报日期：<input type="text" id="fcTime" class="easyui-datebox" name="fcTime" style="width:120px;" value="2017-11-23" /></label></li>
			<li><label>预报时次：<select class="easyui-combobox" id="timeType" name="timeType" style="width: 50px;" editable="false">
				<option value="8">08</option>
				<option value="20">20</option>
			</select></label>
			</li>
			<li><label>加载类型：<select class="easyui-combobox" id="gridType" name="gridType" style="width:120px;" editable="false">
				<!-- option value="gridCheck">审核发布场</option -->
				<option value="gridCenter">中央指导预报</option>				
				<option value="gridBest">最优背景场</option>
				<option value="gridBack">备份场</option>
			</select></label>
			</li>	
			<li>
				<div id="pagebar">
				<a rel="prev">上一页</a>
				<input name="page" style="width: 30px;" value="1" />
				<a rel="next">下一页</a>			
				</div>
			</li>
			<li>
			<div id="optbar">
				<a class="easyui-linkbutton submit btnBxb" icon="icon-search">加载</a>
				<a  class="easyui-linkbutton " icon="icon-search" href="javascript:checkGrid()"><span id="btnGridCheck">格点显示</span></a>
				<a id="saveBtn" class="btnBxb" rel="savedata" icon="icon-save">保存</a>
				<a class="btnBxb" rel="consistencyProcess" icon="icon-save">一致性处理</a>
			</div>			
			</li>
		</form>		
	</div>
	<div region="center" style="padding-top:22px;">
		<table id="dataGrid" fit="true" toolbar="#infoForm"></table>
		<form id="infoForm" class="easyui-form" style="padding:1px;white-space:nowrap;" title="基本信息">					
			<label>显隐列：
				<label><input class="columnCtrl" type="checkbox" value="typeR" checked="checked" />降水</label>
				<label><input class="columnCtrl" type="checkbox" value="typeTmax" checked="checked" />高温</label>
				<label><input class="columnCtrl" type="checkbox" value="typeTmin" checked="checked" />低温</label>			
			</label>
			<label style="white-space: nowrap;">预报：<input class="easyui-textbox" id="baseFcTypeField" readonly="readonly" style="width:135px;" /></label>			
		</form>	
	</div>
</div>
</body>
</html>
