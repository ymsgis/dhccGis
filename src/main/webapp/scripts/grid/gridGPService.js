/**
 * 等值线和等值面服务
 */
(function() {
	Namespace.register("com.nxgrid.giscommon.gridGPService");
	require(
			[ "esri/Color", "esri/map", "esri/graphic", "esri/graphicsUtils",
					"esri/tasks/Geoprocessor", "esri/tasks/FeatureSet",
					"esri/layers/GraphicsLayer", "esri/Color",
					"esri/layers/ImageParameters",
					"esri/symbols/SimpleMarkerSymbol",
					"esri/symbols/SimpleLineSymbol",
					"esri/symbols/SimpleFillSymbol", "esri/geometry/Point",
					"esri/geometry/Polygon", "esri/tasks/query",
					"esri/symbols/CartographicLineSymbol" ],
			function(Color, Map, Graphic, graphicsUtils, Geoprocessor,
					FeatureSet, GraphicsLayer, Color,ImageParameters,SimpleMarkerSymbol,
					SimpleLineSymbol, SimpleFillSymbol, Point, Polygon, Query,
					CartographicLineSymbol) {

				var dzxUrl = _ArcGISRoot
				+ "/arcgis/rest/services/gp/GridDZMKring/GPServer/GridDZXKring";
				var dzmUrl = _ArcGISRoot
				+ "/arcgis/rest/services/gp/GridDZMKring/GPServer/GridDZMKring";
				var xzqUrl = _ArcGISRoot
						+ "/arcgis/rest/services/nx/XZQ_DYNAMIC/MapServer/0";
				var krUrl= _ArcGISRoot
				+ "/arcgis/rest/services/NXgrid/KringRaster/GPServer/GridKringR";
				var gpDZX = null;
				var gpDZM = null;
				var gridKr=null;
				var query = null;
				var gpMap = null;
				com.nxgrid.giscommon.gridGPService = {

					excuteDZX :  function(inputData, index, reclassification,
							smoothTol, map) {

						if (inputData == null || inputData.length == 0) {
							alert("没有格点信息！");
							return;
						}
						// 获取裁剪边界
						var query = new esri.tasks.Query();
						var fearturelayer = new esri.layers.FeatureLayer(xzqUrl);
						var query = new esri.tasks.Query();
						// 空间参考
						query.OutputSpatialReference = {
							wkid : 4326
						};
						query.outFields = [ "*" ];// 返回指定字段
						query.returnGeometry = true;// 返回图形
						query.where = "1=1";
						var querytask = new esri.tasks.QueryTask(xzqUrl);
						querytask.execute(query, getResluts);
						//等值面裁剪要素获取
						function getResluts(resluts) {

							if (resluts != null) {
								gpMap = map;
								var pointsarr = JSON.parse(inputData);
								var features = [];
								for (i = 0; i < pointsarr.length; i++) {
									if (i % 100 != 0)
										continue;
									var pt = new Point(pointsarr[i].lng,
											pointsarr[i].lat);
									var attr = {
										"Field3" : pointsarr[i].value
									};
									var graphic = new Graphic(pt, null, attr);
									features.push(graphic);
								}
								//格点要素集
								var featureSet = new FeatureSet();
								featureSet.features = features;
								//行政区裁剪要素集
								var clipfeatureSet = new FeatureSet();
								clipfeatureSet.features = resluts.features;
								
								// 平滑系数
								var dis = new esri.tasks.LinearUnit();
								dis.distance = smoothTol;
								dis.units = esri.Units.DECIMAL_DEGREES;
                                //gp参数
								var params = {
									"InputPoints" : featureSet,
									"Z_value_field" : index,
									"Reclassification" : reclassification,
									"ClipFeature" : clipfeatureSet,
									"Smoothing_Tolerance" : dis
								};
                                //代理服务器（解决GET方法参数长度过长的问题）
								esri.config.defaults.io.proxyUrl = "/proxy/proxy.jsp";
								esriConfig.defaults.io.alwaysUseProxy = false;

								window.parent.showBusy();
								//GP服务对象
								gpDZX = new Geoprocessor(NxgridConfig.MapConfig.dzxUrl);
								gpDZX.setOutputSpatialReference({
									wkid : 4326
								});
								gpDZX.submitJob(params, getResultLines,statusCallback, gpJobFailed);
							} else {
								alert("裁剪要素查询出错了！");
							}
						}
					},
					//克里金插值
					excuteKring:function(inputData,index,map){
						if (inputData == null || inputData.length == 0) {
							alert("没有格点信息！");
							return;
						}
						// 获取裁剪边界
						var query = new esri.tasks.Query();
						var fearturelayer = new esri.layers.FeatureLayer(xzqUrl);
						var query = new esri.tasks.Query();
						// 空间参考
						query.OutputSpatialReference = {
							wkid : 4326
						};
						query.outFields = [ "*" ];// 返回指定字段
						query.returnGeometry = true;// 返回图形
						query.where = "1=1";
						var querytask = new esri.tasks.QueryTask(xzqUrl);
						querytask.execute(query, getResluts);
						//等值面裁剪要素获取
						function getResluts(resluts) {

							if (resluts != null) {
								gpMap = map;
								var pointsarr = JSON.parse(inputData);
								var features = [];
								for (i = 0; i < pointsarr.length; i++) {
									if (i % 100 != 0)
										continue;
									var pt = new Point(pointsarr[i].lng,
											pointsarr[i].lat);
									var attr = {
										"Field3" : pointsarr[i].value
									};
									var graphic = new Graphic(pt, null, attr);
									features.push(graphic);
								}
								//格点要素集
								var featureSet = new FeatureSet();
								featureSet.features = features;
								//行政区裁剪要素集
								var clipfeatureSet = new FeatureSet();
								clipfeatureSet.features = resluts.features;
								 //gp参数
								var params = {
									"InputGrid" : featureSet,
									"index" : index,
									"ClipFeature" : clipfeatureSet
								};
								 //代理服务器（解决GET方法参数长度过长的问题）
								esri.config.defaults.io.proxyUrl = "/proxy/proxy.jsp";
								esriConfig.defaults.io.alwaysUseProxy = false;

								window.parent.showBusy();
								//GP服务对象
								gridKr = new Geoprocessor(krUrl);
								gridKr.submitJob(params, getResultImg,statusCallback, gpJobFailed);
								
							}
						}
					},
					// 等值面绘制函数
					excuteDZM : function(inputData, index, reclassification,
							smoothTol, map) {

						if (inputData == null || inputData.length == 0) {
							alert("没有格点信息！");
							return;
						}
						// 获取裁剪边界
						var query = new esri.tasks.Query();
						var fearturelayer = new esri.layers.FeatureLayer(xzqUrl);
						var query = new esri.tasks.Query();
						// 空间参考
						query.OutputSpatialReference = {
							wkid : 4326
						};
						query.outFields = [ "*" ];// 返回指定字段
						query.returnGeometry = true;// 返回图形
						query.where = "1=1";
						var querytask = new esri.tasks.QueryTask(xzqUrl);
						querytask.execute(query, getResluts);
						//等值面裁剪要素获取
						function getResluts(resluts) {

							if (resluts != null) {
								gpMap = map;
								var pointsarr = JSON.parse(inputData);
								var features = [];
								for (i = 0; i < pointsarr.length; i++) {
									if (i % 100 != 0)
										continue;
									var pt = new Point(pointsarr[i].lng,
											pointsarr[i].lat);
									var attr = {
										"Field3" : pointsarr[i].value
									};
									var graphic = new Graphic(pt, null, attr);
									features.push(graphic);
								}
								//格点要素集
								var featureSet = new FeatureSet();
								featureSet.features = features;
								//行政区裁剪要素集
								var clipfeatureSet = new FeatureSet();
								clipfeatureSet.features = resluts.features;
								//////////矩形裁剪\\\\\\\\\\\\\\\\\\\\\\\\\\\\
								/*var polygonJson = {
										"rings" : [ [ [ 107.800, 39.500 ], [ 107.800, 35.100 ],
												[ 104.150, 35.100 ], [ 104.150, 39.500 ], [ 107.800, 39.500 ] ] ],
										"spatialReference" : {
											"wkid" : 4326
										}
									};
								var polygon = new esri.geometry.Polygon(polygonJson);
								var featureSetPolygon = new FeatureSet();
								var featuresPolygon = [];
								featuresPolygon.push(new Graphic(polygon));
								featureSetPolygon.features = featuresPolygon;*/
								// 平滑系数
								var dis = new esri.tasks.LinearUnit();
								dis.distance = smoothTol;
								dis.units = esri.Units.DECIMAL_DEGREES;
                                //gp参数
								var params = {
									"InputPoints" : featureSet,
									"Z_value_field" : index,
									"Reclassification" : reclassification,
									"ClipFeature" : clipfeatureSet,
									"Smoothing_Tolerance" : dis
								};
                                //代理服务器（解决GET方法参数长度过长的问题）
								esri.config.defaults.io.proxyUrl = "/proxy/proxy.jsp";
								esriConfig.defaults.io.alwaysUseProxy = false;

								window.parent.showBusy();
								//GP服务对象
								gpDZM = new Geoprocessor(dzmUrl);
								gpDZM.setOutputSpatialReference({
									wkid : 4326
								});
								gpDZM.submitJob(params, getResultPolygon,statusCallback, gpJobFailed);
							} else {
								alert("裁剪要素查询出错了！");
							}

						}
					}
				};
				// 等值线渲染显示函数（测试用）
				function ContourCallback(jobInfo) {
					// gpMap.graphics.clear();
					//原等值线渲染
					/*gpDZX.getResultData(jobInfo.jobId, "OutFeatures", function(
							result) {
						window.parent.clearBusy();
						var phlyr = new GraphicsLayer();
						var sms = new SimpleLineSymbol(
								SimpleLineSymbol.STYLE_DASH, new Color([ 255,
										0, 0 ]), 3);
						for (var i = 0; i < result.value.features.length; i++) {
							var pl = result.value.features[i].geometry;
							var graphic = new Graphic(pl, sms, null, null);
							gpMap.graphics.add(graphic);
						}
						alert("s");
					});*/
					//借助等值面模型渲染
					gpDZM.getResultData(jobInfo.jobId, "GridDZMResult", function(
							result) {
						window.parent.clearBusy();
						var phlyr = new GraphicsLayer();
						var sms = new SimpleLineSymbol(
								SimpleLineSymbol.STYLE_DASH, new Color([ 255,
										0, 0 ]), 3);
						for (var i = 0; i < result.value.features.length; i++) {
							var pl = result.value.features[i].geometry;
							var graphic = new Graphic(pl, sms, null, null);
							//gpMap.graphics.add(graphic);
							window.parent.getRenderLayer().add(graphic);
						}
						alert("s");
					});
				}
				// 等值线GP服务提交回掉函数
				function getResultLines(result) {
					var jobId = result.jobId;
					var status = result.jobStatus;
					if (status === esri.tasks.JobInfo.STATUS_SUCCEEDED) {
						// 成功之后，将其中的结果取出来，当然这也是参数名字。
						// 在模型中，想要取出中间结果，需要设置为模型参数
						//gpDZX.getResultData(jobId, "GridDZXKring_shp", addResults);
						gpDZX.getResultData(jobId, "GridDZMResult", addResults);
					}
				}
				// 等值线渲染函数
				function addResults(results) {
					window.parent.clearBusy();
					var features = results.value.features;
					var type = $('#currentElement').combobox('getValue');
					if (features.length > 0) {
						for (var i = 0, length = features.length; i != length; ++i) {
							var feature = features[i];
							var gridCode = feature.attributes.gridcode;
							var symbol = setReclsLineSymbol(type,gridCode-1);
							feature.setSymbol(symbol);
							//gpMap.graphics.add(feature);
							window.parent.getRenderLayer().add(feature);
						}
						$.messager.alert("提示","计算成功！");
					} else {
						$.messager.alert("提示","计算失败！");
					}
				}

				function statusCallback(jobInfo) {
					//alert(jobInfo.jobStatus);
				}

				function gpJobFailed(error) {
					alert(error);
				}
				// 设置等值面重分类符号
				function setReclsPolySymbol(type, index) {
					var polySymbol = new SimpleFillSymbol();
					polySymbol.setOutline(new SimpleLineSymbol(
							SimpleLineSymbol.STYLE_SOLID, new Color([ 0, 0, 0,
									0.8 ]), 0.0001));
					var clr = getCorById(gridType[type], index);
					polySymbol.setColor(new Color(
							[ clr[0], clr[1], clr[2], 0.5 ]));
					return polySymbol;
				}
				//设置等值线
				function setReclsLineSymbol(type,index) {
					
					
					var clr = getCorById(gridType[type], index);
					var lineSymbol=new SimpleLineSymbol();
					lineSymbol.setColor(new Color([clr[0], clr[1], clr[2],
						0.8 ]));
					return lineSymbol;
				}
				
				// 等值面渲染函数
				function addPolygonResults(results) {
					window.parent.clearBusy();
					var features = results.value.features;
					var type = $('#currentElement').combobox('getValue');
					if (features.length > 0) {
						for (var i = 0, length = features.length; i != length; ++i) {
							var feature = features[i];
							var gridCode = feature.attributes.gridcode;
							var symbol = setReclsPolySymbol(type,
									gridCode - 1);
							feature.setSymbol(symbol);
							//gpMap.graphics.add(feature);
							window.parent.getRenderLayer().add(feature);
						}
						$.messager.alert("提示","计算成功！");
						window.parent.clearGraphicLayer();
					} else {
						$.messager.alert("提示","计算失败！");
					}
				}
                
				function getResultImg(result)
				{
					var jobId = result.jobId;
					var status = result.jobStatus;
					var imgParams=new ImageParameters();
					if (status === esri.tasks.JobInfo.STATUS_SUCCEEDED) {
						gridKr.getResultImage(jobId, "GridKrigingReslut_tif", imgParams, addImgResults,gpJobFailed);
						
					}
				}
				
				function addImgResults(result)
				{
					window.parent.clearBusy();
					gpMap.addLayer(result);
					alert("添加插值成功！");
				}
				function getResultPolygon(result) {
					var jobId = result.jobId;
					var status = result.jobStatus;
					if (status === esri.tasks.JobInfo.STATUS_SUCCEEDED) {
						// 成功之后，将其中的结果取出来，当然这也是参数名字。
						// 在模型中，想要取出中间结果，需要设置为模型参数
						gpDZM.getResultData(jobId, "GridDZMResult",
								addPolygonResults);
					}
				}

			});
})();