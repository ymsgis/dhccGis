<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ include file="../../include/include.inc.jsp"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>降水检验</title>
    <link rel="stylesheet" href="${euiPath}/themes/icon.css" />
    <link rel="stylesheet" href="${euiPath}/themes/bootstrap/easyui.css" />
    <script type="text/javascript" src="${echartsPath}/echarts.min.js"></script>
    <script type="text/javascript" src="${contextPath}/scripts/jquery.min.js"></script>
    <script type="text/javascript" src="${euiPath}/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript">
        var _erhPath = '${contextPath}';
    </script>
</head>
<body title="降水单时次分级检验" style="padding: 0; margin: 0;">
<table style="width: 100%;">
    <tbody>
    <tr>
        <td style="width: 100%">
            <div>
                <table id="tt" class="easyui-datagrid"
                           style="width: 100%; min-height: 500px"
                           toolbar="#tb" title="降水单时次分级检验"
                       rownumbers="true" pagination="true">
                </table>
            </div>
            <div id="tb" style="padding: 3px">
                <span>预报时间:</span>
                <input class="easyui-datebox" id="startTime" name="startTime"
                       value="" type="text" style="width: 100px;" >
                <span>至:</span>
                <input class="easyui-datebox" id="endTime" name="endTime"
                       value="" type="text" style="width: 100px;">
                <span>时次：</span>
                <select id="timeType" class="easyui-combobox" name="timeType" style="width: 50px;">
                    <option value="eight">8</option>
                    <option value="twenty">20</option>
                </select>
                <span>时效:</span>
                <select id="effectTime" name="effectTime" value="3" class="easyui-combobox" style="width: 50px;">
                    <c:forEach begin="3" end="240" step="3" var="idx">
                        <option>${idx}</option>
                    </c:forEach>
                </select>
                <span>预报类型:</span>
                <select id="forecastType" class="easyui-combobox" name="timeType" style="width: 120px;">
                    <option value="SCMOC">中央指导预报</option>
                    <option value="DZC">订正场</option>
                    <option value="DZC_SK">实况偏差订正</option>
                    <option value="DZC_KRM">最佳背景场</option>   <!-- BEST -->
                    <option value="DZC_DTPCDZ">动态偏差订正</option>    <!-- FIX -->
                    <option value="PUBLISHED">宁夏预报场</option>  <!-- NX -->
                </select>
                <span>降水等级:</span>
                <select id="rainfallLevel" class="easyui-combobox" name="level" style="width: 120px;">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3 ">3</option>
                    <option value="4 ">4</option>
                    <option value="5 ">5</option>
                    <option value="6 ">6</option>
                </select>
                <span>预报员</span>
                <select id="forecaster" class="easyui-combobox" name="timeType" style="width: 120px;">
                    <option value="">暂不支持</option>
                </select>
                <a href="#" class="easyui-linkbutton" onclick="doSearch()" icon="icon-search">查询</a>
            </div>
        </td>
    </tr>
    </tbody>
</table>
<script type="text/javascript" src=""></script>
<script type="text/javascript">
    function doSearch(){
        $('#tt').datagrid({
            url: "${contextPath}/check/rainfall/classify/dataList",
            queryParams: {
                startTime: $('#startTime').datebox('getValue'),
                endTime: $('#endTime').datebox('getValue'),
                timeType: $('#timeType').combobox('getText'),
                effectTime: $('#effectTime').combobox('getText'),
                rainfallLevel: $('#rainfallLevel').combobox('getValue'),
                forecastType: $('#forecastType').combobox('getValue'),
                forecaster: $('#forecaster').combobox('getValue')
            }
        });
    }
    $(document).ready(function(){
        var date = new Date();
        var et = date.toLocaleDateString();
        var st = addDate(et, -6);
        $("#startTime").datebox('setValue', st);
        $("#endTime").datebox('setValue', et);
        $('#tt').datagrid({
            url: "${contextPath}/check/rainfall/classify/dataList",
            queryParams: {
                startTime: $('#startTime').datebox('getValue'),
                endTime: $('#endTime').datebox('getValue'),
                timeType: $('#timeType').combobox('getText'),
                effectTime: $('#effectTime').combobox('getText'),
                rainfallLevel: $('#rainfallLevel').combobox('getValue'),
                forecastType: $('#forecastType').combobox('getValue'),
                forecaster: $('#forecaster').combobox('getText')
            },
            columns:[[
                {
                    field:'forecastTime', title:'预报时间', width:120,
                    formatter: function(value,row,index){
                        if (value!=null){
                            return value;
                        } else {
                            return "";
                        }
                    }
                },
                {
                    field:'timeType', title:'时次', width:40,
                    formatter: function(value,row,index){
                        if (value!=null){
                            return value;
                        } else {
                            return "";
                        }
                    }
                },
                {
                    field:'effectTime', title:'时效', width:40,
                    formatter: function(value,row,index){
                        if (value!=null){
                            return value;
                        } else {
                            return;
                        }
                    }
                },
                {
                    field:'rainfallLevel', title:'降水等级', width:60,
                    formatter: function(value,row,index){
                        if (value!=null){
                            return value;
                        } else {
                            return;
                        }
                    }
                },
                {field:'ts', title:'TS评分', width:60,
                    formatter: function(value,row,index){
                        if (value!=null){
                            if(9999 != value){
                                 value = value.toFixed(2);
                            }
                            return value;
                        } else {
                            return "";
                        }
                    }
                },
                {field:'po', title:'漏报率', width:60,
                    formatter: function(value,row,index){
                        if (value!=null){
                            if(9999 != value){
                                value = value.toFixed(2);
                            }
                            return value;
                        } else {
                            return "";
                        }
                    }
                },
                {field:'far', title:'空报率', width:60,
                    formatter: function(value,row,index){
                        if (value!=null){
                            if(9999 != value){
                                value = value.toFixed(2);
                            }
                            return value;

                        } else {
                            return "";
                        }
                    }
                },
                {field:'bias', title:'预报偏差', width:60,
                    formatter: function(value,row,index){
                        if (value!=null){
                            return value;
                        } else {
                            return "";
                        }
                    }
                }
            ]],
            pageSize: 15,
            pageList: [15, 25, 35, 45, 55]
        });
    });

    function addDate(date,days){
        var d=new Date(date);
        d.setDate(d.getDate()+days);
        var month=d.getMonth()+1;
        var day = d.getDate();
        if(month<10){
            month = "0"+month;
        }
        if(day<10){
            day = "0"+day;
        }
        var val = d.getFullYear()+"-"+month+"-"+day;
        return val;
    }
</script>

</body>
</html>