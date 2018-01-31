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
<script type="text/javascript" src="../forecast/fcAccount.jsx"></script>
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
		<div class="qhTit taTitb" style="height:25px;">
			<ul class="bt ">
				<span class="hover"  style="height:25px;">关键点订正</span>
			</ul>
		</div>	
		<form id="searchForm" method="post" style="padding: 2px;">
			<ul class="formSech">
			<li><label>预报日期：<input type="text" id="fcTime" class="easyui-datebox" name="fcTime" style="width:100px;" test-value="2017-12-13" /></label></li>
			<li><label>预报时次：<select class="easyui-combobox" id="timeType" name="timeType" style="width: 50px;" editable="false">
				<option value="8">08</option>
				<option value="20">20</option>
			</select></label>
			</li>
			<li>
				<input type="hidden" name="gridType" id="gridTypeField" />
				<label>加载类型：<select class="easyui-combobox" name="fcDataType" style="width:120px;" editable="false">
				<option value="stationCode">订正指导预报</option>		
				<option value="centerForecast">中央台站点预报</option>
				<option value="integration1">集成预报1</option>	
				<option value="integration2">集成预报2</option>
				<option value="integration3">集成预报3</option>
				<option value="ect">EC2m</option>
				<%-- option value="t639m">T639MOS月</option --%>
				<option value="t369">T639MOS季</option>								
			</select></label>
			</li>
			<li>
			<div id="optbar">
				<a class="easyui-linkbutton submit btnBxb" icon="icon-search">加载</a>
				<a  class="easyui-linkbutton " icon="icon-search" href="javascript:checkGrid()"><span id="btnGridCheck">格点显示</span></a>
				<a id="saveBtn" class="btnBxb" rel="savedata" icon="icon-save">保存</a>
				<a class="btnBxb" rel="consistencyProcess" icon="icon-save">处理</a>
							<label><input id="isVillageField" name="isVillage" class="easyui-switchbutton" onText="是" offText="否" />村镇预报</label>	
			</div>
			</li>
		</form>		
	</div>
	<div region="center">
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
<div id="tempRefDlg" style="width:650px;top:50px;">
<div id="tempRefTbar">
<label>整列赋值：<select id="applyTempRefField">
	<option value="stationCode">订正指导预报</option>		
	<option value="centerForecast">中央台站点预报</option>
	<option value="integration1">集成预报1</option>	
	<option value="integration2">集成预报2</option>
	<option value="integration3">集成预报3</option>
	<option value="ect">EC2m</option>
	<%-- option value="t639m">T639MOS月</option --%>
	<option value="t369">T639MOS季</option>
</select></label>
<a class="easyui-linkbutton" iconCls="icon-save" rel="save">确定</a>
<a class="easyui-linkbutton close-btn" iconCls="icon-cancel" rel="close">取消</a>
<table id="tempRefGrid">
<thead>
	<tr>
		<th field="temp">预报温度</th>
		<th field="realTemp">实况温度</th>
		<th field="centerForecast">中央预报</th>
		<th field="integration1">集成预报1</th>
		<th field="integration2">集成预报2</th>
		<th field="integration3">集成预报3</th>
		<th field="ect">EC2m</th>
		<th field="t369">T639MOS</th>	
	</tr>
</thead>
</table>
</div>
</div>
</body>
</html>
