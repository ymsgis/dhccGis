<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>无系统模块权限</title>
<style type="text/css">
*{ margin:0px; padding:0px;}
body{
	background-color: #FFF;
	font-size:12px;
	font-family:"宋体";
	background: url(../images/error/blue_bg.png) repeat-x
}
.pic{
	margin-top: 5px;
	margin-right: auto;
	margin-left: auto;
	height: 162px;
	width: 389px;
	background-image:url(../images/error/download_pic.png);
}

.yun{
	margin-top: 272px;
	margin-right: auto;
	margin-left: auto;
	height:136;
	width:100%;
	background-image:url(../images/error/cloud.png);
	background-repeat:repeat-x;
    backgronud-color:#000;
}

.user{font-family:"微软雅黑";
      font-size:24px;
	  color:#608cb8;
	  padding-top:37px;
	  padding-left:37px;
}

.fix{
	font-family:"微软雅黑";
	font-size:14px;
	color:#7a8895;
	padding-top:3px;
	padding-left:37px;
}


</style>
</head>

<body>
<div class="yun">
	<div class="pic">
		<div class="user">亲爱的用户:${sessionScope['user'].userName}</div>
		<div class="fix"> 您无权限访问此系统<br/>请<a href="logout" target="_top">退出</a>系统后重新登录！</div>
	</div>
</div>
</body>
</html>