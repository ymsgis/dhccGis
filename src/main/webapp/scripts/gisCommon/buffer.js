/**
 * 缓冲区分析
 */
(function() {
	Namespace.register("com.nxgrid.giscommon.buffer");
	require([
	 	    "esri/tasks/BufferParameters",	 	   
	 	  ],function(BufferParameters) {
	com.nxgrid.giscommon.buffer.isInArea=false;
	com.nxgrid.giscommon.buffer.pathIndex=0;
	com.nxgrid.giscommon.buffer.windDir=0;
	com.nxgrid.giscommon.buffer.distance=0;
	com.nxgrid.giscommon.buffer.paths;
	
	com.nxgrid.giscommon.buffer.doBuffer=function(polyline,distance,hasDrawArea){
		com.nxgrid.giscommon.buffer.isInArea = hasDrawArea;
		com.nxgrid.giscommon.buffer.distance = distance;
		com.nxgrid.giscommon.buffer.paths = polyline.paths[0];
		com.nxgrid.giscommon.buffer.pathIndex=0;
		com.nxgrid.giscommon.buffer.bufferService();
	}
	
	com.nxgrid.giscommon.buffer.bufferService=function(){
		var bufferParameters = new esri.tasks.BufferParameters();
		var len = com.nxgrid.giscommon.buffer.paths.length;
		var step = parseInt(len/5);
		var patIndexEnd = com.nxgrid.giscommon.buffer.pathIndex+step;
		if(patIndexEnd>(len-1)){
			patIndexEnd = len-1;
		}
		com.nxgrid.giscommon.buffer.windDir = com.nxgrid.giscommon.buffer.calculateAngle(com.nxgrid.giscommon.buffer.paths[com.nxgrid.giscommon.buffer.pathIndex][0],
				com.nxgrid.giscommon.buffer.paths[com.nxgrid.giscommon.buffer.pathIndex][1],
				com.nxgrid.giscommon.buffer.paths[patIndexEnd][0],
				com.nxgrid.giscommon.buffer.paths[patIndexEnd][1]);
		bufferParameters.geometries =[new esri.geometry.Polyline([com.nxgrid.giscommon.buffer.paths[com.nxgrid.giscommon.buffer.pathIndex],
		                                                          com.nxgrid.giscommon.buffer.paths[patIndexEnd]])];
		bufferParameters.distances = [com.nxgrid.giscommon.buffer.distance];
		bufferParameters.unit = esri.tasks.GeometryService.UNIT_KILOMETER;
		bufferParameters.bufferSpatialReference = new esri.SpatialReference({wkid:32662});
		bufferParameters.outSpatialReference = map.spatialReference;
		
		com.nxgrid.giscommon.buffer.pathIndex = patIndexEnd;
		
		var geomertryservice = new esri.tasks.GeometryService(NxgridConfig.MapConfig.geomertryServiceUrl);
		geomertryservice.buffer(bufferParameters,com.nxgrid.giscommon.buffer.bufferAnalyse);
	}
	
	com.nxgrid.giscommon.buffer.bufferAnalyse=function(buffer){
		if(com.nxgrid.giscommon.buffer.pathIndex<com.nxgrid.giscommon.buffer.paths.length-1){
			com.nxgrid.giscommon.buffer.bufferService();		
		}
		var geo=buffer[0];
		var gridsAll;
		if(com.nxgrid.giscommon.buffer.isInArea){
			gridsAll=com.nxgrid.giscommon.editToolWind.effectGrids;
		}
		else{
			gridsAll=JSON.parse(localStorage.getItem("points"));
		}
		
		var allLen=gridsAll.length;
		if(gridsAll!=null && gridsAll.length>0) {
			var graphicsCur;
			if(com.nxgrid.giscommon.buffer.isInArea){
				graphicsCur = com.nxgrid.giscommon.editToolWind.effectGraphics;
			}
			else{
				graphicsCur = getGridGraphicLayer().graphics;
			}
			var gLen = graphicsCur.length;
			
	    	for(var i=0;i<allLen;i++){
	    	    var p = new esri.geometry.Point(gridsAll[i].lng,gridsAll[i].lat);
	    		if(geo.contains(p)){
	    			gridsAll[i].dir = com.nxgrid.giscommon.buffer.windDir;
	    			for(var j=0;j<gLen;j++){
	    				if(graphicsCur[j].attributes.windDir && gridsAll[i].id==graphicsCur[j].attributes.id){
	    					graphicsCur[j].attributes.windDir = com.nxgrid.giscommon.buffer.windDir;
	    					graphicsCur[j].symbol = com.nxgrid.giscommon.symboltool.getWindSymbols(
	    							graphicsCur[j].attributes.gridValue,graphicsCur[j].attributes.windDir);
	    					break;
	    				}
	    			}
	    		}
	    	}
	    	getGridGraphicLayer().redraw();
	    	//alert(getGridGraphicLayer().graphics.length+"=///==len")
	    }
		else{
	    	alert("缓冲区内没有格点数据，请重试！");
	    }
	}
	
	com.nxgrid.giscommon.buffer.calculateAngle=function(ptStartX,ptStartY,ptEndX,ptEndY){
//		var diffX=ptEndX-ptStartX;
//		var diffY=ptEndY-ptStartY;
//		var angle=360*Math.atan(diffY/diffX)/(2*Math.PI);
//		if(diffX>0&&diffY<=0){  
//            angle=(90-angle)+90;  
//	    }  
//	    else if(diffX<=0&&diffY<0){  
//	        angle=angle+180;  
//	    }else if(diffX<0&&diffY>=0){  
//	        angle= (90-angle)+270;  
//	    }  
//		return angle;
		var objStart=com.nxgrid.giscommon.buffer.getRcRj(ptStartX,ptStartY);
		var objEnd=com.nxgrid.giscommon.buffer.getRcRj(ptEndX,ptEndY);
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
        return angle; 
	}
	
	com.nxgrid.giscommon.buffer.getRcRj=function(longitude,latitude){
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
	})})();
