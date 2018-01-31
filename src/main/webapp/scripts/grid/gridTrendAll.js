/**
 * 趋势订正 影像周报连续性判定修改 mars
 */
(function() {
	Namespace.register("com.nxgrid.giscommon.gridTrendService");
	require([ "esri/Color", "esri/map", "esri/graphic", "esri/graphicsUtils",
			"esri/tasks/Geoprocessor", "esri/tasks/FeatureSet",
			"esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol",
			"esri/symbols/SimpleFillSymbol", "esri/geometry/Point",
			"esri/geometry/Polygon", "esri/tasks/query",
			"esri/symbols/CartographicLineSymbol",
			"esri/geometry/geometryEngine", "esri/units" ], function(Color,
			Map, Graphic, graphicsUtils, Geoprocessor, FeatureSet,
			SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Point,
			Polygon, Query, CartographicLineSymbol, geometryEngine, units) {

		com.nxgrid.giscommon.gridTrendService = {

			// 做连续性分析展示 geometry为做分析的对象，dis为半径
			doTrendArea : function(geometry, dis, map, tval) {
				var mList = JSON.parse(localStorage.getItem("points"));
				if (mList == null || mList.length == 0) {
					alert("请先加载格点!");
					return;
				}
				var trendArr = [];

				var rst = geometryEngine.geodesicBuffer(geometry, [ dis ],
						"kilometers");
				if (rst == null) {
					return;
				}
				for (var i = 0; i < mList.length; i++) {
					var p = new Point(mList[i].lng, mList[i].lat,
							new esri.SpatialReference({
								wkid : 4326
							}));

					if (geometry.contains(p)) {
						continue;
					}

					// 缓冲区内的
					if (rst.contains(p)) {
						var val = parseFloat(mList[i].value)
								+ parseFloat(tval * 0.5);
						var bufferobj = mList[i];
						bufferobj.value = val.toFixed(1);
						trendArr.push(bufferobj);
						mList[i].value = val.toFixed(2);
					}
				}
				localStorage.setItem("points", JSON.stringify(mList));
				com.nxgrid.giscommon.locationEditTools.reDrawGrid(trendArr);
			}
		}

		// 修改当前graphiclayer的值
		function setTrendGraphicLayer(trendArr) {
			var pList = JSON.parse(localStorage.getItem("innerPoints"));

			if (pList != null && trendArr != null) {
				for (var i = 0; i < pList.length; i++) {
					trendArr.push(pList[i]);
				}
			}
			localStorage.setItem("innerPoints", JSON.stringify(trendArr));
		}

		function getTrendValue(distance) {
			var strtrend = NxgridConfig.gridTrend.disAndValue;
			var trarr = strtrend.split(";");
			var tpval = "";
			for (var i = 0; i < trarr.length; i++) {
				var tp = trarr[i];
				var dis = tp.substr(0, tp.indexOf(","));
				var val = tp.substr(tp.indexOf(",") + 1);
				if (distance <= dis) {
					tpval = val;
					break;
				}
			}
			return tpval;
		}

	})
})();