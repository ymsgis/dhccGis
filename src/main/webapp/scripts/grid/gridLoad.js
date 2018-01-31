/**
 * 格点加载处理js
 */
var GridLoad = window.GridLoad || {};
GridLoad.loadLiveShow = function(ag, createtime, type, level) {
	window.parent.showBusy();
	var graphicLayer = window.parent.getGridGraphicLayer();
	graphicLayer.clear();
	var apoint = arguments[4] ? arguments[4] : 8;// 设置参数point的默认值为20
	var pdata = {
		"date" : createtime,
		"aging" : ag,
		"point" : apoint
	};
	var arrdt = createtime.split("-");
	var mYear = arrdt[0];
	var mMonth = arrdt[1];
	var mDay = arrdt[2];
	var pdataback = {
		"mYear" : mYear,
		"mMonth" : mMonth,
		"mDay" : mDay,
		"mTime" : ag,
		"type" : type
	};
	$.post(NxgridConfig.MapConfig.nxBackLoadLiveUrl, pdataback, function(data) {
		window.parent.clearBusy();
		if (data.state == "失败") {
			alert("没有找到对应数据！");
			return;
		} else {
			if (data == null || data.results == null) {
				alert("没有找到对应数据！")
				return;
			}
			var pointsarr = data.results;
			localStorage.setItem("livePoints", JSON.stringify(pointsarr));
			var gtype = gridType[type];
			if (type.indexOf("ER") != -1 && type != "ERH" && type != "ERHA" && type != "ERHI")
				gtype = gridType["ER03"];
			GridLoad.AddGraphic(gtype, level, pointsarr, graphicLayer,
					graphicLayer);

			// 加载图例
			window.parent.showWeaherLengContr(gtype, true);
			var d = new Date();
			var hour = d.getHours();
			var strag = "08";
			if (hour >= 6 && hour < 16) {
			} else if (hour == 16 && hour <= 30) {
			} else
				strag = "20";

			var addhours = ag;
			// if (strag == "20")
			// addhours = Number(ag) + Number(12);
			var start = createtime + strag;
			start = start.replace(/-/g, '');
			var t = new Date(createtime);
			var t1 = new Date(createtime);
			var t_s = t.getTime();// 转化为时间戳毫秒数
			t1.setHours(0);
			var t_t_s = t1.getTime();

			var strend = null;
			var typeName = gridType[type];
			if (typeName != null && typeName.indexOf("3小时") != -1) {
				typeName = typeName.replace("3小时", "");
			}
			if (type == "ER03") {
				t.setTime(t_s + 3 * 1000 * 60 * 60 * -1);// 设置新时间比旧时间多一小时
				strend = t.Format("yyyyMMddhh");
				window.parent.showMapTips(typeName + "实况:" + strend + "——"
						+ start);
			} else if (type == "ER06") {
				typeName = "6小时降水";
				t.setTime(t_s + 6 * 1000 * 60 * 60 * -1);// 设置新时间比旧时间多一小时
				strend = t.Format("yyyyMMddhh");
				window.parent.showMapTips(typeName + "实况:" + strend + "——"
						+ start);
			} else if (type == "ER12") {
				typeName = "12小时降水";
				t.setTime(t_s + 12 * 1000 * 60 * 60 * -1);// 设置新时间比旧时间多一小时
				strend = t.Format("yyyyMMddhh");
				window.parent.showMapTips(typeName + "实况:" + strend + "——"
						+ start);
			} else if (type == "ER24") {
				typeName = "24小时降水";
				t.setTime(t_s + 24 * 1000 * 60 * 60 * -1);// 设置新时间比旧时间多一小时
				strend = t.Format("yyyyMMddhh");
				window.parent.showMapTips(typeName + "实况:" + strend + "——"
						+ start);
			} else if (type == "TMAX" || type == "TMIN" || type == "ERHA"
					|| type == "ERHI") {
				t.setTime(t_s + 9 * 1000 * 60 * 60 * -1);// 设置新时间比旧时间多一小时
				strend = t.Format("yyyyMMddhh");
				window.parent.showMapTips(typeName + "实况:" + strend);
			} else {
				t.setTime(t_t_s + addhours * 1000 * 60 * 60);// 设置新时间比旧时间多一小时
				strend = t.Format("yyyyMMddhh");
				window.parent.showMapTips(typeName + "实况:" + strend);
			}
		}
	}, "json");

}
// ag->时次
GridLoad.loadGrid = function(ag, createtime, type, level, backtype, timePoint) {
	window.parent.showBusy();
	var graphicLayer = window.parent.getGridGraphicLayer();
	var renderLayer = window.parent.getRenderLayer();
	
	// var colorLayer = window.parent.getColorGraphicLayer();
	graphicLayer.clear();
	var arrdt = createtime.split("-");
	var mYear = arrdt[0];
	var mMonth = arrdt[1];
	var mDay = arrdt[2];
	var pdataback = {
		"mYear" : mYear,
		"mMonth" : mMonth,
		"mDay" : mDay,
		"mTime" : ag,
		"type" : type,
		"timePoint" : timePoint,
		"backtype" : backtype
	};

	$.post(NxgridConfig.MapConfig.nxBackLoadUrl, pdataback, function(data) {
		window.parent.clearBusy();
		if (data.state == "失败") {
			alert("没有找到对应数据！");
			return;
		} else {

			if (data == null || data.results == null) {
				alert("没有找到对应数据！")
				return;
			}
			var pointsarr = data.results;
			window.parent.mainGrid.type = backtype;
			window.parent.mainGrid.elementType=type;
			localStorage.setItem("points", JSON.stringify(pointsarr));

			GridLoad.AddGraphic(gridType[type], level, pointsarr, graphicLayer,
					renderLayer);
			// 加载图例
			window.parent.showWeaherLengContr(gridType[type], true);
			var d = new Date();
			var hour = d.getHours();
			var strag = "08";
//			if (hour >= 6 && hour < 16) {
//			} else if (hour == 16 && hour <= 30) {
//			} else
//				strag = "20";
			if(timePoint == 20){
				strag = "20";
			}

			var addhours = ag;
			if (strag == "20")
				addhours = Number(ag) + Number(12);
			var start = createtime + strag;
			start = start.replace(/-/g, '');
			var t = new Date(createtime);
			var t_s = t.getTime();// 转化为时间戳毫秒数

			t.setTime(t_s + addhours * 1000 * 60 * 60);// 设置新时间比旧时间多一小时

			var strend = t.Format("yyyyMMddhh");
			window.parent.showMapTips(gridType[type] + "预报:" + start + "——"
					+ strend + "(" + ag + ")");
		}
	}, "json");

}

Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k])
					: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

/**
 * 加载格点要素Graphic
 * 
 */
GridLoad.AddGraphic = function(type, level, pointsarr, graphicLayer,
		renderLayer) {
	var rstarr = GridLoad.gridLevelLoad(pointsarr, level);
	GridColor.loadColor(pointsarr, graphicLayer, type);

	for (var i = 0; i < rstarr.length; i++) {
		var lat = rstarr[i].lat;
		var log = rstarr[i].lng;
		var dbval = parseFloat(rstarr[i].value);
		var value = dbval.toFixed(1);
		if(value == "-0.0")
			vlaue = 0.0;
		
		var pt = new esri.geometry.Point(log, lat);
		var sms, attr;
		if (gridType.EDA10 == type) { // 如果是风
			var windDir = rstarr[i].dir;
			sms = GridLoad.getWindSymbols(value, windDir);
			attr = {
				"id" : rstarr[i].id,
				"log" : log,
				"lat" : lat,
				"gridValue" : value,
				"windDir" : windDir
			};
		} else {
			sms = new esri.symbol.TextSymbol(value).setFont(
					new esri.symbol.Font("8pt")).setColor(
					new esri.Color([ 0, 0, 255, 1 ]));
			attr = {
				"id" : rstarr[i].id,
				"log" : log,
				"lat" : lat,
				"gridValue" : value
			};
		}

		var infoTemplate = new esri.InfoTemplate("Vernal Pool Locations",
				"Latitude: ${lat} <br/> Longitude: ${log} <br/>Plant Name:${gridValue}");
		var graphic = new esri.Graphic(pt, sms, attr);
		graphicLayer.add(graphic);

	}
	graphicLayer.redraw();

}

/**
 * 根据后台所有格点数组以及当前地图级别，动态返回需要显示的数组
 * 
 */
GridLoad.gridLevelLoad = function(pointsArr, level) {
	if (level >= 6)
		return pointsArr;

	var width = NxgridConfig.GridSizeConfig.Width;
	var height = NxgridConfig.GridSizeConfig.Height;
	if (pointsArr == null || level == null) {
		return;
	}
	var pointrst = new Array();
	var step = 1;

	if (level <= 1) {
		pointrst.push(pointsArr[0]);
		pointrst.push(pointsArr[73]);
		pointrst.push(pointsArr[6512]);
		pointrst.push(pointsArr[6585]);
	} else if (level <= 2) {
		step = 3;
		var wd = Math.floor(width / step);
		var ht = Math.floor(height / step);

		pointrst.push(pointsArr[0]);
		pointrst.push(pointsArr[wd]);
		pointrst.push(pointsArr[wd * 2]);
		pointrst.push(pointsArr[wd * 3]);

		for (var i = 1; i <= step; i++) {
			var sp = width * ht * i;
			pointrst.push(pointsArr[0 + sp]);
			pointrst.push(pointsArr[wd + sp]);
			pointrst.push(pointsArr[wd * 2 + sp]);
			pointrst.push(pointsArr[wd * 3 + sp]);
		}
	} else if (level >= 3) {
		step = level * level;
		var temp = level - 1;
		if (level == 3)
			temp = 1;
		if (level == 4)
			temp = 2;
		if (level == 5)
			temp = 3;
		var wdstep = step + temp;
		if (level == 5) {
			wdstep = wdstep + 2;
			temp = 12;
		}
		var wd = Math.floor(width / step);
		var ht = Math.floor(height / step);

		for (var i = 0; i < wdstep; i++) {
			for (var j = 0; j < step + temp; j++) {
				var sp = i * width * ht;
				var sw = j * wd;

				if (sp >= 0)
					pointrst.push(pointsArr[sw + sp]);
			}

		}
	}

	return pointrst;
}

/**
 * 绘制风符号
 * 
 */
GridLoad.getWindSymbols = function(windSpeed, windDirection, xoffset, yoffset) {
	xoffset = arguments[2] ? arguments[2] : 0;// 设置参数xoffset的默认值为0
	yoffset = arguments[3] ? arguments[3] : 0;// 设置参数yoffset的默认值为0
	var picUrl = "../images/wind27x54/Calm.png";
	if (windSpeed <= 1.5) {

	} else if (windSpeed <= 3.3) {
		picUrl = "../images/wind27x54/2-3LevelWind.png";
	} else if (windSpeed <= 5.4) {
		picUrl = "../images/wind27x54/3-4LevelWind.png";
	} else if (windSpeed <= 7.9) {
		picUrl = "../images/wind27x54/4-5LevelWind.png";
	} else if (windSpeed <= 10.7) {
		picUrl = "../images/wind27x54/5-6LevelWind.png";
	} else if (windSpeed <= 13.8) {
		picUrl = "../images/wind27x54/6-7LevelWind.png";
	} else if (windSpeed <= 17.1) {
		picUrl = "../images/wind27x54/7-8LevelWind.png";
	} else if (windSpeed <= 20.7) {
		picUrl = "../images/wind27x54/8-9LevelWind.png";
	} else if (windSpeed <= 24.4) {
		picUrl = "../images/wind27x54/9-10LevelWind.png";
	} else if (windSpeed <= 28.4) {
		picUrl = "../images/wind27x54/10-11LevelWind.png";
	} else if (windSpeed <= 32.6) {
		picUrl = "../images/wind27x54/11-12LevelWind.png";
	} else {
		picUrl = "../images/wind27x54/11-12LevelWind.png";
	}
	var symbol = new esri.symbol.PictureMarkerSymbol(picUrl, 20, 40).setOffset(
			xoffset, yoffset).setAngle(windDirection);
	return symbol;
}