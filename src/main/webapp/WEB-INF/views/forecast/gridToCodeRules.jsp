<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>GridToCode Rules Test</title>
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
<style type="text/css">
body {
	margin: 0;
	padding: 0;
}
</style>
</head>

<body  class="page pgaut" style="padding:2px;">
<div class="easyui-panel" title="">
		<div class="qhTit taTitb">
				<ul class="bt ">
					<span class="hover">格点转站点电码规则测试</span>
				</ul>
		</div>
 <div title="格点要素数据" style="padding:1px;">
<table>
<tr>
	<td>
		<table id="weatherGrid"  title="格点要素" style="height:260px;width:620px;"></table>
	</td>
	<td>		
	<div id="ruletb" style="padding:2px 5px;">
	    规则: <select id="hourSpan" class="easyui-combobox" style="width:100px">
	    	<option value="3">逐3小时</option>
	    	<option value="6">逐6小时</option>
	    	<option value="12">逐12小时</option>
	    	<option value="24">逐24小时</option>
	    </select>
	</div>	
		<table id="rulesGrid"  title="转换规则" style="height:260px;width:700px;"></table>
	</td>
</tr>
</table>
	<a id="zeroBtn" class="easyui-linkbutton btnBxb">清零</a>
	<a id="randomBtn" class="easyui-linkbutton btnBxb">随机数据</a>
	<a id="testBtn" class="easyui-linkbutton btnBxb">测试</a>
</div>
<div title="转换结果" class="easyui-panel" style="padding:1px;display:none;">
    <form id="resultForm" method="post">
	<table id="resultGrid" style="width:650px;height:280px;"></table>
	</form>
</div>
</div>
<script type="text/javascript">
function initRulesGrid() {
	var rulesGrid = $('#rulesGrid').datagrid({
		singleSelect: true,
		url: '${contextPath}/forecast/gridToCodeForecast/loadRules',
		sortName: 'code',
		remoteSort: false,
		toolbar: '#ruletb',
		columns: [[{
			field: "code",
			width: 50,
			title: "电码",
            sortable :true,
			editor:{type:'textbox', required:true}
		}, {
			field: "hour",
			width: 50,
			title: "时段"
		}, {
			field: "text",
			width: 80,
			title: "文字描述",	
			editor:{type:'textbox', required:true}		
		}, {
	    	field: "R",
	    	width: 100,
	    	title: "R(降水)规则",
	    	editor:{type:'textbox'}
		}, {
			field: "C",
			width: 80,
			title: "C(云量)规则",
	    	editor:{type:'textbox'}
		}, {
			field: "T",
			width: 80,
			title: "T(温度)规则",
	    	editor:{type:'textbox'}
		}, {
			field: "RH",
			width: 80, 
			title: "RH(相对湿度)规则",
	    	editor:{type:'textbox'}
		}, {
			field: "Vis",
			width: 80,
			title: "Vis(能见度)规则",
	    	editor:{type:'textbox'}
		}, {
			field: "V",
			width: 80,
			title: "V(风速)规则",
	    	editor:{type:'textbox'}
		}]]
	});	
}
$(function() {
	initRulesGrid();
var dataSpan = 8;
function randomValR() {
	return _randomFloatVal(5).toFixed(1);
}
function randomValC() {
	return _randomIntVal(10);
}
function randomValT() {
	return (Math.random()*100-50).toFixed(1);
}
function randomValRH() {
	return _randomIntVal(100);
}
function randomValVis() {
	return _randomFloatVal(10).toFixed(1);
}
function randomValVis() {
	return _randomFloatVal(10).toFixed(1);
}
function randomValV() {
	return _randomFloatVal(20).toFixed(1);
}
function randomValVa() {
	return _randomFloatVal(360).toFixed(1);
}
function randomPPH() {
	return _randomIntVal(3);
}
function randomSAND() {
	return _randomIntVal(3);
}
function randomSSM() {
	return _randomIntVal(4);
}
function randomHAIL() {
	return _randomIntVal(5);
}
function randomFOG() {
	return _randomIntVal(5);
}
function randomHaze() {
	return _randomIntVal(4);
}
function _randomFloatVal(bound) {
	return Math.random()*bound;
}
function _randomIntVal(bound) {
	return Math.round(Math.random()*bound);
}
function randomWeatherData(val) {
	var listData = [];	
	var hasVal = val!=undefined;
	var baseT = val;
	var baseVa = val;
	for(var i=0;i<dataSpan;i++) {
		var hour = i*3;
		if(!hasVal) {
			if(baseT==val) {
				baseT = randomValT();				
			} else {
				var randT = _randomFloatVal(5);
				baseT = parseFloat(baseT);
				baseT = hour<12? baseT+randT: baseT-randT;
				baseT = baseT.toFixed(1);
			}
			if(parseInt(hour%12)==0) {
				baseVa = randomValVa();
			} else {
				var randVa = _randomFloatVal(5);
				baseVa = parseFloat(baseVa);
				baseVa = (baseVa+randVa);
				baseVa = baseVa>360? 360 : baseVa;
				baseVa = baseVa.toFixed(1);
			}
		}
		var obj = {
			hour: (i+1)*3+'时',
			valR: hasVal? val : randomValR(),
			valC: hasVal? val : randomValC(),
			valT: baseT,
			valRH: hasVal? val : randomValRH(),
			valVis: hasVal? val : randomValVis(),
			valV: hasVal? val : randomValV(),
			valVa: baseVa,
			pph: randomPPH(),
			ssm: randomSSM(),
			sand: randomSAND(),
			haze: randomHaze(),
			hail: randomHAIL(),
			fog: randomFOG()
		};
		listData.push(obj);
	}
	return listData;
}
var weatherGrid = $('#weatherGrid').edatagrid({
	singleSelect: true,
	columns: [[{
		field: 'hour',
		title: '时段'	
	}, {
    	field: "valR",
    	width: 80,
    	title: "R(降水)",
    	editor:{type:'numberbox',options:{precision:1}}
	}, {
		field: "valC",
		width: 80,
		title: "C(云量)",
    	editor:{type:'numberbox',options:{precision:0}}
	}, {
		field: "valT",
		width: 80,
		title: "T(温度)",
    	editor:{type:'numberbox',options:{precision:1}}
	}, {
		field: "valRH",
		width: 80, 
		title: "RH(相对湿度)",
    	editor:{type:'numberbox',options:{precision:0}}
	}, {
		field: "valVis",
		width: 80,
		title: "Vis(能见度)",
    	editor:{type:'numberbox',options:{precision:1}}
	}, {
		field: "valV",
		width: 80,
		title: "V(风速)",
    	editor:{type:'numberbox',options:{precision:1}}
	}, {
		field: "valVa",
		width: 80,
		title: "Va(风向)",
    	editor:{type:'numberbox',options:{precision:1}}
	}, {
		field: "fog",
		width: 50,
		title: "雾",
    	editor:{type:'numberbox',options:{precision:0,value:0}}
	}, {
		field: "hail",
		width: 50,
		title: "冰雹",
    	editor:{type:'numberbox',options:{precision:0,value:0}}
	}, {
		field: "haze",
		width: 50,
		title: "霾",
    	editor:{type:'numberbox',options:{precision:0,value:0}}
	}, {
		field: "pph",
		width: 50,
		title: "相态",
    	editor:{type:'numberbox',options:{precision:0,value:0}}
	}, {
		field: "sand",
		width: 50,
		title: "沙尘",
    	editor:{type:'numberbox',options:{precision:0,value:0}}
	}, {
		field: "ssm",
		width: 50,
		title: "雷暴",
    	editor:{type:'numberbox',options:{precision:0,value:0}}
	}]],
	onClickCell: function(index, field) {
		
	}
});
$('#resultGrid').datagrid({
	striped: true,
	singleSelect: true,
	columns: [[{
		field: 'hour',
		title: '时段'
	}, {
		field: 'phenomenaCode',
		title: '天气现象(电码)'
	}, {
		field: 'phenomenaText',
		title: '天气现象(文字)'
	}, {
		field: 'windPowCode',
		title: '风力(电码)'
	}, {
		field: 'windPowText',
		title: '风力(文字)'
	}, {
		field: 'windDirCode',
		title: '风向(电码)'
	}, {
		field: 'windDirText',
		title: '风向(文字)'
	}, {
		field: 'tempFrom',
		title: '温度(从)',
		width: 50
	},{
		field: 'tempTo',
		title: '温度(到)',
		width: 50
	}]]
});
weatherGrid.datagrid('loadData', randomWeatherData());
var fieldR = 'raininess';
var fieldC = 'cloudage';
var fieldT = 'temperature';
var fieldRH = 'humidity';
var fieldVis = 'visibility';
var fieldV = 'windSpeed';
var fieldVa = 'windAngle';
var fieldPPH = 'pph';
var fieldSSM = 'ssm';
var fieldSAND = 'sand';
var fieldFOG = 'fog';
var fieldHaze = 'haze';
var fieldHAIL = 'hail';
$('#zeroBtn').click(function() {
	var gridData = randomWeatherData(0);
	$('#weatherGrid').datagrid('loadData', gridData);
});
$('#randomBtn').click(function() {
	var gridData = randomWeatherData();
	$('#weatherGrid').datagrid('loadData', gridData);
});
$('#testBtn').click(function() {
	var dataGrid = $('#weatherGrid');	
	dataGrid.edatagrid('saveRow');
	var gridData = dataGrid.datagrid('getRows');
	var listR = [];
	var listC = [];
	var listT = [];
	var listRH = [];
	var listVis = [];
	var listV = [];
	var listVa = [];
	var listPPH = [];
	var listSSM = [];
	var listSAND = [];
	var listFOG = [];
	var listHaze = [];
	var listHAIL = [];
	for(var i=0;i<gridData.length;i++) {
		var obj = gridData[i];
		listR.push(obj.valR);
		listC.push(obj.valC);
		listT.push(obj.valT);
		listRH.push(obj.valRH);
		listVis.push(obj.valVis);
		listV.push(obj.valV);
		listVa.push(obj.valVa);
		listPPH.push(obj.pph);
		listSSM.push(obj.ssm);
		listSAND.push(obj.sand);
		listFOG.push(obj.fog);
		listHaze.push(obj.haze);
		listHAIL.push(obj.hail);
	}
	var hourSpan = $('#hourSpan').combobox('getValue');
	var postData = {};
	postData[fieldR] = listR;
	postData[fieldC] = listC;
	postData[fieldT] = listT;
	postData[fieldRH] = listRH;
	postData[fieldVis] = listVis;
	postData[fieldV] = listV;
	postData[fieldVa] = listVa;
	postData[fieldPPH] = listPPH;
	postData[fieldSSM] = listSSM;
	postData[fieldSAND] = listSAND;
	postData[fieldFOG] = listFOG;
	postData[fieldHaze] = listHaze;
	postData[fieldHAIL] = listHAIL;
 	$.ajax({
 		url: '${contextPath}/forecast/gridToCodeForecast/testRules',
 		dataType: 'json',
 		data: {jsonData: JSON.stringify(postData), hourSpan:hourSpan},
 		success: function(json) {
 			if($.type(json)=='string') {
 				json = $.parseJSON(json);
 			}
 			var resultGrid = $('#resultGrid');
 			var dataGrid = $('#weatherGrid');
 			resultGrid.datagrid('loaded');
 			dataGrid.datagrid('loaded');
 			if(!json.success) {			
 				$.messager.alert({
 					title: '规则测试出错:',
 					msg: json.message||json.error,
 					icon: 'error'
 				});
 				return false;
 			}
 			var results = json.results;
 			var resData = [];
 			for(var i=0;i<results.length;i++) {
 				var res = results[i];
 				var hour = (i)*hourSpan+'~'+(i+1)*hourSpan;
 				var obj = {
 					hour: hour+'时'
 				};
 				$.extend(obj, res);
 				resData.push(obj);
 			}
 			resultGrid.datagrid('loadData', resData);
 		}
 	});
	dataGrid.datagrid('loading');
	$('#resultGrid').datagrid('loading');
});
});
</script>
</div>
</body>
</html>