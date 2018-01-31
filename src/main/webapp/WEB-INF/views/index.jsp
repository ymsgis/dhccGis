<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport"
	content="initial-scale=1, maximum-scale=1,user-scalable=no">
<title>宁夏智能网格预报业务系统</title>
<link href="${contextPath}/css/public.css" rel="stylesheet" title=""
	type="text/css" />
<link href="${contextPath}/css/index.css" rel="stylesheet" title=""
	type="text/css" />
<link href="${contextPath}/css/iconfont.css" rel="stylesheet" title=""
	type="text/css" />
<link title="blue" href="${contextPath}/css/skinBlue.css"
	rel="stylesheet" type="text/css" role="skin" />
<link title="green" href="${contextPath}/css/skinGreen.css"
	rel="stylesheet" type="text/css" role="skin" disabled="disabled" />
<link title="orange" href="${contextPath}/css/skinOrange.css"
	rel="stylesheet" type="text/css" role="skin" disabled="disabled" />
<link rel="stylesheet" href="${contextPath}/css/index/css/main.css" />
<style type="text/css">
#contentPane {
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	border-width: 1px;
	right: 0;
	margin: 0;
}
</style>
<script>
	var dojoConfig = {
		parseOnLoad : true
	};
</script>
<script src="${contextPath}/scripts/config/config.js"></script>
<script src="${contextPath}/scripts/jquery.min.js"></script>
<script src="${contextPath}/scripts/jquery-browser.js"></script>
<script src="${contextPath}/scripts/jquery.cookie.js"></script>
<script src="${contextPath}/scripts/common/skins.js"></script>
<script src="${contextPath}/scripts/gridview/websocket.js"></script>
<script src="${contextPath}/scripts/index/changeMenu.js"></script>
<script src="${contextPath}/scripts/config/global.js"></script>
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
			case 'gridLiveStation':
				window.gisOptView = 'gridLiveStation';break;
			case 'gridStationview':
				window.gisOptView = 'gridStationview';break;
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
		var loginName = "${sessionScope['user'].loginName}";
		var orgranId = "${sessionScope['user'].organGuid}";
		var userId = "${sessionScope['user'].userGuid}";
		Global.user.oraganId = orgranId;
		Global.user.loginName = loginName;
		Global.user.userId = userId;
		if(orgranId == _provinceOraganId)
			Global.user.province = true;
		console.info(Global,orgranId,_provinceOraganId);
		localStorage.setItem("current_user", JSON.stringify(Global));
		document.cookie="user="+JSON.stringify(Global);
		
		$.get(_menuUrl+'loginName='+loginName,function(data){
			var allmenu = [];
			$("a[data-menu]").each(function(){
				allmenu.push($(this).data('menu'));
			});
			for(var i=0; i< data.menu.length; i++){
				removeArrayElement(allmenu, function(item){return item==data.menu[i].moduleName;})
				for(var j=0; j<data.menu[i].subMenu.length; j++){
					removeArrayElement(allmenu, function(item){return item==data.menu[i].subMenu[j].moduleName;})
				}
			}
			for (var i = 0; i < allmenu.length; i++) {
				$("a[data-menu='"+allmenu[i]+"']").parent().remove();
			}
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
		
		function removeArrayElement(arr, compareFunc){
			for (var i = arr.length - 1; i >= 0; i--) {
				if(compareFunc(arr[i])){
					arr.splice(i, 1);
				}
			}
		}
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
        
        $('#clientMessage').click(function(){
        	var pane = $('#contentPane');
        	$("#contentPane")[0].contentWindow.showClientMessage();
        })
	}
	
	function showLiveInit(){
		$("#gridLiveStation").click();
	}
	
	function loadStation(){
		$("#contentPane")[0].contentWindow.NxgridRealtime.loadStation();
	}
	
	
	
	//changeMenu(name);
</script>
</head>

<body>
	<div class="header">
		<input type="hidden" id="hd_loginName"
			value="${sessionScope['user'].loginName}"> <span
			class="ilogo"></span>
		<ul class='topRightUsNav'>
			<li><a href='gridview/logout' class="Chf" alt="退出" title="退出"><i
					class="iconfont icon-tuichu-copy Chf"></i></a></li>
			<li class='yxj iskin'><a href='#' class="Chf" alt="皮肤"
				title="皮肤"><i class="iconfont icon-skin Chf"></i></a>
				<ul class="changecolor">
					<li id="blue"><a href='#' class="Ch4">科技蓝</a></li>
					<li id="green"><a href='#' class="Ch4">护眼绿</a></li>
				</ul></li>
			<li class='yxj imsg'><span class="dot" style="display: none;"></span>
				<a id="clientMessage"   class="Chf" alt="消息" title="消息"><i
					class="iconfont icon-tongbaoyujing Chf"></i></a>
				</li>
			<!-- 	        <li class='yxj names' style="width:auto;"> -->
			<%-- 	            	<a class="Chf us "   href='#'><i class="iconfont icoFl icon-weifenxiaopcjiemianzhuanhuan Chf"></i><span class="Chf">${sessionScope['user'].userName}</span><i class="iconfont icoFr icon-scroll-top Chf"></i></a> --%>
			<!-- 	                <ul> -->
			<!-- 	                	<li><a href='#'>修改密码</a></li> -->
			<!-- 	                    <li><a href='#'>修改密码</a></li> -->
			<!-- 	                </ul> -->
			<!-- 	        </li> -->

			<li class='yxj names' style="width: auto;"><a class="Chf us "
				href='#'><span class="Chf">${sessionScope['user'].userName}</span></a>

			</li>
		</ul>

		<!--导航菜单开始-->
		<div class='menuNav'>
			<ul id="menubar" class='tNav'>

				<li><a href='#' data-menu="天气实况"><i
						class="iconfont icon-fengxianceping01"></i>天气实况</a>
					<ul>
						<li><a id="gridLiveStation" href='#' data-menu="国家格点实况">国家格点实况</a></li>
						<li><a href='#' data-menu="宁夏格点实况">宁夏格点实况</a></li>
						<li><a id="gridStationview" href='#'  data-menu="站点实况">站点实况</a></li>
					</ul></li>
				<li><a id="gridView" href='#'><i
						class="iconfont icon-zhandianguanli" data-menu="格点落区"></i>格点落区</a></li>
				<li><a href='#'><i class="iconfont icon-fengxianceping01"
						data-menu="站点预报"></i>站点预报</a>
					<ul>
						<li><a href='${contextPath}/forecast/forecastView'
							data-menu="文字预报">文字预报</a></li>
						<li><a id="stationforecastview" href='#' data-menu="站点预报查看">站点预报查看</a></li>
					</ul></li>
				<!-- 				<li><a href="#"><span>数据采集</span></a> -->
				<!-- 					<ul class="menu-list"> -->
				<%-- 						<li><a href="${contextPath}/collect/collectConnect"><span>采集连接</span></a></li> --%>
				<%-- 						<li><a href="${contextPath}/collect/collectInfo"><span>采集任务</span></a></li> --%>
				<%-- 						<li><a href="${contextPath}/collect/collectHistory"><span>采集日志</span></a></li> --%>
				<!-- 					</ul> -->
				<!-- 				</li> -->
				<li><a id="disasterzone" href='#' data-menu="灾害预警"><i
						class="iconfont icon-baogao2"></i>灾害预警</a></li>
				<li><a href="#" data-menu="检验评估"><i
						class="iconfont icon-xitongguanli"></i>检验评估</a>
					<ul>
						<%-- 	                    <li><a href="${contextPath}/check/checkAssessmentTmp" >温度检验</a></li> --%>
						<%-- 	                    <li><a href="${contextPath}/check/checkAssessmentHumidity" >湿度检验</a></li> --%>
						<li><a href="${contextPath}/check/checkView" data-menu="格点要素">格点要素</a></li>
						<li><a href="#" data-menu="关键点要素">关键点要素</a></li>
						<li><a href="#" data-menu="预警信号">预警信号</a></li>
						<li><a href="#" data-menu="灾害落区">灾害落区</a></li>
					</ul></li>
				<li><a href="#" data-menu="系统管理"><i
						class="iconfont icon-xitongguanli"></i>系统管理</a>
					<ul>
						<li><a href="${contextPath}/config/publishPathConfig/edit"
							data-menu="发布路径配置">发布路径配置</a></li>
						<li><a href="wait" data-menu="偏差订正配置">偏差订正配置</a></li>
						<li><a id="processView" href="#" data-menu="流程监控"><span>流程监控</span></a></li>
					</ul></li>
			</ul>
		</div>

	</div>
	<div id="mainWindow" class="HMainBx" style="top: 56px;">
		<iframe id="contentPane" name="contentPane" width="100%" height="100%"
			style="border: 0;"></iframe>
	</div>

</body>

</html>
