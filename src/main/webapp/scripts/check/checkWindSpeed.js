/**
 * Created by zhezhiren on 2017/9/11.
 */
var windSpeed = window.windSpeed || {};
var colors = window.colors || ['#49BE5B', '#0B79E2', '#EB0605', '#ED8506', '#772233', "#AACCBB"];

windSpeed.normalChart=function (data) {
    var myChart = echarts.init(document.getElementById('tmpEchart'));
    var legendName = ['准确率', '偏强率', '偏弱率', '评分', '绝对误差', '综合准确率'];

    $.ajax({
        url: _rootPath + '/check/windSpeed/normal/dataList',
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
        var fs = getFs(rows);
        var fw = getFw(rows);
        var sc = getSc(rows);
        var wmab = getWmab(rows);
        var acz = getAcz(rows);
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
                text: '风力单时效检验',
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
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: datatime
            },
            yAxis: [{
                type: 'value',
                name: '准确率',
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
                name: '偏强率',
                min: 0,
                max: 100,
                position: 'left',
                splitLine:{
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: colors[1]
                    }
                }
            },{
                type: 'value',
                name: '偏弱率',
                min: 0,
                max: 100,
                position: 'left',
                splitLine:{
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: colors[2]
                    }
                }
            },{
                type: 'value',
                name: '评分',
                min: 0,
                max: 1,
                position: 'right',
                splitLine:{
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: colors[3]
                    }
                }
            },{
                type: 'value',
                name: '绝对误差',
                min: 0,
                max: Math.ceil(Math.max.apply(null, wmab)),
                position: 'right',
                offset: 40,
                splitLine:{
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: colors[4]
                    }
                }
            },{
                type: 'value',
                name: '综合准确率',
                min: 0,
                max: 100,
                position: 'left',
                splitLine:{
                    show: true
                },
                axisLine: {
                    lineStyle: {
                        color: colors[5]
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
                    name:'准确率',
                    type:'line',
                    yAxisIndex:0,
                    smooth: true,
                    data: ac
                },{
                    name:'偏强率',
                    type:'line',
                    yAxisIndex:1,
                    smooth: true,
                    data: fs
                },{
                    name:'偏弱率',
                    type:'line',
                    yAxisIndex:2,
                    smooth: true,
                    data: fw
                },{
                    name:'评分',
                    type:'line',
                    yAxisIndex:3,
                    smooth: true,
                    data: sc
                },{
                    name:'绝对误差',
                    type:'line',
                    yAxisIndex:4,
                    smooth: true,
                    data: wmab
                },{
                    name:'综合准确率',
                    type:'line',
                    yAxisIndex:5,
                    smooth: true,
                    data: acz
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

    //预报偏强率
    function getFs(result){
        var fss = [];
        for(var i=0; i<result.length; i++){
            var data = result[i].fs;
            if(null == data ||9999 == data){
                data  = null;
            }else {
                data = data.toFixed(2);
            }
            fss.push(data);
        }
        return fss;
    }

    //预报偏弱率
    function getFw(result){
        var fws = [];
        for(var i=0; i<result.length; i++){
            var data = result[i].fw;
            if(null == data ||9999 == data){
                data  = null;
            }else {
                data = data.toFixed(2);
            }
            fws.push(data);
        }
        return fws;
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

    //风向平均绝对偏差
    function getWmab(result){
        var wmabs = [];
        for(var i=0; i<result.length; i++){
            var data = result[i].wmab;
            if(null == data ||9999 == data){
                data  = null;
            }else {
                data = data.toFixed(2);
            }
            wmabs.push(data);
        }
        return wmabs;
    }

    //综合准确率
    function getAcz(result){
        var aczs = [];
        for(var i=0; i<result.length; i++){
            var data = result[i].acz;
            if(null == data ||9999 == data){
                data  = null;
            }else {
                data = data.toFixed(2);
            }
            aczs.push(data);
        }
        return aczs;
    }


};



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
