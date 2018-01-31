(function() {

var _emptyFn = function() {};
function ForecastBaseView(options) {
	var settings = $.extend({		
		hourSpan: 24,
		hourCount: 168,
		dataUrl: 'loadData',
		queryParams: null,
		viewTextUrl: 'viewText',
		publishUrl: 'publish',
		dateField: 'createTime',
		onInitView: _emptyFn,
		onBeforeLoad: null,
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
		var hourSpanField = $('#hourSpanQuery');
		var _hourData = [];
		var span = settings.hourSpan;	
		var hourCount = settings.hourCount;
		if(hourCount>0) {
			for(var i=span;i<=hourCount;i+=span) {
				var fhour = i-span;
				_hourData.push({
					text: fhour+'-'+i+'小时',
					value: i
				});
			}
		}
		span = settings.termSpan;
		if(span) {
			var startHour = hourCount;
			var termHour = settings.termHour;
			for(var i=span;i<=termHour;i+=span) {
				var hour = startHour+i;
				var fhour = hour-span;
				_hourData.push({
					text: fhour+'-'+hour+'小时',
					isTerm: true,
					value: hour
				});
			}
		}
		hourSpanField.combobox({
			editable: false,
			data: _hourData,
			disabled: _hourData.length<2,
			onChange: function(newVal, oldVal) {
				me.loadHourSpanData(newVal);
			}
		});
		$.extend(me, {
			doRequest: execAjax,			
			alertMsg: alertMsg,
			alertError: alertError,
			alertWarn: alertWarn,
			queryUserList: AccountUtils.queryUserList,
			onInitView: settings.onInitView,
			onBeforeLoad: settings.onBeforeLoad,
			loadViewData: function(data) {
				var info = data.record;
				var codes = data.codes;
				if(info) {
					me._fcId = info.id;
					me.fcTimeField.combobox('setValue', info.timeType);
					infoForm.form('load', info);
				}
				if(hourSpanField.length) {
					var hourData = hourSpanField.combobox('getData');
					hourSpanField.combobox('setValue', hourData[0].value);
				}
				codes = codes||data;
				dataGrid.datagrid('loadData', codes);
			}
		});
		var infoForm = $('#infoForm');
		me.queryUserList(infoForm);
		var dataColumns = settings.dataColumns;
		dataColumns  = _buildDataColumns(dataColumns, settings);
		var dataGrid = $('#dataGrid');
		var _GridType = 'datagrid';
		if(_EnableEdit) {
			_GridType = 'edatagrid';
		}
		var indexColumns = settings.indexColumns;
		var gridConfig = $.extend({
			rownumbers: true,
			frozenColumns: indexColumns? [indexColumns] : null,
			columns: [dataColumns],
			toolbar: '#infoForm',
			onSave: function(index, row) {
				me.onSaveRow(index, row);
			}			
		}, settings.gridConfig);
		dataGrid[_GridType](gridConfig);
		me.datagrid=dataGrid;
		var remakeFlag = null;
		var searchForm = $('#searchForm').form({
			url: _BaseUrl+'/'+settings.dataUrl,
			queryParams: settings.queryParams,
			onSubmit: function(param) {
				if(me.onBeforeLoad) {
					if(me.onBeforeLoad()==false) {
						return false;
					}
				}
				param.remake = remakeFlag;
				remakeFlag = null;
				$.messager.progress({
					title: '加载数据',
					msg: '加载数据中,请稍候...',
					text: '读取数据',
					interval: 100
				});
			},
			success: function(data) {
				$.messager.progress('close');
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
					var timeType = data.results;
					if(timeType) {
						me.fcTimeField.combobox('setValue', timeType);
					}
					data = [];
				}
				var obj = me.onLoadData(data);
				obj = obj||data;
				me.loadViewData(obj);
				delete me._dirtyRows;
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
			switch(rel) {
			case 'gridmake':
				remakeFlag = true;
				break;
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
				return me.saveGridData();
			}
		});
		var now = new Date();
		var dateFieldSel = '[textboxname="_VAL_"]'.replace('_VAL_', settings.dateField);
		var $dateField = searchForm.find(dateFieldSel);
		if(!$dateField.datebox('getValue')) {
			$dateField.datebox('setValue', now.getFullYear()+'-'+(now.getMonth()+1)+'-'+now.getDate());
		}	
		var $timeTypeField = searchForm.find('[textboxname="timeType"]');
		if($timeTypeField.length) {
			$timeTypeField.combobox('setValue', null);
		}
		me.fcTimeField = $timeTypeField;
		me.onInitView();
		if(settings.autoLoad!==false) {
			searchForm.form('submit');
		}

		$.extend(me, {
			getFcid: function() {
				return me._fcId;
			},
			destroy: function() {
				searchForm.remove();
				infoForm.remove();
				dataGrid.datagrid('getPanel').remove();
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
			loadHourSpanData: function(span) {
				var grid = dataGrid;
				var day = Math.floor((span+12)/24);
				day = day<1? 1 : day;
				var hourSpan = settings.hourSpan;
				var subList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
				var idx = span/hourSpan-1;
				var hourCount = settings.hourCount;
				if(hourSpan==24 || span>hourCount) {
					subList = [];
				}
				var columns = grid.datagrid('options').columns[0];
				for(var i=0;i<columns.length;i++) {
					var col = columns[i];
					if(col.fieldFmt) {
						col.field = col.fieldFmt.replace('{DAY}', day).replace('{SUB}',  subList[idx]||'');
					}
				}
				var data = grid.datagrid('getData');
				grid.datagrid('loadData', data);
			},
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
			onSaveRow: function(index, row) {
				var dirtyRows= me._dirtyRows||[];
				me._dirtyRows = dirtyRows;
				if(dirtyRows.indexOf(row)<0) {
					dirtyRows.push(row);
				}
			},
			onSaveGridData: settings.onSaveGridData,
			saveGridData: function() {
				var grid = dataGrid;
				grid.edatagrid('saveRow');
				var dirtyRows = me._dirtyRows;	
				if(!dirtyRows || dirtyRows.length<1) {
					//return false;
				}
				var param = dirtyRows||[];
				if(me.onSaveGridData) {
					param = me.onSaveGridData(param)||param;
				}
				var formParam = infoForm.serializeArray();
				var info = {};
				for(var i=0;i<formParam.length;i++) {
					var p = formParam[i];
					info[p.name] = p.value;
				}
				if(param.info) {
					info = $.extend(info, param.info);
					param = param.codes;
				}
				param = param||[];
				param = {
					fid: this.getFcid(),
					codes: param,
					info: info
				};
				execAjax({
					url: _BaseUrl+'/saveCodes',
					data: JSON.stringify(param),
					contentType: 'application/json;charset=UTF-8',
					success: function(data) {
						var msg = data.msg||data.message||data.error;
						if(data.success==false) {
							return alertError(msg);
						}
						delete me._dirtyRows;
						alertMsg(msg);
					}
				});
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
	}
	return me;
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
		type: 'numberspinner',
		options: {
			required: true,
			min: -50,
			max: 50,
			precision : 1
		}
};
var _RainEditor = {
	type: 'numberspinner',
	options: {
		max: 100,
		min: 0,
		required: true,
		precision: 1
	}		
};
var _HumidityEditor = {
		type: 'numberspinner',
		options: {
			required: true,
			precision: 0
		}
};
var _DataEditors = {
		'phenomena': _PhenomenaTextEditor,
		'windDir': _WindDirTextEditor,
		'windPow': _WindPowTextEditor,
		'temp': _TempEditor,
		'rain': _RainEditor,
		'humidity': _HumidityEditor
};

function _buildDataColumns(columns, op) {
	var editable = op.editable;
	for(var i=0;i<columns.length;i++) {
		var col = columns[i];
		if(col.fieldFmt) {
			col.resizable = false;
		}
		if(editable) {
			var dataType = col.dataType;
			if(dataType) {
				var editor = col.editor;
				if(!editor) {
					editor = _DataEditors[dataType];
					if(col.precision!=undefined) {
						editor = $.extend(true, {}, editor);
						editor.options.precision = col.precision;
					}
					col.editor = editor;
				}
			}
		}
	}
	return columns;
}

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
	if(obj.showType) {
		return $.messager.show(obj);
	}		
	return $.messager.alert(obj);
}
this.StationForecastView = ForecastBaseView;

})(window);