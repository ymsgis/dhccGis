<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="../include.inc.jsp"%>
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
		<ul class="mapTool">
			<li><a><i class="iconfont Czs icon-fangda"></i>放大</a></li>
			<li class="hover"><a><i class="iconfont Czs icon-suoxiao"></i>缩小</a></li>
			<li><a><i class="iconfont Czs icon-quantu2"></i>全图</a></li>
			<li><a><i class="iconfont Czs icon-pingyi1"></i>平移</a></li>
			<li><a><i class="iconfont Czs icon-celiang-copy"></i>测量</a></li>
			<li><a><i class="iconfont Czs icon-qingchu3"></i>清除</a></li>
		</ul>
		<ul class="winSetTool">
			<li id="winA">
				<a><i class="iconfont Czs icon-quanjingtu"></i>落区</a>
				<div class="mWindBx" style="display: none;">
					<span class="jtMs"></span>
					<div class="mBox">
						<div class="btnBoxA P6" style="width: 180px;">
							<a href="#" class="btnBx"><i class="iconfont  icon-jiaotongtubiao_huizhiguanliluxian"></i><p>绘制落区</p></a>
							<a href="#" class="btnBx"><i class="iconfont  icon-qingchu1"></i><p>清除落区</p></a>
							<a href="#" class="btnBx"><i class="iconfont  icon-jiaotongtubiaohuizhiguankongquyu"></i><p>拾取落区</p></a>
							<a href="#" class="btnBx"><i class="iconfont  icon-jiedianyanshou"></i><p>修改落区</p></a>
							<br class="clearfloat" />
						</div>
					</div>
				</div>
			</li>
			<li id="winB">
				<a><i class="iconfont Czs icon-quhua"></i>区划</a>
				<div class="mWindBx" style="display: none;">
					<span class="jtMs"></span>
					<div class="mBox">
						<!--div class="winBtnA"><a href="#" class="btnBx">区域</a><a href="#" class="btnBx">赋值</a><a href="#" class="btnBx">加减</a></div-->
						<div class="winBtnA P6" style="">
							<div class="" style="width: 200px;">
								<div class="formBxtx">
			        				<span class="txLabel W2b">区域：</span>
	      							<div class="ftxBox ML-2b">
	      								<select class="inpSel" name="sfasfa" id="sfasfa">
									        <option value="a" selected>刘保华</option>
									    </select>
	      							</div>
			        			</div>
			        			<div class="formBxtx">
			        				<span class="txLabel W2b">赋值：</span>
	      							<div class="ftxBox ML-2b">
	      								<input type="text" name="yxfj" style="width: 80px;" />
	      								<a href="#" class="btnBx">执行</a>
	      							</div>
			        			</div>
			        			<div class="formBxtx">
			        				<span class="txLabel W2b">加减：</span>
	      							<div class="ftxBox ML-2b">
	      								<a href="#" class="btnBx">+</a>
	      								<input type="text" name="yxfj" style="width: 60px;" />
	      								<a href="#" class="btnBx">-</a>
	      							</div>
			        			</div>
		        			</div>
						</div>
					</div>
				</div>
			</li>
			<li id="winC">
				<a><i class="iconfont Czs icon-quanshiyongdianqushifenxi"></i>区划趋势</a>
				<div class="mWindBx" style="display: none;">
					<span class="jtMs"></span>
					<div class="mBox">
						<div class="winBtnA P6" style="">
							<div class="" style="width: 200px;">
								<div class="formBxtx">
			        				<span class="txLabel W35b">市级区域：</span>
	      							<div class="ftxBox ML-35b">
	      								<select class="inpSel" name="sfasfa" id="sfasfa">
									        <option value="a" selected>请选择边界</option>
									    </select>
	      							</div>
			        			</div>
			        			<div class="formBxtx">
			        				<span class="txLabel W35b">县级区域：</span>
	      							<div class="ftxBox ML-35b">
	      								<select class="inpSel" name="sfasfa" id="sfasfa">
									        <option value="a" selected>请选择边界</option>
									    </select>
	      							</div>
			        			</div>
			        			<div class="formBxtx">
			        				<span class="txLabel W35b">时间选择：</span>
	      							<div class="ftxBox ML-35b">
	      								<select class="inpSel" name="sfasfa" id="sfasfa">
									        <option value="a" selected>1天</option>
									    </select>
	      							</div>
			        			</div>
			        			<div class="formBxtx">
			        				<span class="txLabel W35b"></span>
	      							<div class="ftxBox ML-35b">
	      								<a href="#" class="btnBx W35b">运行</a>
	      							</div>
			        			</div>
		        			</div>
						</div>
					</div>
				</div>
			</li>
			<li id="winD">
				<a><i class="iconfont Czs icon-Connection-trends"></i>单点趋势</a>
				<div class="mWindBx" style="display: none;">
					<span class="jtMs"></span>
					<div class="mBox" >
						<div class="WindowsTc" style="width: 480px;">
							<div class="TcTit BvZS Chf">
								<span class="fr">2017-05-14 08:00</span>
								<span class="fr Mr-12">N:<input type="text" name="textfield2" style="width: 30px;"></span>
								<span class="fr Mr-12">S:<input type="text" name="textfield2" style="width: 30px;"></span>
								智能网格预报时序图
							</div>
							<div class="" style="height:300px;border:solid 1px #ddd;background-color:#eee;">
			        		</div>
						</div>
						
					</div>
				</div>
			</li>
			<li id="winE">
				<a><i class="iconfont Czs icon-feng"></i>风向</a>
				<div class="mWindBx" style="display: none;">
					<span class="jtMs"></span>
					<div class="mBox">
						<div class="winBtnA P6" style="">
							<div class="" style="width: 200px;">
								<div class="formBxtx">
			        				<span class="txLabel W35b">影响半径：</span>
	      							<div class="ftxBox ML-35b">
	      								<input type="text" class="ipT" name="yxfj" />
	      							</div>
			        			</div>
			        			<div class="formBxtx">
			        				<a href="#" class="btnBx">自由绘制</a><a href="#" class="btnBx">落区绘制</a>
	      							
			        			</div>
		        			</div>
						</div>
					</div>
				</div>
			</li>
			<li id="winF"><a><i class="iconfont Czs icon-fengsu1"></i>风速</a></li>
			<li id="winG">
				<a><i class="iconfont Czs icon-fuhe_gaizhang_"></i>盖章</a>
				<div class="mWindBx" style="display: none;">
					<span class="jtMs"></span>
					<div class="mBox">
						<div class="winBtnA P6" style="">
							<div class="" style="width: 210px;">
								<div class="jsq">
			        				<a href="#" class="btnBx M4">1</a>
			        				<a href="#" class="btnBx M4">2</a>
			        				<a href="#" class="btnBx M4">3</a>
			        				<a href="#" class="btnBx M4">4</a>
			        				<a href="#" class="btnBx M4">5</a>
			        				<a href="#" class="btnBx M4">6</a>
			        				<a href="#" class="btnBx M4">7</a>
			        				<a href="#" class="btnBx M4">8</a>
			        				<a href="#" class="btnBx M4">9</a>
			        				<a href="#" class="btnBx M4">10</a>
			        				<a href="#" class="btnBx M4">15</a>
			        				<a href="#" class="btnBx M4">20</a>
			        				<a href="#" class="btnBx M4">25</a>
			        				<a href="#" class="btnBx M4">30</a>
			        				<a href="#" class="btnBx M4">35</a>
			        				<a href="#" class="btnBx M4">40</a>
			        				<a href="#" class="btnBx M4">45</a>
			        				<a href="#" class="btnBx M4">50</a>
			        				<a href="#" class="btnBx M4">75</a>
			        				<a href="#" class="btnBx M4">100</a>
			        			</div>
			        			<div class="formBxtx">
			        				<span class="txLabel W2b">加减：</span>
	      							<div class="ftxBox ML-2b">
	      								<a href="#" class="btnBx">+</a>
	      								<input type="text" name="yxfj" style="width: 60px;" />
	      								<a href="#" class="btnBx">-</a>
	      							</div>
			        			</div>
			        			<div class="formBxtx">
			        				<span class="txLabel W2b"></span>
	      							<div class="ftxBox ML-2b">
	      								<a href="#" class="btnBx W4b">盖章</a>
	      							</div>
			        			</div>
		        			</div>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<span class="fl cur Mt-6 Ml-8" id="icoMainWindows"><i class="iconfont icon-zuocecaidan4"></i></span>
	</div>
	<div class="mapBox" style="background-color:#ddd;">
		<div id="allmap" style="height:100%;"></div>
	</div>
	<div class="mapTPT">
		<div class="mapTPT_tx">
			<dl class="zt_iok w5z" style="left:30px;top:40px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>中央台预报</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>已完成</p></div>
			</dl>
			<dl class="zt_iok w5z" style="left:30px;top:80px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>格点实况</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>已完成</p></div>
			</dl>
			<dl class="zt_eer" style="left:170px;top:60px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>监测评估</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>未完成</p></div>
			</dl>
			<dl class="zt_iok" style="left:290px;top:60px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>偏差修正</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>已完成</p></div>
			</dl>
			<dl class="zt_iok" style="left:410px;top:60px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>再检验</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>已完成</p></div>
			</dl>
			<dl class="zt_iok w5z" style="left:520px;top:40px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>卡尔漫滤波</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>已完成</p></div>
			</dl>
			<dl class="zt_iok w5z" style="left:520px;top:80px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>消空消漏</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>已完成</p></div>
			</dl>
			<dl class="zt_jxz w5z" style="left:660px;top:60px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>最优背景场</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>进行中</p></div>
			</dl>
			<dl class=" " style="left:800px;top:60px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>审核订正</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>未完成</p></div>
			</dl>
			<dl class=" " style="left:920px;top:60px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>格点转灾害天气落区</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>未完成</p></div>
			</dl>
			<dl class=" " style="left:920px;top:100px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>对流性灾害落区</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>未完成</p></div>
			</dl>
			<dl class=" " style="left:1090px;top:30px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>格点转站点</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>未完成</p></div>
			</dl>
			<dl class=" " style="left:1090px;top:70px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>客观预警产品</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>未完成</p></div>
			</dl>
			<dl class=" " style="left:1230px;top:60px;">
				<kbd class="il"></kbd><kbd class="ir"></kbd>
				<dt>审核发布</dt>
				<div class="fcts"><kbd class="sjx"></kbd><p>未完成</p></div>
			</dl>
			<canvas id="xt-a" class="xt-canvas" style="left:130px;top:50px;height:50px;">你的浏览器不支持canvas</canvas>
			<script type="text/javascript" >   
			   //拓普图画线
			   var cvs = document.getElementById('xt-a'); //画布
				var ctx = cvs.getContext('2d'); // 画笔
				ctx.moveTo(20,20);ctx.lineTo(400,100);
				ctx.moveTo(20,140);ctx.lineTo(400,60);
				ctx.closePath();//闭合路径
				ctx.lineWidth = 3;ctx.strokeStyle = 'rgba(0,0,0,0.2)';
				ctx.stroke();
			</script>
			<canvas id="xt-b" class="xt-canvas" style="left:250px;top:71px;height:16px;">你的浏览器不支持canvas</canvas>
			<script type="text/javascript" >   
			   //拓普图画线
			   var cvs = document.getElementById('xt-b'); //画布
				var ctx = cvs.getContext('2d'); // 画笔
				ctx.moveTo(0,44);ctx.lineTo(300,44);
				ctx.closePath();//闭合路径
				ctx.lineWidth = 3;ctx.strokeStyle = 'rgba(0,0,0,0.4)';
				ctx.stroke();
			</script>	
		</div>
	</div>
	
	<!--内容区左侧多级-->
	<div class="mLeftBox fllk Br-s-1l"  id="leftMainWindows" style="display: none;">
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
