/*
 * 最高温度检验
 */
var tmax = window.tmp || {};
tmax.normalChart=function (data) {
    var myChart = echarts.init(document.getElementById('tmpEchart'));
    
    var legendName = ['平均误差', '均方根误差', '≤2℃准确率', '技巧评分'];
    var colors = ['#49BE5B', '#0B79E2', '#EB0605', '#ED8506'];
    
    $.ajax({
        url: _tmpPath + '/check/checkTmax/normal/loadList',
        type: "post",
        dataType: 'json',
        data: data,
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
    
    //技巧评分
    function getSst(result){
        var sst = [];
        for(var i=0; i<result.length; i++){
        	sst.push(result[i].sst);
        }
        return sst;
    }
    
    //平均误差
    function getAverageError(result){
        var averageError = [];
        for(var i=0; i<result.length; i++){
            averageError.push(result[i].averageError.toFixed(2));
        }
        return averageError;
    }
    
    //均方根误差
    function getRmsError(result){
        var rmsError = [];
        for(var i=0; i<result.length; i++){
            rmsError.push(result[i].rmsError.toFixed(2));
        }
        return rmsError;
    }
    
    //≤2℃准确率
    function getTwoDegreesAccuracy(result){
        var twoDegreesAccuracy = [];
        for(var i=0; i<result.length; i++){
            twoDegreesAccuracy.push(result[i].twoDegreesAccuracy.toFixed(0));
        }
        return twoDegreesAccuracy;
    }
    
    function setOption(data){
    	var rows = data.rows;
        var datatime = setDate(rows);
        var averageError = getAverageError(rows);
        var rmsError = getRmsError(rows);
        var twoDegreesAccuracy = getTwoDegreesAccuracy(rows);
        var sst = getSst(rows);
    
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
                text: '最高温度单时效检验',
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
                    '技巧评分' : false,
                    '≤2℃准确率' : false
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
                position: 'right',
                splitLine:{
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: colors[1]
                    }
                }
            },
            {
                type: 'value',
                name: '技巧评分',
                position: 'right',
                offset: 125,
                splitLine:{
                    show:false
                },
                axisLine: {
                    lineStyle: {
                        color: colors[2]
                    }
                }
            },
            {
                type: 'value',
                name: '≤2℃准确率',
                position: 'right',
                offset: 65,
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
                    name:'技巧评分',
                    type:'line',
                    smooth: true,     
                    yAxisIndex: 2,
                    data: sst
                },
                {
                    name:'≤2℃准确率',
                    type:'line',
                    smooth: true,        
                    yAxisIndex: 3,
                    data: twoDegreesAccuracy
                }
            ]
        };
        
        myChart.setOption(option);
    }
}
tmax.normalMulChart=function (data) {
var myChart = echarts.init(document.getElementById('tmpEchart'));
    
    var legendName = ['平均误差', '均方根误差', '≤2℃准确率', '技巧评分'];
    var colors = ['#49BE5B', '#0B79E2', '#EB0605', '#ED8506'];
    
    $.ajax({
        url: _tmpPath + '/check/checkTmax/normalMul/loadList',
        type: "post",
        dataType: 'json',
        data: data,
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
            datatime.push(result[i].aging);
        }
        return datatime;
    }
    
    //技巧评分
    function getSst(result){
        var sst = [];
        for(var i=0; i<result.length; i++){
        	sst.push(result[i].sst);
        }
        return sst;
    }
    
    //平均误差
    function getAverageError(result){
        var averageError = [];
        for(var i=0; i<result.length; i++){
            averageError.push(result[i].averageError.toFixed(2));
        }
        return averageError;
    }
    
    //均方根误差
    function getRmsError(result){
        var rmsError = [];
        for(var i=0; i<result.length; i++){
            rmsError.push(result[i].rmsError.toFixed(2));
        }
        return rmsError;
    }
    
    //≤2℃准确率
    function getTwoDegreesAccuracy(result){
        var twoDegreesAccuracy = [];
        for(var i=0; i<result.length; i++){
            twoDegreesAccuracy.push(result[i].twoDegreesAccuracy.toFixed(0));
        }
        return twoDegreesAccuracy;
    }
    
    function setOption(result){
        var datatime = setDate(result);
        var averageError = getAverageError(result);
        var rmsError = getRmsError(result);
        var twoDegreesAccuracy = getTwoDegreesAccuracy(result);
        var sst = getSst(result);
    
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
                text: '最高温度多时效检验',
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
                    '技巧评分' : false,
                    '≤2℃准确率' : false
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
                position: 'right',
                splitLine:{
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: colors[1]
                    }
                }
            },
            {
                type: 'value',
                name: '技巧评分',
                position: 'right',
                offset: 125,
                splitLine:{
                    show:false
                },
                axisLine: {
                    lineStyle: {
                        color: colors[2]
                    }
                }
            },
            {
                type: 'value',
                name: '≤2℃准确率',
                position: 'right',
                offset: 65,
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
                end: 30
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
                    name:'技巧评分',
                    type:'line',
                    smooth: true,     
                    yAxisIndex: 2,
                    data: sst
                },
                {
                    name:'≤2℃准确率',
                    type:'line',
                    smooth: true,        
                    yAxisIndex: 3,
                    data: twoDegreesAccuracy
                }
            ]
        };
        
        myChart.setOption(option);
    }
}