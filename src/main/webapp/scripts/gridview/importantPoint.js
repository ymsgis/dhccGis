/**
 * 关键点订正js
 */

//加载关键点
function loadImportantPoint(){
	//alert(mainGrid.type);
	if(mainGrid.type == ""){
		//$.messager.alert("提示","请先加载格点!");
		//return;
	}
	var cwin = window;
	cwin.showPagePane({
		panelEl: '#leftView',
		url: 'grid/stationGridDataCorrect'
	});
}

//上传grib2到国家局和信息中心服务器
function showUploadGrib2(){
	var cwin = window;
	cwin.showPagePane({
		panelEl: '#leftView',
		//width: 550,
		url: 'view/gis/gridInfo/uploadGrib2.jsp'
	});
}


function showClientMessage(){
	var cwin = window;
	cwin.showPagePane({
		panelEl: '#leftView',
		//width: 550,
		url: 'view/gis/gridInfo/clientMessage.jsp'
	});
}

//上传grib2到国家局和信息中心服务器
function uploadGrib2(){
	var strdate = $("#createTime").datebox('getValue');
	var timePoint = $("#timeType").combobox('getValue');
	var url = _ServerRoot + "gridFile/uploadGribFile";
	var micapsObj = new Object();
	micapsObj.selDate = strdate;
	micapsObj.timePoint = timePoint;
	micapsObj.bsend = true;//开关是否发送grib2文件到三个服务器
	window.parent.showBusy();
	$.get(url, micapsObj, function(data) {
		if (data.state == '失败')
			alert(data.state + ",原因：" + data.description);
		else
			alert(data.description);
		window.parent.clearBusy();
	}, "json");
	
	
	
	
}