<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="../../include.inc.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>格点预报</title>
<script src="${contextPath}/scripts/gisCommon/gridInfo.js"></script>

<link rel="stylesheet"
	href="${contextPath}/css/index/css/gridPrediction.css" />
<script src="${contextPath}/scripts/jquery.min.js"></script>
<link rel="stylesheet" href="${euiPath}/themes/bootstrap/easyui.css" />
<link rel="stylesheet" href="${euiPath}/themes/icon.css" />
<script type="text/javascript" src="${euiPath}/jquery.min.js"></script>
<script type="text/javascript" src="${euiPath}/jquery.easyui.min.js"></script>
<script type="text/javascript"
	src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
<script src="${arcgisPath}/init.js"></script>
<script src="${contextPath}/scripts/common/namespace.js"></script>
<script src="${contextPath}/scripts/grid/gridLoad.js"></script>
<script src="${contextPath}/scripts/config/config.js"></script>
<script src="${contextPath}/scripts/grid/gridColor.js"></script>
<script src="${contextPath}/scripts/grid/gridType.js"></script>
<script src="${contextPath}/scripts/gisCommon/weatherLegend.js"></script>
<script src="${contextPath}/scripts/config/weatherLegend.js"></script>
<script src="${contextPath}/scripts/grid/gridSave.js"></script>
<link rel="stylesheet" href="${arcgisPath}/dijit/themes/claro/claro.css">
<link rel="stylesheet" href="${arcgisPath}/esri/css/esri.css" />
<script src="${contextPath}/scripts/grid/gridGPService.js"></script>
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


<script type="text/javascript">
	dojo.require("esri/geometry/Point");
	dojo.require("esri/geometry/Extent");
	dojo.require("esri/graphic");
	dojo.require("esri/Color");
	dojo.require("esri/symbols/SimpleMarkerSymbol");
	dojo.require("esri/graphic");
	dojo.require("esri/InfoTemplate");
	dojo.require("esri/layers/GraphicsLayer");

	$(document).ready(
			function() {
				$("#dele").mouseenter(function() {
					$("#dele").css("background-color", "yellow");
				});
				$("#dele").mouseleave(function() {
					$("#dele").css("background-color", "white");
				});

				$("#dele").click(
						function() {
							$("#rightPanel", parent.document).parent().css(
									"display", "none");
							$("#dele").css("background-color", "white");
							deleWeatherLegend();
						});


				$("#divTimes li").click(
						function() {
							$('#gridAg').val($(this).text());
							var ag = $(this).text();
							var tp = $("#currentElement").combobox('getValue');
							GridLoad.loadLiveShow($(this).text(), $("#createTime")
									.datebox('getValue'), $("#currentElement")
									.combobox('getValue'), window.parent.getMapLevel());
							
							$('#divTimes li').removeClass('active');
							$(this).addClass('active');
							$($("#divBottom").children("span").get(0)).css(
									"background-color", "#F58F1D");
						});
				$('#currentElement').combobox({
					onChange : function(newVal, oldVal) {
						var hourSpan = 3;
						switch (newVal) {
						case 'TMAX':
						case 'TMIN':
						case 'ERHA':
						case 'ERHI':
						case 'ER03':
						case 'ER06':
						case 'ER12':
						case 'ER24':
							hourSpan = 24;
							break;
						default:
						}
						var btns = $('#divTimes li');
						var fidx = 0;
						if (hourSpan == 3) {
							btns.css('visibility', 'visible');
						} else {
							for (var i = 1; i <= btns.length; i++) {
								$(btns[i - 1]).css('visibility', 'hidden');
// 								if ((i * 3 % hourSpan) != 0) {
// 									$(btns[i - 1]).css('visibility', 'hidden');
// 								} else {
// 									fidx = fidx == 0 ? i - 1 : fidx;
// 								}
							}
						}
						$("#divTimes li").get(fidx).click();
					}
				});
				showTime();

				function getHexBackgroundColor(rgb) {
					rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
					function hex(x) {
						return ("0" + parseInt(x).toString(16)).slice(-2);
					}
					rgb = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
					return rgb;
				}
				var d = new Date();
				var ag = d.getHours()-1 ;
				var tp = $("#currentElement").combobox('getValue');
				GridLoad.loadLiveShow(ag, $("#createTime")
						.datebox('getValue'), $("#currentElement")
						.combobox('getValue'), window.parent.getMapLevel());
			}
			
	);
</script>
</head>
<body>
	<div id="rightPane">
		<div class="mLeftNrBdBox P12" id="default-example" data-collapse>
			<!-- 			<h3 class="open">实况列表</h3> -->
			<div class="Mb-12">
				<div class="Mt-12">
					<div class="formBx">
						<span class="txLabel">制作时间：</span> <input class="easyui-datebox"
							id="createTime" name="createTime" data-options="required:true"
							value="3/7/2017" style="width: 193px; height: 30px;"> <input
							type="hidden" id="gridAg">
						<div id="dele"></div>
					</div>
					<div class="formBx">
						<span class="txLabel">当前要素：</span> <select id="currentElement"
							class="easyui-combobox" name="currentElement">
							<option value="TMP">气温</option>
							<option value="ERH">相对湿度</option>
							<option value="EDA10">风</option>
							<option value="VIS03">能见度</option>
							<option value="ECT">云量</option>
							<option value="ER03">3小时降水</option>
							<option value="ER06">6小时降水</option>
							<option value="ER12">12小时降水</option>
							<option value="ER24">24小时降水</option>
							<option value="TMAX">24小时最高气温</option>
							<option value="TMIN">24小时最低气温</option>
							<option value="ERHA">24小时最大相对湿度</option>
							<option value="ERHI">24小时最小相对湿度</option>
						</select>
					</div>
					<div class="f25fBx">
						<div class="ML-25b">
							<div class="mtimeSelBtn" id="divTimes">
								<c:forEach begin="0" end="23" step="1" var="idx">
									<li>${idx}</li>
								</c:forEach>
								<br class="clearfloat" clear="all" />
							</div>
							<br class="clearfloat" clear="all" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>