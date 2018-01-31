/*
 * 湿度检验
 */
function doCheckErh(){
var myChart = echarts.init(document.getElementById('tmpEchart'));

var legendName = ['平均误差', '均方根误差', '≤5%准确率', '≤10%准确率'];
var colors = ['#49BE5B', '#0B79E2', '#EB0605', '#ED8506'];

$.ajax({
	url: _erhPath + '/check/checkAssessmentHumidity/getAll',
	type: "post",
	dataType: 'json',
	success: function(data){
		var result = data;
		if (result == null) {
			alert("没有找到对应数据！")
			return;
		}
		setOption(result);
	},
	error : function(){
		alert("调用远程格点数据接口出错！");
	}
})

//x轴
function setDate(result){
	var datatime = [];
	for(var i=0; i<result.length; i++){
		datatime.push([result[i].forecastTime, result[i].time, result[i].aging].join("/"));
	}
	return datatime;
}

//平均误差
function getAverageError(result){
	var averageError = [];
	for(var i=0; i<result.length; i++){
		averageError.push(result[i].averageError.toFixed(4));
	}
	return averageError;
}

//均方根误差
function getRmsError(result){
	var rmsError = [];
	for(var i=0; i<result.length; i++){
		rmsError.push(result[i].rmsError.toFixed(4));
	}
	return rmsError;
}

//≤5%准确率
function getFiveDegreesAccuracy(result){
	var fiveDegreesAccuracy = [];
	for(var i=0; i<result.length; i++){
		fiveDegreesAccuracy.push(result[i].fiveDegreesAccuracy.toFixed(4));
	}
	return fiveDegreesAccuracy;
}

//≤10%准确率
function getTenDegreesAccuracy(result){
	var tenDegreesAccuracy = [];
	for(var i=0; i<result.length; i++){
		tenDegreesAccuracy.push(result[i].tenDegreesAccuracy.toFixed(4));
	}
	return tenDegreesAccuracy;
}

function setOption(result){
	var datatime = setDate(result);
	var averageError = getAverageError(result);
	var rmsError = getRmsError(result);
	var fiveDegreesAccuracy = getFiveDegreesAccuracy(result);
	var tenDegreesAccuracy = getTenDegreesAccuracy(result);

option = {
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
        	// 固定在顶部
            return [pt[0], '10%'];
        }
    },
    title: {
        left: 'center',
        text: '湿度检验',
    },
    grid: {
        right: '30%',
        top: '15%'
    },
    toolbox: {
        feature: {
            dataZoom: {
                yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
        }
    },
    legend: {
    	left: 50,
    	top: 25,
        data: legendName,
        selected: {
        	'≤5%准确率' : false,
        	'≤10%准确率' : false
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: datatime
    },
    yAxis: [{
        type: 'value',
        name: '平均误差',
        min: 0,
        max: Math.ceil(Math.max.apply(null, averageError)),
        position: 'left',
        splitLine:{
            show: true
        },
        axisLine: {
            lineStyle: {
                color: colors[0]
            }
        }
    }, {
        type: 'value',
        name: '均方根误差',
        min: 0,
        max: Math.ceil(Math.max.apply(null, rmsError)),
        position: 'right',
        offset: 65,
        splitLine:{
            show: false
        },
        axisLine: {
            lineStyle: {
                color: colors[1]
            }
        }
    }, {
        type: 'value',
        name: '≤5%准确率',
        min: 0,
        max: Math.ceil(Math.max.apply(null, fiveDegreesAccuracy)),
        position: 'right',
        splitLine:{
            show:false
        },
        axisLine: {
            lineStyle: {
                color: colors[2]
            }
        }
    },{
        type: 'value',
        name: '≤10%准确率',
        min: 0,
        max: Math.ceil(Math.max.apply(null, tenDegreesAccuracy)),
        position: 'right',
        offset: 130,
        splitLine:{
            show:false
        },
        axisLine: {
            lineStyle: {
                color: colors[3]
            }
        }
    }],
    dataZoom: [{
    	show: true,
        type: 'slider',
        start: 0,
        end: 60
    }],
    series: [
        {
            name:'平均误差',
            type:'line',
            smooth: true,         
            data: averageError
        },
        {
            name:'均方根误差',
            type:'line',
            smooth: true,      
            yAxisIndex: 1,
            data: rmsError
        },
        {
            name:'≤5%准确率',
            type:'line',
            smooth: true,     
            yAxisIndex: 2,
            data: fiveDegreesAccuracy
        },
        {
            name:'≤10%准确率',
            type:'line',
            smooth: true,        
            yAxisIndex: 3,
            data: tenDegreesAccuracy
        }
    ]
};

myChart.setOption(option);
}
}