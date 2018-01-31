<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>GridToCode Rules Edit</title>
<link rel="stylesheet" href="${euiPath}/themes/icon.css" />
<link rel="stylesheet" href="${euiPath}/themes/default/easyui-adv.css" />
<link href="${contextPath}/css/public.css" rel="stylesheet" type="text/css" />
<link href="${contextPath}/css/page.css" rel="stylesheet" type="text/css" />
<link href="${contextPath}/css/iconfont.css" rel="stylesheet" type="text/css" />
<link title="blue" href="${contextPath}/css/skinBlue.css" rel="stylesheet" type="text/css" role="skin"/>
<link title="green" href="${contextPath}/css/skinGreen.css" rel="stylesheet" type="text/css" role="skin" disabled="disabled"/>
<link title="orange" href="${contextPath}/css/skinOrange.css" rel="stylesheet" type="text/css" role="skin" disabled="disabled"/>
<script type="text/javascript" src="${contextPath}/scripts/jquery.min.js"></script>
<script src="${contextPath}/scripts/jquery.cookie.js"></script>
<script src="${contextPath}/scripts/common/skins.js"></script>
<script type="text/javascript" src="${euiPath}/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="${euiPath}/extension/jquery.edatagrid.js"></script>
</head>

<body class="page pgaut">
<div class="easyui-panel" title="">
		<div class="qhTit taTitb">
				<ul class="bt ">
					<span class="hover">格点转站点电码规则编辑</span>
				</ul>
		</div>
 <div title="格点要素数据" style="padding:5px;">
<form id="rulesForm">
	<input type="hidden" id="jsonData" name="jsonData" />
</form>
<table id="rulesGrid"  title="转换规则" style="height:300px;width:1000px;"></table>
	<a id="saveBtn" class="easyui-linkbutton btnBxb">保存</a>
</div>
</div>
<script type="text/javascript">
$(function() {
var rulesGrid = $('#rulesGrid').edatagrid({
	singleSelect: true,
	url: '${contextPath}/forecast/gridToCodeForecast/loadRules',
	columns: [[{
		field: "code",
		width: 50,
		title: "电码",		
		editor:{type:'textbox', required:true}
	}, {
		field: "text",
		width: 100,
		title: "文字描述",	
		editor:{type:'textbox', required:true}		
	}, {
    	field: "R",
    	width: 100,
    	title: "R(降水)规则",
    	editor:{type:'textbox'}
	}, {
		field: "C",
		width: 100,
		title: "C(云量)规则",
    	editor:{type:'textbox'}
	}, {
		field: "T",
		width: 100,
		title: "T(温度)规则",
    	editor:{type:'textbox'}
	}, {
		field: "RH",
		width: 100, 
		title: "RH(相对湿度)规则",
    	editor:{type:'textbox'}
	}, {
		field: "Vis",
		width: 100,
		title: "Vis(能见度)规则",
    	editor:{type:'textbox'}
	}, {
		field: "V",
		width: 100,
		title: "V(风速)规则",
    	editor:{type:'textbox'}
	}]]
});
var rulesForm = $('#rulesForm').form({
	url: '${contextPath}/forecast/gridToCodeForecast/saveRules',
	contentType: 'json',
	success: function(json) {
		json = $.parseJSON(json);
		var resultGrid = $('#resultGrid');
		var dataGrid = $('#weatherGrid');
		resultGrid.datagrid('loaded');
		dataGrid.datagrid('loaded');
		if(!json.success) {
			$.messager.alert({
				title: '出错了',
				msg: '规则测试出错:'+json.error||json.message,
				icon: 'error'
			});
			return false;
		}
		var results = json.results;
		var phenomenaRes = results.phenomenaCodes;
		var windPowRes = results.windPowCodes;
		var windDirRes = results.windDirCodes;
		var tempRes = results.tempList;
		var weatherData = results.weatherData;
		var resData = [];
		for(var i=0;i<phenomenaRes.length;i++) {
			var obj = {
				temp: tempRes[i],
				hour: (i+1)*12+'时'
			};			
			var phenomenaCode = phenomenaRes[i];
			for(var p in phenomenaCode) {
				obj.phenomenaCode = p;
				obj.phenomenaText = phenomenaCode[p];
			}
			var windPowCode = windPowRes[i];
			for(var p in windPowCode) {
				obj.windPowCode = p;
				obj.windPowText = windPowCode[p];
			}
			var windDirCode = windDirRes[i];
			for(var p in windDirCode) {
				obj.windDirCode = p;
				obj.windDirText = windDirCode[p];
			}
			resData.push(obj);
		}
		resultGrid.datagrid('loadData', resData);		
		var listR = weatherData[fieldR];
		var listC = weatherData[fieldC];
		var listT = weatherData[fieldT];
		var listRH = weatherData[fieldRH];
		var listVis = weatherData[fieldVis];
		var listV = weatherData[fieldV];
		var listVa = weatherData[fieldVa]||[];
		var gridData = [];
		for(var i=0;i<listR.length;i++) {
			var obj = {
				hour: (i+1)*3+'时',
				valR: listR[i],
				valC: listC[i],
				valT: listT[i],
				valRH: listRH[i],
				valVis: listVis[i],
				valV: listV[i],
				valVa: listVa[i]
			};
			gridData.push(obj);
		}		
		dataGrid.datagrid('loadData', gridData);
	}
});
$('#saveBtn').click(function() {
	if(!ruleForm.form('validate')) {
		return false;
	}
	var dataGrid = $('#rulesGrid');
	dataGrid.edatagrid('saveRow');
	var gridData = dataGrid.datagrid('getRows');
	var listR = [];
	var listC = [];
	var listT = [];
	var listRH = [];
	var listVis = [];
	var listV = [];
	var listVa = [];
	for(var i=0;i<gridData.length;i++) {
		var obj = gridData[i];
		listR.push(obj.valR);
		listC.push(obj.valC);
		listT.push(obj.valT);
		listRH.push(obj.valRH);
		listVis.push(obj.valVis);
		listV.push(obj.valV);
		listVa.push(obj.valVa);
	}
	var postData = {};
	postData[fieldR] = listR;
	postData[fieldC] = listC;
	postData[fieldT] = listT;
	postData[fieldRH] = listRH;
	postData[fieldVis] = listVis;
	postData[fieldV] = listV;
	postData[fieldVa] = listVa;
	$('#jsonData').val(JSON.stringify(postData));
	rulesForm.form('submit');
	dataGrid.datagrid('loading');
});
});
</script>
</div>
</body>
</html>