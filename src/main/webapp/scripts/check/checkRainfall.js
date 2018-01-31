/**
 * Created by zhezhiren on 2017/9/11.
 */
var rainfall = window.rainfall || {};

rainfall.normalChart=function (data) {
    var myChart = echarts.init(document.getElementById('tmpEchart'));
    var legendName = ['预报准确率'];
    var colors = ['#49BE5B'];
    $.ajax({
        url: _tmpPath + '/check/rainfall/normal/dataList',
        type: "post",
        dataType: 'json',
        data:data,
        success: function(data){
            var result = data;
            if (result == null) {
                alert("没有找到对应数据！")
                return;
            }
            initOption(result);
        },
        error : function(){
            alert("调用远程格点数据接口出错！");
        }
    });

    function initOption(data) {
        var rows = data.rows;
        var datatime=setDate(rows);
        var pc = getPc(rows);
        var option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    // 固定在顶部
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '降水不分级单时效检验',
            },
            grid: {
                right: '20%',
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
                top: 25,
                data: legendName,
                selected: {
                    '预报准确率' : true
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: datatime
            },
            yAxis: [{
                type: 'value',
                name: '预报准确率',
                min: 0,
                max: Math.ceil(Math.max.apply(null, pc)),
                position: 'left',
                splitLine:{
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                }
            }],
            dataZoom: [{
                show: true,
                type: 'slider',
                start: 0,
                end: 100
            }],
            series: [
                {
                    name:'预报准确率',
                    type:'line',
                    smooth: true,
                    data: pc
                }
            ]
        };
        myChart.setOption(option);
    }

    function setDate(result){
        var datatime = [];
        for(var i=0; i<result.length; i++){
            datatime.push(result[i].forecastTime);
        }
        return datatime;
    }

    //预报准确率
    function getPc(result, level){
        var pc = [];
        for(var i=0; i<result.length; i++){
            var data = result[i].pc;
            if(null == data ||9999 == data){
                data  = null;
            }else {
                data = data.toFixed(2);
            }
            pc.push(data);
        }
        return pc;
    }


};


rainfall.normalMulChart=function (data) {
    var myChart = echarts.init(document.getElementById('tmpEchart'));
    var legendName = ['预报准确率'];
    var colors = ['#49BE5B'];
    $.ajax({
        url: _tmpPath + '/check/rainfall/normalMul/dataList',
        type: "post",
        dataType: 'json',
        data:data,
        success: function(data){
            var result = data;
            if (result == null) {
                alert("没有找到对应数据！")
                return;
            }
            initOption(result);
        },
        error : function(){
            alert("调用远程格点数据接口出错！");
        }
    });

    function initOption(data) {
        var rows = data.rows;
        var effectTime=setDate(rows);
        var pc = getPc(rows);
        var option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    // 固定在顶部
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '降水不分级多时效检验',
            },
            grid: {
                right: '20%',
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
                    '预报准确率' : true
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: effectTime
            },
            yAxis: [{
                type: 'value',
                name: '预报准确率',
                min: 0,
                max: Math.ceil(Math.max.apply(null, pc)),
                position: 'left',
                splitLine:{
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                }
            }],
            dataZoom: [{
                show: true,
                type: 'slider',
                start: 0,
                end: 100
            }],
            series: [
                {
                    name:'预报准确率',
                    type:'line',
                    smooth: true,
                    data: pc
                }
            ]
        };
        myChart.setOption(option);
    }

    function setDate(result){
        var effectTime = [];
        for(var i=0; i<result.length; i++){
            effectTime.push(result[i].effectTime);
        }
        return effectTime;
    }

    //预报准确率
    function getPc(result, level){
        var pc = [];
        for(var i=0; i<result.length; i++){
            var data = result[i].pc;
            if(null == data ||9999 == data){
                data  = null;
            }else {
                data = data.toFixed(2);
            }
            pc.push(data);
        }
        return pc;
    }


};




rainfall.classyChart= function(data){
    var myChart = echarts.init(document.getElementById('tmpEchart'));
    var legendName = ['1级', '2级', '3级', '4级', '5级', "6级"];
    var colors = ['#49BE5B', '#0B79E2', '#EB0605', '#ED8506', '#772233', "#AACCBB"];

    $.ajax({
        url: _tmpPath + '/check/rainfall/normalMul/dataList',
        type: "post",
        dataType: 'json',
        data:data,
        success: function(data){
            var result = data;
            if (result == null) {
                alert("没有找到对应数据！")
                return;
            }
            initOption(result);
        },
        error : function(){
            alert("调用远程格点数据接口出错！");
        }
    });

    function initOption(data) {
        var rows = data.rows;
        var datatime=setDate(rows);
        var level1 = getPc(rows,1);
        var level2 = getPc(rows,2);
        var level3 = getPc(rows,3);
        var level4 = getPc(rows,4);
        var level5 = getPc(rows,5);
        var level6 = getPc(rows,6);
        var option = {
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    // 固定在顶部
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: '降水分级单时效检验',
            },
            grid: {
                right: '20%',
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
                data: legendName
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: datatime
            },
            yAxis: [{
                type: 'value',
                name: '预报准确率',
                min: 0,
                max: Math.ceil(Math.max.apply(null, pc)),
                position: 'left',
                splitLine:{
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                }
            }],
            dataZoom: [{
                show: true,
                type: 'slider',
                start: 0,
                end: 100
            }],
            series: [
                {
                    name:'一级',
                    type:'line',
                    smooth: true,
                    data: level1
                },
                {
                    name:'二级',
                    type:'line',
                    smooth: true,
                    data: level1
                },
                {
                    name:'三级',
                    type:'line',
                    smooth: true,
                    data: level1
                },
                {
                    name:'4级',
                    type:'line',
                    smooth: true,
                    data: level1
                },
                {
                    name:'5级',
                    type:'line',
                    smooth: true,
                    data: level1
                },
                {
                    name:'6级',
                    type:'line',
                    smooth: true,
                    data: level1
                },
            ]
        };
        myChart.setOption(option);
    }

    function setDate(result){
        var datatime = [];
        for(var i=0; i<result.length; i++){
            var time = result[i].forecastTime;
            if(-1 == $.inArray(time, datatime)){
                datatime.push();
            }
        }
        return datatime;
    }

    //平均误差
    function getPc(result, level){
        var pc = [];
        for(var i=0; i<result.length; i++){
            var data = result[i].pc;
            if(data.rainfallLevel == level)
                if(9999 == data){
                    data  = null;
                }else {
                    data = data.toFixed(2);
                }
            pc.push(data);
        }
        return pc;
    }

};
