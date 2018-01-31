/**
 * 站点预报查看
 */
var StationForecastView = window.StationForecastView || {};
StationForecastView.stationPictureUrl="../images/yellowdot.png";
StationForecastView.mapExtentChange=null;
StationForecastView.isTownForecast=false;
StationForecastView.forecastsTown=null;

$(function(){
	//StationForecastView.searchRollForecast();
	//$('#fcTypeList .easyui-linkbutton')[0].click();
	if(window.parent.map) {
		StationForecastView.mapExtentChange=window.parent.map.on("extent-change", StationForecastView.mapExtentchangeHandler);	
	}
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
	$('#accordion').accordion({
		onSelect:function(title,index){
			if(0==index){
				StationForecastView.rollClick();
			}
			else if(1==index){
				StationForecastView.cityClick();
			}
			else if(2==index){
				StationForecastView.fiveClick();
			}
			else if(3==index){
				var val = $("input[name='town']:checked").val();
				StationForecastView.searchTownForecast(val);
			}
			else if(4==index){
				StationForecastView.searchTourForecast();
			}
		}
	}); 
});

StationForecastView.mapExtentchangeHandler=function(event){
	var extent=event.extent;
	//var levelChange=event.levelChange;
	StationForecastView.createTowns(extent);
}

StationForecastView.createTowns=function(extent){
	if(true==StationForecastView.isTownForecast){ //只对村镇精细化进行分级分区域显示
		window.parent.map.graphics.clear();
		var mapLevel = window.parent.map.getLevel();
		var stationType=null;
		if(mapLevel<3){
			stationType="distict,city";
		}
		else if(mapLevel<5){
			stationType="distict,city,county";
		}
		else if(mapLevel<8){
			stationType="distict,city,county,town";
		}
		else{
			stationType=null;
		}
		
		var val = $("input[name='town']:checked").val();
		if(6==val){
			StationForecastView.createWeatherGraphicTown("temp1aFrom","temp1aTo","windDir1aText",
					"windPow1aText","phenomena1aText",stationType,extent);
		}
		else if(12==val){
			StationForecastView.createWeatherGraphicTown("temp1bFrom","temp1bTo","windDir1bText",
					"windPow1bText","phenomena1bText",stationType,extent);
		}
		else if(18==val){
			StationForecastView.createWeatherGraphicTown("temp1cFrom","temp1cTo","windDir1cText",
					"windPow1cText","phenomena1cText",stationType,extent);
		}
		else if(24==val){
			StationForecastView.createWeatherGraphicTown("temp1dFrom","temp1dTo","windDir1dText",
					"windPow1dText","phenomena1dText",stationType,extent);
		}
		else if(48==val){
			StationForecastView.createWeatherGraphicTown("temp2From","temp2To","windDir2Text",
					"windPow2Text","phenomena2Text",stationType,extent);
		}
		else if(72==val){
			StationForecastView.createWeatherGraphicTown("temp3From","temp3To","windDir3Text",
					"windPow3Text","phenomena3Text",stationType,extent);
		}
		else if(96==val){
			StationForecastView.createWeatherGraphicTown("temp4From","temp4To","windDir4Text",
					"windPow4Text","phenomena4Text",stationType,extent);
		}
		else if(120==val){
			StationForecastView.createWeatherGraphicTown("temp5From","temp5To","windDir5Text",
					"windPow5Text","phenomena5Text",stationType,extent);
		}
		else if(144==val){
			StationForecastView.createWeatherGraphicTown("temp6From","temp6To","windDir6Text",
					"windPow6Text","phenomena6Text",stationType,extent);
		}
		else if(168==val){
			StationForecastView.createWeatherGraphicTown("temp7From","temp7To","windDir7Text",
					"windPow7Text","phenomena7Text",stationType,extent);
		}
	}
}

StationForecastView.loadForecast = function(options, isTown) {
	StationForecastView.isTownForecast=isTown;
	StationForecastView.clear(false);
	var successFn = options.success;
	var msgObj = window.parent.$.messager;
	msgObj.progress({
		title: '加载数据',		
		msg: '数据加载中，请稍候。。。'
	});
	var ajaxOp = $.extend({
		type: 'post',
		dataType: 'json',
		onSubmit: function(param) {
			$.extend(param, options.data);
		},
 		error: function(){
 			msgObj.progress('close');
 		}	
	}, options, {
		success: function(data) {
			msgObj.progress('close');
			var json = $.parseJSON(data);
			successFn.call(this, json);
		}
	});
	var form = $('#searchForm');
	form.form('submit', ajaxOp);
	//$.ajax(ajaxOp);
}

StationForecastView.rollClick=function(){
	var val = $("input[name='roll']:checked").val();
	if(24==val){
		StationForecastView.searchRollForecast('temp1From','temp1To','windDir1Text','windPow1Text','phenomena1Text',val);
	}
	else if(48==val){
		StationForecastView.searchRollForecast('temp2From','temp2To','windDir2Text','windPow2Text','phenomena2Text',val);
	}
	else if(72==val){
		StationForecastView.searchRollForecast('temp3From','temp3To','windDir3Text','windPow3Text','phenomena3Text',val);
	}
	else if(96==val){
		StationForecastView.searchRollForecast('temp4From','temp4To','windDir4Text','windPow4Text','phenomena4Text',val);
	}
	else if(120==val){
		StationForecastView.searchRollForecast('temp5From','temp5To','windDir5Text','windPow5Text','phenomena5Text',val);
	}
	else if(144==val){
		StationForecastView.searchRollForecast('temp6From','temp6To','windDir6Text','windPow6Text','phenomena6Text',val);
	}
	else if(168==val){
		StationForecastView.searchRollForecast('temp7From','temp7To','windDir7Text','windPow7Text','phenomena7Text',val);
	}
}

StationForecastView.searchRollForecast=function(tempFrom,tempTo,windDirText,windPowText,phenomenaText,hours){
	StationForecastView.loadForecast({
 		url: '/nxgrid/forecast/stationH24Forecast/loadData',
 		data:{last:true}, 		
 		success: function(json) {
 			StationForecastView.addTimeStrToMap("滚动预报",json.record.createTime,hours);
 			StationForecastView.createWeatherGraphic(json.codes,tempFrom,tempTo,windDirText,windPowText,phenomenaText);
 			//$.messager.progress('close');
 		}
	}, false);
	//alert("clickroll")
}

StationForecastView.cityClick=function(){
	var val = $("input[name='city']:checked").val();
	if(6==val){
		StationForecastView.searchCityForecast("temp1aFrom","temp1aTo","windDir1aText","windPow1aText","phenomena1aText",val);
	}
	else if(12==val){
		StationForecastView.searchCityForecast("temp1bFrom","temp1bTo","windDir1bText","windPow1bText","phenomena1bText",val);
	}
	else if(18==val){
		StationForecastView.searchCityForecast("temp1cFrom","temp1cTo","windDir1cText","windPow1cText","phenomena1cText",val);
	}
	else if(24==val){
		StationForecastView.searchCityForecast("temp1dFrom","temp1dTo","windDir1dText","windPow1dText","phenomena1dText",val);
	}
	else if(48==val){
		StationForecastView.searchCityForecast('temp2From','temp2To','windDir2Text','windPow2Text','phenomena2Text',val);
	}
	else if(72==val){
		StationForecastView.searchCityForecast('temp3From','temp3To','windDir3Text','windPow3Text','phenomena3Text',val);
	}
}

StationForecastView.searchCityForecast=function(tempFrom,tempTo,windDirText,windPowText,phenomenaText,hours){
	StationForecastView.loadForecast({
 		url: '/nxgrid/forecast/stationStermForecast/loadData',
 		data:{last:true},
 		success: function(json) {
 			StationForecastView.addTimeStrToMap("精细预报",json.record.createTime,hours);
 			StationForecastView.createWeatherGraphic(json.codes,tempFrom,tempTo,windDirText,windPowText,phenomenaText);
 			//$.messager.progress('close');
 		}
	}, false);
}

StationForecastView.fiveClick=function(){
	var val = $("input[name='five']:checked").val();
	if(6==val){
		StationForecastView.searchFiveForecast("temp1aFrom","temp1aTo","windDir1aText","windPow1aText","phenomena1aText",val);
	}
	else if(12==val){
		StationForecastView.searchFiveForecast("temp1bFrom","temp1bTo","windDir1bText","windPow1bText","phenomena1bText",val);
	}
	else if(18==val){
		StationForecastView.searchFiveForecast("temp1cFrom","temp1cTo","windDir1cText","windPow1cText","phenomena1cText",val);
	}
	else if(24==val){
		StationForecastView.searchFiveForecast("temp1dFrom","temp1dTo","windDir1dText","windPow1dText","phenomena1dText",val);
	}
	else if(48==val){
		StationForecastView.searchFiveForecast('temp2From','temp2To','windDir2Text','windPow2Text','phenomena2Text',val);
	}
	else if(72==val){
		StationForecastView.searchFiveForecast('temp3From','temp3To','windDir3Text','windPow3Text','phenomena3Text',val);
	}
}

StationForecastView.searchFiveForecast=function(tempFrom,tempTo,windDirText,windPowText,phenomenaText,hours){
	StationForecastView.loadForecast({
 		url: '/nxgrid/forecast/stationStermForecast/loadData',
 		data:{last:true,onlyCity:true},
 		success: function(json) {
 			StationForecastView.addTimeStrToMap("五市预报",json.record.createTime,hours);
 			StationForecastView.createWeatherGraphic(json.codes,tempFrom,tempTo,windDirText,windPowText,phenomenaText);
 			//$.messager.progress('close');
 		}
	}, false);
}

StationForecastView.searchTownForecast=function(hours){
	StationForecastView.loadForecast({
 		url: '/nxgrid/forecast/villageFineForecast/loadData',
 		data:{last:true},
 		success: function(json) {
 			StationForecastView.forecastsTown=[];
 			for(var p in json){
 				if(0==p){
 					StationForecastView.addTimeStrToMap("村镇预报",json[p].record.createTime,hours);
 				}
 			
 				StationForecastView.forecastsTown = StationForecastView.forecastsTown.concat(json[p].codes);
 			}
 			StationForecastView.createTowns(window.parent.map.extent);
 			//$.messager.progress('close');
 		}
	}, true);
}

StationForecastView.searchTourForecast=function(){
	StationForecastView.loadForecast({
 		url: '/nxgrid/forecast/touristForecast/loadData',
 		data:{last:true},
 		success: function(json) {
 			StationForecastView.addTimeStrToMap("旅游预报",json.record.createTime,undefined);
 			StationForecastView.createWeatherGraphic(json.codes,"temp1From","temp1To","windDir1Text","windPow1Text","phenomena1Text");
 			//$.messager.progress('close');
 		}
	}, false);
}

StationForecastView.addTimeStrToMap=function(type,createTime,hours){
	var tmp = createTime.replace(/-/ig, "").replace(/:/ig, "").replace(" ","");
	var len=tmp.length;
	len=len>10?10:len;
	var str=type+"："+tmp.substr(0,len);
	if(undefined!=hours){
		var sDate = new Date(createTime);
		sDate = sDate.setTime(sDate.getTime() + hours*3600*1000);
	    str += "——" + new Date(sDate).Format("yyyyMMddhh") + "("+ hours + ")";
	}
	   
	window.parent.showMapTips(str);
}

StationForecastView.createWeatherGraphic=function(forecasts,tempFromField,tempTofield,windDirField,windPowField,phenomenaField){
	var len=forecasts.length;
	for(var i=0;i<len;i++){
		var mapPoint=new esri.geometry.Point(forecasts[i].staLongitude,
				forecasts[i].staLatitude,
				new esri.SpatialReference({wkid:4326}));
		var graphicStaion = new esri.Graphic(mapPoint,
				new esri.symbol.PictureMarkerSymbol(StationForecastView.stationPictureUrl, 20, 20));
		var graphicStaionName = new esri.Graphic(mapPoint,
				StationForecastView.createTxtSymbol(forecasts[i].stationName,[255,0,0],"8pt",esri.symbol.Font.WEIGHT_NORMAL,20,0));
		var graphicTemp = new esri.Graphic(mapPoint,
				StationForecastView.createTxtSymbol(forecasts[i][tempFromField].toFixed(1)+"-"+forecasts[i][tempTofield].toFixed(1)+"℃",[0,0,255],"8pt",esri.symbol.Font.WEIGHT_NORMAL,25,15));
		
		var windSymbolArr = StationForecastView.getWindSymbolArr(forecasts[i][windDirField],forecasts[i][windPowField],0,-15);
		for(var j=0;j<windSymbolArr.length;j++){
			var graphicWind = new esri.Graphic(mapPoint,windSymbolArr[j]);
			window.parent.map.graphics.add(graphicWind);
		}
		
		var weatherArr=forecasts[i][phenomenaField].split("转");
		var lenW=weatherArr.length;
		var xoffset=-15;
		if(lenW>1){
			xoffset=-45;
		}
		for(var j=0;j<lenW;j++){
			var weatherSymbol = window.parent.com.nxgrid.giscommon.symboltool.getWeatherSymbol(weatherArr[j],xoffset,20);
			xoffset=-15;
			var graphicWeather = new esri.Graphic(mapPoint,weatherSymbol);
			//graphicWeather.tooltip = weatherArr[j];
			window.parent.map.graphics.add(graphicWeather);
		}
		
		window.parent.map.graphics.add(graphicStaion);
		window.parent.map.graphics.add(graphicStaionName);
		window.parent.map.graphics.add(graphicTemp);
	}
}

StationForecastView.createWeatherGraphicTown=function(tempFromField,tempTofield,windDirField,windPowField,phenomenaField,stationType,extent){
	var forecasts = StationForecastView.forecastsTown;
	var len=StationForecastView.forecastsTown.length;
	
	for(var i=0;i<len;i++){
		if(null==stationType){
			if(forecasts[i].staLongitude<extent.xmax && forecasts[i].staLongitude>extent.xmin && 
					forecasts[i].staLatitude<extent.ymax && forecasts[i].staLatitude>extent.ymin){
				StationForecastView.createSingleGraphic(forecasts[i],tempFromField,tempTofield,windDirField,windPowField,phenomenaField);
			}
		}
		else{
			if(stationType.indexOf(forecasts[i].staType)>-1 && forecasts[i].staLongitude<extent.xmax &&
					forecasts[i].staLongitude>extent.xmin && forecasts[i].staLatitude<extent.ymax &&
					forecasts[i].staLatitude>extent.ymin){
				StationForecastView.createSingleGraphic(forecasts[i],tempFromField,tempTofield,windDirField,windPowField,phenomenaField);
			}
		}
	}
}

StationForecastView.createSingleGraphic=function(forecast,tempFromField,tempTofield,windDirField,windPowField,phenomenaField){
	var mapPoint=new esri.geometry.Point(forecast.staLongitude,
			forecast.staLatitude,
			new esri.SpatialReference({wkid:4326}));
	var graphicStaion = new esri.Graphic(mapPoint,
			new esri.symbol.PictureMarkerSymbol(StationForecastView.stationPictureUrl, 20, 20));
	var graphicStaionName = new esri.Graphic(mapPoint,
			StationForecastView.createTxtSymbol(forecast.stationName,[255,0,0],"8pt",esri.symbol.Font.WEIGHT_NORMAL,20,0));
	var graphicTemp = new esri.Graphic(mapPoint,
			StationForecastView.createTxtSymbol(forecast[tempFromField].toFixed(1)+"-"+forecast[tempTofield].toFixed(1)+"℃",[0,0,255],"8pt",esri.symbol.Font.WEIGHT_NORMAL,25,15));
	
	var windSymbolArr = StationForecastView.getWindSymbolArr(forecast[windDirField],forecast[windPowField],0,-15);
	for(var i=0;i<windSymbolArr.length;i++){
		var graphicWind = new esri.Graphic(mapPoint,windSymbolArr[i]);
		window.parent.map.graphics.add(graphicWind);
	}
	
	var weatherArr=forecast[phenomenaField].split("转");
	var len=weatherArr.length;
	var xoffset=-15;
	if(len>1){
		xoffset=-45;
	}
	for(var i=0;i<len;i++){
		var weatherSymbol = window.parent.com.nxgrid.giscommon.symboltool.getWeatherSymbol(weatherArr[i],xoffset,20);
		xoffset=-15;
		var graphicWeather = new esri.Graphic(mapPoint,weatherSymbol);
		window.parent.map.graphics.add(graphicWeather);
	}
	
	window.parent.map.graphics.add(graphicStaion);
	window.parent.map.graphics.add(graphicStaionName);
	window.parent.map.graphics.add(graphicTemp);
}

StationForecastView.getWindSymbolArr=function(windDirStr,windPowStr,xoffset,yoffset){
	var windDirArr = windDirStr.split("转");
	var windPowArr = windPowStr.split("转");
	var len1 = windDirArr.length;
	var len2 = windPowArr.length;
	for(var i=0;i<len1;i++){
		if(windDirArr[i].indexOf("东北")>-1){
			windDirArr[i]=45;
		}
		else if(windDirArr[i].indexOf("东南")>-1){
			windDirArr[i]=135;
		}
		else if(windDirArr[i].indexOf("西北")>-1){
			windDirArr[i]=315;
		}
		else if(windDirArr[i].indexOf("西南")>-1){
			windDirArr[i]=225;
		}
		else if(windDirArr[i].indexOf("东")>-1){
			windDirArr[i]=90;
		}
		else if(windDirArr[i].indexOf("南")>-1){
			windDirArr[i]=180;
		}
		else if(windDirArr[i].indexOf("西")>-1){
			windDirArr[i]=270;
		}
		else if(windDirArr[i].indexOf("北")>-1){
			windDirArr[i]=0;
		}
	}
	for(var i=0;i<len2;i++){
		if(windPowArr[i].indexOf("2")>-1){
			windPowArr[i]= windPowArr[i].indexOf("3")>-1 ? 3.0 : 1.0;
		}
		else if(windPowArr[i].indexOf("3")>-1){
			windPowArr[i]= windPowArr[i].indexOf("4")>-1 ? 5.0 : 3.0;
		}
		else if(windPowArr[i].indexOf("4")>-1){
			windPowArr[i]= windPowArr[i].indexOf("5")>-1 ? 7.0 : 5.0;
		}
		else if(windPowArr[i].indexOf("5")>-1){
			windPowArr[i]= windPowArr[i].indexOf("6")>-1 ? 10.0 : 7.0;
		}
		else if(windPowArr[i].indexOf("6")>-1){
			windPowArr[i]= windPowArr[i].indexOf("7")>-1 ? 13.0 : 10.0;
		}
		else if(windPowArr[i].indexOf("7")>-1){
			windPowArr[i]= windPowArr[i].indexOf("8")>-1 ? 17.0 : 13.0;
		}
		else if(windPowArr[i].indexOf("8")>-1){
			windPowArr[i]= windPowArr[i].indexOf("9")>-1 ? 20.0 : 17.0;
		}
		else if(windPowArr[i].indexOf("9")>-1){
			windPowArr[i]= windPowArr[i].indexOf("10")>-1 ? 24.0 : 20.0;
		}
		else if(windPowArr[i].indexOf("10")>-1){
			windPowArr[i]= windPowArr[i].indexOf("11")>-1 ? 28.0 : 24.0;
		}
		else if(windPowArr[i].indexOf("11")>-1){
			windPowArr[i]= windPowArr[i].indexOf("12")>-1 ? 32.0 : 28.0;
		}
		else if(windPowArr[i].indexOf("12")>-1){
			windPowArr[i]= 33.0;
		}
		else{
			windPowArr[i]= 1.0;
		}
	}
	var symbolArr=[];
	symbolArr[0]=window.parent.com.nxgrid.giscommon.symboltool.getWindSymbols(windPowArr[0],windDirArr[0],xoffset,yoffset);
	if(1==len1){
		if(len2>1){
			symbolArr[1]=window.parent.com.nxgrid.giscommon.symboltool.getWindSymbols(windPowArr[1],windDirArr[0],xoffset+20,yoffset);
		}
	}
	else{
		if(len2>1){
			symbolArr[1]=window.parent.com.nxgrid.giscommon.symboltool.getWindSymbols(windPowArr[1],windDirArr[1],xoffset+20,yoffset);
		}
		else{
			symbolArr[1]=window.parent.com.nxgrid.giscommon.symboltool.getWindSymbols(windPowArr[0],windDirArr[1],xoffset+20,yoffset);
		}
	}
	return symbolArr;
}

StationForecastView.createTxtSymbol=function(value,colors,size,weight,xoffset,yoffset){
	return new esri.symbol.TextSymbol(value).
				setColor(new esri.Color(colors)).
				setOffset(xoffset,yoffset).
				setFont(new esri.symbol.Font(size).setWeight(weight).setFamily("Microsoft YaHei"));
}

StationForecastView.clear=function(isClose){
	StationForecastView.forecastsTown=null;
	if(window.parent.map && window.parent.map.graphics) {
		window.parent.map.graphics.clear();
	}
	if(true==isClose){
		//$('#fcTypeList .easyui-linkbutton').removeClass('l-btn-selected');
		StationForecastView.mapExtentChange.remove();
	}
}