//var LocationEditToolsP=windows.LocationEditToolsP||{};

(function() {
	Namespace.register("com.nxgrid.giscommon.locationEditTools");
	require(
			[ "esri/toolbars/draw", "esri/graphic", "esri/geometry/Point",
					"esri/symbols/SimpleFillSymbol",
					"esri/symbols/SimpleLineSymbol",
					"esri/symbols/SimpleMarkerSymbol", "esri/Color",
					"esri/toolbars/edit", "esri/tasks/GeometryService",
					"dojo/_base/event", ],
			function(Draw, Graphic, Point, SimpleFillSymbol, SimpleLineSymbol,
					SimpleMarkerSymbol, Color, Edit, GeometryService, event) {

				var locationGeometry = null;
				com.nxgrid.giscommon.locationEditTools = {
					locationDraw : function() {
						map.graphics.clear();
						locationGeometry = null;
						NxgridConfig.CommonToolConfig.locationdrawtool
								.activate(Draw.FREEHAND_POLYGON);
					},
					locationEdit : function() {
						var editToolbar = new Edit(map);
						var geometry;
						map.graphics.on("click", function(evt) {
							event.stop(evt);

							editToolbar.activate(Edit.EDIT_VERTICES
									| Edit.SCALE | Edit.ROTATE | Edit.EDIT_TEXT
									| Edit.MOVE, evt.graphic);
							geometry = evt.graphic.geometry;

						});
						com.nxgrid.giscommon.locationEditTools
								.locationEditHandler("vertex-move-stop",
										editToolbar);
						com.nxgrid.giscommon.locationEditTools
								.locationEditHandler("scale-stop", editToolbar);
						com.nxgrid.giscommon.locationEditTools
								.locationEditHandler("graphic-move-stop",
										editToolbar);
						com.nxgrid.giscommon.locationEditTools
								.locationEditHandler("rotate", editToolbar);
						map.on("click", function(evt) {
							editToolbar.deactivate();
						});

					},
					locationDrawComplete : function(evt) {
						var symbol;
						NxgridConfig.CommonToolConfig.locationdrawtool
								.deactivate();
						map.showZoomSlider();
						symbol = new esri.symbol.SimpleFillSymbol();
						var graphic = new esri.Graphic(evt.geometry, symbol);
						map.graphics.add(graphic);
						locationGeometry = evt.geometry;
						document.getElementById("locationFixDiv").style.display = "block";
						// 共享对象
						var mList = JSON.parse(localStorage.getItem("points"));

						if (mList != null && mList.length > 0) {

							var innerPoints = [];
							for (i = 0; i < mList.length; i++) {
								var p = new esri.geometry.Point(mList[i].lng,
										mList[i].lat);
								if (evt.geometry.contains(p)) {
									innerPoints.push(mList[i]);
								}
							}
							localStorage.setItem("innerPoints", JSON
									.stringify(innerPoints));

						} else {
							alert("落区没有格点数据，请重试！");
						}
					},
					locationClear : function() {
						map.graphics.clear();
						document.getElementById("locationFixDiv").style.display = "none";

					},
					locationEditHandler : function(evtName, editToolbar) {
						editToolbar.on(evtName, function(evt) {
							/*
							 * var tmpSymb = new
							 * SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL, new
							 * SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
							 * new Color([255,0,0]), 2),new
							 * Color([255,255,0,0.25]) ); var graphic = new
							 * Graphic(evt.graphic.geometry, tmpSymb);
							 * map.graphics.add(graphic);
							 */
							com.nxgrid.giscommon.locationEditTools
									.locationEdiCompl(evt.graphic.geometry);
						});
					},
					locationEdiCompl : function(geometry)// 落区编辑完成
					{
						var mList = JSON.parse(localStorage.getItem("points"));
						locationGeometry = geometry;
						if (mList != null && mList.length > 0) {
							var innerPoints = [];
							for (var i = 0; i < mList.length; i++) {
								var p = new Point(mList[i].lng, mList[i].lat);
								if (geometry.contains(p)) {
									innerPoints.push(mList[i]);
								}

							}
							localStorage.setItem("innerPoints", JSON
									.stringify(innerPoints));

						} else {
							alert("落区没有格点数据，请重试！");
						}
					},
					getInnerPoints : function() {
						if (locationGeometry == null) {
							$.messager.alert('提示', '请您先绘制区域!');
							return;
						}

						var mList = JSON.parse(localStorage.getItem("points"));
						var lgeo = locationGeometry;
						if (mList != null && mList.length > 0) {
							var innerPoints = [];
							for (var i = 0; i < mList.length; i++) {
								var p = new Point(mList[i].lng, mList[i].lat);
								if (lgeo.contains(p)) {
									innerPoints.push(mList[i]);
								}
							}
							localStorage.setItem("innerPoints", JSON
									.stringify(innerPoints));
						}
					},
					addStep : function() {
						var glval = $("#sw_gl").switchbutton("options").checked;
						var addValue = $("#stepValueSel").combobox('getText');
						addValue = parseFloat(addValue);
						com.nxgrid.giscommon.locationEditTools.getInnerPoints();
						var pList = JSON.parse(localStorage
								.getItem("innerPoints"));
						var mList = JSON.parse(localStorage.getItem("points"));
						if (pList != null && mList != null) {

							for (var i = 0; i < mList.length; i++) {
								for (var j = 0; j < pList.length; j++) {

									if (pList[j].id == mList[i].id) {
										var f = parseFloat(pList[j].value);
										f += addValue;
										f = f.toFixed(2); // 输出结果为 2.45
										mList[i].value = f;
										pList[j].value = f;
										break;

									}
								}
							}

						} else {
							alert("数据加载失败，请重试！");
						}
						localStorage.setItem("points", JSON.stringify(mList));
						localStorage.setItem("innerPoints", JSON
								.stringify(pList));
						// 重绘格点图层
						var tp = mainGrid.elementType;
//						if (addValue != 0 && tp != "PPH03" && tp != "RAT03"
//								&& tp != "Haze03" && tp != "HAIL03"
//								&& tp != "SAND03"&& tp != "SMG03"&& tp != "SSM03"&& tp != "SSM03") {
						if(glval == true){
							com.nxgrid.giscommon.gridTrendService.doTrendArea(
									locationGeometry,
									NxgridConfig.gridTrend.influenceDis, map,
									addValue);
						}

						com.nxgrid.giscommon.locationEditTools.reDrawGrid(JSON
								.parse(localStorage.getItem("innerPoints")));
					},
					decStep : function() {
						var glval = $("#sw_gl").switchbutton("options").checked;
						var decrementValue = $("#stepValueSel").combobox(
								'getText');
						decrementValue = parseFloat(decrementValue);
						com.nxgrid.giscommon.locationEditTools.getInnerPoints();
						var pList = JSON.parse(localStorage
								.getItem("innerPoints"));
						var mList = JSON.parse(localStorage.getItem("points"));
						if (pList != null && mList != null) {
							for (var i = 0; i < mList.length; i++) {
								for (var j = 0; j < pList.length; j++) {
									if (pList[j].id == mList[i].id) {
										var f = parseFloat(pList[j].value);
										f -= decrementValue;
										f = f.toFixed(2); // 输出结果为 2.45
										mList[i].value = f;
										pList[j].value = f;
										break;
									}
								}
							}

						} else {
							alert("数据加载失败，请重试！");
						}
						localStorage.setItem("points", JSON.stringify(mList));
						localStorage.setItem("innerPoints", JSON
								.stringify(pList));
//						if (decrementValue != 0) {
						if(glval == true){
							com.nxgrid.giscommon.gridTrendService.doTrendArea(
									locationGeometry,
									NxgridConfig.gridTrend.influenceDis, map,
									decrementValue * -1);
						}

						// 重绘格点图层
						com.nxgrid.giscommon.locationEditTools.reDrawGrid(JSON
								.parse(localStorage.getItem("innerPoints")));
					},
					doval : function() {
						var glval = $("#sw_gl").switchbutton("options").checked;
						var decrementValue = $("#stepValueSel").combobox(
								'getText');
						decrementValue = parseFloat(decrementValue);
						com.nxgrid.giscommon.locationEditTools.getInnerPoints();
						var pList = JSON.parse(localStorage
								.getItem("innerPoints"));
						var mList = JSON.parse(localStorage.getItem("points"));
						if (pList != null && mList != null) {
							for (var i = 0; i < mList.length; i++) {
								for (var j = 0; j < pList.length; j++) {
									if (pList[j].id == mList[i].id) {
										mList[i].value = decrementValue;
										pList[j].value = decrementValue;
										break;
									}
								}
							}

						} else {
							alert("数据加载失败，请重试！");
						}
						localStorage.setItem("points", JSON.stringify(mList));
						localStorage.setItem("innerPoints", JSON
								.stringify(pList));
						if(glval == true){
							com.nxgrid.giscommon.gridTrendService.doTrendArea(
									locationGeometry,
									NxgridConfig.gridTrend.influenceDis, map,
									decrementValue);
						}

						// 重绘格点图层
						com.nxgrid.giscommon.locationEditTools.reDrawGrid(JSON
								.parse(localStorage.getItem("innerPoints")));
					},
					reDrawGrid : function(pointlist) {
						var graphicLayer = getGridGraphicLayer();
						var gList = getGridGraphicLayer().graphics;
						var pList = pointlist;// JSON.parse(localStorage.getItem("innerPoints"));
						if (pList == null) {
							pList = JSON.parse(localStorage
									.getItem("innerPoints"));
						}
						if (pList != null && gList != null) {
							var type = JSON.parse(localStorage
									.getItem("gridType"));
							for (var i = 0; i < pList.length; i++) {
								for (var j = 0; j < gList.length; j++) {
									if (pList[i].id == gList[j].attributes.id) {
										var f = parseFloat(pList[i].value);
										f = f.toFixed(1);
										getGridGraphicLayer().graphics[j].attributes.gridValue = f;
										getGridGraphicLayer().graphics[j].symbol.text = f;
										// alert("修改后的graphic："+getGridGraphicLayer().graphics[j].attributes.gridValue);
									}
									// 修改编辑区内的格点图例
									if ("cl" + pList[i].id == gList[j].attributes.id) {
										var f = parseFloat(pList[i].value);
										f = f.toFixed(1);
										// getGridGraphicLayer().graphics[j].attributes.gridValue=f;
										// getGridGraphicLayer().graphics[j].symbol.text=f;
										if (type != null) {
											var cl = getRGBNumList(type, f);
											getGridGraphicLayer().graphics[j].symbol.color.r = cl[0];
											getGridGraphicLayer().graphics[j].symbol.color.g = cl[1];
											getGridGraphicLayer().graphics[j].symbol.color.b = cl[2];
										}
									}
									// break;
								}
							}

						} else {
							alert("数据加载失败，请重试！");
						}
						getGridGraphicLayer().redraw();
					},
				/*
				 * toDecimal: function(x){ var f = parseFloat(x); if (isNaN(f)) {
				 * return; } f = Math.round(x*100)/100; return f; }
				 */
				}
			});
})();
