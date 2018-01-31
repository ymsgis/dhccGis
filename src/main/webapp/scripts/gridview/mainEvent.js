//主导航
$(function() {
	/*换肤*/
	$(".gdtxLis li").click(function() {
		sj = $(this).parent().children("li");
		for (i = 0; i < sj.length; i++) {
			ss = $($(this).parent().children("li")[i]).removeClass('hover');
		}
		$(this).addClass('hover');
	});

	$(".mapTool li").click(function() {
		sj = $(this).parent().children("li");
		for (i = 0; i < sj.length; i++) {
			ss = $($(this).parent().children("li")[i]).removeClass('hover');
		}
		$(this).addClass('hover');
	});

	$(".mtimeSelBtn li").click(function() {
		sj = $(this).parent().children("li");
		for (i = 0; i < sj.length; i++) {
			ss = $($(this).parent().children("li")[i]).removeClass('active');
		}
		$(this).addClass('active');
	});

	$("#icoMainWindows").click(function() {
		$("#right").toggle();
	});

	//盖章窗口内数字点选
	$(".jsq a").click(function() {
		$(this).toggleClass("hover");
	});

	$(".winSetTool li").click(
			function() {
				var o = o ? o : window.event; //兼容性，定义事件
				stopPop(o); //阻止冒泡事件
				sj = $(this).parent().children("li");
				for (i = 0; i < sj.length; i++) {
					//ss=$($(this).parent().children("li")[i]).removeClass('hover');
					$($(this).parent().children("li")[i]).removeClass('hover');
					$($(this).parent().children("li")[i]).children("div").css(
							"display", "none");
				}
				$(this).addClass('hover');
				$(this).children("div").css("display", "block");
			})
	window.document.onclick = function() {
		$(".winSetTool li").removeClass('hover');
		$(".winSetTool li").children("div").css("display", "none");
	}
	//盖章
	$('#sealBtn').bind('click', function() {
		var tl = document.getElementById("sealBtn").innerHTML;
		if (tl == '取消盖章') {
			document.getElementById("sealBtn").innerHTML = "盖章";
			if (com.nxgrid.giscommon.sealEditTools.mapClickEvt != null)
				com.nxgrid.giscommon.sealEditTools.mapClickEvt.remove();
			if (com.nxgrid.giscommon.sealEditTools.mapMoveEvt != null)
				com.nxgrid.giscommon.sealEditTools.mapMoveEvt.remove();
			map.graphics.clear();
		} else {
			document.getElementById("sealBtn").innerHTML = "取消盖章";
			com.nxgrid.giscommon.sealEditTools.drawSealArea();
		}
	});
	$('#divseal a').bind('click', function() {

		var curVal = $(this).text();
		curVal = parseInt(curVal);
		com.nxgrid.giscommon.sealEditTools.sealInter = curVal;
		//$("#sealNumber").value = curVal;
	});

	$('#addSealStep').bind('click', function() {
		var curVal = document.getElementById("selSealVal").value;
		curVal = parseInt(curVal);
		curVal += 1;
		document.getElementById("selSealVal").value = curVal;
	});
	$('#decSealStep').bind('click', function() {
		//document.getElementById("decSealStep").value+=1;
		var curVal = document.getElementById("selSealVal").value;
		curVal = parseInt(curVal);
		curVal -= 1;
		document.getElementById("selSealVal").value = curVal;
	});
	//盖章END
})
function getEvent() {
	if (window.event) {
		return window.event;
	}
	func = getEvent.caller;
	while (func != null) {
		var arg0 = func.arguments[0];
		if (arg0) {
			if ((arg0.constructor == Event || arg0.constructor == MouseEvent || arg0.constructor == KeyboardEvent)
					|| (typeof (arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
				return arg0;
			}
		}
		func = func.caller;
	}
	return null;
}
//阻止父元素冒泡
function stopPop(e) {
	var e = getEvent();
	if (window.event) {
		window.event.cancelBubble = true;
	} else if (e.preventDefault) {
		e.stopPropagation();//阻止冒泡
	}

	// 			if (e && e.stopPropagation) { //非IE浏览器 
	// 				e.stopPropagation();
	// 			} else { //IE浏览器 

	// 			}
}