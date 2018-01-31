(function() {
	
	var _global = this;
	function GridCorrectView(options, gisSupport) {
		var viewer = null;
		var _BaseUrl = _ctxPath + '/grid/stationGridDataCorrect';
		var _ColumnFieldMatcher = {
			typeR : /valR.*/,
			typeTmax : /tmax.*/,
			typeTmin : /tmin.*/
		};
		var settings = $.extend(options, {
			baseUrl : _BaseUrl,
			hourSpan : 6,
			hourCount : 24,
			termSpan : 24,
			termHour : 144,
			dateField: 'fcTime',
			editable: true,
			//autoLoad : true,
			indexColumns: _buildIndexColumns(),
			dataColumns : _buildDataColumns({
				showRefBtn: false
			}),
			gridConfig : {
				//rownumbers : true,
				singleSelect : true,
				checkOnSelect : false,
				onClickColumn : function(ui, column) {
					var field = column.field;
					_global.chooseColumn = column.title;					
					var grid = viewer.datagrid;
					var ftype = field.replace(/[\d]/g, '');
					var devField = 'rainDev';
					switch (ftype) {
					case 'tmax':
						devField = 'tmax';
						break;
					case 'tmin':
						devField = 'tmin';
						break;
					}
					var fsub = field.replace(/[^\d]/g, '');
					devField = devField + fsub+"DiyDev";
					var dataList = grid.datagrid('getData');
					gisSupport.drawDeviationData(dataList, devField);
				}
			},
			textType : 'json',
			onInitView : function() {
				var dataGrid = $('#dataGrid');
				var now = new Date();
				var timeType = now.getHours()<12? 8 : 20;
				$('#timeType').combobox('setValue', timeType);
				$('#isVillageField').switchbutton({
					onChange: function(checked) {
						var grid = dataGrid;
						var gridData = grid.datagrid('getData');
						if(!checked) {
							 grid[0]._origData = gridData;
							gridData = gridData.rows;
							var list = [];
							for(var i=0;i<gridData.length;i++) {
								var rec = gridData[i];
								if(rec.stationLv==0) {
									list.push(rec);
								}
							}
							grid.datagrid('loadData', list);
						} else {
							gridData = grid[0]._origData;
							if(!gridData) return;
							grid.datagrid('loadData', gridData);
							delete grid[0]._origData;
						}
					}
				});
				$('.columnCtrl').change(function() {
					var chk = this;
					var isHide = !chk.checked;
					var type = chk.value;
					var grid = dataGrid;
					var fields = grid.datagrid('getColumnFields');
					var colMatcher = _ColumnFieldMatcher[type];
					for (var i = 0; i < fields.length; i++) {
						var f = fields[i];
						if (colMatcher.test(f)) {
							if (isHide) {
								grid.datagrid('hideColumn', f);
							} else {
								grid.datagrid('showColumn', f);
							}
						}
					}
				});
				dataGrid.datagrid('bindHeader');
				dataGrid.datagrid('enableCellEditing');
				var pagebar = $('#pagebar');
				if(pagebar.length) {
					var pageField = pagebar.find('[name="page"]').textbox({
						editable : false
					});
					pagebar.find('a[rel]').linkbutton({
	                    onClick: function () {
	                        var rel = $(this).attr('rel');
							var page = parseInt(pageField.val());
							page = page + (rel == 'prev' ? -1 : 1);
							var needLoad = true;
							if (page < 1) {
								page = 1;
								needLoad = false;
							} else if (page > 3) {
								page = 3;
								needLoad = false;
							}						
							if(!needLoad) return;
							if(page==1) {
								$('#saveBtn').show();
							} else {
								$('#saveBtn').hide();
							}
							pageField.textbox('setValue', page);
							viewer.loadData();                            	
	                    }
					});
				}
				$('#optbar').find('a[rel]').linkbutton({
                    onClick: function () {
                        var rel = $(this).attr('rel');
                        switch (rel) {
                            case 'savedata':
                                return viewer.saveData();
                            case 'consistencyProcess':
                                return viewer.consistencyProcess();
                            default:                        	
                        }
                    }
                });
				var gridPanel = dataGrid.datagrid('getPanel');
				gridPanel.find('.temp-ref-btn').click(function() {
					var refType = $(this).attr('rel');
					viewer.showTempRef(refType);
				});
			},
			onBeforeLoad: function() {
				var gridInfo = window.parent.getGridInfo();
				var gridType = gridInfo.type||'gridCenter';
				if(!gridType) {
					viewer.alertWarn('未选择加载的格点类型!');
					return false;
				}
				$('#gridTypeField').val(gridType);
				viewer.gridType = gridType;
			},
			onLoadData : function(result) {
				var state = result.state;
				if(state=='warning') {
					viewer.alertWarn({
		                msg: result.message,
		                showType:'show'
		            });
				}
				$('#baseFcTypeField').textbox('setValue', result.baseFcType);
				var data = result.dataList||result;
				//var villageBtn = $('#isVillageField');
//				if(data.length>100) {
//					villageBtn.switchbutton('check');
//				} else {
//					villageBtn.switchbutton('uncheck');
//				}
				var stationList = [];
				for (var i = 0; i < data.length; i++) {
					var d = data[i];
					if(d.stationLv<1) {
						stationList.push({
							stationName: d.stationName,
							stationNo: d.stationNo
						});
					}
					if(d['orgTmax24']) break;					
					var listR = d.raininess;
					var listTmax = d.tmax;
					var listTmin = d.tmin;
					var tmaxDev = d.tmaxDev;
					var tminDev = d.tminDev;
					var rainDev = d.rainDev;
					var day = 0;
					for (var n = 0; n < listR.length; n++) {
						var hour = n * 12 + 12;
						var valR = listR[n];
						var devR = rainDev[n];
						d['valR' + hour] = parseFloat(valR.toFixed(1));
						d['rainDev' + hour] = parseFloat(devR.toFixed(1));
						d['orgR' + hour] = valR + devR;	
						if (n % 2 == 0) {
							var idx = day * 24 + 24;
							var tmax = listTmax[day];
							var tmin = listTmin[day];
							var devTmax = tmaxDev[day];
							var devTmin = tminDev[day];
							d['tmax' + idx] = parseFloat(tmax.toFixed(1));
							d['tmin' + idx] = parseFloat(tmin.toFixed(1));
							d['tmaxDev' + idx] = parseFloat(devTmax.toFixed(1));
							d['tminDev' + idx] = parseFloat(devTmin.toFixed(1));
							d['orgTmax' + idx] = tmax-devTmax;
							d['orgTmin' + idx] = tmin-devTmin;
							day++;
						}
					}
					delete d.temperature;
					delete d.cloudage;
                    delete d.raininess;
                    delete d.tmax;
                    delete d.tmin;
                    delete d.tmaxDev;
                    delete d.tminDev;
                    delete d.rainDev;
				}
				viewer.stationList = stationList;
				viewer.gridType = result.gridType||viewer.gridType;
				viewer.fcDate=$("#fcTime").datebox('getValue');
				viewer.fcTime=$("#timeType").combobox('getText');
				return data;
			}
		});
		if (settings.autoLoad == false) {
			settings.gridConfig.data = settings.onLoadData([ {
				stationName : '测试站1',
				stationNo : '001',
				longitude : 105.64,
				latitude : 37.82,
				tmin : [ 10.12, 11.12, 12.12 ],
				tmax : [ 22.12, 23.12, 24.12 ],
				raininess : [ 20.12, 21.12, 22.12, 19.5, 18.5, 17.6 ],
				tminDev : [ 0.5, -1.5, 2.5 ],
				tmaxDev : [ -1.5, 0, 2.5 ],
				rainDev : [ 0, 0, -1.5, 0.5, 1.0, 2.0 ]
			} ]);
		}
		viewer = new StationForecastView(settings);
		$.extend(viewer, {
			saveData: function() {
				var grid = viewer.datagrid;
				var dataList = grid.datagrid('getData').rows;
                var date = viewer.fcDate;
                var timeType = viewer.fcTime;
                var gridType = viewer.gridType;
                var hasVillage = $('#isVillageField').switchbutton('options').checked;
                var dataParam = {
                	dateStr: date+'-'+timeType,
                	dataList: dataList,
                	gridType: gridType,
                	hasVillage: hasVillage
                };
                $.messager.progress({
                    title: '保存数据',
                    msg: '数据保存中,请稍候...',
                    text: '保存数据',
                    interval: 100
                });
				this.doRequest({
					url: _BaseUrl+'/saveData',
					contentType: 'application/json;charset=UTF-8',
					data: JSON.stringify(dataParam),
					success: function(data) {
                        $.messager.progress('close');
						var code = data.code;
						var msg = data.description||data.state;
						if(code!=200) {
							$.messager.alert({
								title: '数据保存失败!',
								msg: msg,
								icon: 'error'
							});
							return;
						}
						$.messager.alert({
							title: '数据保存成功!',
							msg: msg,
							icon: 'info'
						});
					},
					error: function(req, error, obj) {
                        $.messager.progress('close');
                        $.messager.alert({
                            title: '出错了!',
                            msg: error||obj,
                            icon: 'error'
                        });
					}					
				});
			},
			showTempRef: function(type) {	
				var me = this;
				var refwin = me.tempRefWin;
				var grid = me.tempRefGrid;
				if(!refwin) {
					refwin = $('#tempRefDlg');					
					grid = refwin.find('#tempRefGrid');
					this.tempRefGrid = grid;
					refwin.find('#applyTempRefField').combobox({
						onChange: function() {		
						}
					});
					grid.datagrid({
						url: _BaseUrl+'/loadBaseFcData',
						height: 350,
						frozenColumns: [[{
							field: 'stationNo',
							formatter: function(val, row) {
								return val+'('+row.stationName+')';
							}
						}]],
						loadFilter: function(data) {
							me._tempRefData = data;
							var list = [];
							var refType = me.tempRefType;
							var ftype = refType.replace(/[\d]/g, '');
							var idx = refType.replace(/[^\d]/g, '');
							idx = parseInt(idx)/24;
							var staList = viewer.stationList;
							for(var i=0;i<staList.length;i++) {
								var rec = $.extend({}, staList[i]);
								for(var p in data) {
									var refs = data[p][idx];
									var ref = refs[rec.stationNo];	
									rec[p] = ref[ftype];
								}
								list.push(rec);
							}
							console.log(idx, ftype, list);
							return list;
						}
					});
					refwin.dialog({
						title: '温度参考',
						toolbar: '#tempRefTbar',
						modal:true
					});
					$('#tempRefTbar').find('.l-btn').click(function() {
						var act = this.rel;
						switch(act) {
						case 'close':
							refwin.dialog('close');break;
						case 'save':
							break;
						}
					});
					me.tempRefWin = refwin;
				}
				this.tempRefType = type;
				refwin.window('open');
				if(!grid.datagrid('getData')) {
					grid.datagrid('load');
				} else {
					grid.datagrid('loadData', me._tempRefData);
				}				
			},
			consistencyProcess: function() {
				var grid = this.datagrid;
                var dataList = grid.datagrid('getData').rows;
                var strdate = $("#fcTime").datebox('getValue');
                var timePoint = $("#timeType").combobox('getValue');
                var gridType = viewer.gridType;
                var hasVillage = $('#isVillageField').switchbutton('options').checked;
                var param = {
                	strdate: strdate,
					timePoint: timePoint,
					gridType: gridType,
                	dataList: dataList,
                	hasVillage: hasVillage
				};
                $.messager.progress({
                    title: '处理数据',
                    msg: '处理数据中,请稍候...',
                    text: '处理数据',
                    interval: 100
                });
                
                $.ajax({
					url: _ctxPath+'/importantPoint/consistencyProcess',
					type: 'post',
					contentType: 'application/json;charset=UTF-8',
					data: JSON.stringify(param),
					success: function(data) {
                        $.messager.progress('close');
						var code = data.code;
						var msg = data.description||data.state;
						if(code!=200) {
							$.messager.alert({
								title: '处理失败!',
								msg: msg,
								icon: 'error'
							});
							return;
						}
						$.messager.alert({
							title: '处理成功!',
							msg: msg,
							icon: 'info'
						});
                        viewer.loadData();
                        //add by mars
                        gisSupport.clearMap();
                        window.parent.clearBusy();
                        //处理websocket
                        //window.parent.sendWbMessage(strdate+","+timePoint+","+gridType);
					},
					error: function(req, error, obj) {
                        $.messager.progress('close');
                        $.messager.alert({
                            title: '出错了!',
                            msg: error||obj,
                            icon: 'error'
                        });
					}
				});
			}
		});
		return viewer;
	}
	function _loadTypeFields(type, hour) {
		var valField = 'tmax';
		var orgField = 'orgTmax';
		var devField = 'tmaxDev';
		switch (type) {
		case 'tmin':
			valField = 'tmin';
			orgField = 'orgTmin';
			devField = 'tminDev';
			break;
		case 'rain':
			valField = 'valR';
			orgField = 'orgR';
			devField = 'rainDev';
			break;
		}
		valField = valField + hour;
		orgField = orgField + hour;
		devField = devField + hour;
		return {
			valField : valField,
			orgField : orgField,
			devField : devField
		};
	}
	function _createCellStyler(type, hour) {
		var fields = _loadTypeFields(type, hour);
		var valField = fields.valField;
		var orgField = fields.orgField;
		return function(value, row, index) {
			var val = row[valField];
			var orgVal = row[orgField];
			var dev = Math.abs(val-orgVal);
			var bgcolor = 'green';
			var color = 'white';
			if (dev > 2) {
				bgcolor = 'red';
			} else if (dev > 1) {
				bgcolor = 'orange';
			}
			return 'background:[BGCOL];color:[COL]"'
					.replace('[BGCOL]', bgcolor).replace('[COL]', color);
		}
	}
	function _createCellRenderer(type, hour) {
		var fields = _loadTypeFields(type, hour);
		var valField = fields.valField;
		var orgField = fields.orgField;
		var devField = fields.devField;
		return function(value, row, index) {
			var val = row[valField];
			var orgVal = row[orgField];
			var orgDev = row[devField];				
			var dev = (val-orgVal).toFixed(1);
			row[valField+'DiyDev']=dev;
			return '<div title="[TITLE]">[VAL]</div>'.replace('[VAL]', value).replace('[DEV]', orgDev)
					.replace('[TITLE]', dev);
		}
	}
	function _buildIndexColumns() {
		var columns = [ {
			title : '站名',
			field : 'stationName',
			selectable : false,
			width : 50
		}, {
			title : '站号',
			field : 'stationNo',
			selectable : false,
			width : 50
		} ];
		return columns;
	}
	function _buildDataColumns(op) {
		var showRefBtn = op.showRefBtn;
		var columns = [];
		for (var i = 0; i < 3; i++) {
			var day = i + 1;
			for (var h = 0; h < 2; h++) {
				var hour = (day - 1) * 24 + h * 12 + 12;
				var col = {
					title : 'R{H}'.replace('{H}', hour),
					field : 'valR{H}'.replace('{H}', hour),
					//align: 'right',
					dataType : 'rain',
					// styler: _createCellStyler('rainDev', hour),
					// formatter: _createCellRenderer('rainDev', hour),
					width : 50
				};
				columns.push(col);
			}
			var hour = day * 24;
			col = {
				title: (showRefBtn? 'Tmax{H}<a class="easyui-linkbutton l-btn l-btn-small temp-ref-btn" style="padding:2px;" rel="tmax{H}"><b>参</b></a>' :  'Tmax{H}').replace(/\{H\}/g, hour),
				width : showRefBtn? 80 : 60,
				//align: 'right',				
				dataType : 'temp',
				field : 'tmax{H}'.replace('{H}', hour),
				styler : _createCellStyler('tmax', hour),
				formatter : _createCellRenderer('tmax', hour),
				width : showRefBtn? 80 : 60
			};
			columns.push(col);
			col = {
				title :  (showRefBtn? 'Tmin{H}<a class="easyui-linkbutton l-btn l-btn-small temp-ref-btn" style="padding:2px;"  rel="tmin{H}"><b>参</b></a>' : 'Tmin{H}').replace(/\{H\}/g, hour),
				width : showRefBtn? 80 : 60,
				//align: 'right',
				dataType : 'temp',
				field : 'tmin{H}'.replace('{H}', hour),
				styler : _createCellStyler('tmin', hour),
				formatter : _createCellRenderer('tmin', hour),
				width : showRefBtn? 80 : 60
			};
			columns.push(col);
		}
		return columns;
	}
	this.StationGridDataCorrectView = GridCorrectView;

})(window);