(function(win) {
	$(function() {
		var pwin = window.parent;
		if(win==pwin) {
			/*换肤*/
			$(".changecolor li").click(function(){
				var style = $(this).attr("id");
				$("link[role]").attr("disabled","disabled"); 
				$("link[title='"+style+"']").removeAttr("disabled");				
				$.cookie('mystyle', style, { expires: 7 }); // 存储一个带7天期限的 cookie
				changeSkin();
			});
		} else {
			$(win).bind('changeSkin',  changeSkin);
		}		
		changeSkin();
	});
	function changeSkin() {
		var cookie_style = $.cookie("mystyle");
		if(cookie_style!=null){ 
		    $("link[role]").attr("disabled","disabled"); 
			$("link[title='"+cookie_style+"']").removeAttr("disabled");
			$('iframe').each(function() {
				var sub = this.contentWindow;
				if(!sub.jQuery) return;
				sub.$(sub).trigger('changeSkin', cookie_style)
			});
		}
	}

})(window)