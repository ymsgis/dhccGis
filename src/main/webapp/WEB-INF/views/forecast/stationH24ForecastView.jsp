<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>站点指导预报</title>
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
<script type="text/javascript" src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">var _ctxPath = '${contextPath}';</script>
<script type="text/javascript" src="./fcAccount.jsx"></script>
<script type="text/javascript" src="./baseStationForecastView.jsx"></script>
<script type="text/javascript" src="./stationH24ForecastView.jsx"></script>
<style type="text/css">
body,html {
	padding: 0;
	margin: 0;
}
.easyui-form .easyui-textbox {
	width: 120px;
}
</style>
<script type="text/javascript">
new StationH24ForecastView({
	editable: true
});
</script>
</head>

<body class="page pgaut">
<div  class="easyui-panel" title="">
		<div class="qhTit taTitb">
				<ul class="bt ">
					<span class="hover">站点指导预报</span>
				</ul>
		</div>
	<div class="easyui-panel qhCon">
		<form id="searchForm" method="post" style="padding: 2px;">
			<ul class="formSech">
			<li>
			<label>预报日期：<input type="text" class="easyui-datebox" name="createTime" style="width:100px;" /></label></li>
			<li><label>预报时次：<select class="easyui-combobox" name="timeType" style="width: 50px;" editable="false">
				<option>10</option>
				<option>16</option>
			</select></label></li>
			<li>
			<a class="easyui-linkbutton submit btnBxb" icon="icon-search">查询</a>
			<a class="easyui-linkbutton submit btnBxb" rel="gridmake" icon="icon-save">格点生成</a>				
			</li>
			</ul>
		</form>
	</div>
	<div class="easyui-panel">
		<form id="infoForm" class="easyui-form" style="padding: 2px;" title="基本信息">
			<label>预报员：<input type="text" class="eui-textbox" readonly="readonly" name="createBy" /></label>
			<label>制作时间：<input type="text" class="easyui-textbox" readonly="readonly" name="createTime" /></label>
			<label>预报时次：<input type="text" class="easyui-textbox" readonly="readonly" name="timeType"  style="width:50px;" /></label>
			<label>预报时段：<select id="hourSpanQuery" style="width: 100px;"></select></label>	
			<a class="easyui-linkbutton submit btnBxb" rel="savedata" icon="icon-save">保存</a>
			<a class="easyui-linkbutton submit btnBxb" rel="datatext" icon="icon-tip">预览</a>
		</form>
		<table id="dataGrid"></table>
		<div id="textWin" style="width:500px;">
			<pre id="textView">
			</pre>
		</div>
	</div>
</div>
</body>
</html>
