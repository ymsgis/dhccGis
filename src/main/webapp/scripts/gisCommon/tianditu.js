/**
 * 天地图处理js
 */
var Tianditu = window.Tianditu || {};
Tianditu.loadTianditu = function(map) {	
	// 定义瓦片结构
	var tileInfo = new esri.layers.TileInfo({
		"rows" : 256,
		"cols" : 256,
		"compressionQuality" : 0,
		"origin" : {
			"x" : -180,
			"y" : 90
		},
		"spatialReference" : {
			"wkid" : 4326
		},
		"lods" : [ {
			"level" : 2,
			"resolution" : 0.3515625,
			"scale" : 147748796.52937502
		}, {
			"level" : 3,
			"resolution" : 0.17578125,
			"scale" : 73874398.264687508
		}, {
			"level" : 4,
			"resolution" : 0.087890625,
			"scale" : 36937199.132343754
		}, {
			"level" : 5,
			"resolution" : 0.0439453125,
			"scale" : 18468599.566171877
		}, {
			"level" : 6,
			"resolution" : 0.02197265625,
			"scale" : 9234299.7830859385
		}, {
			"level" : 7,
			"resolution" : 0.010986328125,
			"scale" : 4617149.8915429693
		}, {
			"level" : 8,
			"resolution" : 0.0054931640625,
			"scale" : 2308574.9457714846
		}, {
			"level" : 9,
			"resolution" : 0.00274658203125,
			"scale" : 1154287.4728857423
		}, {
			"level" : 10,
			"resolution" : 0.001373291015625,
			"scale" : 577143.73644287116
		}, {
			"level" : 11,
			"resolution" : 0.0006866455078125,
			"scale" : 288571.86822143558
		}, {
			"level" : 12,
			"resolution" : 0.00034332275390625,
			"scale" : 144285.93411071779
		}, {
			"level" : 13,
			"resolution" : 0.000171661376953125,
			"scale" : 72142.967055358895
		}, {
			"level" : 14,
			"resolution" : 8.58306884765625e-005,
			"scale" : 36071.483527679447
		}, {
			"level" : 15,
			"resolution" : 4.291534423828125e-005,
			"scale" : 18035.741763839724
		}, {
			"level" : 16,
			"resolution" : 2.1457672119140625e-005,
			"scale" : 9017.8708819198619
		}, {
			"level" : 17,
			"resolution" : 1.0728836059570313e-005,
			"scale" : 4508.9354409599309
		}, {
			"level" : 18,
			"resolution" : 5.3644180297851563e-006,
			"scale" : 2254.4677204799655
		} ]
	});

	// 地图
	var baseMap = new esri.layers.WebTiledLayer(
			"http://${subDomain}.tianditu.com/DataServer?T=vec_c&X=${col}&Y=${row}&L=${level}",
			{
				"copyright" : "Tianditu",
				"id" : "Tianditu",
				"subDomains" : [ "t0", "t1", "t2" ],
				"tileInfo" : tileInfo
			});

	// 底图标注
	var baseMapMarker = new esri.layers.WebTiledLayer(
			"http://${subDomain}.tianditu.com/DataServer?T=cva_c&X=${col}&Y=${row}&L=${level}",
			{
				"copyright" : "Tianditu",
				"id" : "Tianditu2",
				"subDomains" : [ "t0", "t1", "t2" ],
				"tileInfo" : tileInfo
			});

	map.addLayer(baseMap);
	map.addLayer(baseMapMarker);	
}

//测试feature 切换功能
function test1() {
	gnqh2002Layer.setVisibility(false);
	gnqh2012Layer.setVisibility(true);
}

function test2() {
	//var layerDefs = [];
	//layerDefs[5] = "STATE_NAME='Kansas'";
	//layerDefs[4] = "STATE_NAME='Kansas' and POP2007>25000";
	//layerDefs[3] = "STATE_NAME='Kansas' and POP2007>25000";
	//dynamicMapServiceLayer.setLayerDefinitions(layerDefs);
	var expression = "所在省='广东省'"
	gnqh2012Layer.setDefinitionExpression(expression)
}
