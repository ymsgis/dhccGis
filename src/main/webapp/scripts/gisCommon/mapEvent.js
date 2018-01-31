/**
 * 地图事件处理js文件
 * 
 * @param event
 */
function myMapExtentChangeHandler(event) {
	//实况展示
	var real = localStorage.getItem("realTime");
	if (real == "true") {
		var qdate = localStorage.getItem("satationDate");
		var pdata = {
			"qdate" : qdate
		};
		NxgridRealtime.loadStation(pdata);
	}
	var type;
	try {
		type = $("#rightPanel")[0].contentWindow.$('#currentElement').combobox(
				'getValue');
	} catch (err) {
		if (localStorage.getItem("curGridType") != null)
			type = localStorage.getItem("curGridType");
		else
			return;
	}

	var result = localStorage.getItem("points");

	if (result == null) {
		result = localStorage.getItem("livePoints");
		if (result == null) {
			return;
		}
	}
	var graphicLayer = getGridGraphicLayer();
	// var colorlyr = getColorGraphicLayer();
	graphicLayer.clear();
	// colorlyr.clear();
	var pointsarr = JSON.parse(result);
	GridLoad.AddGraphic(gridType[type], map.getLevel(), pointsarr,
			graphicLayer, graphicLayer);
}
