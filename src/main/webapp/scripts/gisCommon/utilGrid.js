///*
//	格点按钮
//*/
//var gridBtn = window.gridBtn || {};
//gridBtn.fillColor = function(){
////	var gpServiceUrl = NxgridConfig.MapConfig.gpDZMServiceUrl;
//    var gp = new esri.tasks.Geoprocessor(NxgridConfig.MapConfig.gpDZMServiceUrl);  
//    gp.setOutputSpatialReference({wkid: 4326});//设置地图的空间参考
//    var graphic = DrawFeature();
//    var features = [];
//    features.push(graphic);
//    //取GP服务的参数
//    var featureSet = new esri.tasks.FeatureSet();
//    //添加fields字段，为了和后台服务字段匹配
//    featureSet.fields = [];//字段数组
//    featureSet.features = features;//返回的图形数组
//    var params = {
//    	"RainDZM_krj":featureSet,
//    	
//    }
//	gp.submitJob(params, gpJobComplete, gpJobStatus, gpJobFailed);
//
//	function gpJobComplete(jobinfo){
//		//get the result map service layer and add to map
//		gp.getResultImageLayer(jobinfo.jobId, null, null, function(layer){
//		layer.setOpacity(0.7);
//		window.parent.getMap().addLayers([layer]);
//	});
//	}
//	
//	function gpJobStatus(jobinfo){
//       alert('loading');
//    }
//	
//    function gpJobFailed(error){
//        alert('GP出错！');
//    }
//}
////填色
////gridBtn.fillColor = function(){
////	//定义ＧＰ服务对象
////	var gpServiceUrl = NxgridConfig.MapConfig.gpDZMServiceUrl; 
////	var gp = new esri.tasks.Geoprocessor(gpServiceUrl);
////	//设置输出几何形状的空间引用的公知id
////	gp.setOutputSpatialReference({wkid: 4326});
////	//构建GP服务参数
////	var gpParams = {};
////	//添加fields字段，为了和后台服务字段匹配
////    pointSet.fields=[];
////    //GP服务的inputData参数
////	gpParams.inputData = pointSet.fields;
//	
//	//绘制要素
////	var graphic = DrawFeature();
////	var features = [];
////    features.push(graphic);
////    var featureSet = new esri.tasks.FeatureSet();
////    featureSet.features = features;
////    
////    
////    
////    var distance = new esri.tasks.LinearUnit();
////    distance.distance = 20;
////    distance.units = esri.Units.KILOMETERS;
////    //开始调用GP服务
////    var params = {
////        "Export_Output_2": featureSet,
////        "Distance__value_or_field_": distance
////    }
////    
////        gp.submitJob(params, addResults);//在发布gp服务的时候中，如果选择的是异步方式，采用的执行方式
//////    gp.execute(params, addResults);//同步的执行方式
////}
////
// function DrawFeature() {
//	 var graphic
//	 $
//		.post(
//				NxgridConfig.MapConfig.nxLoadGridUrl,
//				{
//					"type" : type,
//					"date" : createtime,
//					"aging" : ag
//				},
//				function(data) {
//					var result = toJson(data);
//					if (result == null || result.points == null) {
//						alert("没有找到对应数据！")
//						return;
//					}
//					var pointsarr = result.points;
//					var rstarr = gridLevelLoad(pointsarr, level);
//
//for (var i = 0; i < rstarr.length; i++) {
//
//	var lat = rstarr[i].lat;
//	var log = rstarr[i].lng;
//	var value = rstarr[i].value;
//
//	var pt = new esri.geometry.Point(log, lat);
//	var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]));
//	graphic = new esri.Graphic(pt, symbol);
//	 window.parent.getMap().add(graphic);
//
//}
////            var pointSymbol = new esri.symbol.SimpleMarkerSymbol();
////            pointSymbol.setOutline = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 1);
////            pointSymbol.setSize(5);
////            pointSymbol.setColor(new dojo.Color([255, 0, 0]));
////            //
////            var grahic = new esri.Graphic(pointSymbol);
////            window.parent.getMap().graphics.add(grahic);
//        })
//				 return grahic;
//}
//function toJson(str) {
//	var json = eval('(' + str + ')');
//	return json;
//}
//				
// 
//////gp完成后的回调函数    
////
////        function addResults(jobInfo) {         
////            var features = jobInfo[0].value.features;
////            for (var f = 0, fl = features.length; f < fl; f++) {
////                var feature = features[f];
////                var polySymbolRed = new esri.symbol.SimpleMarkerSymbol(esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE, 12, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([204, 102, 51]), 1), new dojo.Color([158, 184, 71, 1]));
////                feature.setSymbol(polySymbolRed);
////                window.parent.getMap().graphics.add(feature);
////            }
////        }
////            
