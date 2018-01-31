<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>FTP Config</title>
<link rel="stylesheet" href="${euiPath}/themes/bootstrap/easyui.css" />
<link rel="stylesheet" href="${euiPath}/themes/icon.css" />
<script type="text/javascript" src="${euiPath}/jquery.min.js"></script>
<script type="text/javascript" src="${euiPath}/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${contextPath}/scripts/app/crudpage.js"></script>
<script type="text/javascript">
var ctxPath = '${contextPath}';
</script>
<script type="text/javascript" src="./collectFtpConfig.jsx"></script>
</head>
<body class="easyui-layout">
	<div class="easyui-panel" data-options="region:'north'" title="数据检索" style="height:68px;">
		<form id="searchForm">
		<fieldset style="border:1px solid #eee;margin:0px;">
			<label>
				名称：<input type="text" class="easyui-textbox" name="name" />				
			</label>
			<label>
				地址：<input type="text" class="easyui-textbox" name="url" />				
			</label>
			<a class="easyui-linkbutton act-search">搜索</a>
		</fieldset>
		</form>
	</div>
	<div class="easyui-panel" data-options="region:'center'">
		<table id="datagrid">
		<thead>
		<tr>
			<th field="id" width="100" checkbox="true">全选</th>
			<th field="name" width="200">名称</th>
			<th field="url" width="200">地址</th>
			<th field="port" width="50">端口</th>
			<th field="type" width="100">类型</th>
			<th field="userName" width="100">用户名</th>
			<th field="useFor" width="100">用途</th>
			<th field="ftpEncoding" width="50">编码</th>
		</tr>
		</thead>
		</table>
	</div>
	<form id="dataform">
		<fieldset>
		<table>
		<tr>
			<td>名称：</td>
		</tr>
		</table>
		</fieldset>
	</form>
</body>
</html>