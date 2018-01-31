<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>预报查看</title>
<link rel="stylesheet" href="${euiPath}/themes/icon.css" />
<link rel="stylesheet" href="${euiPath}/themes/default/easyui-adv.css" />
<link href="${contextPath}/css/public.css" rel="stylesheet" type="text/css" />
<link href="${contextPath}/css/page.css" rel="stylesheet" type="text/css" />
<link href="${contextPath}/css/iconfont.css" rel="stylesheet" type="text/css" />
<link title="blue" href="${contextPath}/css/skinBlue.css" rel="stylesheet" type="text/css" role="skin"/>
<link title="green" href="${contextPath}/css/skinGreen.css" rel="stylesheet" type="text/css" role="skin" disabled="disabled"/>
<link title="orange" href="${contextPath}/css/skinOrange.css" rel="stylesheet" type="text/css" role="skin" disabled="disabled"/>
<link rel="stylesheet" href="${contextPath}/css/forecastView/view.css" />
<style type="text/css">
#btn-group .panel-body {
	padding-left: 12px;
	border-bottom: 0px;
}
</style>
<script type="text/javascript" src="${contextPath}/scripts/jquery.min.js"></script>
<script src="${contextPath}/scripts/jquery.cookie.js"></script>
<script src="${contextPath}/scripts/common/skins.js"></script>
<script type="text/javascript" src="${euiPath}/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
$(function() {
	$('#btn-group .btn').click(function() {
		var btn = $(this);
		var url = btn.attr('href');
		$('#viewFrame').attr('src', url);
		return false;
	});
});
</script>
</head>

<body class="page pgaut" title="">
	<div class="mLeftBox Br-s-1l BhFa"  id="leftMainWindows" style="display: ;top: 0px;">
			<div class="mLeftNrBdBox P12 easyui-accordion" id="btn-group" style="padding:0px;">
		        <div class="Mb-12" title="短期预报">
		        	<div class="YBbtnBx Mt-6">
						<a class="btn Czs W35b" href="${contextPath}/forecast/situationForecast"><div>形势预报</div></a>		        	
						<a class="btn Czs W35b" href="${contextPath}/forecast/stationStermForecast/cityView"><div>五市公众预报</div></a>			        	
						<a class="btn Czs W35b" href="${contextPath}/forecast/stationStermForecast"><div>市县精细化预报</div></a>								
						<a class="btn Czs W35b" href="${contextPath}/forecast/villageFineForecast"><div>村镇精细化预报</div></a>
						<a class="btn Czs W35b" href="${contextPath}/forecast/televisionForecast"><div>电视预报</div></a>						
						<a class="btn Czs W35b" href="${contextPath}/forecast/touristForecast"><div>旅游预报</div></a>						
						<a class="btn Czs W35b" href="${contextPath}/forecast/scenicSpotForecast"><div>景区预报</div></a>        	
						<a class="btn Czs W35b" href="${contextPath}/forecast/stationHumidityForecast"><div>湿度预报</div></a>
						<a class="btn Czs W35b" href="${contextPath}/forecast/smsForecast"><div>短信预报</div></a>
			<!-- 			<a class="btn Czs W35b disabled" href=""><div>市级指导预报</div></a>
						<a class="btn Czs W35b disabled" href=""><div>短期精细化预报</div></a>						
						<a class="btn Czs W35b disabled" href=""><div>天气公报</div></a> -->
		        	</div>
		        </div>
		        <div class="Mb-12" title="中期预报">
		        	<div class="YBbtnBx Mt-6">
						<a class="btn Czs W35b" href="${contextPath}/forecast/stationH24Forecast"><div>滚动预报</div></a>		
			<!-- 			<a class="btn Czs W35b disabled" href=""><div>中期指导预报</div></a>				
						<a class="btn Czs W35b disabled" href=""><div>趋势预报</div></a>	 -->
		        	</div>
		        </div>
		        <div class="Mb-12" title="长期预报">
		        	<div class="YBbtnBx Mt-6">
		        	</div>
		        </div>
		        <div class="Mb-12" title="短时预报">
		        	<div class="YBbtnBx Mt-6">
		<!-- 			<a class="btn Czs W35b disabled" href=""><div>临近预报</div></a>
					<a class="btn Czs W35b disabled" href=""><div>短时预报</div></a>
					<a class="btn Czs W35b disabled" href=""><div>雷电潜势预报</div></a>
					<a class="btn Czs W35b disabled" href=""><div>风险预报预警产品</div></a>					 -->		        			        		
		        	</div>
		        </div>
		    </div>	
	</div>
	
	<div class="mainNrQ  mLyBox BhFf  " style="overflow:hidden;top:0px;">
		<iframe id="viewFrame" style="width:100%;height:100%;border:0px;padding:0px;margin:0px;"></iframe>
	</div>
</body>
</html>
