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
	dojo.require("esri/renderers/HeatmapRenderer");

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
							var timePoint = $("#timeType").combobox(
									'getValue');
							GridLoad.loadGrid($(this).text(), $("#createTime")
									.datebox('getValue'), $("#currentElement")
									.combobox('getValue'), window.parent
									.getMapLevel(), $("#gridBack").combobox(
									'getValue'), timePoint);
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
						case 'ER24':
							hourSpan = 24;
							break;
						case 'ER06':
							hourSpan = 6;
							break;
						case 'ER12':
							hourSpan = 12;
							break;
						default:
						}
						var btns = $('#divTimes li');
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
						$("#divTimes li").get(fidx).click();
					}
				});

				$('#gridBack').combobox({
					onChange : function(newVal, oldVal) {
						var hourSpan = 3;
						var btns = $('#divTimes li');
						//var fidx = 0;
						refesherTimes();
						window.parent.mainGrid.type = newVal;
						//$("#divTimes li").get(fidx).click();
					}
				});
				
				showTime();
				//设置时次的随动
				var hour = new Date().getHours();
				if(hour >= 12)
					$('#timeType').combobox('setValue','20');

				function getHexBackgroundColor(rgb) {
					rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
					function hex(x) {
						return ("0" + parseInt(x).toString(16)).slice(-2);
					}
					rgb = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
					return rgb;
				}
				
				function refesherTimes(){
					var newVal = $('#currentElement').combobox('getValue');
					var hourSpan = 3;
					switch (newVal) {
					case 'TMAX':
					case 'TMIN':
					case 'ERHA':
					case 'ERHI':
					case 'ER24':
						hourSpan = 24;
						break;
					case 'ER06':
						hourSpan = 6;
						break;
					case 'ER12':
						hourSpan = 12;
						break;
					default:
					}
					var btns = $('#divTimes li');
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
					$("#divTimes li").get(fidx).click();
				}
				var gl = JSON.parse(localStorage.getItem("current_user"));
				//根据权限曲线操作
				if(gl.user.province == false)
					$("#divOperate").hide();
			});
</script>
</head>
<body>
	<div id="rightPane">
		<div class="mLeftNrBdBox P12" id="default-example" data-collapse>
			<!-- 			<h3 class="open">详情列表</h3> -->
			<div class="Mb-12">
				<div class="Mt-12">
					<div class="formBx">
						<span class="txLabel">制作时间：</span> <input class="easyui-datebox"
							id="createTime" name="createTime" data-options="required:true"
							value="3/7/2017" style="width: 193px; height: 24px;"> <input
							type="hidden" id="gridAg"><select class="easyui-combobox"
							id="timeType" name="timeType" style="width: 50px;"
							editable="false">
							<option value="8">08</option>
							<option value="20">20</option>
						</select>
						<!-- 						<div id="dele"></div> -->
					</div>
					<div class="formBx">
						<span class="txLabel">当前要素：</span> <select id="currentElement"
							class="easyui-combobox" name="currentElement"
							style="height: 24px;">
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
							<option value="ER06">6小时降水</option>
							<option value="ER12">12小时降水</option>
							<option value="ER24">24小时降水</option>
						</select>
					</div>
					<div class="formBx">
						<span class="txLabel">预报种类：</span> <select class="easyui-combobox"
							name="gridBack" id="gridBack" style="height: 24px;">
							<!-- 							<option value="gridBest">最优背景场</option> -->
							<option value="gridCenter">中央台指导预报</option>
							<option value="pcdzc">实况订正预报</option>
							<option value="gridPc">动态偏差订正预报</option>
							<option value="krm">卡尔曼滤波订正预报</option>
							<option value="pc1">动态偏差订正的偏差场</option>
							<option value="pc2">卡尔曼滤波订正的偏差场</option>
							<option value="pc3">实况订正的偏差场</option>
							<option value="gridCheck">审核发布场</option>
							<option value="gridBack">备份场</option>
							<option value="#6">本区1公里预报</option>
							<option value="#7">华东区域模式</option>
							<option value="#8">西北区域模式</option>
						</select>
					</div>
					<div class="f25fBx">
						<div class="W25b fl">
							<div class="mtimelt" id="divLeft">
								<li id="first">25日 周二</li>
								<li id="second">26日 周三</li>
								<li id="third">27日 周四</li>
								<li id="fouth">28日 周五</li>
								<li id="fifth">29日 周六</li>
								<li id="sixth">30日 周日</li>
								<li id="seventh">1日 周一</li>
								<li id="eighth">2日 周二</li>
								<li id="ninth">3日 周三</li>
								<li id="tenth">4日 周四</li>
							</div>
						</div>
						<div class="ML-25b">
							<div class="mtimeSelBtn" id="divTimes">
								<c:forEach begin="3" end="240" step="3" var="idx">
									<li>${idx}</li>
								</c:forEach>
								<br class="clearfloat" clear="all" />
							</div>
							<br class="clearfloat" clear="all" />
						</div>
					</div>

					<div id="divOperate" class="Mb-12">
						<a class="btn Czs" onclick="saveGrid()"><i
							class="iconfont icon-shijian"></i>保存</a> <a class="btn"
							onclick="autoSave()"><i class="iconfont icon-shijian"></i>全部保存</a>
						<a class="btn" onclick="publish()"><i
							class="iconfont icon-shijian"></i>发布</a> <br/><br/><a class="btn"
							onclick="autoSaveAll()"><i class="iconfont icon-shijian"></i>全要素保存</a>

						<a class="btn" onclick="upLoadCimiss()"><i
							class="iconfont icon-shijian"></i>预报产品入库</a>

					</div>
					<div class="Mb-12">
						<a class="btn" onclick="loadDZX()"><i
							class="iconfont icon-shijian"></i>等值线</a> <a class="btn"
							onclick="loadDZM()"><i class="iconfont icon-shijian"></i>等值面</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>