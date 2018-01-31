!(function() {
	
	function _queryUserList(infoForm, infoFields) {
		var hasField = false;
		infoFields = infoFields||['createBy', 'chief', 'issuer'];
		for(var i=0;i<infoFields.length;i++) {
			var fname = infoFields[i];
			var field = infoForm.find('[name="'+fname+'"]');
			if(field.length) {
				hasField = true;break;
			}
		}
		if(!hasField) return;
		var servRoot = 'http://127.0.0.1/cors';
		servRoot = 'http://172.23.105.85:8080';
		//servRoot = 'http://10.178.12.181:8180';
		var gl = JSON.parse(localStorage.getItem("current_user"));
		var viewer = this.viewer||this;
		if(gl==null) {
			viewer.alertWarn('登录无效', '登录信息有误，请重新登录!');
			return;
		}
		var userInfo = gl && gl.user;		
		//userInfo = userInfo && userInfo.user;
		var orgid = userInfo && userInfo.oraganId;
		var queryUrl = servRoot+'/rmis_new/service/queryUserGroup.json?orgids='+orgid;
		viewer.doRequest({
			url: queryUrl,
			crossDomain: true,
			success: function(data) {
				data = data.userList;
				var yubao = [];
				var qianfa = [];
				var shouxi = [];
				for(var i=0;i<data.length;i++) {
					var rec = data[i];
					var info = {
							value: rec.userName,
							text: rec.userName
					};
					if(rec.bshouxi) {
						shouxi.push(info);
					}
					if(rec.qianfa) {
						qianfa.push(info);
					}
					yubao.push(info);
				}
				var infoFields = ['createBy', 'chief', 'issuer'];
				for(var i=0;i<infoFields.length;i++) {
					var fname = infoFields[i];
					var field = infoForm.find('[name="'+fname+'"]');
					if(field.length) {
						var list = [];
						switch(fname) {
						case 'createBy':
							list = yubao;
							break;
						case 'chief':
							list = shouxi;break;
						case 'issuer':
							list = qianfa;break;
						}
						field.attr('readonly', false);
						field.combobox({
							editable: false,
							width: 100,
							data: list
						});
					}			
				}			
			}
		});
	}
	window.AccountUtils = {
			queryUserList: _queryUserList
	};
	
})();