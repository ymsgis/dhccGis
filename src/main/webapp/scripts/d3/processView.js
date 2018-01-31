var forecast = "/data/monitor/action";
var live = "/data/monitor/actionLive";
//window.setInterval(function(){
//	doAjax();
//}, 60*60*1000);//一个小时执行一次60*60*
doAjax();
//setTimeout("doAjax()","3000");
//setInterval("doAjax();",60*60*1000);
function doAjax(){
	$.when(Ajax1(), Ajax())
	.done(function(data1, data) {
		setList(data1, data);
    })
	.fail(function(data){ alert("出错啦！"); });
}
function Ajax(){
	var defer = $.Deferred();
	$.ajax({
		url: _baseUrl + forecast,
		type: "post",
		dataType: "json",
		success: function(data){
			var result = defer.resolve(data);
			if(result == null){
				alert("没有找到对应数据！");
				return;
			}
		},
		error: function(){
			alert("节点监控调用后台接口出错！");
		}
	});
	return defer.promise();
}

function Ajax1(){
	var defer = $.Deferred();
	$.ajax({
		url: _baseUrl + live,
		type: "post",
		dataType: "json",
		success: function(data){
			var result = defer.resolve(data);
			if(result == null){
				alert("没有找到对应数据！");
				return;
			}
		},
		error: function(){
			alert("节点监控调用后台接口出错！");
		}
	});
	return defer.promise();
}
//日最小相对湿度
function getMnrhu(res){
	var mnrhu = res[0].mnrhu;
	return mnrhu;
}
//日最低温度
function getMnt(res){
	var mnt = res[0].mnt;
	return mnt;
}
//日最大相对湿度
function getMxrhu(res){
	var mxrhu = res[0].mxrhu;
	return mxrhu;
}
//日最高温度
function getMxt(res){
	var mxt = res[0].mxt;
	return mxt;
}
//日最大风速
function getMxwin(res){
	var mxwin = res[0].mxwin;
	return mxwin;
}
//日最大风U分量
function getMxwiu(res){
	var mxwiu = res[0].mxwin;
	return mxwiu;
}
//日最大风V分量
function getMxwiv(res){
	var mxwiv = res[0].mxwiv;
	return mxwiv;
}
//降水
function getPre(res){
	var pre = res[0].pre;
	return pre;
}
//相对湿度
function getRhu(res){
	var rhu = res[0].rhu;
	return rhu;
}
//云量
function getTcdc(res){
	var tcdc = res[0].tcdc;
	return tcdc;
}
//温度
function getTem(res){
	var tem = res[0].tem;
	return tem;
}
//能见度
function getVis(res){
	var vis = res[0].vis;
	return vis;
}
//风速
function getWin(res){
	var win = res[0].win;
	return win;
}
//风U分量
function getWiu(res){
	var wiu = res[0].wiu;
	return wiu;
}
//风v分量
function getWiv(res){
	var wiv = res[0].wiv;
	return wiv;
}
//3小时气温
function getTemper03(resFc){
	return resFc[0].temper03;
}
//3小时降水
function getRain03(resFc){
	return resFc[0].rain03;
}
//3小时湿度
function getRh03(resFc){
	return resFc[0].rh03;
}
//3小时风
function getWind03(resFc){
	return resFc[0].wind03;
}
//3小时云
function getCloud03(resFc){
	return resFc[0].cloud03;
}
//3小时短时强降水
function getRat03(resFc){
	return resFc[0].rat03;
}
//3小时雾
function getFog03(resFc){
	return resFc[0].fog03;
}
//3小时冰雹
function getHail03(resFc){
	return resFc[0].hail03;
}
//3小时霾
function getHaze03(resFc){
	return resFc[0].haze03;
}
//3小时降水相态
function getPph03(resFc){
	return resFc[0].pph03;
}
//3小时沙尘
function getSand03(resFc){
	return resFc[0].sand03;
}
//3小时雷电大风
function getSmg03(resFc){
	return resFc[0].smg03;
}
//3小时雷暴
function getSsm03(resFc){
	return resFc[0].ssm03;
}
//3小时能见度
function getVis03(resFc){
	return resFc[0].vis03;
}
//24小时最高气温
function getTmax24(resFc){
	return resFc[0].tmax24;
}
//24小时最低气温
function getTmin24(resFc){
	return resFc[0].tmin24;
}
//24小时最大相对湿度
function getRhmax24(resFc){
	return resFc[0].rhmax24;
}
//24小时最小相对湿度
function getRhmin24(resFc){
	return resFc[0].rhmin24;
}
function setList(res, resFc){
	// Create a new directed graph
	var g = new dagreD3.graphlib.Graph().setGraph({});
	
	var mnrhu = getMnrhu(res); var mnt = getMnt(res); var mxrhu = getMxrhu(res);
	var mxt = getMxt(res); var mxwin = getMxwin(res); var mxwiu = getMxwiu(res);
	var mxwiv = getMxwiv(res); var pre = getPre(res); var rhu = getRhu(res);
	var tcdc = getTcdc(res); var tem = getTem(res); var vis = getVis(res);
	var win = getWin(res); var wiu = getWiu(res); var wiv = getWiv(res);
	var temper03 = getTemper03(resFc); var rain03 = getRain03(resFc); var rh03 = getRh03(resFc);
	var wind03 = getWind03(resFc); var cloud03 = getCloud03(resFc); var rat03 = getRat03(resFc);
	var fog03 = getFog03(resFc); var hail03 = getHail03(resFc); var haze03 = getHaze03(resFc);
	var pph03 = getPph03(resFc); var sand03 = getSand03(resFc); var smg03 = getSmg03(resFc);
	var ssm03 = getSsm03(resFc); var vis03 = getVis03(resFc); var tmax24 = getTmax24(resFc);
	var tmin24 = getTmin24(resFc); var rhmax24 = getRhmax24(resFc); var rhmin24 = getRhmin24(resFc);
	
	var fcInfo = "气温："+temper03+" 降水："+rain03+" 风："+wind03+" 云量："+cloud03
				+" 相对湿度："+rh03+" 能见度："+vis03+" 降水相态："+pph03+" 短时强降水："+rat03
				+" 雾："+fog03+" 霾："+haze03+" 冰雹："+hail03+" 沙尘："+sand03
				+" 雷电大风："+smg03+" 雷暴："+ssm03+" 最高气温："+tmax24
				+" 最低气温："+tmin24+" 最大相对湿度："+rhmax24+" 最小相对湿度："+rhmin24;
				
	
	var liveInfo = "日最小相对湿度："+mnrhu+" 日最低温度："+mnt+" 日最大相对湿度："+mxrhu+" 日最高温度："+mxt
					+" 日最大风速："+mxwin+" 日最大风U分量："+mxwiu+" 日最大风V分量："+mxwiv+" 降水："+pre
					+" 相对湿度："+rhu+" 云量："+tcdc+" 温度："+tem+" 能见度："+vis+" 风速："+win
					+" 风U分量："+wiu+" 风v分量："+wiv;
	
	var checkInfo = "气温检验完成，"+"湿度检验完成";
	
	var correctInfo = "订正完成";
	
	var againCheckInfo = "气温检验完成，"+"湿度检验完成";

	// States and transitions from RFC 793
	var states = {
		"基础客观预报" : {
			description : fcInfo
		},
		"格点实况" : {
			description : liveInfo
		},
		"检验评估" : {
			description : checkInfo
		},
		"偏差订正" : {
			description : correctInfo
		},
//		"再检验" : {
//			description : againCheckInfo
//		},
		"卡尔曼滤波/消空消漏" : {
			description : "降水消漏空完成"
		},
//		"卡尔曼滤波" : {
//			description : "温度、湿度完成"
//		},
		"对比检验" : {
			description : "降水消漏空完成"
		},
		"最优背景场" : {
			description : "生成"
		},
		"主客观融合" : {
			description : "未进行"
		},
		"格点/站点/落区" : {
			description : "完成"
		},
		"灾害性天气落区" : {
			description : "完成"
		},
		"灾害性天气落区预警产品" : {
			description : "正在开发中。。。"
		},
//		"客观预警产品" : {
//			description : "完成"
//		},
		"审核发布" : {
			description : "未完成"
		},
	};

	// Add states to the graph, set labels, and style
	Object.keys(states).forEach(function(state) {
		var value = states[state];
		value.label = state;
		value.rx = value.ry = 5;
		g.setNode(state, value);
	});

	// Set up the edges
	g.setEdge("基础客观预报", "检验评估", {
		label : "1"
	});
	g.setEdge("格点实况", "检验评估", {
		label : "1"
	});
	g.setEdge("检验评估", "偏差订正", {
		label : "2"
	});
	g.setEdge("偏差订正", "卡尔曼滤波/消空消漏", {
		label : "3"
	});
	g.setEdge("偏差订正", "对比检验", {
		label : ""
	});
//	g.setEdge("再检验", "消空消漏", {
//		label : "4"
//	});
//	g.setEdge("再检验", "卡尔曼滤波", {
//		label : "4"
//	});
	g.setEdge("卡尔曼滤波/消空消漏", "对比检验", {
		label : "4"
	});
	g.setEdge("对比检验", "最优背景场", {
		label : "5"
	});
	g.setEdge("最优背景场", "主客观融合", {
		label : "6"
	});
	g.setEdge("主客观融合", "格点/站点/落区", {
		label : ""
	});
	g.setEdge("最优背景场", "格点/站点/落区", {
		label : "7"
	});
	g.setEdge("格点/站点/落区", "审核发布", {
		label : ""
	});
	g.setEdge("格点/站点/落区", "灾害性天气落区", {
		label : "8"
	});
	g.setEdge("灾害性天气落区", "灾害性天气落区预警产品", {
		label : "9"
	});
	g.setEdge("灾害性天气落区预警产品", "审核发布", {
		label : "10"
	});
//	g.setEdge("格点转站点", "审核发布", {
//		label : ""
//	});
//	g.setEdge("格点转灾害天气落区", "客观预警产品", {
//		label : "10"
//	});
//	g.setEdge("对流性灾害落区", "客观预警产品", {
//		label : "10"
//	});
//	g.setEdge("客观预警产品", "审核发布", {
//		label : "11"
//	});

	// Create the renderer
	var render = new dagreD3.render();

	// Set up an SVG group so that we can translate the final graph.
	var svg = d3.select("svg"), inner = svg.append("g");

	g.setGraph({
		nodesep : 15,
		ranksep : 20,
		rankdir : "LR",
		marginx : 0,
		marginy : 0
	});

	// Set up zoom support
	var zoom = d3.behavior.zoom().on(
			"zoom",
			function() {
				inner.attr("transform", "translate(" + d3.event.translate + ")"
						+ "scale(" + d3.event.scale + ")");
			});
	svg.call(zoom);

	// Simple function to style the tooltip for the given node.
	var styleTooltip = function(name, description) {
		return "<p class='name'>" + name + "</p><p class='description'>"
				+ description + "</p>";
	};

	// Run the renderer. This is what draws the final graph.
	render(inner, g);
	inner.selectAll("g.node").attr("title", function(v) {
		return styleTooltip(v, g.node(v).description)
	}).each(function(v) {
		$(this).tipsy({
			gravity : "w",
			opacity : 1,
			html : true,
			hoverlock: true
		});
	});
	
	var nodeRect = inner.selectAll("g.node rect");
//	nodeRect.on("click", function(d, i){
//		nodeRect.style("fill","#fff"); 
//		d3.select(this).style("fill","red"); 
//	})
//	nodeRect.attr("id", function(d, i) { return "node" + i; });
//	nodeRect.select("#node1").style("fill","skyblue"); 
//	nodeRect.select(function(d, i) { return i & 5 ? this : null; }).style("fill","skyblue"); 
	nodeRect.attr("index", function(d, i) { return i; });
	if(temper03=="" && rain03=="" && rh03=="" && wind03=="" && cloud03=="" && rat03=="" && fog03=="" && hail03=="" &&
		haze03=="" && pph03=="" && sand03=="" && smg03=="" && ssm03=="" && vis03=="" && tmax24=="" && tmin24=="" &&
		rhmax24=="" && rhmin24==""){
		nodeRect.select(function(d, i) { return i == 0 ? this : null; }).style("fill","green").transition().duration(5000)
		.delay(100).style("fill","#fff");
	}else{
		nodeRect.select(function(d, i) { return i == 0 ? this : null; }).style("fill","green").transition().duration(5000)
		.delay(100).style("fill","red");
	}
	
	if(mnrhu=="" && mnt=="" && mxrhu=="" && mxt=="" && mxwin=="" && mxwiu=="" && mxwiv=="" && pre=="" && rhu=="" &&
			tcdc=="" && tem=="" && vis=="" && win=="" && wiu=="" && wiv==""){
		nodeRect.select(function(d, i) { return i == 1 ? this : null; }).style("fill","green").transition().duration(5000)
		.delay(100).style("fill","#fff");
	}else{
		nodeRect.select(function(d, i) { return i == 1 ? this : null; }).style("fill","green").transition().duration(5000)
		.delay(100).style("fill","red");
	}
	
	nodeRect.select(function(d, i) { return i == 2 ? this : null; }).style("fill","green").transition().duration(5000)
		.delay(600).style("fill","#fff");
	nodeRect.select(function(d, i) { return i == 3 ? this : null; }).style("fill","green").transition().duration(5000)
		.delay(1000).style("fill","#fff");
	nodeRect.select(function(d, i) { return i == 4 ? this : null; }).style("fill","green").transition().duration(5000)
		.delay(1500).style("fill","#fff"); 
	nodeRect.select(function(d, i) { return i == 5 ? this : null; }).style("fill","green").transition().duration(5000)
		.delay(1900).style("fill","#fff");
	nodeRect.select(function(d, i) { return i == 6 ? this : null; }).style("fill","green").transition().duration(5000)
		.delay(1900).style("fill","#fff");
//	nodeRect.select(function(d, i) { return i == 7 ? this : null; }).style("fill","green").transition().duration(5000)
//		.delay(2900).style("fill","#fff");
	nodeRect.select(function(d, i) { return i == 8 ? this : null; }).style("fill","green").transition().duration(5000)
	.delay(500).style("fill","#fff");
	nodeRect.select(function(d, i) { return i == 9 ? this : null; }).style("fill","green").transition().duration(5000)
		.delay(3500).style("fill","#fff");
	nodeRect.select(function(d, i) { return i == 10 ? this : null; }).style("fill","green").transition().duration(5000)
		.delay(3500).style("fill","#fff");
	nodeRect.select(function(d, i) { return i == 11 ? this : null; }).style("fill","green").transition().duration(5000)
		.delay(3500).style("fill","red");
//	nodeRect.select(function(d, i) { return i == 12 ? this : null; }).style("fill","green").transition().duration(5000)
//		.delay(3500).style("fill","#fff");
//	nodeRect.select(function(d, i) { return i == 13 ? this : null; }).style("fill","green").transition().duration(5000)
//	.delay(2900).style("fill","#fff");
//	if(info!=null || info!=""){
//		nodeRect.select(function(d, i) { return i == 0 ? this : null; }).style("fill","red");
//	}


	// Center the graph
	var initialScale = 0.75;
	zoom.translate(
			[ (svg.attr("width") - g.graph().width * initialScale) / 2, 20 ])
			.scale(initialScale).event(svg);
	svg.attr('height', g.graph().height * initialScale + 40);
}