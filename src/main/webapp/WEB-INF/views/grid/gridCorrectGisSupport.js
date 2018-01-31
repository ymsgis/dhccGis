(function() {
	
	Date.prototype.Format = function (fmt) { //author: meizz 
	    var o = {
	        "M+": this.getMonth() + 1, //月份 
	        "d+": this.getDate(), //日 
	        "h+": this.getHours(), //小时 
	        "m+": this.getMinutes(), //分 
	        "s+": this.getSeconds(), //秒 
	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	        "S": this.getMilliseconds() //毫秒 
	    };
	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    for (var k in o)
	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    return fmt;
	}

	function clearMap(){
		var graphicLayer = window.parent.getGridGraphicLayer();
		graphicLayer.clear();
		window.parent.showWeaherLengContr("", false);
		window.parent.clearMapTips();
		localStorage.clear();
	}
	function drawDeviationData(dataList, devField) {
		if (dataList == null || dataList.rows == null
				|| dataList.rows.length == 0) {
			return;
		}
		var mapGraphics = window.parent.getMap().graphics;
		mapGraphics.clear();
		if (devField.indexOf("tmax") == -1 && devField.indexOf("tmin") == -1)
			return;

		var staarr = dataList.rows;
		for (var i = 0; i < staarr.length; i++) {
			var sta = staarr[i];
			var log = sta.longitude;
			var lat = sta.latitude;
			var value = sta[devField];
			var name = sta.stationName;

			var pt = new esri.geometry.Point(log, lat);
			var sms, attr;
			sms = new esri.symbol.TextSymbol(name).setFont(
					new esri.symbol.Font("9pt")).setColor(
					new esri.Color([ 255, 0, 0, 1 ]));
			attr = {
				"log" : log,
				"lat" : lat,
				"gridValue" : value
			};

			var infoTemplate = new esri.InfoTemplate("Vernal Pool Locations",
					"Latitude: ${lat} <br/> Longitude: ${log} <br/>Plant Name:${gridValue}");
			var graphic = new esri.Graphic(pt, sms, attr);
			mapGraphics.add(graphic);

			require([ "esri/Color", "esri/symbols/SimpleMarkerSymbol" ],
					function(Color, SimpleMarkerSymbol) {
						var cl;
						if (value <= -2 || value >= 2) {
							cl = new Color("#FF0000");
						} else if (value >= -1 && value <= 1) {
							cl = new Color("#00FF00");
						} else {
							cl = new Color("#FFFF00");
						}

						var markerSymbol = new SimpleMarkerSymbol();
						markerSymbol.setColor(cl);
						markerSymbol.setOffset(-20, 20);
						markerSymbol.setSize("10");

						var graphic = new esri.Graphic(pt, markerSymbol);
						mapGraphics.add(graphic);
					});

		}
		window.parent.showImportantLegend();
	}
	function GisSupport() {
		$.extend(this, {
			drawDeviationData: drawDeviationData,
			clearMap: clearMap
		});
	}
	this.GisSupport = GisSupport;
	/**
	 * 格点展示
	 */
	function checkGrid() {
		
		var graphicLayer = window.parent.getGridGraphicLayer();
		var renderLayer = window.parent.getRenderLayer();
		graphicLayer.clear();

		if (document.getElementById("btnGridCheck").innerHTML == '格点显示') {
			
		} else {
			document.getElementById("btnGridCheck").innerHTML = '格点显示';
			window.parent.showWeaherLengContr("", false);
			window.parent.clearMapTips();
			localStorage.clear();
			return;
		}
		if (!window.chooseColumn) {
			alert("请选择要素列!");
			return;
		}
		
		
		var strdate = $("#fcTime").datebox('getValue');
		var timePoint = $("#timeType").combobox('getValue');
		var gridInfo = window.parent.getGridInfo();
		var backtype = gridInfo.type||'gridCenter';
		var pdataback = {
			"strdate" : strdate,
			"timePoint" : timePoint,
			"type" : chooseColumn,
			"backType":backtype,
		};
		window.parent.showBusy();
		$.post(_ctxPath + '/importantPoint/readImportantGrid', pdataback, function(
				data) {
			window.parent.clearBusy();
			if (data == null || data.results == null) {
				alert("没有找到对应数据！")
				return;
			}
			document.getElementById("btnGridCheck").innerHTML = '格点隐藏';
			var pointsarr = data.results;
			localStorage.setItem("points", JSON.stringify(pointsarr));
			var type = "";
			if (chooseColumn.indexOf("降水") != -1) {
				type = "3小时降水";
				localStorage.setItem("curGridType", "ER03");
			} else if (chooseColumn.indexOf("温") != -1) {
				type = "3小时气温";
				localStorage.setItem("curGridType", "TMP");
			}
			GridLoad.AddGraphic(type, window.parent.getMapLevel(), pointsarr,
					graphicLayer, graphicLayer);
			// 加载图例
			window.parent.showWeaherLengContr(type, true);
			var d = new Date();
			var hour = d.getHours();
			var strag = "08";
			if (hour >= 6 && hour < 16) {			
			} else if (hour == 16 && hour <= 30) {			
			} else
				strag = "20";
			
			
			var addhours = chooseColumn.substr(0,chooseColumn.indexOf('小时'));		
			if(strag == "20")
				addhours+=12;
			var start = strdate+strag;
			start = start.replace(/-/g,'');
			var t = new Date(strdate);
			var t_s=t.getTime();//转化为时间戳毫秒数
			t.setTime(t_s+addhours*1000*60*60);//设置新时间比旧时间多一小时
			
			var strend = t.Format("yyyyMMddhh");
			window.parent.showMapTips(chooseColumn+"预报:" + start + "——" + strend + "("
					+ strag + ")");
		
		}, "json");	
	}
	
	this.checkGrid=checkGrid;
})(window);