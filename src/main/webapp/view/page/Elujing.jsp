<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="../include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>宁夏智能网络化预报业务系统</title>
	
	<link rel="stylesheet" type="text/css" href="../css/easyui.css">
	
	
	
	
	<link href="${contextPath}/css/public.css" rel="stylesheet" title="" type="text/css" />
	<link href="${contextPath}/css/page.css" rel="stylesheet" title="" type="text/css" />
	<link href="${contextPath}/css/iconfont.css" rel="stylesheet" title="" type="text/css" />
	<link title="blue" href="${contextPath}/css/skinBlue.css" rel="stylesheet" type="text/css"/>
	<link title="green" href="${contextPath}/css/skinGreen.css" rel="stylesheet" type="text/css" disabled="disabled"/>
	<link title="orange" href="${contextPath}/css/skinOrange.css" rel="stylesheet" type="text/css" disabled="disabled"/>
	<!--script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=sEcxya2iBm0Ml1VA64R87vlfahyZyueq"></script>
	<!--link href="//at.alicdn.com/t/font_2we8mdadigdgqfr.css" rel="stylesheet" type="text/css" /-->
	<style type="text/css">
		
	</style>
</head>
<body class="page pgaut">
	<div class="M24 ">
		<div class="qhTit taTitb">
				<ul class="bt ">
					<span class="hover">发布路径配置</span>
				</ul>
		</div>
		<div class="qhCon">
			<div class="qhBox" style=" display: block;">
				
				<div class="btnSeachBx">
					<ul class="formSech ">
						<li><label>名称：</label><input type="text" class="" name="s_name"  placeholder="请输入名称" /> </li>
						<li><a href="#" class="btnBxb"><i class="iconfont icon-chaxun"></i> 搜索</a></li>
					</ul>
				</div>
				<div>
					
					
					<table id="dg" class="easyui-datagrid" title="Cache Editor for DataGrid" style="width:100%;height:auto"
							data-options="
								iconCls: 'icon-edit',
								singleSelect: true,
								toolbar: '#tb',
								url: 'datagrid_data1.json',
								method: 'get',
								onClickRow: onClickRow
							">
						<thead>
							<tr>
								<th data-options="field:'itemid',width:80">Item ID</th>
								<th data-options="field:'productid',width:100,
										formatter:function(value,row){
											return row.productname;
										},
										editor:{
											type:'combobox',
											options:{
												valueField:'productid',
												textField:'productname',
												method:'get',
												url:'products.json',
												required:true
											}
										}">Product</th>
								<th data-options="field:'listprice',width:80,align:'right',editor:{type:'numberbox',options:{precision:1}}">List Price</th>
								<th data-options="field:'unitcost',width:80,align:'right',editor:'numberbox'">Unit Cost</th>
								<th data-options="field:'attr1',width:250,editor:'text'">Attribute</th>
								<th data-options="field:'status',width:60,align:'center',editor:{type:'checkbox',options:{on:'P',off:''}}">Status</th>
							</tr>
						</thead>
					</table>
				
					<div id="tb" style="height:auto">
						<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save',plain:true" onClick="accept()">加载配置</a>
						<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-undo',plain:true" onClick="reject()">保存</a>
					</div>
				</div>
			</div>
			
		</div>
	</div>
	
	<script src="${contextPath}/scripts/newpage/jquery-1.11.1.min.js" type="text/javascript"></script>
	<script src="${contextPath}/scripts/newpage/jquery-browser.js" type="text/javascript"></script>
	
	<script type="text/javascript" src="${contextPath}/scripts/easyui/jquery.easyui.min.js"></script>
	
	
	<script src="../js/instyle.js"></script>
	<script type="text/javascript">
		(function($){
			function getCacheContainer(t){
				var view = $(t).closest('div.datagrid-view');
				var c = view.children('div.datagrid-editor-cache');
				if (!c.length){
					c = $('<div class="datagrid-editor-cache" style="position:absolute;display:none"></div>').appendTo(view);
				}
				return c;
			}
			function getCacheEditor(t, field){
				var c = getCacheContainer(t);
				return c.children('div.datagrid-editor-cache-' + field);
			}
			function setCacheEditor(t, field, editor){
				var c = getCacheContainer(t);
				c.children('div.datagrid-editor-cache-' + field).remove();
				var e = $('<div class="datagrid-editor-cache-' + field + '"></div>').appendTo(c);
				e.append(editor);
			}
			
			var editors = $.fn.datagrid.defaults.editors;
			for(var editor in editors){
				var opts = editors[editor];
				(function(){
					var init = opts.init;
					opts.init = function(container, options){
						var field = $(container).closest('td[field]').attr('field');
						var ed = getCacheEditor(container, field);
						if (ed.length){
							ed.appendTo(container);
							return ed.find('.datagrid-editable-input');
						} else {
							return init(container, options);
						}
					}
				})();
				(function(){
					var destroy = opts.destroy;
					opts.destroy = function(target){
						if ($(target).hasClass('datagrid-editable-input')){
							var field = $(target).closest('td[field]').attr('field');
							setCacheEditor(target, field, $(target).parent().children());
						} else if (destroy){
							destroy(target);
						}
					}
				})();
			}
		})(jQuery);
	</script>
	<script type="text/javascript">
		var editIndex = undefined;
		function endEditing(){
			if (editIndex == undefined){return true}
			if ($('#dg').datagrid('validateRow', editIndex)){
				var ed = $('#dg').datagrid('getEditor', {index:editIndex,field:'productid'});
				var productname = $(ed.target).combobox('getText');
				$('#dg').datagrid('getRows')[editIndex]['productname'] = productname;
				$('#dg').datagrid('endEdit', editIndex);
				editIndex = undefined;
				return true;
			} else {
				return false;
			}
		}
		function onClickRow(index){
			if (editIndex != index){
				if (endEditing()){
					$('#dg').datagrid('selectRow', index)
							.datagrid('beginEdit', index);
					editIndex = index;
				} else {
					$('#dg').datagrid('selectRow', editIndex);
				}
			}
		}
		function accept(){
			if (endEditing()){
				$('#dg').datagrid('acceptChanges');
			}
		}
		function reject(){
			$('#dg').datagrid('rejectChanges');
			editIndex = undefined;
		}
		function getChanges(){
			var rows = $('#dg').datagrid('getChanges');
			alert(rows.length+' rows are changed!');
		}
	</script>
</body>
</html>
