function editHandler(t){
	//console.log($('#selDiv'));
		
		if(t=="全区"){	
			$('#selDiv').hide();
			$.ajax({
				type:"POST",
				url:NxgridConfig.LocationEditToolsP.nxGetallUrl,
				datatype:'json',
				success:function(data){
					var result=data;
					var codeValue=result[0].code;
					var codeName="DISTCODE";
					var sqlStr=codeName+" = "+"'"+codeValue+"'";
					var url=NxgridConfig.MapConfig.nxadmiUrl+"0";
					//com.nxgrid.giscommon.admiAreaEditTools.queryHandler(sqlStr,url);
					admiQueryHandler(sqlStr,url);
				},
				error:function(resp, msg)
				{
					alert("ajax请求失败！");
				}
			});
			
		}else if(t=="请选择边界")
		{
			$('#selDiv').hide();
		}
		else{			
			$('#selDiv').show();
			var codeName="DIST_CODE";
			var url=NxgridConfig.MapConfig.nxadmiUrl+"1";
			var sqlStr=codeName+" = "+t;
			//com.nxgrid.giscommon.admiAreaEditTools.queryHandler(sqlStr,url);
			admiQueryHandler(sqlStr,url);
			$('#xduty').combobox('clear');
			$('#xduty').combobox({
				url:NxgridConfig.LocationEditToolsP.nxGetcntyUrl+t,
				valueField:'code',
				textField:'name',
				onSelect: function (record) {
					var codeName="CNTY_CODE";
					var codeValue=record.code;
					var xurl=NxgridConfig.MapConfig.nxadmiUrl+"2";
					var sqlStr=codeName+" = "+codeValue;
					//com.nxgrid.giscommon.admiAreaEditTools.queryHandler(sqlStr,xurl);
					admiQueryHandler(sqlStr,xurl);
				}
					
			});
			$(".textbox").css("width", 100);
		}
	}
function admiQueryHandler(sqlStr,url)
{
	require([
		"esri/tasks/query", 
		"esri/tasks/QueryTask",
	],function(Query,QueryTask){
		var query = new Query();
		var queryTask = new QueryTask(url);
		query.where =sqlStr;
		query.outSpatialReference = {wkid:4326}; 
		query.returnGeometry = true;
		query.outFields = ["*"];
		queryTask.execute(query, com.nxgrid.giscommon.admiAreaEditTools.queryComplete);
	});
}

function doZone(){
	var value = $("#yxfj").val();
	com.nxgrid.giscommon.admiAreaEditTools.setValue(value);
}

function doPlus(){
	var value = $("#btnBxPlus").text();
	var text = $("#btnVal").val();
	if(value!=null && text!=""){
		com.nxgrid.giscommon.admiAreaEditTools.changeValue(value, text);
	}
	else{
		return;
	}
}

function doReduce(){
	var value = $("#btnBxReduce").text();
	var text = $("#btnVal").val();
	if(value!=null && text!=""){
		com.nxgrid.giscommon.admiAreaEditTools.changeValue(value, text);
	}
	else{
		return;
	}
}

(function(){
	Namespace.register("com.nxgrid.giscommon.admiAreaEditTools");
	require([
		"esri/tasks/query", 
		"esri/tasks/QueryTask",
		"esri/graphic",
		"esri/geometry/Point",
		"esri/symbols/SimpleFillSymbol",
		"esri/symbols/SimpleLineSymbol",
		"esri/Color",
		"esri/SpatialReference"
	],
	function(
		Query,QueryTask,Graphic,Point,SimpleFillSymbol,SimpleLineSymbol,Color,SpatialReference
	){	
		com.nxgrid.giscommon.admiAreaEditTools=
		{
			curCenter:null,
			queryHandler:function(sqlStr,url){
				var query = new Query();
				var queryTask = new QueryTask(url);
				query.where =sqlStr;
				query.outSpatialReference = {wkid:4326}; 
				query.returnGeometry = true;
				query.outFields = ["*"];
				queryTask.execute(query, com.nxgrid.giscommon.admiAreaEditTools.queryComplete);
			},
			dupl_removal:function(rList){
				var res = [];
				var json = {};
				for(var i = 0; i < rList.length; i++){
				  if(!json[rList[i]]){
					res.push(rList[i]);
					json[rList[i]] = 1;
				  }
				}
				return res;
			},
			queryComplete:function(result)
			{
				map.graphics.clear();
				var tmpSymb = new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL,
					    new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
					    	    new Color([255,0,0]), 2),new Color([255,255,0,0.25])
					    	  );
				var v=result.features;
				var mList = JSON.parse(localStorage.getItem("points"));
				var geometry=v[0].geometry;
				var cPoint=geometry.getCentroid();
				com.nxgrid.giscommon.admiAreaEditTools.curCenter=geometry.getCentroid();
				var graphic = new Graphic(geometry, tmpSymb);
				map.graphics.add(graphic);
				if(v[0].attributes.CNTY_CODE!=null)
				{
					map.centerAndZoom(cPoint,5);
				}else if(v[0].attributes.DIST_CODE!=null)
				{
					map.centerAndZoom(cPoint,4);
				}else{
					map.centerAndZoom(cPoint,3);
				}
				var tempList=[];
				if(mList!=null)
				{
					for (var i = 0; i < mList.length; i++) 
					{
						var p = new Point(mList[i].lng, mList[i].lat,new SpatialReference({ wkid:4326 }));
						
						if (geometry.contains(p)) {
							
							var tempMap= new Object();
							tempMap=mList[i];
							tempList.push(tempMap);
						
						}

					}
					localStorage.setItem("innerPoints",JSON.stringify(tempList));
				}else
				{
					alert("没有加载数据，请重试！");
					var pane = $('#contentPane');
					var contentUrl = pane.context.URL;
					var indexv=contentUrl.indexOf('/gridview/main');
					if(contentUrl.indexOf('/gridview/main')==-1) {
						pane.attr('src', '${contextPath}/gridview/main?showRight=true');
						return;
					}
					var cwin = pane[0].contentWindow;
					cwin.showRightPane();
				}
			},
			setValue:function(value)
			{
				var mList = JSON.parse(localStorage.getItem("points"));
				var pList=JSON.parse(localStorage.getItem("innerPoints"));
				if(pList!=null && mList!=null)
				{
					for(var i=0;i<mList.length;i++)
					{
						for(var j=0;j<pList.length;j++)
						{
							
							if(pList[j].id==mList[i].id)
							{
								pList[j].value=value;
								mList[i].value=value;
							}
						}
					}
				}
				localStorage.setItem("points",JSON.stringify(mList));
				localStorage.setItem("innerPoints",JSON.stringify(pList));
				com.nxgrid.giscommon.locationEditTools.reDrawGrid(null);
			},
			changeValue:function(chaName,decStep)
			{
				var pList=JSON.parse(localStorage.getItem("innerPoints")); 
				var mList=JSON.parse(localStorage.getItem("points")); 
				if(pList!=null && mList!=null)
				{
					
					for(i=0;i<mList.length;i++)
					{
						for(j=0;j<pList.length;j++)
						{
							
							if(pList[j].id==mList[i].id)
							{
								var f= parseFloat(pList[j].value); 
								if(chaName=="-")
								{
									f -= parseFloat(decStep);
								}else if(chaName=="+")
								{
									f += parseFloat(decStep);
								}
								
								
								f= f.toFixed(2); // 输出结果为 2.45
								mList[i].value=f;
								pList[j].value=f;
								break;
							}
						}
					}
					
				}else 
				{
					alert("数据加载失败，请重试！");
				}
				localStorage.setItem("points",JSON.stringify(mList)); 
				localStorage.setItem("innerPoints",JSON.stringify(pList));
				//重绘格点图层
				com.nxgrid.giscommon.locationEditTools.reDrawGrid(null);
			}
		};
	});
})();