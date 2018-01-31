/**
 * 格点合并
 */
var UnionGrid = window.UnionGrid || {};

UnionGrid.type;
UnionGrid.lvl;
UnionGrid.union=function(grids){
	UnionGrid.type = grids[0].type;
	UnionGrid.lvl = grids[0].lvl;
	var len = grids.length;
	var geos=[];
	for(var i=0;i<len;i++){
		var geo = new esri.geometry.Polygon([[grids[i].lonMin,grids[i].latMin],
		                                     [grids[i].lonMin,grids[i].latMax],
		                                     [grids[i].lonMax,grids[i].latMax],
		                                     [grids[i].lonMax,grids[i].latMin]]);
		geos[i]=geo;
	}
	var geomertryservice = new esri.tasks.GeometryService(NxgridConfig.MapConfig.geomertryServiceUrl);
	geomertryservice.union(geos,UnionGrid.unionHandler);
}

UnionGrid.unionHandler=function(unions){
	alert(unions.length);
	var len = unions.length;
	var date = new Date();
	var hour = date.hour<12?8:20;
	var dzArr=[];
	for (var i=0;i<len;i++){
		var dz = {date:date,hour:hour,type:UnionGrid.type,
				level:UnionGrid.lvl,coords:unions[i].rings};
		dzArr[i]=dz;
	}
	 $.ajax({     
         //要用post方式      
         type: "Post",     
         //方法所在页面和方法名      
         url: NxgridConfig.disaster.savelistUrl,     
         contentType: "application/json; charset=utf-8",     
         dataType: "json", 
         data:dzArr,
         success: function(data) {     
             //返回的数据用data.d获取内容      
             alert(data.d);     
         },     
         error: function(err) {     
             alert(err);     
         }     
     });
}