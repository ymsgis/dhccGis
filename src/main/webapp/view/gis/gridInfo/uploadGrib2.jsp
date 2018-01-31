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


<script src="${contextPath}/scripts/gridview/importantPoint.js"></script>
<script src="${contextPath}/scripts/config/config.js"></script>
<script type="text/javascript">

$(document).ready(function(){
	
	//设置时次的随动
	var hour = new Date().getHours();
	if(hour >= 12)
		$('#timeType').combobox('setValue','20');
	
	
})

</script>

</head>
<body class="page pgaut">
	<div id="rightPane">
		<div class="mLeftNrBdBox P12" id="default-example" data-collapse>
			<div class="qhTit taTitb">
			<ul class="bt ">
				<span class="hover">提交国家局</span>
			</ul>
		</div>	
			<div class="Mb-12">
				<div class="Mt-12">
					<div class="formBx">
<!-- 					<span class="txLabel">文档日期：</span> -->
						 <input class="easyui-datebox"
							id="createTime" name="createTime" data-options="required:true"
							value="3/7/2017" style="width: 193px; height: 30px;">  <select
							class="easyui-combobox" id="timeType" name="timeType"
							style="width: 50px;" editable="false">
							<option value="8">08</option>
							<option value="20">20</option>
						</select>
						<a class="easyui-linkbutton submit btnBxb" icon="icon-search"
						onclick="uploadGrib2()" >提交</a>

					</div>
					
				</div>
			</div>
		</div>

	</div>


</body>
</html>