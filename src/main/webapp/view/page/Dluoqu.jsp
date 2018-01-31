<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="../include.inc.jsp"%>%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>宁夏智能网络化预报业务系统</title>
	<link href="${contextPath}/css/public.css" rel="stylesheet" title="" type="text/css" />
	<link href="${contextPath}/css/page.css" rel="stylesheet" title="" type="text/css" />
	<link href="${contextPath}/css/iconfont.css" rel="stylesheet" title="" type="text/css" />
	<link title="blue" href="${contextPath}/css/skinBlue.css" rel="stylesheet" type="text/css"/>
	<link title="green" href="${contextPath}/css/skinGreen.css" rel="stylesheet" type="text/css" disabled="disabled"/>
	<link title="orange" href="${contextPath}/css/skinOrange.css" rel="stylesheet" type="text/css" disabled="disabled"/>
	<!--script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=sEcxya2iBm0Ml1VA64R87vlfahyZyueq"></script>
	<!--link href="//at.alicdn.com/t/font_2we8mdadigdgqfr.css" rel="stylesheet" type="text/css" /-->
	<style type="text/css">
		html,body{height:100%;}
		#allmap{/* */}
	</style>
</head>
<body class="page">
	<div class="mapTopTool">
		
		<span class="fl cur Mt-6 Ml-8" id="icoMainWindows"><i class="iconfont icon-zuocecaidan4"></i></span>
	</div>
	
	
	<!--内容区左侧多级-->
	<div class="mLeftBox fllk Br-s-1l"  id="leftMainWindows" style="display: ;">
		<div class="mLeftIcoBx Br-s-1l">
			<span class="ibtn btn_up" id="lico_btn_up"><a><i class="iconfont icon-een"></i></a></span>
			<div class="mLeftIcoLis Bt-s-1l Bb-s-1l">
			<ul class="gdtxLis " style="" id="gdtxLis">
				<li class="hover"><a><kbd style="display: none;">2</kbd><i class="iconfont icon-gaowen"></i><p>高温</p></a></li>
				<li><a><kbd>2</kbd><i class="iconfont icon-shachenbao"></i><p>沙尘暴</p></a></li>
				<li><a><kbd style="display: none;">4</kbd><i class="iconfont icon-daolujiebing"></i><p>道路结冰</p></a></li>
				<li><a><kbd>2</kbd><i class="iconfont icon-hanchao"></i><p>寒潮</p></a></li>
				<li><a><kbd style="display: none;">2</kbd><i class="iconfont icon-baoyu"></i><p>暴雨</p></a></li>
			</ul>
			</div>
			<span class="ibtn btn_down" id="lico_btn_down"><a><i class="iconfont icon-scroll-top"></i></a></span>
			
		</div>
		<div class="mLeftTexBx">
			<div class="mLeftNrBdBox Lyico P12" id="default-example" data-collapse>
		        <h3 class="open">时间段</h3>
		        <div class="Mb-12">
		        	<a class="btn Czs" href="#work"><i class="iconfont icon-shijian"></i>12时</a>
		        	<a class="btn" href="#work"><i class="iconfont icon-shijian"></i>14时</a>
		        </div>
		        
		        <h3  class="open">预警产品制作</h3>
		        <div class="Mb-12">
		        	<div>
		        		<a class="btns" href="#">修改区域</a>
		        		<a class="btns bQh" href="#">清除</a>
		        		<a class="btns bSl" href="#">确认范围</a>
		        		<a class="btns bAz" href="#">隐藏信号</a>
		        	</div>
		        	<div class="Mt-12">
		        		<form name="form1" method="post" action="">
		        			<div class="formBx">
		        				<span class="txLabel">签发人：</span>
      							<input class="inpTx" type="text" name="textfield" id="textfield">
		        			</div>
		        			<div class="formBx">
		        				<span class="txLabel">审核人：</span>
      							<select class="inpSel" name="sfasfa" id="sfasfa">
							        <option value="a" selected>审核人</option>
							    </select>
		        			</div>
		        			<div class="formBx">
		        				<span class="txLabel">制作人：</span>
      							<select class="inpSel" name="sfasfa" id="sfasfa">
							        <option value="a" selected>刘保华</option>
							    </select>
		        			</div>
		        			<div class="formBx">
		        				<span class="txLabel">流水号：</span>
      							<input class="inpTx" type="text" placeholder="请输入内容" name="textfield" id="textfield">
		        			</div>
		        			<div class="formBx">
		        				<span class="txLabel">预警时效：</span>
      							<select class="inpSel" name="sfasfa" id="sfasfa">
							        <option value="a" selected>5</option>
							    </select>
		        			</div>
		        			<div class="formBx">
		        				<span class="txLabel">发布时间：</span>
      							<input class="inpTx" type="text" placeholder="请选择时间" name="textfield" id="textfield">
      							<a class="disIB Mt-8 cur"><img src="../img/calendar.png"  /></a>
		        			</div>
		        			<div class="formBx">
		        				<span class="txLabel">预警内容：</span>
      							<textarea name="textfield" rows="5" id="textfield"></textarea>
		        			</div>
		        			<div class="formBx">
		        				<span class="txLabel">预防措施：</span>
      							<textarea name="textfield" rows="5" id="textfield"></textarea>
		        			</div>
		        			<div class="formBx">
		        				<span class="txLabel">影响区域：</span>
      							<textarea name="textfield" rows="5" id="textfield"></textarea>
		        			</div>
		        			<div class="formBx">
		        				<span class="txLabel">影响乡镇：</span>
      							<textarea name="textfield" rows="5" id="textfield"></textarea>
		        			</div>
    					</form>
		        	</div>
		        </div>
		    </div>
		</div>
	</div>
	
	
	
	
	
	
	
	<script src="${contextPath}/scripts/newpage/jquery-1.11.1.min.js" type="text/javascript"></script>
	<script src="${contextPath}/scripts/newpage/jquery-browser.js" type="text/javascript"></script>
	<script src="${contextPath}/scripts/newpage/jquery.collapse.js"></script>
	<script type="text/javascript" >
   // var $browser=$.browser();
  //  alert($browser.browser.webkit);
   // alert($browser.browser.msie);
   // alert($browser.browser.version);
   
   //拓普图画线
   
</script>	
<script type="text/javascript">
		//主导航
$(function(){
	/*换肤*/
	$(".gdtxLis li").click(function(){
		sj=$(this).parent().children("li");
		for (i=0;i<sj.length;i++) {
			ss=$($(this).parent().children("li")[i]).removeClass('hover');
		}
		$(this).addClass('hover');
	});
	
	$(".mapTool li").click(function(){
		sj=$(this).parent().children("li");
		for (i=0;i<sj.length;i++) {
			ss=$($(this).parent().children("li")[i]).removeClass('hover');
		}
		$(this).addClass('hover');
	});
	
	//左侧向上
	$("#lico_btn_up").click(function(){
		$("#gdtxLis").css("top","-400px");
	});
	$("#lico_btn_down").click(function(){
		$("#gdtxLis").css("top","0px");
	});
	
	$("#icoMainWindows").click(function(){
		$("#leftMainWindows").toggle();
	});
	
	//盖章窗口内数字点选
	$(".jsq a").click(function(){
		$(this).toggleClass("hover");
	});
	
	$(".winSetTool li").click(function(){
		var o = o ? o : window.event; //兼容性，定义事件
		stopPop(o); //阻止冒泡事件
		sj=$(this).parent().children("li");
		for (i=0;i<sj.length;i++) {
			//ss=$($(this).parent().children("li")[i]).removeClass('hover');
			$($(this).parent().children("li")[i]).removeClass('hover');
			$($(this).parent().children("li")[i]).children("div").css("display","none");
		}
		$(this).addClass('hover');
		$(this).children("div").css("display","block");
	})
	window.document.onclick = function(){
		$(".winSetTool li").removeClass('hover');
		$(".winSetTool li").children("div").css("display","none");
	}
})





//阻止父元素冒泡
function stopPop(e)
{
    if (e && e.stopPropagation) { //非IE浏览器 
		e.stopPropagation(); 
    } else {  //IE浏览器 
        window.event.cancelBubble = true; 
    } 
}


	</script>
	
	<script type="text/javascript">
		/*
	// 百度地图API功能
	var map = new BMap.Map("allmap");    // 创建Map实例
	map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	*/
</script>
</body>
</html>
