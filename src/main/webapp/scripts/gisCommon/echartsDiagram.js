/**
 * 智能网格预报时序图
 */
var myChart = echarts.init(document.getElementById('echartss'));
var colors = ['#0B79E2', '#EB0605', '#ED8506', '#49BE5B', '#2B3336', '#9F9F9D'];
var datatime = ['2017-07-18 8:00','2017-07-18 11:00','2017-07-18 14:00','2017-07-18 17:00','2017-07-18 21:00',
				'2017-07-18 24:00','2017-07-19 3:00','2017-07-19 6:00','2017-07-19 9:00','2017-07-19 11:00'];
//var humidity = [];
//var rainfall = [];
//var tmp = [];
//var windDir = [];
//var windSpeed = [];
//var cloud = [];
var legendName = ['降水量', '温度','风','湿度', '天气现象', '云量'];
var weatherPhenomenon = ['晴','晴','晴','晴','晴','晴','晴','晴','晴','晴','晴','晴'];
//var date = [];
//for(var i=0; i<10; i++){
//	num = 3;
//	var now = new Date();
//	date.push([now.getFullYear(), now.getMonth()+1, now.getDate()+i+1, now.getHours()+num].join('/'));
//	num += 3;
//}

var symbolsWind = {
		initWind: "../images/wind27x54/Calm.png",
		thrWind: "../images/wind27x54/2-3LevelWind.png",
		fouWind: "../images/wind27x54/3-4LevelWind.png",
		fivWind: "../images/wind27x54/4-5LevelWind.png",
		sixWind: "../images/wind27x54/5-6LevelWind.png",
		seveWind: "../images/wind27x54/6-7LevelWind.png",
		eigWind: "../images/wind27x54/7-8LevelWind.png",
		ninWind: "../images/wind27x54/8-9LevelWind.png",
		tenWind: "../images/wind27x54/9-10LevelWind.png",
		eleWind: "../images/wind27x54/10-11LevelWind.png",
		tlWind: "../images/wind27x54/11-12LevelWind.png"
};

var symbols = {
		sunny: "../images/weatherPhenomenon/sunny.gif",
		mostlysunny: "../images/weatherPhenomenon/mostlysunny.gif",
		partlycloudy: "../images/weatherPhenomenon/partlycloudy.gif",
		cloudy: "../images/weatherPhenomenon/cloudy.gif",
		overcast_sky: "../images/weatherPhenomenon/overcast_sky.GIF",
		light_rain: "../images/weatherPhenomenon/light_rain.gif",
		snowShower: "../images/weatherPhenomenon/snowShower.gif",
		T_storms: "../images/weatherPhenomenon/T_storms.gif",
		rainSnowShower: "../images/weatherPhenomenon/rainSnowShower.gif",
		icerain: "../images/weatherPhenomenon/icerain.gif",
		mist: "../images/weatherPhenomenon/mist.gif"
};

var rawData = [
		{name: '', velocity: 7, symbol: 'initWind', rotate: 35},
	    {name: '', velocity: 3, symbol: 'thrWind', rotate: 45},
	    {name: '', velocity: 4, symbol: 'fouWind', rotate: 55},
	    {name: '', velocity: 5, symbol: 'fivWind', rotate: 65},
	    {name: '', velocity: 6, symbol: 'sixWind', rotate: 15},
	    {name: '', velocity: 7, symbol: 'seveWind', rotate: 25},
	    {name: '', velocity: 8.8, symbol: 'eigWind', rotate: -35},
	    {name: '', velocity: 8.5, symbol: 'ninWind', rotate: -45},
	    {name: '', velocity: 10, symbol: 'tenWind', rotate: 15},
	    {name: '', velocity: 11, symbol: 'eleWind', rotate: 35},
	    {name: '', velocity: 12, symbol: 'tlWind', rotate: 90}
];

var rawDataWeatherPhenomenon = [
		{name: '晴', code: 11, symbol: 'sunny'},
		{name: '晴间多云', code: 12, symbol: 'mostlysunny'},
		{name: '多云间晴', code: 13, symbol: 'partlycloudy'},
		{name: '多云', code: 14, symbol: 'cloudy'},
		{name: '阴', code: 15, symbol: 'overcast_sky'},
		{name: '多云间阴', code: 16, symbol: 'overcast_sky'},
		{name: '阴间多云', code: 17, symbol: 'overcast_sky'},
		{name: '小雨', code: 18, symbol: 'light_rain'},
		{name: '小阵雨', code: 19, symbol: 'light_rain'},
		{name: '大阵雨', code: 20, symbol: 'light_rain'},
		{name: '阵雨', code: 21, symbol: 'light_rain'},
		{name: '小雪', code: 22, symbol: 'snowShower'},
		{name: '小阵雪', code: 23, symbol: 'snowShower'},
		{name: '雷雨', code: 24, symbol: 'T_storms'},
		{name: '阵雨或雷雨', code: 25, symbol: 'T_storms'},
		{name: '雷雨大风', code: 26, symbol: 'T_storms'},
		{name: '雨夹雪', code: 27, symbol: 'rainSnowShower'},
		{name: '雨并有雾', code: 28, symbol: 'light_rain'},
		{name: '大雨', code: 29, symbol: 'light_rain'},
		{name: '小雨夹雪', code: 30, symbol: 'rainSnowShower'},
		{name: '大雨夹雪', code: 31, symbol: 'rainSnowShower'},
		{name: '大雪', code: 32, symbol: 'snowShower'},
		{name: '零星雨夹雪', code: 33, symbol: 'rainSnowShower'},
		{name: '阵雪', code: 34, symbol: 'snowShower'},
		{name: '冻雨', code: 35, symbol: 'icerain'},
		{name: '冻毛毛雨', code: 36, symbol: 'icerain'},
		{name: '阴间多云，有雪', code: 37, symbol: 'snowShower'},
		{name: '有雾', code: 38, symbol: 'mist'},
		{name: '部分有雾', code: 39, symbol: 'mist'}
];
function getCurHours(){
	var nowDate = new Date();
	var _hours = nowDate.getHours();
	var _minutes = nowDate.getMinutes();
	var _curHour;
	if(_hours>6 && _hours<17){
		_curHour = 8;
	}
	else if(_hours==17){
		if(_minutes<10){
			_curHour = 8;
		}else{
			_curHour = 20;
		}
	}
	else if((24>_hours && _hours>17)||_hours<6){
		_curHour = 20;
	}
	return _curHour;
}

function setDate(curDate, interval){
	var _curHour = getCurHours();
	var date = [];
	var isDate = new Date(curDate.replace(/-/g, "/"));
	isDate.setHours(isDate.getHours()+_curHour);
	for(var i=0; i<80; i++){
		isDate.setHours(isDate.getHours()+interval);
//		alert(isDate.getFullYear()+" "+(isDate.getMonth()+1)+" "+isDate.getDate()+" "+isDate.getHours());
		date.push([isDate.getFullYear(), isDate.getMonth()+1, isDate.getDate(), isDate.getHours()].join('/'));
	}
	return date;
}

function setDate24(curDate, interval){
	var _curHour = getCurHours();
	var date = [];
	var isDate = new Date(curDate.replace(/-/g, "/"));
	isDate.setHours(isDate.getHours()+_curHour);
	for(var i=0; i<10; i++){
		isDate.setHours(isDate.getHours()+interval);
//		alert(isDate.getFullYear()+" "+(isDate.getMonth()+1)+" "+isDate.getDate()+" "+isDate.getHours());
		date.push([isDate.getFullYear(), isDate.getMonth()+1, isDate.getDate()].join('/'));
	}
	return date;
}

function splitData(windDir, windSpeed){
	var wind = [];
	for(var i=0; i<windSpeed.length; i++){
		var w = {windSpeed:windSpeed[i], windDir:windDir[i]};
		wind.push(w);
	}
	return wind;
}

function setOption(humidity, rainfall, tmp, windDir, windSpeed, cloud, curDateX, interval, releaseTime){
	var date = setDate(curDateX, interval);
	var wind = splitData(windDir, windSpeed);
	localStorage.setItem("date",date);
	localStorage.setItem("tmp",tmp);
	localStorage.setItem("rainfall",rainfall);
	localStorage.setItem("humidity",humidity);
	localStorage.setItem("windSpeed",windSpeed);
	localStorage.setItem("cloud",cloud);
	localStorage.setItem("releaseTime",releaseTime);
myChart.showLoading({
	    text :"图表数据正在努力加载..."
	});
option = {
    color: colors,

    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    grid: {
        right: '28%'
    },
    toolbox: {
        feature: {
        	myTool: {
                show: true,
                title: '导出Excel',
                icon: 'image://../images/gridTool/excel_16px.png',
                onclick: function (){
                	var date = localStorage.getItem("date");
                	var tmp = localStorage.getItem("tmp");
                	var rainfall = localStorage.getItem("rainfall");
                	var humidity = localStorage.getItem("humidity");
                	var windSpeed = localStorage.getItem("windSpeed");
                	var cloud = localStorage.getItem("cloud");
                	var releaseTime = localStorage.getItem("releaseTime");
                	var date24 = localStorage.getItem("date24");
                	var tmp24 = localStorage.getItem("tmp24");
                	var rainfall24 = localStorage.getItem("rainfall24");
                	var humidity24 = localStorage.getItem("humidity24");
                	var windSpeed24 = localStorage.getItem("windSpeed24");
                	var cloud24 = localStorage.getItem("cloud24");
                	var cityName = localStorage.getItem("city");
                	var areaName = localStorage.getItem("area");
                	var log = localStorage.getItem("longitude");
                	var lat = localStorage.getItem("latitude");
                	exportExcel(date, tmp, rainfall, humidity, windSpeed, cloud, releaseTime,
                			date24, tmp24, rainfall24, humidity24, windSpeed24, cloud24,
                			cityName, areaName, log, lat);
                }
            },
            dataView: {
                show: true,
                readOnly: true,
                optionToContent: function(opt) {
                    var axisData = opt.xAxis[0].data;
                    var series = opt.series;
//                    var tableDom = document.createElement("table");
//                    tableDom.setAttribute("id","DataView");
//                    tableDom.setAttribute("class","table-data-table");
                    var table = '<table id="DataView" border="1" style="width:100%;text-align:center;color:black"><tbody><tr>'
//                    var table = '<thead><tr>'
                                 + '<td>时间</td>'
                                 + '<td>' + series[0].name + '</td>'
                                 + '<td>' + series[1].name + '</td>'
//                                 + '<td>' + series[2].name + '</td>'
                                 + '<td>' + series[3].name + '</td>'
                                 + '<td>' + series[5].name + '</td>'
                                 + '</tr>';
                    for (var i = 0, l = axisData.length; i < l; i++) {
                        table += '<tr>'
                                 + '<td>' + axisData[i] + '</td>'
                                 + '<td>' + series[0].data[i] + '</td>'
                                 + '<td>' + series[1].data[i] + '</td>'
//                                 + '<td>' + series[2].data[i] + '</td>'
                                 + '<td>' + series[3].data[i] + '</td>'
                                 + '<td>' + series[5].data[i] + '</td>'
                                 + '</tr>';
                    }
                    table += '</tbody></table>';
//                    tableDom.innerHTML = table;
//                    return tableDom;
                    return table;
                }
            },
            restore: {
                show: true
            },
            saveAsImage: {
                show: true
            }
        }
    },
    legend: {
    	left: 50,
        data: legendName,
        selected: {
        	'风' : false,
        	'湿度' : false,
            '天气现象': false,
            '云量': false
        }
    },
    xAxis: [{
        type: 'category',
        axisTick: {
            alignWithLabel: true
        },
        data: date
    }],
    yAxis: [
      	 {
			type : 'value',
			name : '降水量(mm)',
//			min : 0,
//			max : Math.ceil(Math.max.apply(null, rainfall)),
			position : 'left',
			splitLine : {
				show : true
			},
			axisLine : {
				lineStyle : {
					color : colors[0]
				}
			},
			axisLabel : {
//				formatter : '{value} mm'
			}
		}, {
			type : 'value',
			name : '温度',
//			min : Math.floor(Math.min.apply(null, tmp)),
//			max : Math.ceil(Math.max.apply(null, tmp)),
			position : 'right',
			splitLine : {
				show : false
			},
			axisLine : {
				lineStyle : {
					color : colors[1]
				}
			},
			axisLabel : {
				formatter : '{value}°C'
			}
		}, {
			type : 'value',
			name : '风(m/s)',
//			min : 0,
//			max : Math.ceil(Math.max.apply(null, windSpeed)),
			position : 'right',
			offset : 50,
			splitLine : {
				show : false
			},
			axisLine : {
				lineStyle : {
					color : colors[2]
				}
			},
			axisLabel : {
//				formatter : '{value} m/s'
			}
		},{
        type: 'value',
        name: '湿度(%)',
//        min: 0,
//        max: 100,
        position: 'right',
        offset: 100,
        splitLine:{
            show:false
        },
        axisLine: {
            lineStyle: {
                color: colors[3]
            }
        },
        axisLabel: {
//            formatter: '{value} %'
        }
    },{
        type: 'value',
        name: '',
        min: 0,
        max: 40,
        axisTick : {show: false},
        splitLine:{
            show:false
        },
        axisLine: {
            lineStyle: {
                color: colors[4]
            }
        },
        axisLabel: {
            formatter: ''
        }
    },{
        type: 'value',
        name: '云量(%)',
//        min: 0,
//        max: 100,
        position: 'right',
        offset: 150,
        axisTick : {show: false},
        splitLine:{
            show:false
        },
        axisLine: {
            lineStyle: {
                color: colors[5]
            }
        },
        axisLabel: {
//            formatter: '{value} %'
        }
    }],
    dataZoom: [
        {
            show: true,
            type: 'slider',
            start: 0,
            end: 30
        }
    ],
    series: [
    	{
            name: '降水量',
            type: 'bar',
            data: rainfall
        }, {
            name: '温度',
            type: 'line',
            smooth: true,
            yAxisIndex: 1,
            data: tmp
        },
        {
            name: '风',
            type: 'line',
            smooth: true,
            yAxisIndex: 2,    
            data: wind.map(function(item){
            	return{
            		value: item.windSpeed,
            		symbol: 'image://' + getWindSymbols(item.windSpeed),
            		symbolSize: [25, 50],
            		symbolRotate: item.windDir,
            		symbolOffset: [3, 3]
            	};
            })
//            data: windSpeed,
//            symbolSize: 35,
//            symbol: 'image://' + getWindSymbols(windSpeed),
//            symbolRotate: windDir
        },	
    {
        name: '湿度',
        type: 'line',
        smooth: true,
        yAxisIndex: 3,
        data: humidity
    }, 
    {
    	name: '天气现象',
        type: 'line',
        smooth: true,
        yAxisIndex: 4,
//        symbol: 'image://' + uploadedDataURL,
//        symbolSize: 30
//        symbol: 'image://' + symbolsWind[item.symbol],
        data: rawDataWeatherPhenomenon.map(function(item){
        	return{
        		value: item.code,
        		symbol: 'image://' + symbols[item.symbol],
        		symbolSize: 30,
        	};
        })
    },
    {
    	name: '云量',
        type: 'line',
        smooth: true,
        yAxisIndex: 5,
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(144, 144, 144)'
                }, {
                    offset: 1,
                    color: 'rgb(144, 144, 144)'
                }])
            }
        },
        data: cloud
    }]
};
myChart.hideLoading();
//为echarts对象加载数据 
myChart.setOption(option);

}

function getWindSymbols(windSpeed){
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
	return picUrl;
}

/*在图层上打标记*/
function insertWithin(x, y){
	//指定结点 id
    var node = document.getElementsByTagName("body")[0];
	if(document.getElementById('newD')){
		deleteNode();
	}
    //创建
    var NewDiv = document.createElement("div");
    //对div设置定位  
	NewDiv.setAttribute("id", "newD");
    NewDiv.style.position = "absolute";
    NewDiv.style.left = x-12 + "px";
    NewDiv.style.top = y-12 + "px";
	NewDiv.style.zIndex = "1001";
    //创建div内加入的内容
    var Newimg = document.createElement("img");
    //对图片设置路径和img的id
    Newimg.src = "../images/navToolbar/position.png";
//    Newimg.id = idstr;
    //追加一个新的子结点
    NewDiv.appendChild(Newimg);
    //追加一个新的结点
    node.appendChild(NewDiv);
}
function deleteNode(){
	var node = document.getElementsByTagName("body")[0];
	node.removeChild(document.getElementById('newD'));
}

/**
 * 图层格点事件
 */
var _graphic
function setSymbol(X, Y){
	var pt = new esri.geometry.Point(X, Y);//位置
//	var pms = new esri.symbol.PictureMarkerSymbol("../images/navToolbar/position.png",24,24);//图标
	var symbol = new esri.symbol.SimpleMarkerSymbol();
	_graphic = new esri.Graphic(pt, symbol);
	var graphicLayer = getGridGraphicLayer();
	graphicLayer.add(_graphic);
//	graphicLayer.remove(_graphic);
	admiQueryHandlerOne(pt);
	admiQueryHandlerTwo(pt);
}

function showReleaseTime(){
	var timePoint = document.getElementById("rightPanel").contentWindow.document.getElementById("timeType").value;
	var curDate = document.getElementById("rightPanel").contentWindow.document.getElementById("createTime").value;
	document.getElementById("publishDate1").innerText = curDate + " " + timePoint + ":00";
	//	var nowDate = new Date();
//	var _hours = nowDate.getHours();
//	var _minutes = nowDate.getMinutes();
//	if(17> _hours && _hours>6){
//		document.getElementById("publishDate1").innerText = curDate + " " + "8:00";
//	}
//	else if(_hours==17){
//		if(_minutes<10){
//			document.getElementById("publishDate1").innerText = curDate + " " + "8:00";
//		}else{
//			document.getElementById("publishDate1").innerText = curDate + " " + "20:00";
//		}
//	}
//	else if((24> _hours && _hours>17)||_hours<6){
//		document.getElementById("publishDate1").innerText = curDate + " " + "20:00";
//	}
}

function admiQueryHandlerOne(geometry)
{
	require([
		"esri/tasks/query", 
		"esri/tasks/QueryTask",
	],function(Query,QueryTask){
		var query = new Query();
		var queryTask = new QueryTask(NxgridConfig.MapConfig.nxadmiUrl+"1");
		query.geometry = geometry;
		query.outSpatialReference = {wkid:4326}; 
		query.returnGeometry = true;
		query.outFields = ["NAME"];
		queryTask.execute(query, queryComplete, queryError);
	});
}
function queryComplete(result){
	var city = document.getElementById("city");
	var cityName = result.features[0].attributes["NAME"];
	city.innerText = cityName;
	localStorage.setItem("city",cityName);
}
function queryError(result){
	alert("未在宁夏区域内，无法获取地理位置，请重新选择！");
}

function admiQueryHandlerTwo(geometry){
	require([
		"esri/tasks/query", 
		"esri/tasks/QueryTask",
	],function(Query,QueryTask){
		var query = new Query();
		var queryTask = new QueryTask(NxgridConfig.MapConfig.nxadmiUrl+"2");
		query.geometry = geometry;
		query.outSpatialReference = {wkid:4326}; 
		query.returnGeometry = true;
		query.outFields = ["NAME"];
		queryTask.execute(query, showQueryResult);
	});
}
function showQueryResult(result){
	var area = document.getElementById("area");
	var areaName = result.features[0].attributes["NAME"];
	area.innerText = areaName;
	localStorage.setItem("area",areaName);
}

function clickHandler(evt){
	var id = evt.graphic.attributes.id;
	var X = evt.mapPoint.x;
	var Y = evt.mapPoint.y;
	var graphicLayer = getGridGraphicLayer();
	graphicLayer.remove(_graphic);
	setSymbol(X, Y);
	showReleaseTime();
	document.getElementById("longitude").value = X.toFixed(2);
	document.getElementById("latitude").value = Y.toFixed(2);
	localStorage.setItem("longitude",X.toFixed(2));
	localStorage.setItem("latitude",Y.toFixed(2));
	queryId(id);
}

function queryId(id){
	var curDate = document.getElementById("rightPanel").contentWindow.document.getElementById("createTime").value;
	if(id.length==6){
		queryGrid(id, curDate.replace(/-/g, ""), curDate);
	}
	else if(id.length>6){
		queryGrid(id.substring(2), curDate.replace(/-/g, ""), curDate);
	}
}
function queryGrid(id, curDate, curDateX){
	var _curHour = getCurHours();
	var releaseTime = curDate + _curHour;
	var pdata = {
			"id" : id,
			"startDate" : curDate,
			"point" : _curHour
		};

			$.ajax({
				url : NxgridConfig.MapConfig.nxGridQueryShowUrl,
				type : "POST",
				dataType : 'jsonp',
				jsonp : 'callback',
				data : pdata,
				async:false,
				beforeSend: ajaxLoading,
				success : function(data) {
					ajaxLoadEnd();
					var result = data;
					if (result == null || result.id == null) {
						alert("没有找到对应数据！")
						return;
					}
					var tmp = retainOneDecimal(result.temp);
					var rainfall = retainOneDecimal(result.rain);
					var humidity = retainOneDecimal(result.humidity);
					var windSpeed = retainOneDecimal(result.windSpeed);
					var windDir = retainOneDecimal(result.windDir);
					var cloud = retainOneDecimal(result.cloud);
					var interval = result.interval;
					setOption(humidity, rainfall, tmp, windDir, windSpeed, cloud, curDateX, interval, releaseTime);
					AjaxTrend24();
				},
				error : function(){
					alert("接口出错！");
				}
			})
		
		function AjaxTrend24(){
			$.ajax({
				url : NxgridConfig.MapConfig.nx24GridQueryShowUrl,
				type : "POST",
				dataType : 'jsonp',
				jsonp : 'callback',
				data : pdata,
				async:false,
//				beforeSend: ajaxLoading,
				success : function(data) {
//					ajaxLoadEnd();
					var result = data;
					if (result == null || result.id == null) {
						alert("没有找到对应数据！")
						return;
					}
					var tmp = retainOneDecimal(result.temp);
					var rainfall = retainOneDecimal(result.rain);
					var humidity = retainOneDecimal(result.humidity);
					var windSpeed = retainOneDecimal(result.windSpeed);
					var windDir = retainOneDecimal(result.windDir);
					var cloud = retainOneDecimal(result.cloud);
					var interval = result.interval;
					
					var date = setDate24(curDateX, interval);
//					var wind = splitData(windDir, windSpeed);
					localStorage.setItem("date24",date);
					localStorage.setItem("tmp24",tmp);
					localStorage.setItem("rainfall24",rainfall);
					localStorage.setItem("humidity24",humidity);
					localStorage.setItem("windSpeed24",windSpeed);
					localStorage.setItem("cloud24",cloud);
//					localStorage.setItem("releaseTime24",releaseTime);
				},
				error : function(){
					alert("接口出错！");
				}
			})
			}
}
//loading效果
function ajaxLoading(){   
    $("<div class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",height:$(window).height()}).appendTo("body");   
    $("<div class=\"datagrid-mask-msg\"></div>").html("正在处理，请稍候。。。").appendTo("body").css({display:"block",left:($(document.body).outerWidth(true) - 190) / 2,top:($(window).height() - 45) / 2});   
 }   
function ajaxLoadEnd(){   
     $(".datagrid-mask").remove();   
     $(".datagrid-mask-msg").remove();               
} 

function exportExcel(date, tmp, rainfall, humidity, windSpeed, cloud, releaseTime,
		date24, tmp24, rainfall24, humidity24, windSpeed24, cloud24,
		cityName, areaName, log, lat){
	var pdata = {
			"releaseTime" : releaseTime,
			"fctime" : date,
			"tmp" : tmp,
			"rainfall" : rainfall,
			"humidity" : humidity,
			"windSpeed" : windSpeed,
			"cloud" : cloud,
			"fctime24" : date24,
			"tmp24" : tmp24,
			"rainfall24" : rainfall24,
			"humidity24" : humidity24,
			"windSpeed24" : windSpeed24,
			"cloud24" : cloud24,
			"cityName" : cityName,
			"areaName" : areaName,
			"log" : log,
			"lat" : lat
		};
	httpPost(_basePath + '/file/export/exportExcel', pdata);
}
function httpPost(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.style.display = "none";

    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        temp.appendChild(opt);
    }

    document.body.appendChild(temp);
    temp.submit();

    return temp;
}
function retainOneDecimal(data){
	var odec = [];
	for(var i=0; i<data.length; i++){
		odec.push(data[i].toFixed(1));
	}
	return odec;
}
/*
 *逆向地理编码找格点 
 */
$("#queryGrid").click(function(){
	var longitude = $("#longitude").val();
	var latitude = $("#latitude").val();
	if(longitude<104.15 || longitude>107.80 || latitude<35.10 || latitude>39.50){
		alert("输的经纬度超出范围！"+"\n"+
				"约定范围：经度[104.15 107.80],纬度[35.10 39.50]");
	}else if(longitude>104.15 && longitude<107.80 || latitude>35.10 && latitude<39.50){
		var startLog = 104.15;
		var startLat = 35.10;
		var x = (longitude - startLog)/0.05;
		var y = (latitude - startLat)/0.05;
		var m = Math.round(x);
		var n = Math.round(y);
		var id = "0"+m+"0"+n;
		queryId(id);
//		var point = new esri.geometry.Point(longitude, latitude);
//		var myMap = getMap();
//		insertWithin(myMap.toScreen(point).x, myMap.toScreen(point).y);
		var graphicLayer = getGridGraphicLayer();
		graphicLayer.remove(_graphic);
		setSymbol(longitude, latitude);
	}
});
