<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>形势预报</title>
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
<script type="text/javascript" src="${euiPath}/extension/jquery.edatagrid.js"></script>
<script type="text/javascript" src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript">var _ctxPath = '${contextPath}';</script>
<script type="text/javascript" src="./fcAccount.jsx"></script>
<script type="text/javascript" src="./baseTextForecastView.jsx"></script>
<script type="text/javascript" src="./situationForecastView.jsx"></script>
<style type="text/css">
body,html {
	padding: 0;
	margin: 0;
}
.easyui-form .easyui-textbox {
	width: 120px;
}
.textbox textarea {
	width: 100%;height:100%;border:none;padding:2px;
}
.easyui-form table label {
	display: block;
	text-align: right;
}
</style>
<script type="text/javascript">
new SituationForecastView({
	editable: true
});
</script>
</head>

<body class="page pgaut">
<div class="easyui-panel">
		<div class="qhTit taTitb">
				<ul class="bt ">
					<span class="hover">形势预报</span>
				</ul>
		</div>
	<div class="easyui-panel qhCon">
		<form id="searchForm" method="post" style="padding: 2px;">
			<ul class="formSech">
			<li>
			<label>预报日期：<input type="text" class="easyui-datebox" name="createTime" style="width:100px;" test-value="2017-11-23" /></label>
			</li>
			<li>
			<label>预报时次：<select class="easyui-combobox" name="timeType" style="width: 50px;" editable="false">
				<option>7</option>
				<option>17</option>
			</select></label>
			</li>
			<li>
			<a class="easyui-linkbutton submit btnBxb" icon="icon-search">查询</a>
			</ul>
		</form>
	</div>
	<div class="easyui-panel">
		<form id="infoForm" class="easyui-form" style="padding: 2px;" title="基本信息" method="post">
			<label>预报员：<input type="text" class="eui-textbox" readonly="readonly" name="createBy" style="width:100px;"/></label>
			<label>首席：<input type="text" class="eui-textbox" readonly="readonly" name="chief" style="width:100px;"/></label>
			<label>签发员：<input type="text" class="eui-textbox" readonly="readonly" name="issuer" style="width:100px;"/></label>
			<label>制作时间：<input type="text" class="easyui-textbox" readonly="readonly" name="createTime" /></label>
			<label>预报时次：<input type="text" class="easyui-textbox" readonly="readonly" name="timeType"  style="width:50px;" /></label><br/>
			<table style="width: 100%;">
			<tr>
				<td cl><label>预警信号：</label></td>
				<td><input type="text" class="easyui-textbox" name="warnSign"  style="width:85%;" /></td>				
			</tr>
			<tr>
				<td><label>天气形势分析：</label></td>
				<td><span class="textbox textbox-readonly" style="width:85%;height:55px;">
							<textarea name="situation" class="easyui-validatebox"></textarea>
						</span>
				</td>
			</tr>
			<tr>
				<td><label><span id="weatherLabelA">今天下午</span>：</label></td>
				<td><input type="text" class="easyui-textbox" name="weatherA"  style="width:85%;" /></td>
			</tr>
			<tr>
				<td><label><span id="weatherLabelB">今天前半夜</span>：</label></td>
				<td><input type="text" class="easyui-textbox" name="weatherB"  style="width:85%;" /></td>
			</tr>
			<tr>
				<td><label><span id="weatherLabelC">今天后半夜</span>：</label></td>
				<td><input type="text" class="easyui-textbox" name="weatherC"  style="width:85%;" /></td>
			</tr>
			<tr>
				<td><label>补充说明：</label></td>
				<td><span class="textbox textbox-readonly" style="width:85%;height:35px;">
							<textarea name="remarkC" class="easyui-validatebox"></textarea>
						</span>
				</td>
			</tr>
			<tr>
				<td><label><span id="weatherLabelD">明天白天</span>：</label></td>
				<td><input type="text" class="easyui-textbox" name="weatherD"  style="width:85%;" /></td>
			</tr>
			<tr>
				<td><label>补充说明：</label></td>
				<td><span class="textbox textbox-readonly" style="width:85%;height:35px;">
							<textarea name="remarkD" class="easyui-validatebox"></textarea>
						</span>
				</td>
			</tr>
			<tr>	
				<td><label><span id="weatherLabel2">0月1日夜间到0月2日白天</span>：</label></td>
				<td><input type="text" class="easyui-textbox" name="weather2"  style="width:85%;" /></td>
			</tr>
			<tr>
				<td><label>补充说明：</label></td>
				<td><span class="textbox textbox-readonly" style="width:85%;height:30px;">
							<textarea name="remark2" class="easyui-validatebox"></textarea>
						</span>
				</td>
			</tr>
			<tr>
				<td><label><span id="weatherLabel3">0月2日夜间到0月3日白天</span>：</label></td>
				<td><input type="text" class="easyui-textbox" name="weather3"  style="width:85%;" /></td>
			</tr>
			<tr>
				<td><label style="display: block;padding:2px;">补充说明：</label></td>
				<td><span class="textbox textbox-readonly" style="width:85%;height:30px;">
							<textarea name="remark3" class="easyui-validatebox"></textarea>
						</span>
				</td>
			</tr>
			</table>
			<a class="easyui-linkbutton submit btnBxb" rel="savedata" icon="icon-save">保存</a>
			<a class="easyui-linkbutton submit btnBxb" rel="datatext" icon="icon-tip">预览</a>
		</form>
		<div id="textWin" style="width:600px;">
			<pre id="textView">
			</pre>
		</div>
	</div>
</div>
</body>
</html>
