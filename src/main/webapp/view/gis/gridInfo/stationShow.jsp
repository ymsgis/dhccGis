<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="../../include.inc.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>格点预报</title>
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
<script src="${contextPath}/scripts/config/config.js"></script>
<script src="${contextPath}/scripts/grid/gridColor.js"></script>
<script src="${contextPath}/scripts/grid/gridType.js"></script>
<script src="${contextPath}/scripts/gisCommon/weatherLegend.js"></script>
<script src="${contextPath}/scripts/config/weatherLegend.js"></script>
<link rel="stylesheet" href="${arcgisPath}/dijit/themes/claro/claro.css">
<link rel="stylesheet" href="${arcgisPath}/esri/css/esri.css" />

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
<script src="${contextPath}/scripts/gisCommon/symbolTool.js"></script>


<script type="text/javascript">
	dojo.require("esri/geometry/Point");
	dojo.require("esri/geometry/Extent");
	dojo.require("esri/graphic");
	dojo.require("esri/Color");
	dojo.require("esri/symbols/SimpleMarkerSymbol");
	dojo.require("esri/graphic");
	dojo.require("esri/InfoTemplate");
	dojo.require("esri/layers/GraphicsLayer");
	Date.prototype.Format = function(fmt) {
		var o = {
			"M+" : this.getMonth() + 1, //月份 
			"d+" : this.getDate(), //日 
			"h+" : this.getHours(), //小时 
			"m+" : this.getMinutes(), //分 
			"s+" : this.getSeconds(), //秒 
			"q+" : Math.floor((this.getMonth() + 3) / 3), //季度 
			"S" : this.getMilliseconds()
		//毫秒 
		};
		if (/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
					.substr(4 - RegExp.$1.length));
		for ( var k in o) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
						: (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	}

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
							var qdate = stringToDate($("#createTime").datebox(
									'getValue'));
							qdate.setHours(ag);

							var pdata = {
								"qdate" : qdate.Format("yyyy-MM-dd hh:mm:ss")
							};
							window.parent.loadStationInfo(pdata);

							$('#divTimes li').removeClass('active');
							$(this).addClass('active');
							$($("#divBottom").children("span").get(0)).css(
									"background-color", "#F58F1D");
						});
				function getHexBackgroundColor(rgb) {
					rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
					function hex(x) {
						return ("0" + parseInt(x).toString(16)).slice(-2);
					}
					rgb = "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
					return rgb;
				}
				var d = new Date();
				var ag = d.getHours() - 1;

				var qdate = stringToDate($("#createTime").datebox('getValue'));
				qdate.setHours(ag);

				var pdata = {
						"qdate" : qdate.Format("yyyy-MM-dd hh:mm:ss")
				};
				window.parent.loadStationInfo(pdata);
			}

	);

	function stringToDate(fDate) {
		var fullDate = fDate.split("-");
		return new Date(fullDate[0], fullDate[1] - 1, fullDate[2], 0, 0, 0);
	}
</script>
</head>
<body>
	<div id="rightPane">
		<div class="mLeftNrBdBox P12" id="default-example" data-collapse>
			<div class="Mb-12">
				<div class="Mt-12">
					<div class="formBx">
						<span class="txLabel">制作时间：</span> <input class="easyui-datebox"
							id="createTime" name="createTime" data-options="required:true"
							value="3/7/2017" style="width: 193px; height: 30px;"> <input
							type="hidden" id="gridAg">
						<div id="dele"></div>
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