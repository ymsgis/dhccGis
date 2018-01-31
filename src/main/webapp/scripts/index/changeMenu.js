function changeMenu(loginName) {
	$.ajax({
		url : _menuUrl+"loginName="+loginName,
		type : "get",
		dataType : "json",
		success : function(data) {
			var result = data;
			console.log(result);
			var menu = result.menu;
			var classArr = ["icon-fengxianceping01","icon-zhandianguanli","icon-fengxianceping01","icon-baogao2","icon-xitongguanli","icon-xitongguanli"];
			 $("#menubar").remove();
			   var menubar = $("<ul id='menubar' class='tNav'></ul>");
			   for(var i=0;i<menu.length;i++){
			   	var menuLi = $("<li></li>");
			   	menuLi.appendTo(menubar);
			       $("<a href='#'><i class="+classArr[i]+"></i>"+menu[i].moduleName+"</a>").appendTo(menuLi);
			       if(menu[i].subMenu.length>0){
			       	var subUl = $("<ul class='submenu'></ul>");
			            // 二级菜单
			   	    for(var j=0;j<menu[i].subMenu.length;j++){
			   	    	 subUl.appendTo(menuLi);
			   	    	 var subLi = $("<li></li>");
			   		     subLi.appendTo(subUl).append($("<a href='#'></a>").html(menu[i].subMenu[j].moduleName));
			   	    }
			       }
			   }
			   //$("#menubar>li>a>i").addClass("iconfont");
			   var $a = $("#menubar li ul li a");
			   //二级菜单中a路径为#的选项全部隐藏
			   $a.each(function(index,val){
			   	if($(this).attr("href")=="#"){
			   		$a.eq(index).parent("li").hide();
			   	}
			   })
			
		}
	})
}