<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="../include.inc.jsp"%>sp"%>
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
	
	
	<!--内容区左侧多级-->
	<div class="mLeftBox Br-s-1l"  id="leftMainWindows" style="display: ;">
		
			<div class="mLeftNrBdBox P12" id="default-example" data-collapse>
		        <h3  class="open">详情列表</h3>
		        <div class="Mb-12">
		        	<div class="Mt-12">
		        			<div class="formBx">
		        				<span class="txLabel">制作时间：</span>
      							<input class="inpTx" type="text" placeholder="请选择时间" name="textfield" id="textfield">
      							<a class="disIB Mt-8 cur"><img src="../img/calendar.png"  /></a>
		        			</div>
		        			<div class="formBx">
		        				<span class="txLabel">当前要素：</span>
      							<select class="inpSel" name="sfasfa" id="sfasfa">
							        <option value="a" selected>3小时气温</option>
							    </select>
		        			</div>
		        			<div class="formBx">
		        				<span class="txLabel">预报种类：</span>
      							<select class="inpSel" name="sfasfa" id="sfasfa">
							        <option value="a" selected>最优背景</option>
							    </select>
		        			</div>
		        			<div class="f25fBx">
		        				<div class="W25b fl">
		        					<div class="mtimelt">
		        						<li>25日 周二</li>
		        						<li>26日 周三</li>
		        						<li>27日 周四</li>
		        						<li>28日 周五</li>
		        						<li>29日 周六</li>
		        						<li>30日 周日</li>
		        						<li>1日 周一</li>
		        						<li>2日 周二</li>
		        						<li>3日 周三</li>
		        						<li>4日 周四</li>
		        					</div>
		        				</div>
		        				<div class="ML-25b">
	      							<div class="mtimeSelBtn">
				        				<li class="">3</li>
										<li>6</li>
										<li>9</li>
										<li>12</li>
										<li>15</li>
										<li>18</li>
										<li>21</li>
										<li>24</li>
										<li>27</li>
										<li>30</li>
										<li>33</li>
										<li>36</li>
										<li>39</li>
										<li>42</li>
										<li>45</li>
										<li>48</li>
										<li>51</li>
										<li>54</li>
										<li>57</li>
										<li>60</li>
										<li>63</li>
										<li>66</li>
										<li>69</li>
										<li>72</li>
										<li>75</li>
										<li>78</li>
										<li>81</li>
										<li>84</li>
										<li>87</li>
										<li>90</li>
										<li>93</li>
										<li>96</li>
										<li class="active">99</li>
										<li>102</li>
										<li>105</li>
										<li>108</li>
										<li>111</li>
										<li>114</li>
										<li>117</li>
										<li>120</li>
										<li>123</li>
										<li>126</li>
										<li>129</li>
										<li>132</li>
										<li>135</li>
										<li>138</li>
										<li>141</li>
										<li>144</li>
										<li>147</li>
										<li>150</li>
										<li>153</li>
										<li>156</li>
										<li>159</li>
										<li>162</li>
										<li>165</li>
										<li>168</li>
										<li>171</li>
										<li>174</li>
										<li>177</li>
										<li>180</li>
										<li>183</li>
										<li>186</li>
										<li>189</li>
										<li>192</li>
										<li class="">195</li>
										<li>198</li>
										<li>201</li>
										<li>204</li>
										<li>207</li>
										<li>210</li>
										<li>213</li>
										<li>216</li>
										<li class="">219</li>
										<li>222</li>
										<li>225</li>
										<li>228</li>
										<li class="">231</li>
										<li>234</li>
										<li>237</li>
										<li>240</li>
										<br class="clearfloat" clear="all" />
									</div>
									<br class="clearfloat" clear="all" />
								</div>
		        			</div>
		        			
		        			<div class="Mb-12">
					        	<a class="btn Czs" href="#work"><i class="iconfont icon-shijian"></i>保存</a>
					        	<a class="btn" href="#work"><i class="iconfont icon-shijian"></i>全部保存</a>
					        	<a class="btn" href="#work"><i class="iconfont icon-shijian"></i>发布</a>
					        </div>
		        			
    					</form>
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
	
	
	$(".mtimeSelBtn li").click(function(){
		sj=$(this).parent().children("li");
		for (i=0;i<sj.length;i++) {
			ss=$($(this).parent().children("li")[i]).removeClass('active');
		}
		$(this).addClass('active');
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
