
function initDatagrid(){
	$('#dg').datagrid({
		url : 'datagrid_data.json',
		pagination:true,//显示分页  
        pageSize:10,//分页大小  
        pageList:[10,15,20],//每页的个数  
        fit:true,//自动补全  
        fitColumns:true, 
		columns : [ [ {
			field : 'clientMessage',
			title : '消息列表',
			width : '100%'
		} ] ]
	});
}
