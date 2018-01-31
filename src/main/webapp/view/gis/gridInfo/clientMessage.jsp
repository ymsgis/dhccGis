<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="../../include.inc.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>格点预报</title>
<script src="${contextPath}/scripts/gisCommon/gridInfo.js"></script>


<script src="${contextPath}/scripts/jquery.min.js"></script>
<link rel="stylesheet" href="${euiPath}/themes/bootstrap/easyui.css" />
<link rel="stylesheet" href="${euiPath}/themes/icon.css" />
<script type="text/javascript" src="${euiPath}/jquery.min.js"></script>
<script type="text/javascript" src="${euiPath}/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
<script src="${arcgisPath}/init.js"></script>
<!--  new page -->
<link href="${contextPath}/css/public.css" rel="stylesheet" title=""
	type="text/css" />
<link href="${contextPath}/css/page.css" rel="stylesheet" title=""
	type="text/css" />
<link href="${contextPath}/css/iconfont.css" rel="stylesheet" title=""
	type="text/css" />

<script src="${contextPath}/scripts/index/clientMessage.js"></script>
<script src="${contextPath}/scripts/config/config.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		initDatagrid();
	})
</script>

</head>
<body class="page pgaut">
	<div id="rightPane">
		<div class="mLeftNrBdBox P12" id="default-example" data-collapse>
			<div class="qhTit taTitb">
				<ul class="bt ">
					<span class="hover">消息提示</span>
				</ul>
			</div>

			<div class="Mb-12">
				<input class="easyui-datebox" id="createTime" name="createTime"
					data-options="required:true" value="3/7/2017"
					style="width: 193px; height: 30px;"> <input
					class="easyui-switchbutton" style="width: 100px;"
					data-options="onText:'成功消息',offText:'失败消息'">
			</div>
			<div class="Mb-12">
				<table id="dg">
				</table>
			</div>

		</div>
	</div>

</body>
</html>