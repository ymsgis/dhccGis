<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>检验评估</title>
<link rel="stylesheet" href="${euiPath}/themes/icon.css" />
<link rel="stylesheet" href="${euiPath}/themes/bootstrap/easyui.css" />
<script type="text/javascript" src="${echartsPath}/echarts.min.js"></script>
<script type="text/javascript" src="${contextPath}/scripts/jquery.min.js"></script>
<script type="text/javascript" src="${euiPath}/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">
var _tmpPath = '${contextPath}';
</script>
</head>

<body title="湿度多时效检验" style="padding: 0; margin: 0;">
	<table style="width: 100%;">
		<tbody>
			<tr>
				<td style="width: 100%">
					<div>
						<table id="tt" class="easyui-datagrid"
							style="width: 100%; height: 500px"
							toolbar="#tb" title="湿度多时效检验"
							rownumbers="true" pagination="true">
						</table>
					</div>
					<div id="tb" style="padding: 3px">
						<span>预报时间:</span> 
						<input class="easyui-datebox" id="startTime" name="startTime" style="width: 100px;"
							data-options="required:false" value="" type="text">
						<span>至:</span>
						<input class="easyui-datebox" id="endTime" name="endTime" style="width: 100px;"
							data-options="required:false" value="" type="text"> 
						<span>时次：</span> 
						<select id="time" class="easyui-combobox" 
							name="time" style="width: 45px;">
								<option value="eight">8</option>
								<option value="twenty">20</option></select>
						<span>预报类型：</span>
						<select id="forecastType" class="easyui-combobox" 
							name="forecastType" style="width: 120px;">
								<option value="SCMOC_LOCAL">中央指导预报</option>
                    			<option value="DZC">订正场</option>
                    			<option value="DZC_SK">实况偏差订正</option>
                    			<option value="DZC_KRM">最优背景场</option>  <!-- BEST -->
                    			<option value="DZC_DTPCDZ">动态偏差订正</option>    <!-- FIX -->
                    			<option value="PUBLISHED">宁夏预报场</option>  <!-- NX -->
						</select> 
						<span>预报员：</span>
						<select id="forecaster" class="easyui-combobox" 
							name="forecaster" style="width: 80px;">
								<option value="#"></option>
<!-- 								<option value="fix">动态偏差订正</option> -->
<!-- 								<option value="best">最佳背景场</option> -->
						</select>
						<a href="#" class="easyui-linkbutton" onclick="doSearch()" icon="icon-search">查询</a>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
<script type="text/javascript">
function doSearch(){
	var queryParams ={
            startTime: $('#startTime').datebox('getValue'),
            endTime: $('#endTime').datebox('getValue'),
            time: $('#time').combobox('getText'),
            forecastType: $('#forecastType').combobox('getValue')
        };
	if($('#forecastType').combobox('getValue')!="SCMOC_LOCAL"){
		$('#tt').datagrid('showColumn','sst');
	}else{
		$('#tt').datagrid('hideColumn','sst');
	}
	$('#tt').datagrid({
		url: "${contextPath}/check/checkErh/normalMul/loadList",
		queryParams: queryParams
	});
	window.parent.erh.normalMulChart(queryParams);
}
$(document).ready(function(){
	var date = new Date();
	var et = date.toLocaleDateString();
	var st = addDate(et, -6);
	$("#startTime").datebox('setValue', st);
	$("#endTime").datebox('setValue', et);
	var queryParams ={
            startTime: $('#startTime').datebox('getValue'),
            endTime: $('#endTime').datebox('getValue'),
            time: $('#time').combobox('getText'),
            forecastType: $('#forecastType').combobox('getValue')
        };
    window.parent.erh.normalMulChart(queryParams);
    if($('#forecastType').combobox('getValue')!="SCMOC_LOCAL"){
		$('#tt').datagrid('showColumn','sst');
	}
    $('#tt').datagrid({
        url: "${contextPath}/check/checkErh/normalMul/loadList",
        queryParams: queryParams,
        columns:[[
            {
                field:'aging', title:'时效', width:40,
                formatter: function(value,row,index){
                    if (value!=null){
                        return value;
                    } else {
                        return;
                    }
                }
            },
            {field:'sst', title:'技巧评分', width:70, hidden:'true',
                formatter: function(value,row,index){
                    if (value!=null){
                        if(9999 != value){
                            return value.toFixed(2);
                        }
                    } else {
                        return "";
                    }
                }
            },
            {field:'averageError', title:'平均误差', width:70,
                formatter: function(value,row,index){
                    if (value!=null){
                        return value;
                    } else {
                        return "";
                    }
                }
            },
            {field:'rmsError', title:'均方根误差', width:80,
                formatter: function(value,row,index){
                    if (value!=null){
                        return value;
                    } else {
                        return "";
                    }
                }
            },
            {field:'tenDegreesAccuracy', title:'≤10%准确率', width:80,
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
