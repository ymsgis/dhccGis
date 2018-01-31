//落区订正——落区绘制
function lq_draw(){
	com.nxgrid.giscommon.locationEditTools.locationDraw();
}
//落区订正——落区clear
function lq_clear(){
	com.nxgrid.giscommon.locationEditTools.locationClear();
}

//落区订正——落区拾取
function lq_get(){
	 com.nxgrid.giscommon.locationEditTools.locationEdit();
}

//落区订正——落区编辑
function lq_get(){
	 com.nxgrid.giscommon.locationEditTools.locationEdit();
}

//清空graphic
function clearGraphicLayer(){
	gridGraphicLayer.clear();
	localStorage.clear();
	var ldiv = document.getElementById("temperCorLegend");
	ldiv.style.visibility = "hidden";
	map.graphics.clear();
	NxgridConfig.CommonToolConfig.drawToolAreaWind.deactivate();
	NxgridConfig.CommonToolConfig.drawToolAreaLineWind.deactivate();
	NxgridConfig.CommonToolConfig.drawToolLineWind.deactivate();
	localStorage.setItem("realTime","false");
	clearImportantLegend();
	clearMapTips();
	mainGrid.type="";
}
function clearRenderLayer(){
	renderLayer.clear();
}
//区域订正
function zoneChange(){
	var objS = document.getElementById("zoneduty");
    var t = objS.options[objS.selectedIndex].value;	
	editHandler(t);
//	graphicChange.remove(_graphic);
} 
//单点趋势
var graphicChange;
function showPointTrend(){
	if($(".chartBox").css("visibility") == 'hidden'){
			$(".chartBox").css("visibility", "visible");
			showReleaseTime();
			graphicChange = getGridGraphicLayer().on("click", clickHandler);
			$(".trend").css("display","none");
			$(".zone").css("display","none");
			$(".fallarea").css("display","none");
			$(".seal").css("display","none");
			$(".winddirt").css("display","none");	
		}else if($(".chartBox").css("visibility") == 'visible'){
			$(".chartBox").css("visibility","hidden");
//			deleteNode();
			graphicChange.remove(_graphic);
		}
}
