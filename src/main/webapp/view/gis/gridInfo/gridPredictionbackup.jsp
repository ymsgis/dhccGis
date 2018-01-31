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
<script src="${contextPath}/scripts/grid/gridLoad.js"></script>
<script src="${contextPath}/scripts/config/config.js"></script>
<script src="${contextPath}/scripts/grid/gridColor.js"></script>
<script src="${contextPath}/scripts/grid/gridType.js"></script>
<script src="${contextPath}/scripts/gisCommon/weatherLegend.js"></script>
<script src="${contextPath}/scripts/grid/gridSave.js"></script>
<link rel="stylesheet" href="${arcgisPath}/dijit/themes/claro/claro.css">
<link rel="stylesheet" href="${arcgisPath}/esri/css/esri.css" />
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

				$("#divRight li").click(
						function() {							
							$('#gridAg').val($(this).text());

							var ag = $(this).text();
							var tp = $("#currentElement").combobox('getValue');
							//GridLoad.loadGrid($(this).text(),$("#createTime").datebox('getValue'),$("#currentElement").combobox('getValue'),window.parent.getMapLevel());
							GridLoad.loadGrid($(this).text(), $("#createTime")
									.datebox('getValue'), $("#currentElement")
									.combobox('getValue'), window.parent
									.getMapLevel());
							$('#divRight li').removeClass('active');
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
							hourSpan = 24;
							break;
						default:
						}
						var btns = $('#divRight li');
						var fidx = 0;
						if (hourSpan == 3) {
							btns.css('visibility', 'visible');
						} else {
							for (var i = 1; i <= btns.length; i++) {
								if ((i * 3 % hourSpan) != 0) {
									$(btns[i - 1]).css('visibility', 'hidden');
								} else {
									fidx = fidx == 0 ? i - 1 : fidx;
								}
							}
						}
						$("#divRight li").get(fidx).click();
					}
				});

				$("#divBottom span").click(
						function() {
							var rgb = $(this).css("background-color");
							var hex = getHexBackgroundColor(rgb);
							if (hex == "#f3f3f3") {
								$(this).css("background-color", "#F58F1D");
								//GridLoad.loadGrid($(this).text(),$("#createTime").datebox('getValue'),$("#currentElement").combobox('getValue'),window.parent.getMapLevel());
								GridLoad.loadGrid($(this).text(), '2017-03-07',
										$("#currentElement").combobox(
												'getValue'), window.parent
												.getMapLevel());
							} else if (hex == "#f58f1d") {
								$(this).css("background-color", "#F3F3F3");
								window.parent.getGridGraphicLayer().clear();
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
			});
</script>
</head>
<body>
	<div id="rightPane">
		<span style="position: relative;">制作时间：</span> <input
			class="easyui-datebox" id="createTime" name="createTime"
			data-options="required:true" value="3/7/2017"
			style="width: 150px; height: 22px;"> <input type="hidden"
			id="gridAg">
		<div id="dele"></div>
		<br>
		<div style="height: 8px;"></div>

		<span style="position: relative; left: 14px">当前要素： <select
			id="currentElement" class="easyui-combobox" name="currentElement"
			style="width: 150px; height: 22px;">
				<option value="TMP">3小时气温</option>
				<option value="ERH">3小时相对湿度</option>
				<option value="EDA10">3小时风</option>
				<option value="ER03">3小时降水</option>
				<option value="PPH03">3小时降水相态</option>
				<option value="RAT03">3小时短时强降水</option>
				<option value="VIS03">3小时能见度</option>
				<option value="ECT">3小时云量</option>
				<option value="FOG03">3小时雾</option>
				<option value="Haze03">3小时霾</option>
				<option value="HAIL03">3小时冰雹</option>
				<option value="SAND03">3小时沙尘预报</option>
				<option value="SMG03">3小时雷电大风</option>
				<option value="SSM03">3小时雷暴</option>
				<option value="TMAX">24小时最高气温</option>
				<option value="TMIN">24小时最低气温</option>
				<option value="ERHA">24小时最大相对湿度</option>
				<option value="ERHI">24小时最小相对湿度</option>
				<!-- 				<option value="Haze03">3小时霾</option>				 -->
				<!-- 				<option value="R1">1小时降水实况</option> -->
				<!-- 				<option value="Rain03">3小时降水</option>			 -->
				<!-- 				<option value="Rh03">3小时相对湿度</option> -->
				<!-- 				<option value="RHMax24">24小时最大相对湿度</option> -->
				<!-- 				<option value="RHMin24">24小时最小相对湿度</option>			 -->
				<!-- 				<option value="Cloud03">3小时云量</option> -->
				<!-- 				<option value="Temper03">3小时气温</option>				 -->
				<!-- 				<option value="Wind03">3小时风</option> -->

		</select></span> <br>

		<div style="height: 8px;"></div>
		<span style="position: relative; left: 14px">预报种类： <select
			id="forecastType" class="easyui-combobox" name="forecastType"
			style="width: 150px; height: 22px;">
				<option value="TMP">最优背景场</option>
				<option value="#">中央台指导预报</option>
				<option value="#1">偏差订正预报</option>
				<option value="#2">卡尔曼滤波订正预报</option>
				<option value="#3">订正偏差场1</option>
				<option value="#4">订正偏差场2</option>
				<option value="#5">审核发布场</option>
				<option value="#6">本区1公里预报</option>
				<option value="#7">华东区域模式</option>
				<option value="#8">西北区域模式</option>
		</select>
		</span>

		<div style="height: 8px;"></div>
		<div id="divLeft">
			<span id="first"></span> <span id="second"></span> <span id="third"></span>
			<span id="fouth"></span> <span id="fifth"></span> <span id="sixth"></span>
			<span id="seventh"></span> <span id="eighth"></span> <span id="ninth"></span>
			<span id="tenth"></span>
		</div>
		<div id="divRight">
			<c:forEach begin="3" end="240" step="3" var="idx">
				<li>${idx}</li>
			</c:forEach>
		</div>

		<div style="top: 80px">
			<a id="btn" href="javascript:saveGrid()" class="easyui-linkbutton"
				data-options="iconCls:'icon-save'">保存</a> <a id="btn"
				href="javascript:autoSave()" class="easyui-linkbutton"
				data-options="iconCls:'icon-save'">自动保存</a> <a id="btn"
				href="javascript:autoSaveAll()" class="easyui-linkbutton"
				data-options="iconCls:'icon-save'">所有要素全部保存</a> <a id="btn"
				href="javascript:publish()" class="easyui-linkbutton"
				data-options="iconCls:'icon-save'">发布</a>
		</div>
	</div>

</body>
</html>