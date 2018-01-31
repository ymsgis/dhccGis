/**
 * author:mars for: color the grid load
 */
var GridColor = window.GridColor || {};
GridColor.loadColor = function(pointarr, graphiclyr, type) {
	var length = pointarr.length;
	var pt1,pt2,dislng,dislat,rlng,rlat;

	var sms, attr;
	if (pointarr == null )
	{
		return;
	}
	else if(length==1)
	{
		var rlng = 0.025;
		var rlat = 0.025;
		
	}else{
		 pt1 = pointarr[0];
		 pt2 = pointarr[1];
		 dislat = getRlat(pointarr);
		 dislng = pt2.lng - pt1.lng;
		 rlng = dislng / 2;
		 rlat = dislat / 2;
	}
	for (var i = 0; i < pointarr.length; i++) {
		var lat = pointarr[i].lat;
		var log = pointarr[i].lng;
		var value = pointarr[i].value;
		var pt = pointarr[i];
		// var ext = new
		// esri.geometry.Extent(pt.lng-r,pt.lat-r,pt,pt.lng+r,pt.lat+r,graphiclyr.getMap().spatialReference);
		var polygonJson = {
			"rings" : [ [ [ pt.lng - rlng, pt.lat - rlat ],
					[ pt.lng + rlng, pt.lat - rlat ],
					[ pt.lng + rlng, pt.lat + rlat ],
					[ pt.lng - rlng, pt.lat + rlat ],
					[ pt.lng - rlng, pt.lat - rlat ] ] ]
		};

		var polygon = new esri.geometry.Polygon(polygonJson);
		polygon.setSpatialReference(graphiclyr.getMap().spatialReference);

		var cl=getRGBNumList(type,value);
		localStorage.setItem("gridType", JSON.stringify(type));
		sms = new esri.symbol.SimpleFillSymbol().setStyle(
				esri.symbol.SimpleFillSymbol.STYLE_SOLID).setColor(
				new esri.Color([ cl[0], cl[1], cl[2], 0.5 ])).setOutline(
				new esri.symbol.SimpleLineSymbol()
						.setStyle(esri.symbol.SimpleLineSymbol.STYLE_NULL));

		attr = {
			"id" : "cl"+pointarr[i].id,
			"log" : log,
			"lat" : lat,
			"gridValue" : value
		};
		var graphic = new esri.Graphic(polygon, sms, attr);
		graphiclyr.add(graphic);
	}
}

GridColor.getSmsByColor= function(type,value){
	var cl=getRGBNumList(type,value);
	var sms = new esri.symbol.SimpleFillSymbol().setStyle(
			esri.symbol.SimpleFillSymbol.STYLE_SOLID).setColor(
			new esri.Color([ cl[0], cl[1], cl[2], 0.5 ])).setOutline(
			new esri.symbol.SimpleLineSymbol()
					.setStyle(esri.symbol.SimpleLineSymbol.STYLE_NULL));
	return sms;
}

function getRlat(pointarr) {

	var pt1 = pointarr[0];
	for (var i = 0; i < pointarr.length; i++) {
		var pt = pointarr[i];
		if (pt.lat == pt1.lat)
			continue;

		return (pt.lat - pt1.lat);
	}
}
