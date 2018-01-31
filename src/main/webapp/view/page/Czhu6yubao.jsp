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
	<div class="M24 qiehTab">
		<div class="qhTit tabTits">
			<ul class="djTab ">
				<abbr class="hover">逐6小时站点预报</abbr>
				<abbr>预报查看</abbr>
			</ul>
		</div>
		<div class="qhCon">
			<div class="qhBox" style=" display: block;">
				
				<div class="btnSeachBx">
					<ul class="formSech ">
						<li><label>短期预报员：</label><select name="select" class="" style="width: 100px;"><option value="0">请选择人员</option></select></li>
						<li><label>短期预报员：</label><select name="select" class="" style="width: 100px;"><option value="0">请选择人员</option></select></li>
						<li><label>制作时间：</label><input type="text" class="" name="s_name" style="width:80px;" placeholder="请输入名称" /> </li>
						<li><label>时间类型：</label><input type="text" class="" name="s_name" style="width:80px;" placeholder="请输入名称" /> </li>
						<li><label>发布时次：</label><input type="text" class="" name="s_name" style="width:80px;" placeholder="请输入名称" /> </li>
						<li><a href="#" class="btnBxb">查看</a></li>
					</ul>
				</div>
				<div>
					
					
					<table class="easyui-datagrid" title="" style="width:100%;height:250px"
							data-options="singleSelect:true,collapsible:true,url:'datagrid_data1.json',method:'get'">
						<thead>
							<tr>
								<th data-options="field:'itemid',width:80">Item ID</th>
								<th data-options="field:'productid',width:100">Product</th>
								<th data-options="field:'listprice',width:80,align:'right'">List Price</th>
								<th data-options="field:'unitcost',width:80,align:'right'">Unit Cost</th>
								<th data-options="field:'attr1',width:250">Attribute</th>
								<th data-options="field:'status',width:60,align:'center'">Status</th>
							</tr>
						</thead>
						<tbody>
							<tr id="datagrid-row-r1-2-0" datagrid-row-index="0" class="datagrid-row"><td field="inv"><div style="" class="datagrid-cell datagrid-cell-c1-inv">Inv No 1</div></td><td field="date"><div style="" class="datagrid-cell datagrid-cell-c1-date">08/02/2017</div></td><td field="name"><div style="" class="datagrid-cell datagrid-cell-c1-name">Name 1</div></td><td field="amount"><div style="text-align:right;" class="datagrid-cell datagrid-cell-c1-amount">200</div></td><td field="price"><div style="text-align:right;" class="datagrid-cell datagrid-cell-c1-price">388</div></td><td field="cost"><div style="text-align:right;" class="datagrid-cell datagrid-cell-c1-cost">77600</div></td><td field="note"><div style="" class="datagrid-cell datagrid-cell-c1-note">Note 1</div></td></tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="qhBox" style="display:none;">
				<div class="btnSeachBx">
					<span class="btnBoxA">
						<a class="btnBxb" href="#">格点转站点</a><a href="#" class="btnBxb">查看</a>
					</span>
				</div>
			</div>
		</div>
	</div>
	
	<script src="${contextPath}/scripts/newpage/jquery-1.11.1.min.js" type="text/javascript"></script>
	<script src="${contextPath}/scripts/newpage/jquery-browser.js" type="text/javascript"></script>
	
	<script type="text/javascript" src="${contextPath}/scripts/easyui/jquery.easyui.min.js"></script>
	
	
	<script src="../js/instyle.js"></script>
	<script type="text/javascript">

	</script>
</body>
</html>
