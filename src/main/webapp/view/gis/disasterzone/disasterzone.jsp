<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../../include.inc.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<script src="${contextPath}/scripts/jquery.min.js"></script>
<link rel="stylesheet" href="${euiPath}/themes/bootstrap/easyui.css" />
<link rel="stylesheet" href="${euiPath}/themes/icon.css" />
<script type="text/javascript" src="${euiPath}/jquery.min.js"></script>
<script type="text/javascript" src="${euiPath}/jquery.easyui.min.js"></script>
<script type="text/javascript" src="${euiPath}/locale/easyui-lang-zh_CN.js"></script>
<script src="${arcgisPath}/init.js"></script>
<script src="${contextPath}/scripts/config/config.js"></script>
<script src="${contextPath}/scripts/pdfjs/pdf.js" type="text/javascript"></script>
<script src="${contextPath}/scripts/gisCommon/disasterzone.js"></script>
</head>
<body class="easyui-layout" >
    <div data-options="region:'west',title:'落区类型',split:true" style="width:150px;">
    	<div id="accordion" class="easyui-accordion" style="width:142px;height:495px;">

    	</div>
    </div>
    <div data-options="region:'center',title:'预警产品制作',split:true" style="width:450px;margin-top:5px;margin-left:5px;">
   		<div style="width:100%">
	   		<label>日期：</label>
		   	<input id="dateSearch" class="easyui-datebox" style="width:110px">
		   	
		   	<label style="padding-left:20px;">时次：</label>
		   	<select id="agingSearch" class="easyui-combobox" style="width:60px" data-options="required:true">
			    <option>8</option>
			    <option>20</option>
			</select>
			<span style="width:30px"></span>
			<a id="btnSearch" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-Search'" 
				onclick="DisasterZone.searchDisasterZone()">查询落区</a>	
   		</div>
   		<hr />
   		<div name="修改预警区域" style="width:100%;margin-bottom:5px">
<!-- 		     <a id="btnDraw" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" style="margin-right:10px;" onclick="DisasterZone.editDrawDisasterZone()">修改落区</a> -->
			 <a id="btnDraw" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" style="margin-right:10px;" onclick="DisasterZone.drawDisasterZone()">修改落区</a>
		     <a id="btnClear" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cut'" style="margin-right:10px;" onclick="DisasterZone.btnClearClickHandler()">清除绘制</a>
<!-- 		     <a id="btnEnsure" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add'">确认落区</a> -->
			 <a id="btnHideArea" class="easyui-linkbutton" data-options="iconCls:'icon-remove',toggle:true,selected:true" onclick="DisasterZone.btnHideClickHandler(false)">显隐参考落区</a>
		     <a id="btnHide"  class="easyui-linkbutton" data-options="iconCls:'icon-remove',toggle:true,selected:true" onclick="DisasterZone.btnHideClickHandler(true)">显隐预警信号</a>
		</div>
		<div id="divSignal" name="设置预警信号" style="width:100%;height:50px;margin-bottom:5px">
			
		</div>
		<hr />
   		<form id="frmProduct" class="easyui-form" method="post" data-options="novalidate:true" style="width:450px;">
		   	<table>
		   		<tr>
		   			<td width="210px">
		   				<input name="id" style="display:none" />
		   				<label>签 发 人：</label>
		   				<select id="selQianfa" name="qianfa" class="easyui-combobox" style="width:120px;" data-options="required:true">
						    <option value="sysadmin">管理员</option>
						    <option value="zhangsuzhao">张肃诏</option>
						    <option value="zhengpenghui">郑鹏徽</option>
						    <option value="shaojian">邵建</option>
						    <option value="caoyuan">曹瑗</option>
						    <option value="liqiang">李强</option>
						    <option value="yanjun">闫军</option>
						</select>
		   			</td>
		   			<td width="210px">
		   				<label>审 核 人：</label>
		   				<select id="selShenhe" name="shenhe" class="easyui-combobox" style="width:120px;" data-options="required:true">
						    <option value="sysadmin">管理员</option>
						    <option value="zhangsuzhao">张肃诏</option>
						    <option value="zhengpenghui">郑鹏徽</option>
						    <option value="shaojian">邵建</option>
						    <option value="caoyuan">曹瑗</option>
						    <option value="liqiang">李强</option>
						    <option value="yanjun">闫军</option>
						</select>
		   			</td>
		   		</tr>
		   		<tr>
		   			<td width="210px">
		   				<label>制 作 人：</label>
		   				<select id="selCreator" name="creator" class="easyui-combobox" style="width:120px;" data-options="required:true">
						    <option value="sysadmin">管理员</option>
						    <option value="zhangsuzhao">张肃诏</option>
						    <option value="zhengpenghui">郑鹏徽</option>
						    <option value="shaojian">邵建</option>
						    <option value="caoyuan">曹瑗</option>
						    <option value="liqiang">李强</option>
						    <option value="yanjun">闫军</option>
						</select>
		   			</td>
		   			<td width="210px">
		   				<label>流 水 号：</label>
		   				<input id="txtSerial" name="serialNum" class="easyui-textbox" style="width:120px;" data-options="required:true">
		   			</td>
		   		</tr>
				<tr>
		   			<td width="210px">
		   				<label>预警时效：</label>
		   				<select id="selTimeSpan" name="timeSpan" class="easyui-combobox" style="width:120px;" data-options="required:true">
						    <option>3</option>
						    <option>6</option>
						    <option>9</option>
						    <option>12</option>
						    <option>15</option>
						    <option>18</option>
						    <option>21</option>
						    <option>24</option>
						</select>
		   			</td>
		   			<td width="210px">
		   				<label>发布时间：</label>
		   				<input id="dbPublishTime" class="easyui-datetimebox" name="publishTime" 
            				data-options="required:true,showSeconds:false" style="width:130px">
		   			</td>
		   		</tr>
				<tr>
		   			<td colspan="2">
			   			<label>预警内容：</label>
			   			<input id="txtContent" name="content" class="easyui-textbox" data-options="multiline:true,required:true" style="width:350px;height:95px">
		   			</td>
		   		</tr>
		   		<tr>
		   			<td colspan="2" width="420px">
			   			<label>预防措施：</label>
			   			<input id="txtDefense" name="defense" class="easyui-textbox" data-options="multiline:true,required:true" style="width:350px;height:95px">
		   			</td>
		   		</tr>
		   		<tr>
			       	<td colspan="2">
			       		<label>影响区域：</label>
			       		<input id="txtEffectArea" name="effectArea" class="easyui-textbox" data-options="multiline:true,required:true" style="width:350px;height:80px">
			       	</td>
		       </tr>
		       <tr>
		       		<td colspan="2">
			       		<label>影响乡镇：</label>
			       		<input id="txtEffectStation" name="effectStation" class="easyui-textbox" data-options="multiline:true,required:true" style="width:350px;height:80px">	
			       	</td>
		       </tr>
		   	</table>
		</form>
		 <div style="text-align:center;padding:5px">
	    	<a id="btnViewSignal" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="DisasterZone.btnViewClickHandler('signal')">预览预警产品</a>
	    	<a id="btnViewGuide" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="DisasterZone.btnViewClickHandler('guide')">预览指导产品</a>
	    </div>
    </div>
    
    <div id="windowSignalSelect"  class="easyui-window" 
    	title="设置预警信号" data-options="closed:true"  
    	style="width:350px;height:120px;padding:10px;margin:0 auto;">
    	 <div id="divSignalSel" style="width:100%;padding:5px;">
    	 </div>
    	 <div style="width:100%;padding:5px;margin:0 auto;"> 
    	 	<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="DisasterZone.signalClickHandler()">确定</a>
    	 </div>
    </div>
    
    <div id="widowPdf" class="easyui-window" title="预览预警产品" data-options="closed:true,
    		iconCls:'icon-save',
			onResize:function(){
				$(this).window('hcenter');
			}" 
    	style="width:95%;height:95%;padding:10px;">
		
	    <div id="pop" style="width:100%;height:100%;padding:5px;">
	        <iframe frameborder="0" id="pdfContainer" name="pdfContainer"  style="width:100%;height:100%;"></iframe>
	    </div>
	    <div style="text-align:right;padding:5px 0 0;">
				<a class="easyui-linkbutton" data-options="iconCls:'icon-ok'" href="#" onclick="DisasterZone.btnPublishClickHandler()" style="width:80px">发布</a>
				<a class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" href="#" onclick="javascript:$('#frmProduct').window('close')" style="width:80px">取消</a>
		</div>
	</div>
</body>
</html>