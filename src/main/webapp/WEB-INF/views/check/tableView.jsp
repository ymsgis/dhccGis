<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>检验评估</title>
<%-- <link rel="stylesheet" href="${contextPath}/css/index/css/check.css" /> --%>
<link rel="stylesheet" href="${contextPath}/css/index/css/default.css" />
<link rel="stylesheet" href="${euiPath}/themes/icon.css" />
<link rel="stylesheet" href="${euiPath}/themes/bootstrap/easyui.css" />
<script type="text/javascript" src="${echartsPath}/echarts.min.js"></script>
<script type="text/javascript" src="${contextPath}/scripts/jquery.min.js"></script>
<script type="text/javascript" src="${euiPath}/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${contextPath}/scripts/check/check.js"></script>
<script type="text/javascript">
var _tmpPath = '${contextPath}';
var _rootPath = '${contextPath}';
</script>
<script type="text/javascript">
var _erhPath = '${contextPath}';
</script>
<script type="text/javascript">
	var _menus = {
		"menus" : [ {
			"menuid" : "1",
			"menuname" : "时段气温",
			"menus" : [{
				"menuid" : "11",
				"menuname" : "气温逐日单时效",
				"url" : "checkAssessmentTmp/normal"
			}, {
				"menuid" : "12",
				"menuname" : "气温时段多时效",
				"url" : "checkAssessmentTmp/normalMul"
			}]
		}, {
			"menuid" : "2",
			"menuname" : "最高气温",
			"menus" : [ {
				"menuid" : "22",
				"menuname" : "最高气温逐日单时效",
				"url" : "checkTmax/normal"
			}, {
				"menuid" : "23",
				"menuname" : "最高气温时段多时效",
				"url" : "checkTmax/normalMul"
			}]
		}, {
			"menuid" : "3",
			"menuname" : "最低气温",
			"menus" : [ {
				"menuid" : "32",
				"menuname" : "最低气温逐日单时效",
				"url" : "checkTmin/normal"
			}, {
				"menuid" : "33",
				"menuname" : "最低气温时段多时效",
				"url" : "checkTmin/normalMul"
			}]
		},{
			"menuid" : "4",
			"menuname" : "时段相对湿度",
			"menus" : [ {
				"menuid" : "42",
				"menuname" : "湿度逐日单时效",
				"url" : "checkErh/normal"
			}, {
				"menuid" : "43",
				"menuname" : "湿度时段多时效",
				"url" : "checkErh/normalMul"
			}]
		},{
			"menuid" : "5",
			"menuname" : "最大相对湿度",
			"menus" : [ {
				"menuid" : "52",
				"menuname" : "最大湿度逐日单时效",
				"url" : "checkErha/normal"
			}, {
				"menuid" : "53",
				"menuname" : "最大湿度时段多时效",
				"url" : "checkErha/normalMul"
			}]
		},{
			"menuid" : "6",
			"menuname" : "最小相对湿度",
			"menus" : [ {
				"menuid" : "62",
				"menuname" : "最小湿度逐日单时效",
				"url" : "checkErhi/normal"
			}, {
				"menuid" : "63",
				"menuname" : "最小湿度时段多时效",
				"url" : "checkErhi/normalMul"
			}]
		},{
			"menuid" : "7",
			"menuname" : "时段降水",
			"menus" : [ {
				"menuid" : "71",
				"menuname" : "降水单时次",
				"child" : [{
					"menuid" : "711",
					"menuname" : "降水单时次不分级",
					"url" : "rainfall/normal"
				}, {
					"menuid" : "712",
					"menuname" : "降水单时次分级",
					"url" : "rainfall/classify"
				}]
			}, {
				"menuid" : "72",
				"menuname" : "降水多时效",
				"child" : [{
					"menuid" : "721",
					"menuname" : "降水多时效不分级",
					"url" : "rainfall/normalMul"
				}, {
					"menuid" : "722",
					"menuname" : "降水多时效分级",
					"url" : "rainfall/classifyMul"
				}]
			}]
		},
		{
			"menuid" : "8",
			"menuname" : "风检验",
			"menus" : [{
				"menuid" : "81",
				"menuname" : "风向检验",
				"child" : [{
					"menuid" : "811",
					"menuname" : "风向单时效",
					"url" : "windDir/normal"
				}, {
					"menuid" : "812",
					"menuname" : "风向时段多时效",
					"url" : "windDir/average"
				}]
			}, {
				"menuid" : "82",
				"menuname" : "风速检验",
				"child" : [{
					"menuid" : "821",
					"menuname" : "风速单时效",
					"url" : "windSpeed/normal"
				}, {
					"menuid" : "822",
					"menuname" : "风速检验平均结果",
					"url" : "windSpeed/average"
				}]
			},]
		},]
	};
</script>
</head>
<body class="easyui-layout" style="overflow-y: hidden" 
	fit="true" scroll="no">
	<div region="west" split="true"  title="格点要素" style="width:160px;" id="west">
			<div id="nav">
		<!--  导航内容 -->
				
			</div>

    </div>
    <div id="mainPanle" region="center" style="background: #eee; overflow-y:hidden; padding: 0; margin: 0;">
        <div id="tabs" class="easyui-tabs"  fit="true" border="false" >
			<div title="欢迎使用" style="padding:20px;overflow:hidden; color:red; " >
				
			</div>
		</div>
    </div>
    
    <div data-options="region:'east',split:true" title="图表" style="width:45%;">
    	<div class="DivCheck" id="tmpEchart" style="width: 100%; height: 500px; border: 0px solid #ccc"></div>
    </div>
</body>
<script type="text/javascript" src="${contextPath}/scripts/check/checkErhi.js"></script>
<script type="text/javascript" src="${contextPath}/scripts/check/checkErha.js"></script>
<script type="text/javascript" src="${contextPath}/scripts/check/checkErh.js"></script>
<script type="text/javascript" src="${contextPath}/scripts/check/checkTmin.js"></script>
<script type="text/javascript" src="${contextPath}/scripts/check/checkTmax.js"></script>
<script type="text/javascript" src="${contextPath}/scripts/check/checkAssessmentTmp.js"></script>
<script type="text/javascript" src="${contextPath}/scripts/check/checkAssessmentHumidity.js"></script>
<script type="text/javascript" src="${contextPath}/scripts/check/checkRainfall.js"></script>
<script type="text/javascript" src="${contextPath}/scripts/check/checkWindDir.js"></script>
<script type="text/javascript" src="${contextPath}/scripts/check/checkWindSpeed.js"></script>
</html>