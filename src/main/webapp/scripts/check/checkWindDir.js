/**
 * Created by zhezhiren on 2017/9/11.
 */
var windDir = window.windDir || {};

windDir.normalChart=function (data) {
    var myChart = echarts.init(document.getElementById('tmpEchart'));
    var legendName = ['预报准确率', '预报评分'];
    var colors = ['#49BE5B', '#0B79E2'];
    $.ajax({
        url: _rootPath + '/check/windDir/normal/dataList',
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
        var ac = getAc(rows);
        var sc = getSc(rows);
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
                    '预报准确率' : true,
                    '预报评分' : true
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
                max: 100,
                position: 'left',
                splitLine:{
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                }
            },{
                type: 'value',
                name: '预报评分',
                min: 0,
                max: 1,
                position: 'right',
                splitLine:{
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: colors[1]
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
                    yAxisIndex:1,
                    smooth: true,
                    data: ac
                },{
                    name:'预报评分',
                    type:'line',
                    yAxisIndex:1,
                    smooth: true,
                    data: sc
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
    function getAc(result){
        var ac = [];
        for(var i=0; i<result.length; i++){
            var data = result[i].ac;
            if(null == data ||9999 == data){
                data  = null;
            }else {
                data = data.toFixed(2);
            }
            ac.push(data);
        }
        return ac;
    }

    //风向预报得分
    function getSc(result){
        var sc = [];
        for(var i=0; i<result.length; i++){
            var data = result[i].sc;
            if(null == data ||9999 == data){
                data  = null;
            }else {
                data = data.toFixed(2);
            }
            sc.push(data);
        }
        return sc;
    }


};


windDir.averageChart=function (data) {
    var myChart = echarts.init(document.getElementById('tmpEchart'));
    var legendName = ['预报准确率',"预报评分"];
    var colors = ['#49BE5B', '#0B79E2'];
    $.ajax({
        url: _rootPath + '/check/windDir/average/dataList',
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
        var effectTimes=setDate(rows);
        var ac = getAc(rows);
        var sc = getSc(rows);
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
                    '预报准确率' : true,
                    '预报评分' : true
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: effectTimes
            },
            yAxis: [{
                type: 'value',
                name: '预报准确率',
                min: 0,
                max: Math.ceil(Math.max.apply(null, ac)),
                position: 'left',
                splitLine:{
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                }
            },{
                type: 'value',
                name: '预报评分',
                min: 0,
                max: Math.ceil(Math.max.apply(null, sc)),
                position: 'right',
                splitLine:{
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: colors[1]
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
                    data: ac
                },{
                    name:'预报评分',
                    type:'line',
                    smooth: true,
                    data: sc
                }
            ]
        };
        myChart.setOption(option);
    }

    function setEffectTime(result){
        var effectTimes = [];
        for(var i=0; i<result.length; i++){
            var effectTime = result[i].effectTime
            if(-1 == $.inArray(effectTime, effectTimes)){
                effectTimes.push();
            }
            effectTimes.push();
        }
        return effectTimes;
    }

    //预报准确率
    function getAc(result){
        var ac = [];
        for(var i=0; i<result.length; i++){
            var data = result[i].ac;
            if(null == data ||9999 == data){
                data  = null;
            }else {
                data = data.toFixed(2);
            }
            ac.push(data);
        }
        return ac;
    }

    //风向预报得分
    function getSc(result){
        var sc = [];
        for(var i=0; i<result.length; i++){
            var data = result[i].sc;
            if(null == data ||9999 == data){
                data  = null;
            }else {
                data = data.toFixed(2);
            }
            sc.push(data);
        }
        return sc;
    }

};
