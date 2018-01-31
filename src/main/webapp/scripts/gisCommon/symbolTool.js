//var LocationEditToolsP=windows.LocationEditToolsP||{};

(function() {
	Namespace.register("com.nxgrid.giscommon.symboltool");
	
	com.nxgrid.giscommon.symboltool.getWindSymbols=function(windSpeed, windDirection, xoffset, yoffset){
		xoffset = arguments[2] ? arguments[2] : 0;//设置参数xoffset的默认值为0
		yoffset = arguments[3] ? arguments[3] : 0;//设置参数yoffset的默认值为0
		var picUrl ="../images/wind27x54/Calm.png";
		if(windSpeed<=1.5){
			
		}
		else if(windSpeed<=3.3){
			picUrl="../images/wind27x54/2-3LevelWind.png";
		}
		else if(windSpeed<=5.4){
			picUrl="../images/wind27x54/3-4LevelWind.png";
		}
		else if(windSpeed<=7.9){
			picUrl="../images/wind27x54/4-5LevelWind.png";
		}
		else if(windSpeed<=10.7){
			picUrl="../images/wind27x54/5-6LevelWind.png";
		}
		else if(windSpeed<=13.8){
			picUrl="../images/wind27x54/6-7LevelWind.png";
		}
		else if(windSpeed<=17.1){
			picUrl="../images/wind27x54/7-8LevelWind.png";
		}
		else if(windSpeed<=20.7){
			picUrl="../images/wind27x54/8-9LevelWind.png";
		}
		else if(windSpeed<=24.4){
			picUrl="../images/wind27x54/9-10LevelWind.png";
		}
		else if(windSpeed<=28.4){
			picUrl="../images/wind27x54/10-11LevelWind.png";
		}
		else if(windSpeed<=32.6){
			picUrl="../images/wind27x54/11-12LevelWind.png";
		}
		else{
			picUrl="../images/wind27x54/11-12LevelWind.png";
		}
		var symbol = new esri.symbol.PictureMarkerSymbol(picUrl, 20, 40)
			.setOffset(xoffset, yoffset).setAngle(windDirection);
		return symbol;
	}
	
	com.nxgrid.giscommon.symboltool.getWeatherSymbol=function(weather,xoffset, yoffset){
		xoffset = arguments[1] ? arguments[1] : 0;//设置参数xoffset的默认值为0
		yoffset = arguments[2] ? arguments[2] : 0;//设置参数yoffset的默认值为0
		var picUrl ="../images/weather/b_nothing.gif";
		//按优先级进行排列，先找优先级最高的
		if(weather.indexOf("特大暴雨")>-1){
			picUrl ="../images/weather/b_25.gif";
		}
		else if(weather.indexOf("大到暴雪")>-1){
			picUrl ="../images/weather/b_28.gif";
		}
		else if(weather.indexOf("暴雪")>-1){
			picUrl ="../images/weather/b_17.gif";
		}
		else if(weather.indexOf("暴雨到大暴雨")>-1){
			picUrl ="../images/weather/b_24.gif";
		}
		else if(weather.indexOf("大暴雨")>-1){
			picUrl ="../images/weather/b_11.gif";
		}
		else if(weather.indexOf("大到暴雨")>-1){
			picUrl ="../images/weather/b_23.gif";
		}
		else if(weather.indexOf("暴雨")>-1){
			picUrl ="../images/weather/b_10.gif";
		}
		else if(weather.indexOf("雷阵雨并伴有冰雹")>-1){
			picUrl ="../images/weather/b_5.gif";
		}
		else if(weather.indexOf("中到大雪")>-1){
			picUrl ="../images/weather/b_27.gif";
		}
		else if(weather.indexOf("大雪")>-1){
			picUrl ="../images/weather/b_16.gif";
		}
		else if(weather.indexOf("小到中雪")>-1){
			picUrl ="../images/weather/b_26.gif";
		}
		else if(weather.indexOf("中雪")>-1){
			picUrl ="../images/weather/b_15.gif";
		}
		else if(weather.indexOf("中到大雨")>-1){
			picUrl ="../images/weather/b_22.gif";
		}
		else if(weather.indexOf("大雨")>-1){
			picUrl ="../images/weather/b_9.gif";
		}
		else if(weather.indexOf("小雪")>-1){
			picUrl ="../images/weather/b_14.gif";
		}
		else if(weather.indexOf("雷阵雨")>-1){
			picUrl ="../images/weather/b_4.gif";
		}
		else if(weather.indexOf("阵雨")>-1){
			picUrl ="../images/weather/b_3.gif";
		}
		else if(weather.indexOf("小到中雨")>-1){
			picUrl ="../images/weather/b_21.gif";
		}
		else if(weather.indexOf("中雨")>-1){
			picUrl ="../images/weather/b_8.gif";
		}
		else if(weather.indexOf("雨夹雪")>-1){
			picUrl ="../images/weather/b_6.gif";
		}
		else if(weather.indexOf("小雨")>-1){
			picUrl ="../images/weather/b_7.gif";
		}
		else if(weather.indexOf("沙尘暴")>-1){
			picUrl ="../images/weather/b_31.gif";
		}
		else if(weather.indexOf("雾")>-1){
			picUrl ="../images/weather/b_18.gif";
		}
		else if(weather.indexOf("霾")>-1){
			picUrl ="../images/weather/b_18.gif";
		}
		else if(weather.indexOf("扬沙")>-1){
			picUrl ="../images/weather/b_30.gif";
		}
		else if(weather.indexOf("浮尘")>-1){
			picUrl ="../images/weather/b_29.gif";
		}
		else if(weather.indexOf("阴")>-1){
			picUrl ="../images/weather/b_2.gif";
		}
		else if(weather.indexOf("多云")>-1){
			picUrl ="../images/weather/b_1.gif";
		}
		else if(weather.indexOf("晴")>-1){
			picUrl ="../images/weather/b_0.gif";
		}
		else{
			return new esri.symbol.TextSymbol(weather).
				setColor(new esri.Color([255,0,0])).
				setOffset(xoffset,yoffset).
				setFont(new esri.symbol.Font("8pt").setWeight(esri.symbol.Font.WEIGHT_NORMAL).setFamily("Microsoft YaHei"));
		}
		var symbol = new esri.symbol.PictureMarkerSymbol(picUrl, 25, 25).setOffset(xoffset, yoffset);
		return symbol;
	}
})();




