<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../include/include.inc.jsp"%>
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
var _erhPath = '${contextPath}';
</script>
</head>

<body title="湿度检验" style="padding: 0; margin: 0;">
	<table style="width: 100%;">
		<tbody>
			<tr>
				<td style="width: 50%">
					<div>
						<table id="tt" class="easyui-datagrid"
							style="width: 100%; height: 500px"
							toolbar="#tb" title="湿度检验"
							rownumbers="true" pagination="true">
							<!-- <thead>
								<tr>
									<th field="id"></th>
									<th field="forecastTime" width="60">预报时间</th>
									<th field="time" width="30">时次</th>
									<th field="aging" width="30">时效</th>
									<th field="averageError" width="60">平均误差</th>
									<th field="rmsError" width="70">均方根误差</th>
									<th field="oneDegreesAccuracy" width="70">≤1℃准确率</th>
									<th field="twoDegreesAccuracy" width="70">≤2℃准确率</th>
									<th field="oneCorrectGrid" width="95">≤1℃正确格点数</th>
									<th field="twoCorrectGrid" width="95">≤2℃正确格点数</th>
									<th field="totalGridCount" width="60">总格点数</th>
								</tr>
							</thead> -->
						</table>
					</div>
					<div id="tb" style="padding: 3px">
						<span>开始日期:</span> <input class="easyui-datebox" id="forecastTime" name="forecastTime" style="width: 100px;"
							data-options="required:true" value="7/27/2017" type="text">
						<span>结束日期:</span><input class="easyui-datebox" id="endTime" name="endTime" style="width: 100px;"
							data-options="required:true" value="7/27/2017" type="text"> 
						<span>时次：</span> <select id="time" class="easyui-combobox" 
							name="time" style="width: 45px;">
								<option value="eight">8</option>
								<option value="twenty">20</option></select>
						<span>时效:</span> <select id="aging" name="aging"
							value="3" class="easyui-combobox" style="width: 50px;">
							<c:forEach begin="3" end="240" step="3" var="idx">
								<option>${idx}</option>
							</c:forEach>
						</select> 
						<a href="#" class="easyui-linkbutton" onclick="doSearch()" icon="icon-search">查询</a>
<!-- 						<a href="#" class="easyui-linkbutton" onclick="doReset()" icon="icon-reload">重置</a> -->
					</div>
				</td>
<!-- 				<td style="width: 50%"> -->
<!-- 					<div id="tmpEchart" style="width: 100%; height: 500px; border: 1px solid #ccc"></div> -->
<!-- 				</td> -->
			</tr>
		</tbody>
	</table>
<script type="text/javascript">
function doReset(){
	$('#tt').datagrid({
		url: "${contextPath}/check/checkAssessmentHumidity/loadList",
	});
}
function doSearch(){
    $('#tt').datagrid({
    	url: "${contextPath}/check/checkAssessmentHumidity/query",
		queryParams: {  
			forecastTime: $('#forecastTime').datebox('getValue'),
	    	time: $('#time').combobox('getText'),
	    	aging: $('#aging').combobox('getText')
   		}  
    });
}

    $('#tt').datagrid({
    	url: "${contextPath}/check/checkAssessmentHumidity/loadList",		
		fields: ['id','forecastTime'],
    	columns:[[
    		{field:'forecastTime', title:'预报时间', width:60,
    			formatter: function(value,row,index){
    				if (value!=null){
    					return value;
    				} else {
    					return "null";
    				}
    			}
    		},
    		{field:'time', title:'时次', width:30,
    			formatter: function(value,row,index){
    				if (value!=null){
    					return value;
    				} else {
    					return "null";
    				}
    			}
    		},
    		{field:'aging', title:'时效', width:30,
    			formatter: function(value,row,index){
    				if (value!=null){
    					return value;
    				} else {
    					return "null";
    				}
    			}
    		},
    		{field:'fiveDegreesAccuracy', title:'订正技巧', width:60,
    			formatter: function(value,row,index){
    				if (value!=null){
    					return value.toFixed(4);
    				} else {
    					return "null";
    				}
    			}
    		},
    		{field:'averageError', title:'平均误差', width:60,
    			formatter: function(value,row,index){
    				if (value!=null){
    					return value.toFixed(4);
    				} else {
    					return "null";
    				}
    			}
    		},
    		{field:'rmsError', title:'均方根误差', width:70,
    			formatter: function(value,row,index){
    				if (value!=null){
    					return value.toFixed(4);
    				} else {
    					return "null";
    				}
    			}
    		},
//     		{field:'fiveDegreesAccuracy', title:'≤5%准确率', width:70,
//     			formatter: function(value,row,index){
//     				if (value!=null){
//     					return value.toFixed(4);
//     				} else {
//     					return "null";
//     				}
//     			}
//     		},
    		{field:'tenDegreesAccuracy', title:'≤10%准确率', width:75,
    			formatter: function(value,row,index){
    				if (value!=null){
    					return value.toFixed(4);
    				} else {
    					return "null";
    				}
    			}
    		},
//     		{field:'fiveCorrectGrid', title:'≤5%正确格点数', width:95,
//     			formatter: function(value,row,index){
//     				if (value!=null){
//     					return value;
//     				} else {
//     					return "null";
//     				}
//     			}
//     		},
//     		{field:'tenCorrectGrid', title:'≤10%正确格点数', width:100,
//     			formatter: function(value,row,index){
//     				if (value!=null){
//     					return value;
//     				} else {
//     					return "null";
//     				}
//     			}
//     		},
//     		{field:'totalGridCount', title:'总格点数', width:60,
//     			formatter: function(value,row,index){
//     				if (value!=null){
//     					return value;
//     				} else {
//     					return "null";
//     				}
//     			}
//     		}
    	]],
    	pageSize: 15, 
    	pageList: [15, 25, 35, 45, 55]
    });
 
</script>
<script type="text/javascript" src="${contextPath}/scripts/check/checkAssessmentHumidity.js"></script>
</body>
</html>
