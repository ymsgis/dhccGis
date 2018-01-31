/**
 * 保存格点
 */
function saveGrid() {
	var url = _ServerRoot + "gridFile/saveMicapsFile";
	var result = localStorage.getItem("points");
	if (result == null) {
		alert('没有加载格点产品!');
		return;
	}
	var micapsObj = new Object();
	var type = $('#currentElement').combobox('getValue');
	var mdate = $('#createTime').datebox('getValue');
	var timePoint = $('#timeType').datebox('getValue');
	var mTime = $('#gridAg').val();
	micapsObj.mTime = mTime;
	micapsObj.mName = type;
	micapsObj.xdim = NxgridConfig.Micaps4FileConfig.xdim;
	micapsObj.ydim = NxgridConfig.Micaps4FileConfig.ydim;
	micapsObj.perDzx = NxgridConfig.Micaps4FileConfig.perDzx;
	micapsObj.startDzx = NxgridConfig.Micaps4FileConfig.startDzx;
	micapsObj.stopDzx = NxgridConfig.Micaps4FileConfig.stopDzx;
	micapsObj.smooth = NxgridConfig.Micaps4FileConfig.smooth;
	micapsObj.bold = NxgridConfig.Micaps4FileConfig.bold;
	micapsObj.logDistance = NxgridConfig.Micaps4FileConfig.logDistance;
	micapsObj.latDistance = NxgridConfig.Micaps4FileConfig.latDistance;
	micapsObj.fromLog = NxgridConfig.Micaps4FileConfig.fromLog;
	micapsObj.toLog = NxgridConfig.Micaps4FileConfig.toLog;
	micapsObj.fromLat = NxgridConfig.Micaps4FileConfig.fromLat;
	micapsObj.toLat = NxgridConfig.Micaps4FileConfig.toLat;
	micapsObj.mHour = NxgridConfig.Micaps4FileConfig.mHour;
	var arrdt = mdate.split("-");
	micapsObj.mYear = arrdt[0];
	micapsObj.mMonth = arrdt[1];
	micapsObj.mDay = arrdt[2];
	var pointsarr = JSON.parse(result);
	// micapsObj.lstPoints = new Object();
	var poinsts = new Array;
	var micapPoint;
	for (var i = 0; i < pointsarr.length; i++) {
		micapPoint = new Object();
		micapPoint.log = pointsarr[i].lng;
		micapPoint.lat = pointsarr[i].lat;
		micapPoint.dir = pointsarr[i].dir;
		micapPoint.value = pointsarr[i].value;
		poinsts.push(micapPoint);
	}
	micapsObj.jsonPoints = JSON.stringify(poinsts);
	micapsObj.timePoint=timePoint;
	$.post(url, micapsObj, function(data) {
		alert(data.state);
	}, "json");
}

/**
 * 其它全部自动保存
 */
function autoSave() {
	var type = $('#currentElement').combobox('getValue');
	var mdate = $('#createTime').datebox('getValue');
	var timePoint = $('#timeType').datebox('getValue');
	var backtype = $("#gridBack").combobox('getValue');
	if(backtype == "gridCheck"){
		$.messager.alert("信息提示","审核发布场不能同时批量保存到审核发布场！");
		return;
	}
	
	// window.parent.parentSave(type,mdate);
	var url = _ServerRoot + "gridFile/autoSaveMicapsFiles";
	var micapsObj = new Object();
	micapsObj.selDate = mdate;
	micapsObj.type = type;
	micapsObj.timePoint = timePoint;
	micapsObj.backtype = backtype;
	$.messager.confirm('确认', '确定要替换现有审核发布场产品么?', function(r){
		if (r){
			micapsObj.breplace = true;
		}else{
			micapsObj.breplace = false;
		}
		
		window.parent.showBusy();
		$.get(url, micapsObj, function(data) {
			if (data.state == '失败')
				alert(data.state + ",原因：" + data.description);
			else
				alert(data.state);
			window.parent.clearBusy();
		}, "json");
			
	});
	
	
	

}

function autoSaveAll() {
	var mdate = $('#createTime').datebox('getValue');
	var backtype = $("#gridBack").combobox('getValue');
	if(backtype == "gridCheck"){
		$.messager.alert("信息提示","审核发布场不能同时批量保存到审核发布场！");
		return;
	}
	// window.parent.parentSaveAll(mdate);
	var url = _ServerRoot + "gridFile/autoSaveMicapsFilesAll";
	var micapsObj = new Object();
	micapsObj.selDate = mdate;
	var timePoint = $('#timeType').datebox('getValue');
	micapsObj.timePoint = timePoint;
	micapsObj.backtype = backtype;
	
	$.messager.confirm('确认', '确定要替换现有审核发布场产品么?', function(r){
		if (r){
			micapsObj.breplace = true;
		}else{
			micapsObj.breplace = false;
		}
		
		window.parent.showBusy();
		$.get(url, micapsObj, function(data) {
			if (data.state == '失败')
				alert(data.state + ",原因：" + data.description);
			else
				alert(data.state);
			window.parent.clearBusy();
		}, "json");
			
	});	
	
	
}

/**
 * 发布功能
 */
function publish() {
	var myDate = new Date();
	//var hour = myDate.getHours();
	var hour = $('#timeType').datebox('getValue');
	var mdate = $('#createTime').datebox('getValue');
	var pdata = {
		"fcTime" : mdate + " " + hour + ":00:00",
		"type" : 'GridForecast',
		"hour" : hour
	};
	window.parent.showBusy();
	var url = _ServerRoot + "forecast/publish";
	$.post(url, pdata, function(data) {
		if (data.state == '成功') {
			$.ajax({
				type : "POST",
				url : '/nxgrid/disasterZone/disasterAnalyse',
				dataType : 'json',
				success : function(json) {
					alert("灾害性落区分析完成！");
					// $.messager.progress('close');
				},
				error : function() {
					// $.messager.progress('close');
				}
			});
		} else
			alert("保存失败,原因" + data.message);
		window.parent.clearBusy();
	}, "json");
}

/**
 * 格点发布CIMISS库接口
 */
function upLoadCimiss(){

	var myDate = new Date();
	//var hour = myDate.getHours();
	var hour = $('#timeType').datebox('getValue');
	var mdate = $('#createTime').datebox('getValue');
	var pdata = {
		"fcTime" : mdate + " " + hour + ":00:00",
		"type" : 'GridMeteoDB',
		"hour" : hour
	};
	window.parent.showBusy();
	var url = _ServerRoot + "forecast/publish";
	$.post(url, pdata, function(data) {
		if (data.state == '成功') {
			alert("发布成功！");
		} else
			alert("保存失败,原因" + data.message);
		window.parent.clearBusy();
	}, "json");
}

/**
 * 等值线
 */
function loadDZX() {
	var inputpoints = localStorage.getItem("points");
	var type = $('#currentElement').combobox('getValue');
	var resStr = null
	resStr = getReclasstionTable(type);
	com.nxgrid.giscommon.gridGPService.excuteDZX(inputpoints, "Field3", resStr,
			0.5, window.parent.getMap());

}
/**
 * 等值面
 */
function loadDZM() {
	var inputpoints = localStorage.getItem("points");
	var type = $('#currentElement').combobox('getValue');
	var resStr = null

	resStr = getReclasstionTable(type);
	com.nxgrid.giscommon.gridGPService.excuteDZM(inputpoints, "Field3", resStr,
			0.0146, window.parent.getMap());
}


function getReclasstionTable(type) {
	var resStr = null;
	// 温度
	if ("TMP" == type || "TMAX" == type || "TMIN" == type) {
		// 重分类(不能传小数？)
		// resStr= "-40 -30 1;-30 -28 2;-28 -26 3;-26 -24 4;-24 -22 5;-22 -20
		// 6;-20 -18 7;-18 -16 8;-16 -14 9;-14 -12 10;-12 -10 11;-10 -8 12;-8 -6
		// 13;-6 -4 14;-4 -2 15;-2 0 16;0 2 17;2 4 18;4 6 19;6 8 20;8 10 21;10
		// 12 22;12 14 23;14 16 24;16 18 25;18 20 26;20 22 27;22 24 28;24 26
		// 29;26 28 30;28 30 31;30 32 32;32 34 33;34 35 34;35 37 35;37 40 36;40
		// 100 37;";
		resStr = "-40 -30 1;-30 -20 2;-20 -10 3;-10 0 4;0 10 5;10 20 6;20 30 7;30 40 8;40 45 9;45 100 10";

	}
	// 风
	else if ("EDA10" == type) {
		resStr = "0 1 1;1 2 2;2 4 3;4 6 4;6 8 5;8 10 6;10 12 7;12 16 8";
	}
	// 降雨
	else if ("ER03" == type || "PPH03" == type || "RAT03" == type) {
		resStr = "0 5 1;5 10 2;10 25 3;25 50 4;50 100 5;100 150 6;150 200 7;200 250 8;250 300 9";
	}
	// 相对湿度
	else if ("ERH" == type || "ERHA" == type || "ERHI" == type) {
		resStr = "0 10 1;10 20 2;20 30 3;30 40 4;40 50 5;50 60 6;60 70 7;70 80 8;80 90 9;90 100 10";
	}
	// 可见度
	else if ("VIS03" == type) {
		resStr = "0 0.2 1;0.2 0.5 2;0.5 1 3;1 2 4;2 3 5;3 5 6;5 10 7;10 20 8;20 30 9;30 100 10";
	}
	// 雾
	else if ("ECT" == type) {
		resStr = "-40 -30 1;-30 -28 2;-28 -26 3;-26 -24 4;-24 -22 5;-22 -20 6;-20 -18 7;-18 -16 8;-16 -14 9;-14 -12 10;-12 -10 11;-10 -8 12;-8 -6 13;-6 -4 14;-4 -2 15;-2 0 16;0 2 17;2 4 18;4 6 19;6 8 20;8 10 21;10 12 22;12 14 23;14 16 24;16 18 25;18 20 26;20 22 27;22 24 28;24 26 29;26 28 30;28 30 31;30 32 32;32 34 33;34 35 34;35 37 35;37 40 36;40 100 37;";

	}
	// 冰雹
	else if ("Haze03" == type) {
		resStr = "-40 -30 1;-30 -28 2;-28 -26 3;-26 -24 4;-24 -22 5;-22 -20 6;-20 -18 7;-18 -16 8;-16 -14 9;-14 -12 10;-12 -10 11;-10 -8 12;-8 -6 13;-6 -4 14;-4 -2 15;-2 0 16;0 2 17;2 4 18;4 6 19;6 8 20;8 10 21;10 12 22;12 14 23;14 16 24;16 18 25;18 20 26;20 22 27;22 24 28;24 26 29;26 28 30;28 30 31;30 32 32;32 34 33;34 35 34;35 37 35;37 40 36;40 100 37;";

	}
	// 霾
	else if ("HAIL03" == type) {
		resStr = "-40 -30 1;-30 -28 2;-28 -26 3;-26 -24 4;-24 -22 5;-22 -20 6;-20 -18 7;-18 -16 8;-16 -14 9;-14 -12 10;-12 -10 11;-10 -8 12;-8 -6 13;-6 -4 14;-4 -2 15;-2 0 16;0 2 17;2 4 18;4 6 19;6 8 20;8 10 21;10 12 22;12 14 23;14 16 24;16 18 25;18 20 26;20 22 27;22 24 28;24 26 29;26 28 30;28 30 31;30 32 32;32 34 33;34 35 34;35 37 35;37 40 36;40 100 37;";

	}
	// 沙尘暴
	else if ("SAND03" == type) {
		resStr = "-40 -30 1;-30 -28 2;-28 -26 3;-26 -24 4;-24 -22 5;-22 -20 6;-20 -18 7;-18 -16 8;-16 -14 9;-14 -12 10;-12 -10 11;-10 -8 12;-8 -6 13;-6 -4 14;-4 -2 15;-2 0 16;0 2 17;2 4 18;4 6 19;6 8 20;8 10 21;10 12 22;12 14 23;14 16 24;16 18 25;18 20 26;20 22 27;22 24 28;24 26 29;26 28 30;28 30 31;30 32 32;32 34 33;34 35 34;35 37 35;37 40 36;40 100 37;";

	}
	// 雷电大风
	else if ("SMG03" == type) {
		resStr = "-40 -30 1;-30 -28 2;-28 -26 3;-26 -24 4;-24 -22 5;-22 -20 6;-20 -18 7;-18 -16 8;-16 -14 9;-14 -12 10;-12 -10 11;-10 -8 12;-8 -6 13;-6 -4 14;-4 -2 15;-2 0 16;0 2 17;2 4 18;4 6 19;6 8 20;8 10 21;10 12 22;12 14 23;14 16 24;16 18 25;18 20 26;20 22 27;22 24 28;24 26 29;26 28 30;28 30 31;30 32 32;32 34 33;34 35 34;35 37 35;37 40 36;40 100 37;";

	}
	// 雷暴
	else if ("SSM03" == type) {
		resStr = "-40 -30 1;-30 -28 2;-28 -26 3;-26 -24 4;-24 -22 5;-22 -20 6;-20 -18 7;-18 -16 8;-16 -14 9;-14 -12 10;-12 -10 11;-10 -8 12;-8 -6 13;-6 -4 14;-4 -2 15;-2 0 16;0 2 17;2 4 18;4 6 19;6 8 20;8 10 21;10 12 22;12 14 23;14 16 24;16 18 25;18 20 26;20 22 27;22 24 28;24 26 29;26 28 30;28 30 31;30 32 32;32 34 33;34 35 34;35 37 35;37 40 36;40 100 37;";

	} else {
		resStr = "-40 -30 1;-30 -28 2;-28 -26 3;-26 -24 4;-24 -22 5;-22 -20 6;-20 -18 7;-18 -16 8;-16 -14 9;-14 -12 10;-12 -10 11;-10 -8 12;-8 -6 13;-6 -4 14;-4 -2 15;-2 0 16;0 2 17;2 4 18;4 6 19;6 8 20;8 10 21;10 12 22;12 14 23;14 16 24;16 18 25;18 20 26;20 22 27;22 24 28;24 26 29;26 28 30;28 30 31;30 32 32;32 34 33;34 35 34;35 37 35;37 40 36;40 100 37;";
	}
	return resStr;

}
/**
 * 克里金插值
 */
function GridKring() {
	var inputpoints = localStorage.getItem("points");
	var type = $('#currentElement').combobox('getValue');
	com.nxgrid.giscommon.gridGPService.excuteKring(inputpoints, "Field3",
			window.parent.getMap());
}
/**
 * 热力图
 * 
 * @returns
 */
function loadHeatMap() {
	require([ "esri/renderers/HeatmapRenderer", "esri/tasks/FeatureSet",
			"esri/layers/FeatureLayer", "esri/graphic" ], function(
			HeatmapRenderer, FeatureSet, FeatureLayer, Graphic) {

		var layerDefinition = {
			"geometryType" : "esriGeometryPoint",
			"fields" : [ {
				"name" : "gridValue",
				"type" : "esriFieldTypeDouble",
				"alias" : "格点数值",
			}, {
				"name" : "ObjectId",
				"type" : "esriFieldTypeInteger",
				"alias" : "格点数值",
			} ]
		}

		var gridlyr = window.parent.getGridGraphicLayer();
		if (gridlyr == null || gridlyr.graphics == null)
			return;
		var featureSetGrid = new FeatureSet();
		var featuresGrid = [];
		for (var i = 0; i < gridlyr.graphics.length; i++) {
			var g = gridlyr.graphics[i];
			if (g.attributes.id.indexOf("cl") != -1)
				continue;
			attr = {
				"gridValue" : g.attributes.gridValue,
				"FID" : g.attributes.id,
			}
			featuresGrid.push(new Graphic(g.geometry, null, attr));
		}
		featureSetGrid.features = featuresGrid;
		var featureCollection = {
			layerDefinition : layerDefinition,
			featureSet : featureSetGrid
		};
		var featureLayer = new FeatureLayer(featureCollection);

		var heatmapRenderer = new HeatmapRenderer({
			blurRadius : 100,
			field : 'gridValue',
			colorStops : [ {
				ratio : 0,
				color : "rgba(250, 0, 0, 0)"
			}, {
				ratio : 0.6,
				color : "rgb(250, 0, 0)"
			}, {
				ratio : 0.85,
				color : "rgb(250, 150, 0)"
			}, {
				ratio : 0.95,
				color : "rgb(255, 255, 0)"
			} ],
			maxPixelIntensity : 250,
			minPixelIntensity : 10
		});

		featureLayer.setRenderer(heatmapRenderer);
		window.parent.getMap().addLayer(featureLayer);

	});

}
