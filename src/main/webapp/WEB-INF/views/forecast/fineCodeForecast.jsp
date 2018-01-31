<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>逐6小时电码指导预报</title>
<link rel="stylesheet" href="${extPath}/resources/css/ext-lightblue.css" />
<link rel="stylesheet" href="${extPath}/css/ext.css" />
<script type="text/javascript" src="${extPath}/ext-base.js"></script>
<script type="text/javascript" src="${extPath}/ext-all.js"></script>
<script type="text/javascript" src="${extPath}/ext-lang-zh_CN.js"></script>
<script type="text/javascript" src="../appux/dataGridView.jsx"></script>
<script type="text/javascript">var _ctxPath = '${contextPath}';</script>
<script type="text/javascript" src="./fineCodeForecast.jsx"></script>
<script type="text/javascript">
new FineCodeForecast();
</script>
</head>

<body>
</body>
</html>
