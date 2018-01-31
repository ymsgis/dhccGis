<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="../include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" href="${arcgisPath}/dijit/themes/claro/claro.css">
<link rel="stylesheet" href="${arcgisPath}/esri/css/esri.css" />
<link rel="stylesheet" href="${contextPath}/css/index/css/layout.css" />
<link rel="stylesheet" href="${contextPath}/css/index/css/main.css" />
<link rel="stylesheet" href="${euiPath}/themes/bootstrap/easyui.css" />
<link rel="stylesheet" href="${euiPath}/themes/icon.css" />
<script src="${contextPath}/scripts/jquery.min.js"></script>
<script type="text/javascript" src="${euiPath}/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${euiPath}/jquery.color.min.js"></script>
<script type="text/javascript"
	src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${echartsPath}/echarts.min.js"></script>
<script src="${arcgisPath}/init.js"></script>
<script src="${contextPath}/scripts/config/config.js"></script>
<script src="${contextPath}/scripts/config/weatherLegend.js"></script>
<script src="${contextPath}/scripts/gisCommon/globle.js"></script>
<script src="${contextPath}/scripts/gisCommon/map.js"></script>
<script src="${contextPath}/scripts/gisCommon/tianditu.js"></script>
<script src="${contextPath}/scripts/gisCommon/navToolbar.js"></script>
<script src="${contextPath}/scripts/gisCommon/utilGrid.js"></script>
<script src="${contextPath}/scripts/gisCommon/gridTool.js"></script>
<script src="${contextPath}/scripts/gisCommon/mapEvent.js"></script>
<script src="${contextPath}/scripts/gisCommon/weatherLegend.js"></script>
<script src="${contextPath}/scripts/grid/gridLoad.js"></script>
<script src="${contextPath}/scripts/gisCommon/admiAreaEditTools.js"></script>
<script src="${contextPath}/scripts/gisCommon/editToolWind.js"></script>
<script src="${contextPath}/scripts/gisCommon/locationAreaEditTool.js"></script>
<script src="${contextPath}/scripts/gisCommon/sealEditTool.js"></script>

<script src="${contextPath}/scripts/grid/gridColor.js"></script>
<script src="${contextPath}/scripts/grid/gridType.js"></script>
<script src="${contextPath}/scripts/grid/gridSave.js"></script>
<script src="${contextPath}/scripts/grid/gridEdit.js"></script>
<script src="${contextPath}/scripts/grid/gridDraw.js"></script>
<script src="${contextPath}/scripts/gisCommon/bufferanalyse.js"></script>
<script src="${contextPath}/scripts/gisCommon/symbolTool.js"></script>
<script src="${contextPath}/scripts/grid/gridTrendAll.js"></script>
<script src="${contextPath}/scripts/gridview/realTimeLoad.js"></script>
<script type="text/javascript">
	var _basePath = '${contextPath}';
</script>
<!--  new page -->
<link href="${contextPath}/css/public.css" rel="stylesheet" title=""
	type="text/css" />
<link href="${contextPath}/css/page.css" rel="stylesheet" title=""
	type="text/css" />
<link href="${contextPath}/css/iconfont.css" rel="stylesheet" title=""
	type="text/css" />
<link title="blue" href="${contextPath}/css/skinBlue.css"
	rel="stylesheet" type="text/css" />
<link title="green" href="${contextPath}/css/skinGreen.css"
	rel="stylesheet" type="text/css" disabled="disabled" />
<link title="orange" href="${contextPath}/css/skinOrange.css"
	rel="stylesheet" type="text/css" disabled="disabled" />

<script src="${contextPath}/scripts/jquery-browser.js"
	type="text/javascript"></script>
<script src="${contextPath}/scripts/jquery.collapse.js"></script>
<script src="${contextPath}/scripts/gisCommon/gridInfo.js"></script>
<script src="${contextPath}/scripts/gridview/importantPoint.js"></script>
<script src="${contextPath}/scripts/gridview/websocket.js"></script>
<style type="text/css">
#leftView {
	position: absolute;
	right: 0px;
	left: auto;
	top: 0px;
	bottom: 0px; //
	height: auto;
	z-index: 999;
}

#leftView .panel-body {
	overflow: hidden;
}
</style>
<script>
	var dojoConfig = {
		parseOnLoad : true
	};
</script>
<script type="text/javascript">
	window.showRightPane = function(options) {
		$("#right").css("display", "block");
		//利用localStorage传值
		var pageviewVal = window.gisOptView || window.parent.gisOptView;
		var rpanel = $('#right');
		if (options) {
			var url = '${contextPath}/' + options.url;
			var urlval = $('#rightPanel').attr('src', url);
			var objs = document.getElementById("right");
			var ow = options.width;
			if (ow) {
				rpanel.width(ow);
			}
		} else if (pageviewVal == "gridView") {
			$('#rightPanel').attr('src',
					'${contextPath}/view/gis/gridInfo/gridPrediction.jsp');
			var objs = document.getElementById("right");
			objs.style.width = "100px"
		} else if (pageviewVal == "disasterzone") {
			var urlval = $('#rightPanel').attr('src',
					'${contextPath}/view/gis/disasterzone/disasterzone.jsp');
			var objs = document.getElementById("right");
			objs.style.width = "605px"
		} else if (pageviewVal == "stationforecastview") {
			var urlval = $('#rightPanel').attr('src',
					'${contextPath}/view/gis/forecast/stationforecastview.jsp');
			var objs = document.getElementById("right");
			objs.style.width = "150px"
		} else if (pageviewVal == "gridLiveStation") {
			$('#rightPanel').attr('src',
					'${contextPath}/view/gis/gridInfo/liveShow.jsp');
			var objs = document.getElementById("right");
			objs.style.width = "300px"
		} else if(pageviewVal == "gridStationview"){
			$('#rightPanel').attr('src',
			'${contextPath}/view/gis/gridInfo/stationShow.jsp');
	var objs = document.getElementById("right");
	objs.style.width = "300px"
		}
	};
	function hidePagePanel(panelEl) {
		var $view = panelEl ? $(panelEl) : $(this).panel('panel').parent();
		$view.slideUp();
		return false;
	}
	function expandPagePanel(panelEl) {
		var btn = $(this);
		panelEl = panelEl || btn.attr('rel');
		var $view = panelEl ? $(panelEl) : btn.panel('panel').parent();
		var view = $view[0];
		if (!view._expanded) {
			var expandSize = $view.attr('expandSize');
			view._origW = $view.width();
			$view.width(expandSize);
			view._expanded = true;
			btn.linkbutton({
				iconCls : 'icon-redo'
			});
		} else {
			$view.width(view._origW);
			delete view._expanded;
			btn.linkbutton({
				iconCls : 'icon-undo'
			});
		}
	}
	$(function() {
		$('#leftView').hide();
	});
	window.showPagePane = function(options) {
		options = options || {};
		var panelEl = options.panelEl;
		var $view = $(panelEl);
		var ow = options.width;
		if (ow) {
			$view.width(ow);
		}
		$view.css("display", "block");
		var url = options.url;
		if (!url)
			return;
		var $pframe = $view.find('iframe');
		url = '${contextPath}/' + url;
		var urlval = $pframe.attr('src', url);
	};
	dojo.require("esri/map");
	dojo.require("esri/config");
	// dojo.require("esri/layers/WebTiledLayer");
	dojo.require("esri/dijit/LayerList");
	dojo.require("esri/layers/ArcGISDynamicMapServiceLayer");
	dojo.require("esri/layers/FeatureLayer");
	// dojo.require("esri/layers/ImageParameters"),
	dojo.require("dojo/parser");
	dojo.require("esri/dijit/Scalebar");
	// dojo.require("esri/dijit/Legend"); 
	dojo.require("dojo/_base/array");
	// dojo.require("dijit/layout/ContentPane");
	// dojo.require("dijit/layout/BorderContainer"); 
	dojo.require("dojo/domReady!");
	dojo.require("esri/toolbars/navigation");
	dojo.require("esri/toolbars/draw");
	dojo.require("dojo/on");
	dojo.require("dojo/parser");
	dojo.require("dijit/registry");
	dojo.require("dijit/Toolbar");
	dojo.require("dijit/form/Button");
	dojo.require("esri/dijit/Measurement");
	dojo.require("esri/graphic");
	dojo.require("esri/Color");
	dojo.require("esri/graphic");
	dojo.require("esri/InfoTemplate");
	dojo.require("esri/layers/GraphicsLayer");
	dojo.require("esri/geometry/Point");
	dojo.require("esri/toolbars/draw");
	dojo.require("esri/symbols/SimpleFillSymbol");
	dojo.require("esri/symbols/SimpleLineSymbol");
	dojo.require("esri/symbols/SimpleMarkerSymbol");
	dojo.require("esri/symbols/PictureFillSymbol");
	dojo.require("esri/symbols/PictureMarkerSymbol");
	dojo.require("esri/tasks/query");
	dojo.require("esri/graphic");

	var map, toolbar, symbol, testVar1, testVar2, gridGraphicLayer, renderLayer, disasterGraphicLayer;
	function init() {

		map = new esri.Map("map", {
			sliderOrientation : "horizontal",
			zoom : 9,
			logo : false
		});

		//clear the localStorage
		localStorage.clear();
		//Tianditu.loadTianditu(map);
		myTiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer(
				NxgridConfig.MapConfig.nxmapUrl);
		map.addLayer(myTiledMapServiceLayer);
		// 定位到北京
		gridGraphicLayer = new esri.layers.GraphicsLayer();
		renderLayer = new esri.layers.GraphicsLayer();

		//gridColorGraphicLayer = new esri.layers.GraphicsLayer();
		//map.addLayer(gridColorGraphicLayer);
		map.addLayer(gridGraphicLayer);
		map.addLayer(renderLayer);

		//绘制并添加灾害性落区图层
		disasterGraphicLayer = new esri.layers.GraphicsLayer();
		map.addLayer(disasterGraphicLayer);

		//落区绘制
		NxgridConfig.CommonToolConfig.locationdrawtool = new esri.toolbars.Draw(
				map, {
					showTooltips : true
				});
		NxgridConfig.CommonToolConfig.locationdrawtool.on("draw-end",
				com.nxgrid.giscommon.locationEditTools.locationDrawComplete);

		//盖章
		/* NxgridConfig.CommonToolConfig.sealDrawTool=new esri.toolbars.Draw(map, {showTooltips: true});
		NxgridConfig.CommonToolConfig.sealDrawTool.on("draw-end",sealDrawComplete); */

		//风编辑操作  划线
		NxgridConfig.CommonToolConfig.drawToolLineWind = new esri.toolbars.Draw(
				map, {
					showTooltips : true
				});
		NxgridConfig.CommonToolConfig.drawToolLineWind.on("draw-end",
				com.nxgrid.giscommon.editToolWind.windLineDrawComplete);

		//风编辑操作  划落区
		NxgridConfig.CommonToolConfig.drawToolAreaWind = new esri.toolbars.Draw(
				map, {
					showTooltips : true
				});
		NxgridConfig.CommonToolConfig.drawToolAreaWind.on("draw-end",
				com.nxgrid.giscommon.editToolWind.windAreaDrawComplete);

		//风编辑操作  划落区之后划线
		NxgridConfig.CommonToolConfig.drawToolAreaLineWind = new esri.toolbars.Draw(
				map, {
					showTooltips : true
				});
		NxgridConfig.CommonToolConfig.drawToolAreaLineWind.on("draw-end",
				com.nxgrid.giscommon.editToolWind.windAreaLineDrawComplete);

		var measure = document.getElementById('mea');

		var measureDiv = document.getElementById("measureDiv");
		navToolbar.loadTool(map, measureDiv);

		var del = document.getElementById('dele');
		var rightPanel = document.getElementById('right');
		var WarningPanel = document.getElementById('warningproductsDiv');
		var mapPanel = document.getElementById('map');
		var process = document.getElementById('process');

		var _PDOC = parent.document;

		var showRight = '${param.showRight}';
		if (showRight) {
			showRightPane();
		}

		function processClick() {
			if (process.style.width == '1180px') {
				$("#process").css("display", "none");
				$("#process").css("width", 0);
			} else if (process.style.width == ''
					|| process.style.display == 'none') {
				$("#process").css("width", 1180);
				$("#process").css("display", "block");
			}
		}
		$("#processIcon").bind("click", processClick);
		$("#processView", parent.document).bind("click", processClick);

		$("#process").hover(function() {
			$(this).css('opacity', 1.0);
		}, function() {
			$(this).css('opacity', 0.2);
		});

		$(".textbox").css("width", 105);

		$("#removeDiv").click(function() {
			$(".chartBox").css("visibility", "hidden");
			gridGraphicLayer.remove(_graphic);
			graphicChange.remove();
		})
		map.centerAndZoom(new esri.geometry.Point(106.23, 38.49), 3);
		map.on("zoom-end", myMapExtentChangeHandler);
		//图层格点点击事件
		com.nxgrid.giscommon.sealEditTools.sealInter = 20;
		// 		$("#process").css("display", "none");
		 		window.parent.showLiveInit();
		// 		var gl = window.parent.Global;
		// 		alert(gl.user.userId);
		 		var gl = window.parent.Global;
		 		if(gl.user.province == false){
		 			$("#divMainTool").hide();
		 		}
		 		localStorage.setItem("current_user", JSON.stringify(gl));
		 		document.cookie="user="+JSON.stringify(gl);
	}
	dojo.addOnLoad(init);
</script>
</head>


<body class="page">
	<div id="divMainTool" class="mapTopTool">
		<ul class="mapTool">
			<li><a href="javascript:showUploadGrib2()"><i
					class="iconfont Czs icon-Connection-trends"></i>提交国家局</a></li>
		</ul>
		<ul class="mapTool">
			<li><a><i class="iconfont Czs icon-fangda"></i>放大</a></li>
			<li class="hover"><a><i class="iconfont Czs icon-suoxiao"></i>缩小</a></li>
			<li><a><i class="iconfont Czs icon-quantu2"></i>全图</a></li>
			<li><a href="javascript:clearRenderLayer()"><i
					class="iconfont Czs icon-celiang-copy"></i>清除等值线/面</a></li>
			<li><a href="javascript:clearGraphicLayer()"><i
					class="iconfont Czs icon-qingchu3"></i>清除</a></li>
		</ul>

		<ul class="winSetTool">
			<li><a href="javascript:loadImportantPoint()"><i
					class="iconfont Czs icon-quanjingtu"></i>关键点</a></li>
			<li id="winA"><a><i class="iconfont Czs icon-quanjingtu"></i>任意区</a>
				<div class="mWindBx" style="display: none;">
					<span class="jtMs"></span>
					<div class="mBox">
						<div class="btnBoxA P6" style="width: 180px;">
							<a href="javascript:lq_draw()" class="btnBx"><i
								class="iconfont  icon-jiaotongtubiao_huizhiguanliluxian"></i>
								<p>绘制落区</p></a> <a href="javascript:lq_clear()" class="btnBx"><i
								class="iconfont  icon-qingchu1"></i>
								<p>清除落区</p></a> <a href="javascript:lq_get()" class="btnBx"><i
								class="iconfont  icon-jiaotongtubiaohuizhiguankongquyu"></i>
								<p>拾取落区</p></a>
							<!-- 								<a href="" class="btnBx"><i -->
							<!-- 								class="iconfont  icon-jiedianyanshou"></i> -->
							<!-- 								<p>修改落区</p></a> <br class="clearfloat" />  -->
						</div>
					</div>
				</div></li>
			<li id="winB"><a><i class="iconfont Czs icon-quhua"></i>行政区</a>
				<div class="mWindBx" style="display: none;">
					<span class="jtMs"></span>
					<div class="mBox">
						<!--div class="winBtnA"><a href="#" class="btnBx">区域</a><a href="#" class="btnBx">赋值</a><a href="#" class="btnBx">加减</a></div-->
						<div class="winBtnA P6" style="">
							<div class="" style="width: 200px;">
								<div class="formBxtx">
									<span class="txLabel W2b">区域：</span>
									<div class="ftxBox ML-2b">
										<select id="zoneduty" class="inpSel" name="zoneType"
											onchange="zoneChange()">
											<option selected="selected">请选择边界</option>
											<option>全区</option>
											<option value="640100">银川市</option>
											<option value="640200">石嘴山</option>
											<option value="640300">吴忠市</option>
											<option value="640400">固原市</option>
											<option value="640500">中卫市</option>
										</select>
									</div>
								</div>
								<div class="formBxtx">
									<span class="txLabel W2b">县：</span>
									<div class="ftxBox ML-2b">
										<select id="xduty" class="easyui-combobox" name="xduty">

										</select>
									</div>
								</div>
								<div class="formBxtx">
									<span class="txLabel W2b">赋值：</span>
									<div class="ftxBox ML-2b">
										<input id="yxfj" type="text" name="yxfj" style="width: 80px;" />
										<a href="javascript:void(0)" class="btnBx" onclick="doZone()">执行</a>
									</div>
								</div>
								<div class="formBxtx">
									<span class="txLabel W2b">加减：</span>
									<div class="ftxBox ML-2b">
										<a href="javascript:void(0)" onclick="doPlus()" class="btnBx"
											id="btnBxPlus">+</a> <input type="text" id="btnVal"
											name="yxfj" style="width: 60px;" /> <a
											href="javascript:void(0)" onclick="doReduce()" class="btnBx"
											id="btnBxReduce">-</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div></li>

			<li id="winD"><a href="javascript:showPointTrend()"><i
					class="iconfont Czs icon-Connection-trends"></i>单点</a> <!-- 					<div class="mWindBx" style="display: none;"> -->
				<!-- 					<span class="jtMs"></span> --> <!-- 					<div class="mBox"> -->
				<!-- 						<div class="WindowsTc" style="width: 480px;"> --> <!-- 							<div class="TcTit BvZS Chf"> -->
				<!-- 								<span class="fr">2017-05-14 08:00</span> <span class="fr Mr-12">N:<input -->
				<!-- 									type="text" name="textfield2" style="width: 30px;"></span> <span -->
				<!-- 									class="fr Mr-12">S:<input type="text" name="textfield2" -->
				<!-- 									style="width: 30px;"></span> 智能网格预报时序图 --> <!-- 							</div> -->
				<!-- 							<div class="" --> <!-- 								style="height: 300px; border: solid 1px #ddd; background-color: #eee;"> -->
				<!-- 							</div> --> <!-- 						</div> --> <!-- 					</div> --> <!-- 				</div> -->
			</li>
			<li id="winE"><a><i class="iconfont Czs icon-feng"></i>风向</a>
				<div class="mWindBx" style="display: none;">
					<span class="jtMs"></span>
					<div class="mBox">
						<div class="winBtnA P6" style="">
							<div class="" style="width: 200px;">
								<div class="formBxtx">
									<span class="txLabel W35b">影响半径：</span>
									<div class="ftxBox ML-35b">
										<input id="windRadius" type="text" class="ipT" value="10"
											name="windRadius" />
									</div>
								</div>
								<div class="formBxtx">
									<a
										href="javascript:com.nxgrid.giscommon.editToolWind.lineDraw()"
										class="btnBx">自由绘制</a> <a
										href="javascript:com.nxgrid.giscommon.editToolWind.areaDraw()"
										class="btnBx">落区绘制</a>

								</div>
							</div>
						</div>
					</div>
				</div></li>
			<li id="winG"><a><i class="iconfont Czs icon-fuhe_gaizhang_"></i>盖章</a>
				<div class="mWindBx" style="display: none;">
					<span class="jtMs"></span>
					<div class="mBox">
						<div class="winBtnA P6" style="">
							<div class="" style="width: 210px;">
								<div class="jsq" id="divseal">
									<a href="#" class="btnBx M4">1</a> <a href="#" class="btnBx M4">2</a>
									<a href="#" class="btnBx M4">3</a> <a href="#" class="btnBx M4">4</a>
									<a href="#" class="btnBx M4">5</a> <a href="#" class="btnBx M4">6</a>
									<a href="#" class="btnBx M4">7</a> <a href="#" class="btnBx M4">8</a>
									<a href="#" class="btnBx M4">9</a> <a href="#" class="btnBx M4">10</a>
									<a href="#" class="btnBx M4">15</a> <a href="#"
										class="btnBx M4">20</a> <a href="#" class="btnBx M4">25</a> <a
										href="#" class="btnBx M4">30</a> <a href="#" class="btnBx M4">35</a>
									<a href="#" class="btnBx M4">40</a> <a href="#"
										class="btnBx M4">45</a> <a href="#" class="btnBx M4">50</a> <a
										href="#" class="btnBx M4">75</a> <a href="#" class="btnBx M4">100</a>
								</div>
								<div class="formBxtx">
									<span class="txLabel W2b">半径：</span>
									<div class="ftxBox ML-2b">
										<a href="#" class="btnBx" id="addSealStep">+</a> <input
											id="selSealVal" type="text" name="yxfj" style="width: 60px;"
											value="20" /> <a href="#" class="btnBx" id="decSealStep">-</a>
									</div>
								</div>
								<div class="formBxtx">
									<span class="txLabel W2b"></span>
									<div class="ftxBox ML-2b">
										<input type="checkbox" id="sealCheck">负数 <a
											class="btnBx W4b" id="sealBtn">盖章</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div></li>
		</ul>
		<span class="fl cur Mt-6 Ml-8" id="icoMainWindows"><i
			class="iconfont icon-zuocecaidan4"></i></span> <span
			class="fl cur Mt-6 Ml-8" id="processIcon"><i
			class="iconfont icon-zuocecaidan4"></i></span>
	</div>
	<div class="mapBox" style="background-color: #ddd;">
		<span id="mapTips"
			style="display: none; position: absolute; z-index: 8; left: 40%; top: 30px; background-color: #FFEC8B; background-color: rgba(0, 0, 0, 0.5); padding: 10px 20px; border-radius: 6px; color: #fff;">这里是文字信息</span>
		<div id="map" style="height: 100%;">
			<!-- 信息展示 -->
			<!-- 			<div id="tipShow" class="easyui-panel" style="width:150px;height:40px;display: block;opacity:50;padding:10px;"> -->
			<!-- 			<p style="font-size:14px">esfasfasfasfasf</p> -->
			<!-- 			</div> -->
			<!-- 进度查看 -->
			<div id="process" class="stepDiv1" style="display: block;">
				<iframe id="" class="" width="100%" height="100%"
					src="${contextPath}/view/gis/gridInfo/processView.jsp"
					style="border: 0px;"></iframe>
			</div>
			<!-- 智能网格预报时序图 -->
			<div class="chartBox" style="width: 700px; visibility: hidden;">
				<div id="nover" class="chart">
					<div class="detail">
						<span class="box">省:<span id="province">宁夏回族自治区</span></span> <span
							class="box">市:<span id="city"></span></span> <span class="box">县:<span
							id="area"></span></span>
					</div>
					<table id="rainTable" class="table" "="" cellspacing="0"
						cellpadding="0" border="0">
						<tbody>
							<tr>
								<td style="background-color: rgb(41, 50, 55)">
									<div>
										<div class="images">
											<span class="iconfont icon-yu"></span> <span id="echartName1">智能网格预报时序图</span>
											<span> 经度：<input id="longitude" /></span><span> 纬度：<input
												id="latitude" /></span> <span id="queryGrid"> <a href="#">GO</a></span>
											<span style="padding-right: 15px; float: right;">
												发布时间: <span id="publishDate1">2017-07-17 08:00</span> <span
												id="removeDiv"></span>
											</span>
										</div>
									</div>
								</td>
							</tr>
							<tr class="tr2">
								<td id="echarts1" valign="top">
									<div id="echartss"
										style="width: 678px; height: 390px; -moz-user-select: none; position: relative; background: transparent none repeat scroll 0% 0%;"
										_echarts_instance_="ec_1500282625411">
										<div
											style="position: relative; overflow: hidden; width: 678px; height: 390px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">
											<div
												style="position: relative; overflow: hidden; width: 678px; height: 390px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;">

											</div>
										</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div id="importantPointLegend"
				style="position: absolute; float: right; z-index: 999; right: 20px; bottom: 5px; width: 200px; height: 150px; display: none">
				<ul>
					<li><div
							style="width: 10px; height: 10px; background: red; -moz-border-radius: 10px/10px; -webkit-border-radius: 10px/10px; border-radius: 10px/10px;"></div>误差±2℃以上</li>
					<li><div
							style="width: 10px; height: 10px; background: yellow; -moz-border-radius: 10px/10px; -webkit-border-radius: 10px/10px; border-radius: 10px/10px;"></div>误差±1℃以上</li>
					<li><div
							style="width: 10px; height: 10px; background: green; -moz-border-radius: 10px/10px; -webkit-border-radius: 10px/10px; border-radius: 10px/10px;"></div>误差±1℃内</li>
				</ul>


			</div>
			<div id="temperCorLegend"
				style="background:#FFFFFF;position: absolute; z-index: 999; left: 20px; bottom: 5px; width: 100%; height: 40px; visibility:hidden">
				<table style="width: 100%; text-align: center;">
					<tr>
						<td id="temperCorLegendTD" colspan="18"></td>
					</tr>
				</table>
			</div>

			<div id="locationFixDiv" class="locationFixDiv"
				style="display: none;">
				<select id="stepValueSel" class="easyui-combobox" name="stepValue"
					style="width: 50px; height: 100%" panelHeight="auto">
					<option value="1">0</option>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
					<option value="4">4</option>
					<option value="5">5</option>
				</select> <a id="addStepBtn" href="#" class="easyui-linkbutton"
					style="width: 28px; text-align: center; background: #36648B; color: white"
					onclick="com.nxgrid.giscommon.locationEditTools.addStep()">+</a> <a
					id="decStepBtn" href="#" class="easyui-linkbutton"
					style="width: 28px; text-align: center; background: #36648B; color: white"
					onclick="com.nxgrid.giscommon.locationEditTools.decStep()">-</a> <a
					id="decStepBtn" href="#" class="easyui-linkbutton"
					style="width: 28px; text-align: center; background: #36648B; color: white"
					onclick="com.nxgrid.giscommon.locationEditTools.doval()">=</a>
					<input id="sw_gl" class="easyui-switchbutton" data-options="onText:'关联',offText:'不关联'">
			</div>
			<div id="measureDiv" style="display: none;">
				<div id="measurementDiv"></div>
			</div>
		</div>
		<div id="right" style="display: none;" class="mLeftBox Br-s-1l">
			<iframe id="rightPanel" name="rightPanel" width="100%" height="100%"
				style="border: 0px;"></iframe>
		</div>
		<div id="leftView" class="mLeftBox Br-s-1l"
			style="display:; width: 520px;" expandSize="800">
			<a class="easyui-linkbutton" iconCls="icon-undo"
				style="position: absolute; top: 50%; left: -15px;" rel="#leftView"
				onclick="expandPagePanel.call(this)"></a>
			<div class="panel-dom" title="右面板" closable="true" fit="true"
				style="width: 100%; height: 100%;"
				data-options="onBeforeClose:hidePagePanel">
				<a class="easyui-linkbutton" iconCls="icon-cancel"
					style="position: absolute; top: 5px; right: 5px;"
					onclick="hidePagePanel('#leftView')"></a>
				<iframe name="leftFrame" style="border: 0px;"
					test-src="${contextPath}/grid/stationGridDataCorrect"></iframe>
			</div>
		</div>
	</div>
	<script src="${contextPath}/scripts/grid/gridMain.js"></script>
	<script src="${contextPath}/scripts/gisCommon/echartsDiagram.js"></script>
	<script src="${contextPath}/scripts/grid/gridToolSeal.js"></script>
	<script src="${contextPath}/scripts/gridview/mainEvent.js"></script>
</body>

</html>
