//var LocationEditToolsP=windows.LocationEditToolsP||{};

(function() {
	Namespace.register("com.nxgrid.giscommon.editToolWind");
	com.nxgrid.giscommon.editToolWind.effectGrids=[];
	com.nxgrid.giscommon.editToolWind.effectGraphics=[];
	com.nxgrid.giscommon.editToolWind.bufferDistance=0;
	//绘制线
	com.nxgrid.giscommon.editToolWind.lineDraw=function(){
		NxgridConfig.CommonToolConfig.drawToolLineWind.activate(esri.toolbars.Draw.FREEHAND_POLYLINE);
		//以下代码为测试灾害性落区自动生成使用
//		$.ajax({
//			type:"POST",
//	 		url: '/nxgrid/disasterZone/disasterAnalyse',
//	 		dataType: 'json',
//	 		//data: {jsonData: JSON.stringify(postData)},
//	 		success: function(json) {
//	 			
//	 		},
//	 		error: function(){}
//		});
		
//		require([
//		         "esri/tasks/PrintTask",
//		         "esri/tasks/PrintTemplate",
//		         "esri/tasks/PrintParameters",
//		         "esri/config"],
//				function(PrintTask,PrintTemplate,PrintParameters,esriConfig) {
//					esriConfig.defaults.io.proxyUrl = NxgridConfig.MapConfig.proxyUrl;
//					esriConfig.defaults.io.alwaysUseProxy = false;
//					//创建地图打印对象
//					var printMap =new PrintTask(NxgridConfig.MapConfig.nxPrintTaskUrl);  
//					 //创建地图打印模版
//				    var template = new PrintTemplate(); 
//				    //创建地图的打印参数，参数里面包括：模版和地图
//				    var params = new PrintParameters(); 
//				    //输出图片的空间参考
//				    printMap.outSpatialReference = map.SpatialReference;
//				    //打印图片的各种参数
//				    template.exportOptions = {  
//				        width: 800,  
//				        height: 600,  
//				        dpi: 96 
//				    };  
//				    //打印输出的格式
//				    template.format = "PNG32";  
//				    //输出地图的布局
//				    template.layout = "MAP_ONLY";  
//				    //设置参数地图  
//				    params.map = map; 
//				    //设置参数模版
//				    params.template = template;
//				    //运行结果
//				    printMap.execute(params, function(evt){ 
//				    	if (evt != null) { 
//				            //网页打开生成的地图
//				            window.open(evt.url); 
//				        } 
//				    });
//		});
		
	}
	//绘制一块区域，在接下来的操作中只修改该区域内的风向
	com.nxgrid.giscommon.editToolWind.areaDraw=function(){
		NxgridConfig.CommonToolConfig.drawToolAreaWind.activate(esri.toolbars.Draw.FREEHAND_POLYGON);
	}
	//绘制一块区域，在接下来的操作中只修改该区域内的风向
	com.nxgrid.giscommon.editToolWind.areaLineDraw=function(){
		NxgridConfig.CommonToolConfig.drawToolAreaLineWind.activate(esri.toolbars.Draw.FREEHAND_POLYLINE);
	}
	
	com.nxgrid.giscommon.editToolWind.windLineDrawComplete=function(evt) {
		BufferAnalyse.isInArea=false;
		//绘制完线之后，进行缓冲区分析，找到该线缓冲区内的所有格点
		var line = evt.geometry;
		com.nxgrid.giscommon.editToolWind.bufferDistance = $("#windRadius").val();
		var radius=com.nxgrid.giscommon.editToolWind.bufferDistance;
		BufferAnalyse.Dobuffer(line,radius,false);
	}
	
	com.nxgrid.giscommon.editToolWind.windAreaDrawComplete=function(evt) {
		NxgridConfig.CommonToolConfig.drawToolAreaWind.deactivate();
	    var graphic = new esri.Graphic(evt.geometry, new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID,
	    		new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new esri.Color([255,0,0]), 2),new esri.Color([255,255,0,0.25])));
	    map.graphics.add(graphic);
	    //document.getElementById("locationFixDiv").style.display = "block"; 
	    
		com.nxgrid.giscommon.editToolWind.effectGrids=[];
		com.nxgrid.giscommon.editToolWind.effectGraphics=[];
		//绘制完区域之后，查找所有满足条件的点
		var polygon = evt.geometry;
		var gridsAll=JSON.parse(localStorage.getItem("points")); 
		var allLen=gridsAll.length;
		for(var i=0;i<allLen;i++){
			if(gridsAll!=null && gridsAll.length>0) {
				var graphicsCur = getGridGraphicLayer().graphics;
				var gLen = graphicsCur.length;
				
				var p = new esri.geometry.Point(gridsAll[i].lng,gridsAll[i].lat);
	    		if(polygon.contains(p)){
	    			com.nxgrid.giscommon.editToolWind.effectGrids[com.nxgrid.giscommon.editToolWind.effectGrids.length]=gridsAll[i];
	    			for(var j=0;j<gLen;j++){
	    				if(graphicsCur[j].attributes.windDir && gridsAll[i].id==graphicsCur[j].attributes.id){
	    					com.nxgrid.giscommon.editToolWind.effectGraphics[com.nxgrid.giscommon.editToolWind.effectGraphics.length]=graphicsCur[j];
	    					break;
	    				}
	    			}
	    		}
			}
		}
		var extent = evt.geometry.getExtent();
		var xx=extent.xmax-extent.xmin;
		var yy=extent.ymax-extent.ymin;
		if(yy>xx){
			com.nxgrid.giscommon.editToolWind.bufferDistance = parseInt(yy/0.025);
		}
		else{
			com.nxgrid.giscommon.editToolWind.bufferDistance = parseInt(xx/0.025);
		}
		//alert(com.nxgrid.giscommon.editToolWind.bufferDistance)
		com.nxgrid.giscommon.editToolWind.areaLineDraw();
	}
	
	com.nxgrid.giscommon.editToolWind.windAreaLineDrawComplete=function(evt) {
		//绘制完线之后，进行缓冲区分析，找到该线缓冲区内的所有格点
		var line = evt.geometry;
		var radius=com.nxgrid.giscommon.editToolWind.bufferDistance;
		BufferAnalyse.Dobuffer(line,radius,true);
	}
	
})();




