/**
 * 缓冲区分析类
 */
var BufferAnalyse = window.BufferAnalyse || {};

require(["esri/geometry/geometryEngine",
         "esri/geometry/Point"], 
		function(geometryEngine,Point) { 
	
	BufferAnalyse.Dobuffer=function(line,radius,isArea){
		var path=line.paths[0];
		var len=path.length-1;
		var lineArr=[];
		var angleArr=[];
		for(var i=0;i<len;i++){
			lineArr[i]=new esri.geometry.Polyline({
			    			"paths":[[path[i],path[i+1]]],
			    			"spatialReference":{"wkid":4326}});
			angleArr[i] = BufferAnalyse.calculateAngle(path[i][0],path[i][1],path[i+1][0],path[i+1][1]);
		}
		var polygonArr = geometryEngine.geodesicBuffer(lineArr,radius,"kilometers",false);
		var gridsAll;
		if(isArea){
			gridsAll=com.nxgrid.giscommon.editToolWind.effectGrids;
		}
		else{
			gridsAll=JSON.parse(localStorage.getItem("points"));
		}
		
		if(gridsAll!=null && gridsAll.length>0) {
			var allLen=gridsAll.length;
			var graphicsCur;
			if(isArea){
				graphicsCur = com.nxgrid.giscommon.editToolWind.effectGraphics;
			}
			else{
				graphicsCur = getGridGraphicLayer().graphics;
			}
			var gLen = graphicsCur.length;
			var pLen = polygonArr.length;
			for(var ind=0;ind<pLen;ind++){
				for(var i=0;i<allLen;i++){
		    	    var p = new Point(gridsAll[i].lng,gridsAll[i].lat);
		    		if(polygonArr[ind].contains(p)){
		    			gridsAll[i].dir = angleArr[ind];
		    			for(var j=0;j<gLen;j++){
		    				if(graphicsCur[j].attributes.windDir && gridsAll[i].id==graphicsCur[j].attributes.id){
		    					graphicsCur[j].attributes.windDir = angleArr[ind];
		    					graphicsCur[j].symbol = com.nxgrid.giscommon.symboltool.getWindSymbols(
		    							graphicsCur[j].attributes.gridValue,graphicsCur[j].attributes.windDir);
		    					break;
		    				}
		    			}
		    		}
		    	}
			}
			
			if(isArea){
				var mList = JSON.parse(localStorage.getItem("points"));
				var mLen = mList.length;
				if(mList!=null){
					for(var j=0;j<allLen;j++){
						for (var i = 0; i < mLen; i++){
							if(mList[i].id==gridsAll[j].id){
								mList[i].dir=gridsAll[j].dir;
								break;
							}
						}
					}
				}
				localStorage.setItem("points",JSON.stringify(mList));
			}
			else{
				localStorage.setItem("points",JSON.stringify(gridsAll));
			}
			
	    	getGridGraphicLayer().redraw();
	    	//alert(getGridGraphicLayer().graphics.length+"=///==len")
	    }
		else{
	    	alert("缓冲区内没有格点数据，请重试！");
	    }
	}

	/**
	 * 根据两点，计算风向
	 * ptStartX,ptStartY,ptEndX,ptEndY：起点的经纬度；终点的经纬度
	 */
	BufferAnalyse.calculateAngle=function(ptStartX,ptStartY,ptEndX,ptEndY){
		var objStart=BufferAnalyse.getRcRj(ptStartX,ptStartY);
		var objEnd=BufferAnalyse.getRcRj(ptEndX,ptEndY);
		var dx=(objEnd.m_RadLo-objStart.m_RadLo)*objStart.Ed;  
	    var dy=(objEnd.m_RadLa-objStart.m_RadLa)*objStart.Ec;  
	    var angle=0; 
	    angle=Math.atan(Math.abs(dx/dy))*180/Math.PI;  
	    var dLo=objEnd.m_Longitude-objStart.m_Longitude;
	    var dLa=objEnd.m_Latitude-objStart.m_Latitude;
	    if(dLo>0&&dLa<=0){  
	        angle=(90-angle)+90;  
	    }  
	    else if(dLo<=0&&dLa<0){  
	        angle=angle+180;  
	    }else if(dLo<0&&dLa>=0){  
	        angle= (90-angle)+270;  
	    }  
	    return angle+180; 
	}

	BufferAnalyse.getRcRj=function(longitude,latitude){
		const Rc=6378137;
		const Rj=6356725;
		var m_Longitude=longitude;  
	    var m_Latitude=latitude; 
	    var m_RadLo=longitude*Math.PI/180;  
	    var m_RadLa=latitude*Math.PI/180; 
		var Ec = Rj+(Rc-Rj)*(90.-m_Latitude)/90;
		var Ed=Ec*Math.cos(m_RadLa);
		return {m_RadLo:m_RadLo,m_RadLa:m_RadLa,m_Longitude:m_Longitude,m_Latitude:m_Latitude,Ed:Ed,Ec:Ec};
	}
});
