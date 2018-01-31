<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>NX CIMISS Test</title>
</head>
<body>
<select id="testType" onchange="showTest()">
	<option value="upload">Upload</option>
	<option value="listFile">ListFile</option>
	<option value="delFile">DeleteFile</option>
</select>
<hr/>
<form id="uploadForm" action="http://10.178.12.110/product/restapi/upload/" method="post" target="#resframe" enctype="multipart/form-data">
	<label>文件上传接口：</label><br/>
	<input type="hidden" name="interfaceId" value="callAPI_to_storeFileByFtp" />
	<input type="hidden" name="userId" value="qxt_admin" />
	<input type="hidden" name="pwd" value="qxt_admin" />
	<input type="text" name="available_scope" value="NXQ" />
	<input type="text" name="product_format" value="WEFC_SEVP_OFP_MTFR_FIL" />
	<input type="text" name="publish_time" value="2017-05-10" />
	<input type="text" name="product_name" value="中期指导预报" />
	<input type="text" name="publish_issue" value="12" />
	<input type="text" name="create_by" value="NXQ" />
	<input type="text" name="reviewer" value="测试" />
	<input type="text" name="issuer" value="测试" />
	<input type="text" name="department" value="宁夏气象台" />
	<input type="text" name="remark" value="测试" />
	<input type="text" name="publish_unit" value="宁夏气象台" />
	<input type="text" name="publish_way" value="下发" />
	<input type="text" name="cur_state" value="待发布" />
	<input type="text" name="forecaster" value="测试" />
	<input type="file" name="file" value="D:/WeatherNX/TEST.txt" />
	<br/><input type="submit" value="提交" />
</form>
<form id="listFileForm" action="http://10.178.12.110/product/restapi/file/retrieve/" method="post" target="#resframe">
	<label>文件列表接口：</label><br/>
	<input type="hidden" name="interfaceId" value="callAPI_to_fileList" />
	<input type="hidden" name="userId" value="qxt_admin" />
	<input type="hidden" name="pwd" value="qxt_admin" />
	<input type="text" name="product_format" value="WEFC_SEVP_OFP_MTFR_FIL" />
	<br/><input type="submit" value="提交" />
</form>
<form id="delFileForm" action="http://10.178.12.110/product/restapi/file/delete/" method="post" target="#resframe">
	<label>文件删除接口：</label><br/>
	<input type="hidden" name="interfaceId" value="callAPI_to_DelFile" />
	<input type="hidden" name="userId" value="qxt_admin" />
	<input type="hidden" name="pwd" value="qxt_admin" />
	<input type="text" name="productid_list" value="WEFC_SEVP_OFP_MTFR_FIL" />
	<br/><input type="submit" value="提交" />
</form>
<hr/>
<iframe name="resframe" style="width: 80%;height:300px;">
</iframe>
<script type="text/javascript">
var $ = window.$||function(sel) {
	return document.getElementById(sel);
}
showTest();
function showTest() {
	var sel = $('testType');
	var type = sel.value;
	$('uploadForm').style.display='none';
	$('listFileForm').style.display='none';
	$('delFileForm').style.display='none';
	switch(type) {
	case 'upload':
		$('uploadForm').style.display='block';
		break;
	case 'listFile':
		$('listFileForm').style.display='block';
		break;
	case 'delFile':
		$('delFileForm').style.display='block';
		break;
	}
}
</script>
</body>
</html>