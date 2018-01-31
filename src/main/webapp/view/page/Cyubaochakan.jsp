<%@ page contentType="text/html; charset=UTF-8"%>
<%@ include file="../include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>宁夏智能网络化预报业务系统</title>
	<link rel="stylesheet" type="text/css" href="${contextPath}/css/easyui.css">
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
	<div class="mLeftBox Br-s-1l BhFa"  id="leftMainWindows" style="display: ;">
		
			<div class="mLeftNrBdBox P12" id="default-example" data-collapse>
		        <h3  class="open">短期预报</h3>
		        <div class="Mb-12">
		        	<div class="YBbtnBx Mt-6 Mb-12">
		        		
					    <a class="btn Czs W35b" href="#work">五市公众预报</a><a class="btn Czs W35b" href="#work">市级指导预报</a>
					    <a class="btn Czs W35b" href="#work">市县精细化预报</a><a class="btn Czs W35b" href="#work">旅游预报</a>
					    <a class="btn Czs W35b" href="#work">村镇粗细化预报</a><a class="btn Czs W35b" href="#work">短期粗细化预报</a>
					    <a class="btn Czs W35b" href="#work">天气公报</a>
		        	</div>
		        </div>
		        <h3  class="open">中期预报</h3>
		        <div class="Mb-12">
		        	<div class="YBbtnBx Mt-6 Mb-12">
		        		
					    <a class="btn Czs W35b" href="#work">五市公众预报</a><a class="btn Czs W35b" href="#work">市级指导预报</a>
					    <a class="btn Czs W35b" href="#work">市县精细化预报</a><a class="btn Czs W35b" href="#work">旅游预报</a>
					    <a class="btn Czs W35b" href="#work">村镇粗细化预报</a><a class="btn Czs W35b" href="#work">短期粗细化预报</a>
					    <a class="btn Czs W35b" href="#work">天气公报</a>
		        	</div>
		        </div>
		        <h3  class="open">长期预报</h3>
		        <div class="Mb-12">
		        	<div class="YBbtnBx Mt-6 Mb-12">
		        		
					    <a class="btn Czs W35b" href="#work">五市公众预报</a><a class="btn Czs W35b" href="#work">市级指导预报</a>
					    <a class="btn Czs W35b" href="#work">市县精细化预报</a><a class="btn Czs W35b" href="#work">旅游预报</a>
					    <a class="btn Czs W35b" href="#work">村镇粗细化预报</a><a class="btn Czs W35b" href="#work">短期粗细化预报</a>
					    <a class="btn Czs W35b" href="#work">天气公报</a>
		        	</div>
		        </div>
		        <h3  class="open">短时预报</h3>
		        <div class="Mb-12">
		        	<div class="YBbtnBx Mt-6 Mb-12">
		        		
					    <a class="btn Czs W35b" href="#work">五市公众预报</a><a class="btn Czs W35b" href="#work">市级指导预报</a>
					    <a class="btn Czs W35b" href="#work">市县精细化预报</a><a class="btn Czs W35b" href="#work">旅游预报</a>
					    <a class="btn Czs W35b" href="#work">村镇粗细化预报</a><a class="btn Czs W35b" href="#work">短期粗细化预报</a>
					    <a class="btn Czs W35b" href="#work">天气公报</a>
		        	</div>
		        </div>
		    </div>
		
	</div>
	
	
	
	<div class="mainNrQ  mLyBox BhFf  " style="overflow: auto;">
		<div class="M24">
			<div class="qhTit taTitb">
				<ul class="bt ">
					<span class="hover">站点指导预报</span>
				</ul>
			</div>
			<div class="btnSeachBx">
					<ul class="formSech ">
						<li><label>预报日期：</label><input type="text" class="" name="s_name" style="width:80px;" placeholder="请选择日期"> <img class="disIB Mt-4" src="../img/calendar.png" /></li>
						<li><label>预报时次：</label><select name="select" class="" style="width: 100px;"><option value="0">7</option></select></li>
						<li><a href="#" class="btnBxb"><i class="iconfont icon-chaxun"></i>查询</a> <a href="#" class="btnBxb"><i class="iconfont icon-baocun1"></i>格点生成</a></li>
					</ul>
			</div>
			<div class="btnSeachBx llsBx nr">
					<ul class="formSech ">
						<li><label>预报员：</label><input type="text" class="" name="s_name" style="width:80px;" placeholder="请输入名称" value="格点转换"></li>
						<li><label>首席：</label><input type="text" class="" name="s_name" style="width:80px;"  placeholder="请输入名称" value="格点首席"></li>
						<li><label>签发员：</label><input type="text" class="" name="s_name" style="width:80px;"  placeholder="请输入名称" value="格点首席"></li>
						<li><label>制作时间：</label><input type="text" class="" name="s_name" style="width:120px;"  placeholder="请输入名称" value="2017-08-08 13:22:12"></li>
						<li><label>预报时次：</label><input type="text" class="" name="s_name" style="width:40px;"  placeholder="请输入名称" value="7"></li>
						<li><label>预报时段：</label><select name="select" class="" style="width: 80px;"><option value="0">6小时</option></select></li>
						<li><a href="#" class="btnBxb"><i class="iconfont icon-baocun1"></i>保存</a> <a href="#" class="btnBxb"><i class="iconfont icon-yulan"></i>预览</a></li>
					</ul>
					<br clear="all" class="clearfloat"  />
			</div>
			<div class="btnSeachBx ">
					<ul class="formSech ">
						<li><label>预报员：</label><input type="text" class="" name="s_name" style="width:80px;" placeholder="请输入名称" value="格点转换"></li>
						<li><label>首席：</label><input type="text" class="" name="s_name" style="width:80px;"  placeholder="请输入名称" value="格点首席"></li>
						<li><label>签发员：</label><input type="text" class="" name="s_name" style="width:80px;"  placeholder="请输入名称" value="格点首席"></li>
						<li><label>制作时间：</label><input type="text" class="" name="s_name" style="width:120px;"  placeholder="请输入名称" value="2017-08-08 13:22:12"></li>
						<li><label>预报时次：</label><input type="text" class="" name="s_name" style="width:40px;"  placeholder="请输入名称" value="7"></li>
						<li><label>预报时段：</label><select name="select" class="" style="width: 80px;"><option value="0">6小时</option></select></li><br />
						<li style="width: 100%;"><label class="fl Mt-6">预报时段：</label><textarea style="width:80%;" rows="3" name="textfield" id="textfield"></textarea></li><br />
						<li><a href="#" class="btnBxb"><i class="iconfont icon-baocun1"></i>保存</a> <a href="#" class="btnBxb"><i class="iconfont icon-yulan"></i>预览</a></li>
					</ul>
					<br clear="all" class="clearfloat"  />
			</div>
			<script type="text/javascript" src="http://www.jeasyui.net/Public/Public/js/jquery.js"></script>
    <script type="text/javascript" src="http://www.jeasyui.net/Public/js/easyui/jquery.easyui.min.js"></script>
			<div>
				<table id="dg" title="Client Side Pagination" style="width:100%;height:300px" data-options="
				rownumbers:true,
				singleSelect:true,
				autoRowHeight:false,
				pagination:true,
				pageSize:10">
					<thead>
						<tr>
							<th field="inv" width="80">Inv No</th>
							<th field="date" width="100">Date</th>
							<th field="name" width="80">Name</th>
							<th field="amount" width="80" align="right">Amount</th>
							<th field="price" width="80" align="right">Price</th>
							<th field="cost" width="100" align="right">Cost</th>
							<th field="note" width="110">Note</th>
						</tr>
					</thead>
				</table>
				
			</div>
		</div>
	</div>
	
	
	
	<script src="${contextPath}/scripts/newpage/jquery-1.11.1.min.js" type="text/javascript"></script>
	<script src="${contextPath}/scripts/newpage/jquery-browser.js" type="text/javascript"></script>
	<script src="${contextPath}/scripts/newpage/jquery.collapse.js"></script>
	
	<script type="text/javascript" src="${contextPath}/scripts/easyui/jquery.easyui.min.js"></script>
	
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
	<script>
		(function($){
			function pagerFilter(data){
				if ($.isArray(data)){	// is array
					data = {
						total: data.length,
						rows: data
					}
				}
				var target = this;
				var dg = $(target);
				var state = dg.data('datagrid');
				var opts = dg.datagrid('options');
				if (!state.allRows){
					state.allRows = (data.rows);
				}
				if (!opts.remoteSort && opts.sortName){
					var names = opts.sortName.split(',');
					var orders = opts.sortOrder.split(',');
					state.allRows.sort(function(r1,r2){
						var r = 0;
						for(var i=0; i<names.length; i++){
							var sn = names[i];
							var so = orders[i];
							var col = $(target).datagrid('getColumnOption', sn);
							var sortFunc = col.sorter || function(a,b){
								return a==b ? 0 : (a>b?1:-1);
							};
							r = sortFunc(r1[sn], r2[sn]) * (so=='asc'?1:-1);
							if (r != 0){
								return r;
							}
						}
						return r;
					});
				}
				var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
				var end = start + parseInt(opts.pageSize);
				data.rows = state.allRows.slice(start, end);
				return data;
			}

			var loadDataMethod = $.fn.datagrid.methods.loadData;
			var deleteRowMethod = $.fn.datagrid.methods.deleteRow;
			$.extend($.fn.datagrid.methods, {
				clientPaging: function(jq){
					return jq.each(function(){
						var dg = $(this);
                        var state = dg.data('datagrid');
                        var opts = state.options;
                        opts.loadFilter = pagerFilter;
                        var onBeforeLoad = opts.onBeforeLoad;
                        opts.onBeforeLoad = function(param){
                            state.allRows = null;
                            return onBeforeLoad.call(this, param);
                        }
                        var pager = dg.datagrid('getPager');
						pager.pagination({
							onSelectPage:function(pageNum, pageSize){
								opts.pageNumber = pageNum;
								opts.pageSize = pageSize;
								pager.pagination('refresh',{
									pageNumber:pageNum,
									pageSize:pageSize
								});
								dg.datagrid('loadData',state.allRows);
							}
						});
                        $(this).datagrid('loadData', state.data);
                        if (opts.url){
                        	$(this).datagrid('reload');
                        }
					});
				},
                loadData: function(jq, data){
                    jq.each(function(){
                        $(this).data('datagrid').allRows = null;
                    });
                    return loadDataMethod.call($.fn.datagrid.methods, jq, data);
                },
                deleteRow: function(jq, index){
                	return jq.each(function(){
                		var row = $(this).datagrid('getRows')[index];
                		deleteRowMethod.call($.fn.datagrid.methods, $(this), index);
                		var state = $(this).data('datagrid');
                		if (state.options.loadFilter == pagerFilter){
                			for(var i=0; i<state.allRows.length; i++){
                				if (state.allRows[i] == row){
                					state.allRows.splice(i,1);
                					break;
                				}
                			}
                			$(this).datagrid('loadData', state.allRows);
                		}
                	});
                },
                getAllRows: function(jq){
                	return jq.data('datagrid').allRows;
                }
			})
		})(jQuery);

		function getData(){
			var rows = [];
			for(var i=1; i<=800; i++){
				var amount = Math.floor(Math.random()*1000);
				var price = Math.floor(Math.random()*1000);
				rows.push({
					inv: 'Inv No '+i,
					date: $.fn.datebox.defaults.formatter(new Date()),
					name: 'Name '+i,
					amount: amount,
					price: price,
					cost: amount*price,
					note: 'Note '+i
				});
			}
			return rows;
		}
		
		$(function(){
			$('#dg').datagrid({data:getData()}).datagrid('clientPaging');
		});
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
