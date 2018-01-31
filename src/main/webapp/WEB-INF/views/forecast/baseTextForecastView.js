(function() {

var _emptyFn = function() {};
function ForecastBaseView(options) {
	var settings = $.extend({		
		dataUrl: 'loadData',
		queryParams: null,
		viewTextUrl: 'viewText',
		publishUrl: 'publish',
		dateField: 'createTime',
		onInitView: _emptyFn,
		onLoadData: _emptyFn,
		onLoadDataText: _emptyFn,
		onPublishData: _emptyFn
	}, options);
	var _EnableEdit = settings.editable;
	var IS_TEST = false;
	var _BaseUrl = settings.baseUrl;
	var me = this;

	$(document).ready(initView);
	
	function initView() {
		var infoForm = $('#infoForm');
		$.extend(me, {
			doRequest: execAjax,
			alertMsg: alertMsg,
			alertWarn: alertWarn,
			alertError: alertError,
			queryUserList: AccountUtils.queryUserList,
			onInitView: settings.onInitView,
			loadViewData: function(data) {
				var info = data;
				me._fcId = info.id;
				infoForm.form('load', info);
			}
		});		
		me.queryUserList(infoForm);
		var indexColumns = settings.indexColumns;
		infoForm.form({
			url: _BaseUrl+'/saveData',			
			onSubmit: function(param) {
				var fid = me.getFcid();				
				if(fid) {
					$.extend(param, {
						id: fid
					});
				}
				if(me.onSaveData) {
					me.onSaveData(param);				
				}
			},
			success: function(data) {
				data = $.parseJSON(data);	
				var msg = data.msg||data.message||data.error;
				if(data.success==false) {
					return alertError(msg);
				}
				alertMsg(msg);
				me.loadData();
			}		
		});
		var searchForm = $('#searchForm').form({
			url: _BaseUrl+'/'+settings.dataUrl,
			queryParams: settings.queryParams,
			onSubmit: function() {
				$.messager.progress({
					title: '加载数据',
					msg: '加载数据中,请稍候...',
					text: '读取数据',
					interval: 100
				});
			},
			success: function(data) {
				$.messager.progress('close');
				if(data) {
					data = $.parseJSON(data);					
					if(data.success==false) {
						alertError({
							title: '警告：出错了!',
							msg: data.error||data.message||data.msg,
							icon: 'warning'
						});
						if(me.onLoadFailed) {
							return me.onLoadFailed(data);
						}
					}
				}
				var dateField = me.fcDateField;
				me.fcDate=dateField.datebox('getValue');
				me.fcTime=me.fcTimeField.combobox('getText');
				data = $.extend({
					createTime: me.fcDate,
					timeType: me.fcTime
				}, data);
				var obj = me.onLoadData(data);
				obj = obj||data;
				me.loadViewData(obj);
			},
			error: function() {
				$.messager.progress('close');
				alertError({
					title: '出错了',
					msg: '请求链接出错',
					icon: 'error'
				});		
			}
		});	
		function _copyObj(dest, src) {
			for(var p in dest) {
				delete dest[p];
			}
			$.extend(dest, src);
			return dest;
		}
		var _orgQueryParams = $.extend({}, settings.queryParams);
		searchForm.find('.submit').click(function() {
			searchForm.form('options').queryParams = $.extend({}, _orgQueryParams);
			infoForm.form('reset');
			var rel = this.rel;
			var remakeFlag = null;
			switch(rel) {
			}
			searchForm.form('submit');
		});
		if(!_EnableEdit) {
			infoForm.find('[rel="savedata"]').hide();
		}
		infoForm.find('.submit').click(function() {
			var rel = this.rel;
			switch(rel) {
			case 'datatext':
				return me.loadDataText();
			case 'savedata':
				return me.saveData();
			}
		});
		var now = new Date();
		var dateFieldSel = '[textboxname="_VAL_"]'.replace('_VAL_', settings.dateField);
		var $dateField = searchForm.find(dateFieldSel);
		me.fcDateField = $dateField;
		me.fcTimeField = searchForm.find('[textboxname="timeType"]');
		if(!$dateField.datebox('getValue')) {
			$dateField.datebox('setValue', now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate());
		}
		$.extend(me, {
			getFcid: function() {
				return me._fcId;
			},
			destroy: function() {
				searchForm.remove();
				infoForm.remove();
			},
			loadData: function(params) {
				if(params) {
					var formOp = searchForm.form('options');
					var queryParams = formOp.queryParams||{};
					$.extend(queryParams, params);
					formOp.queryParams = queryParams;
				}
				searchForm.form('submit');
			},			
			onLoadData: settings.onLoadData,
			onLoadFailed: settings.onLoadFailed,
			onLoadDataText: settings.onLoadDataText,
			loadDataText: function() {
				var fid = me._fcId;
				if(!fid) {
					alertWarn('请先加载预报数据!');
					return false;
				}
				var textType = settings.textType||'text';
				$.messager.progress({
					title: '预览数据',
					msg: '生成预览数据中,请稍后...'		
				});
				execAjax({
					url: _BaseUrl+'/'+settings.viewTextUrl,
					data: {fid:fid},
					dataType: textType,
					success: function(data) {
						var text = data;
						if($.type(data)!='string') {
							var json = data;
							if(json.success==false) {
								var msg = json.error||json.msg||json.message;
								return alertError(msg);
							}
							text = me.onLoadDataText(json);
							text = text||data;
						}
						me.showTextWin(text);
					}
				});
			},
			onSaveData: settings.onSaveData,
			saveData: function() {
				var form = infoForm;
				if(!form.form('validate')) return false;
				form.form('submit');
			},
			showTextWin: function(text) {
				var textWin = me._textWin;
				if(!textWin) {
					var bd = document.body;
					var bdH = window.innerHeight||window.screen.availHeight||window.screen.height;
					var maxH = bdH-150;
					maxH = maxH>800? 800 : maxH;
					textWin = $('#textWin').dialog({
						toolbar: '#textWinTb',
						title: '预览预报',
						icon: 'icon-info',
						top: 50,
						maxHeight: maxH,
						buttons: [{
							text: '发布',
							icon: 'icon-save',
							handler: function() {
								me.publishData();
							}
						}, {
							text: '关闭',
							icon: 'icon-close',
							handler: function() {
								textWin.dialog('close');
							}
						}]
					});
					me._textWin = textWin;
				}
				//text = text.replace(/\r/g, '<br/>');
				$('#textView').html(text);
				textWin.window('center');
				textWin.window('open');
			},
			onPublishData: settings.onPublishData,
			publishData: function() {
				var fid = me._fcId;
				if(!fid) {
					alertWarn('请先加载预报数据!');
					return false;
				}
				var param = {fid:fid};
				param = me.onPublishData(param)||param;
				execAjax({
					url: _BaseUrl+'/'+settings.publishUrl,
					data: param,
					success: function(data) {
						var msg = data.msg||data.message||data.error;
						if(data.success==false) {
							return alertError(msg);
						}
						alertMsg(msg);
					}
				});				
			}
		});		
		me.onInitView();
		if(settings.autoLoad!==false) {
			searchForm.form('submit');
		}		
	}
}
var _PhenomenaTextEditor = {
		type: 'textbox',
		options: {
			required: true
		}
};
var _WindDirTextEditor = {
		type: 'textbox',
		options: {
			required: true
		}
};
var _WindPowTextEditor = {
		type: 'textbox',
		options: {
			required: true
		}
};
var _TempEditor = {
		type: 'numberbox',
		options: {
			required: true,
			precision: 2
		}
}
var _DataEditors = {
		'phenomena': _PhenomenaTextEditor,
		'windDir': _WindDirTextEditor,
		'windPow': _WindPowTextEditor,
		'temp': _TempEditor
};

function execAjax(op) {	
	op = $.extend({
		method: 'post',
		dataType: 'json',
		traditional: true,
		beforeSend: function() {
			$.messager.progress({
				title: '加载数据',
				msg: '加载数据中,请稍候...',
				text: '读取数据',
				interval: 100
			});			
		},
		complete: function() {
			$.messager.progress('close');
		},
		error: function() {
			alertError('请求出错!');
		}
	}, op);
	$.ajax(op);
}

function alertMsg(obj) {
	if($.type(obj)=='string') {
		obj = {msg:obj};
	}
	obj = $.extend({
		title: '信息!',
		icon: 'info'
	}, obj);
	return $.messager.alert(obj);
}
function alertError(obj) {
	if($.type(obj)=='string') {
		obj = {msg:obj};
	}
	obj = $.extend({
		title: '出错了!',
		icon: 'error'
	}, obj);
	return $.messager.alert(obj);
}
function alertWarn(obj) {
	if($.type(obj)=='string') {
		obj = {msg:obj};
	}
	obj = $.extend({
		title: '警告!',
		icon: 'warning'
	}, obj);
	return $.messager.alert(obj);
}
this.TextForecastView = ForecastBaseView;

})(window);