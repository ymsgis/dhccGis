function getMap() {
	return map;
}
var mainGrid={};//格点加载信息对象
mainGrid.type="";
mainGrid.elementType="";

function getGridInfo(){
	return mainGrid;
}

/**
 * 加载站点实况入口
 * @param pdata
 */
function loadStationInfo(pdata){
	NxgridRealtime.loadStation(pdata);
}



function setHeatmap() {

	var featureSet = {
		"features" : [],
		"objectIdFieldName" : "OBJECTID",
		"spatialReference" : {
			"wkid" : 4326,
			"latestWkid" : 4326
		},
		"geometryType" : "esriGeometryPoint",
		"fieldAliases" : {
			"OBJECTID" : "OBJECTID",
			"gridValue" : "gridValue"
		}
	};

	var tmp = 1;
	for (var i = 0; i < gridGraphicLayer.graphics.length; i++) {
		var g = gridGraphicLayer.graphics[i];
		if (g.attributes.id.indexOf("cl") != -1)
			continue;
		attr = {
			"OBJECTID" : tmp,
			"gridValue" : g.attributes.gridValue,
		}
		featureSet.features.push(new esri.Graphic(g.geometry, null, attr));
		tmp++;
	}

	var fields = [ {
		"name" : "OBJECTID",
		"type" : "esriFieldTypeOID",
		"alias" : "OID"
	}, {
		"name" : "gridValue",
		"type" : "esriFieldTypeDouble",
		"alias" : "gridValue"
	} ];

	var layerDefinition = {
		"geometryType" : "esriGeometryPoint",
		"fields" : fields,
	};

	var featureCollection = {
		layerDefinition : layerDefinition,
		featureSet : featureSet
	};
	var featureLayer = new esri.layers.FeatureLayer(featureCollection);
	require([ "esri/renderers/HeatmapRenderer" ], function(HeatmapRenderer) {
		var hr = new HeatmapRenderer({
			blurRadius : 10,
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
			maxPixelIntensity : 50,
			minPixelIntensity : 0
		});
		featureLayer.setRenderer(hr);
		gridGraphicLayer.clear();
		map.addLayer(featureLayer);
	});

}

function getGridGraphicLayer() {
	return gridGraphicLayer;
}

function getRenderLayer() {
	return renderLayer;
}

function getDisasterGraphicLayer() {
	return disasterGraphicLayer;
}

function getMapLevel() {
	return map.getLevel();
}
function sealDrawComplete(evt) {
	NxgridConfig.CommonToolConfig.sealDrawTool.deactivate();
}

function showMapTips(txt) {
	$("#mapTips").css('display', 'block');
	$("#mapTips").html(txt);
}
function clearMapTips() {
	$("#mapTips").css('display', 'none');
}
function showImportantLegend() {
	$("#importantPointLegend").css('display', 'block');
}
function clearImportantLegend() {
	$("#importantPointLegend").css('display', 'none');
}
function showBusy() {
	$.messager.progress({
		title : '信息提示',
		text : '数据处理中,请稍后...'
	});
}
function clearBusy() {
	$.messager.progress('close');
}

function sendWbMessage(message) {
	NxgridWebSocket.initWebSocket(message);
}

function exportMapPicture() {
	require([ "esri/tasks/PrintTask", "esri/tasks/PrintTemplate",
			"esri/tasks/PrintParameters", "esri/config" ], function(PrintTask,
			PrintTemplate, PrintParameters, esriConfig) {
		esriConfig.defaults.io.proxyUrl = NxgridConfig.MapConfig.proxyUrl;
		esriConfig.defaults.io.alwaysUseProxy = false;
		//创建地图打印对象
		var printMap = new PrintTask(NxgridConfig.MapConfig.nxPrintTaskUrl);
		//创建地图打印模版
		var template = new PrintTemplate();
		//创建地图的打印参数，参数里面包括：模版和地图
		var params = new PrintParameters();
		//输出图片的空间参考
		printMap.outSpatialReference = map.SpatialReference;
		//打印图片的各种参数
		template.exportOptions = {
			width : 800,
			height : 600,
			dpi : 96
		};
		//打印输出的格式
		template.format = "PNG32";
		//输出地图的布局
		template.layout = "MAP_ONLY";
		//设置参数地图  
		params.map = map;
		//设置参数模版
		params.template = template;
		//运行结果
		printMap.execute(params, function(evt) {
			if (evt != null) {
				//网页打开生成的地图
				window.open(evt.url);
			}
		});
	});

}