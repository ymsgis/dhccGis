<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport"
	content="initial-scale=1, maximum-scale=1,user-scalable=no">
<title>宁夏智能网格预报业务系统</title>
<%-- <link rel="stylesheet" href="${contextPath}/css/index/css/layout.css" /> --%>
<link rel="stylesheet" href="${contextPath}/css/index/css/main.css" />
<style type="text/css">
.ribbon {
	top:-25px;
	overflow: visible;
	z-index: 9999;
}
.ribbon li {
	text-align: center;
	float: left;
}
.ribbon span {
	line-height:40px;
	margin-left:2px;
}
.ribbon .menu-list {
	display:none;
	z-index: 999;
	position: absolute;
	margin-left: -40px;
	top:40px;
}
.menu-list li {
	float: none;
	white-space: nowrap;
}
.menu-list li a:link {
	float: none;
	display:inline;	
}
.menu-list span {
	border: 2px outset silver;
	display: block;
	line-height: 30px;
	margin-top:1px;
}
.menu-list a {
	display:inline-block;
	margin: 0;
}
#contentPane {
	position:absolute;
	left:0;
	top:0;
	bottom:0;
	border-width:1px;
	right:0;
	margin: 0;
}
</style>
<script>
	var dojoConfig = {
		parseOnLoad : true
	};
</script>
<script src="${contextPath}/scripts/jquery.min.js"></script>

<script>
jQuery(document).ready(init);
	function init() {
		
		$('#menubar a').click(function() {			
			var m = $(this);			
			var url = m.attr('href');
			var mid = m[0].id;
			switch(mid) {
			case 'gridView':
				window.gisOptView = 'gridView';break;
			case 'disasterzone':
				window.gisOptView = 'disasterzone';break;
			case 'stationforecastview':
				window.gisOptView = 'stationforecastview';break;
			default:
				delete window.gisOptView;
			}
			if(window.gisOptView) {
				openRightView();
				return false;
			}
			if(!url || url=='#') {
				return false;
			}
			if(url=='wait') {
				alert('提示:功能开发中...');
				
				return false;
			}
			//removeClass() 方法从被选元素移除一个或多个类。
			$('#menubar a').removeClass('active');
			m.addClass('active');
			$('#contentPane').attr('src', url);	
			return false;
		});		
		
		//当鼠标指针穿过元素时，会发生 mouseenter事件。该事件大多数时候会与 mouseleave 事件一起使用。
		$('#menubar > li ').mouseenter(function() {			
			var m = $(this);
			//fadeOut()方法使用淡出效果来隐藏被选元素，假如该元素是隐藏的。
			$('#menubar .menu-list').fadeOut();
			var list = m.children('.menu-list');
			//fadeIn()使用淡入效果来显示被选元素，假如该元素是隐藏的。
			list.fadeIn();
		});
		//鼠标离开元素触发事件
		$('#menubar').mouseleave(function() {
			$('#menubar .menu-list').fadeOut();
		});
		
		//显示
		function openRightView() {
			var pane = $('#contentPane');
			var contentUrl = pane.attr('src');
			if(contentUrl.indexOf('/gridview/main')==-1) {
				pane.attr('src', '${contextPath}/gridview/main?showRight=true');
				return;
			}
			var cwin = pane[0].contentWindow;
			cwin.showRightPane();
		}
		
		
		//显示预警产品页面
		function openWarningProdView() {
			alert("1")
			var pane = $('#contentPane');
			var contentUrl = pane.attr('src');
			if(contentUrl.indexOf('/gridview/main')==7) {
				pane.attr('src', '${contextPath}/gridview/main?showRight=true');
				return;
			}
			var cwin = pane[0].contentWindow;
			cwin.showRightPane();
		}
        $('#contentPane').attr('src', '${contextPath}/gridview/main');
	}
	//dojo.addOnLoad(init);
</script>
</head>

<body>
<div id="header" style="overflow:visible;">
			<div class="title_icon"></div>
			<h2>宁夏智能网格化预报业务系统</h2>
			 <ul id="menubar" class="ribbon">
<!-- 			 <li><a  href="#"><span>实况查看</span></a> -->
<!-- 			 	<ul class="menu-list"> -->
<!-- <!-- 					<li><a href="#"><span>国家格点实况</span></a></li> --> -->
<!-- <!-- 					<li><a href="#"><span>宁夏格点实况</span></a></li> --> -->
<!-- <!-- 			 		<li><a href="#"><span>站点实况</span></a></li>			 		 --> -->
<!-- 					<li><a id="stationforecastview" href="#"><span>站点</span></a></li> -->
<!-- 				</ul> -->
<!-- 			 </li> -->
			 <li><a id="gridView" href="#"><span>格点预报</span></a></li>
				<li><a href="#"><span>站点预报</span></a>
					<ul class="menu-list">
						<li><a href="${contextPath}/forecast/forecastView"><span>文字预报</span></a></li>
						<li><a id="stationforecastview" href="#"><span>站点预报查看</span></a></li>
<%-- 						<li><a href="${contextPath}/forecast/gridToCodeForecast/rulesTest"><span>规则测试</span></a></li> --%>
					</ul>				
				</li>
						 
<!-- 				<li><a href="#"><span>数据采集</span></a> -->
<!-- 					<ul class="menu-list"> -->
<%-- 						<li><a href="${contextPath}/collect/collectConnect"><span>采集连接</span></a></li> --%>
<%-- 						<li><a href="${contextPath}/collect/collectInfo"><span>采集任务</span></a></li> --%>
<%-- 						<li><a href="${contextPath}/collect/collectHistory"><span>采集日志</span></a></li> --%>
<!-- 					</ul> -->
<!-- 				</li> -->
				<li><a id="disasterzone" href="#"><span>灾害落区</span></a></li>
					
				<li><a href="#"><span>检验评估</span></a>
					<ul class="menu-list">
						<li><a href="${contextPath}/check/checkAssessmentTmp"><span>温度检验</span></a></li>
						<li><a href="${contextPath}/check/checkAssessmentHumidity"><span>湿度检验</span></a></li>
					</ul>
				</li>	
				<li><a href="#"><span>系统管理</span></a>
					<ul class="menu-list">
						<li><a href="${contextPath}/config/publishPathConfig/edit"><span>发布路径配置</span></a></li>
						<li><a href="wait"><span>偏差订正配置</span></a></li>
						<li><a  id="processView" href="#"><span>流程监控</span></a></li>
					</ul>				
				</li>			
			</ul>
		</div>
		<div id="mainWindow">
			<iframe id="contentPane" name="contentPane" width="100%" height="100%" style="border:0;"></iframe>
		</div>
<!-- 		<div id="footer" data-dojo-type="dijit.layout.ContentPane" -->
<!-- 			data-dojo-props="region:'bottom'"> -->
<!-- 			<span id="dataSource"> </span> -->
<!-- 		</div> -->
</body>

</html>
