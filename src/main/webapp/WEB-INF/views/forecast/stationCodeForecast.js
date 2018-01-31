function StationCodeForecast(options) {
	var settings = options||{};
	var _EnableEdit = settings.editable;
	var IS_TEST = false;
	var creatTime;
	var timetype;
	var _fid = null;
	var viewWindow = null;
	var opSelectWindow_12 = null;
	var opSelectWindow_24 = null;
	var _BaseUrl = _ctxPath+'/forecast/stationCodeForecast';
	
	var dataSelModel = new Ext.grid.CheckboxSelectionModel({
		singleSelect : false
	});	
	
	var forecastFields = [ {
		name : 'timeType',
		type : 'string'
	}, {
		name : 'shortCreateBy'
	},{
		name : 'createBy',
		type : 'string'
	},{
		name : 'principal'
	},{
		name: 'shortCount'
	},{
		name: 'mediumCount'
	},{
		name : 'createTime'
	}, {
		name : 'updateBy',
		type : 'string'
	}, {
		name : 'updateTime',
		type : 'string'
	}, {
		name : 'status',
		type : 'string'
	}, {
		name : 'id',
		type : 'string'
	}, {
		name : 'sendCount',
		type : 'string'
	}, {
		name : 'partSendCount',
		type : 'string'
	}

	];

	var dataModel = Ext.data.Record.create(forecastFields);

	var forecastListStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy(new Ext.data.Connection({
			timeout : 0,
			url : _BaseUrl
		})),
		reader : new Ext.data.JsonReader({
			root : 'rows',
			totalProperty : 'total'
		}, dataModel),
		baseParams : {
			'sort_createTime' : 'DESC'
		},
		remoteSort : false
	});

	// 菜单查询列表
	var dataColModel = new Ext.grid.ColumnModel({
		columns : [dataSelModel, {
			header : '短期预报员',
			width : 120,
			dataIndex : 'shortCreateBy'
		}, {
			header : '中期预报员',
			width : 120,
			// hidden:true,
			dataIndex : 'createBy'
		}, {
			header : '首席',
			width: 100,
			dataIndex: 'principal'
		}, {
			header : '时间类型',
			width : 100,
			dataIndex : 'timeType'
		}, {
			header : '创建时间',
			width : 150,
			dataIndex : 'createTime'
		}, {
			header : '是否发布',
			width : 100,
			renderer : function(value, meta, record, cellmeta) {
				var data = record.data,
					sendCount = data.sendCount;
				switch(value) {
				case 'YF':
					value = "已发布";
					break;
				case 'DZYF':
					value = "订正已发";
					break;
				default:
					value = "未发布";
				}
				value = value+' | 局'+data.partSendCount+',全'+sendCount;
				return value;
			},
			dataIndex : 'status'
		}, {
			header : '短期站点数',
			width : 100,
			dataIndex : 'shortCount'
		},{
			header : '中期站点数',
			width: 100,
			dataIndex : 'mediumCount'
		}, {
			header : "操作",
			width : 150,
			sortable : true,
			renderer : function(value, meta, record, cellmeta) {
				var resultStr;
				resultStr = "<div class='controlBtn'>"
						+ "<a href='javascript:void("
						+ record.id
						+ ");' class='a' onclick='StationCodeForecast.showViewWindow()'>预览</a>&nbsp;&nbsp;&nbsp;&nbsp;"
				"</div>";
				return resultStr;
			}
		}],
		defaults: {
			sortable : false,
			menuDisabled : true
		}
	});	
	
	var dataPagingBar = new Ext.PagingToolbar({
		store : forecastListStore,
		displayInfo : true,
		displayMsg : '当前显示第 {0} - {1} 条记录，一共 {2} 条',
		emptyMsg : '没有数据!'
	});

	var dataGrid = new Ext.grid.GridPanel({
		store : forecastListStore,
		cm : dataColModel,
		border : true,
		split : true,
		sm : dataSelModel,
		columnLines: true,
		// tbar面板顶部工具条
		tbar : [ {
			text: '格点转站点',
			iconCls: 'icon-add',
			handler: buildForecast,
			tooltip: '格点生成站点预报'
		}, {
			text : '新增',
			iconCls : 'icon-add',
			handler : addForecast,
			hidden : true
		}, '-', {
			text : '查看',
			iconCls : 'icon-edit',
			handler : editForecast
		}, '-', {
			text : '删除',
			iconCls : 'icon-delete',
			hidden: true,
			handler : deleteForecast
		} /*
			 * , '-', { text : '订正', iconCls : 'icon-edit', href:
			 * 'http://www.baidu.com', target: '_new' //handler : fixForecast }
			 */
		],
		region : "center",
		// hight:'auto',
		loadMask : true,
		enableColumnMove : false,
		stripeRows : true,
		iconCls : 'grid-icon',
		// title:'菜单查询结果',
		bbar : dataPagingBar,
		listeners : {
			rowdblclick : function(grd, rowIndex, ev) {
				editForecast();
			}
		}
	});	
	
	function alertMsg(msgObj) {
		msgObj = Ext.apply({
			title: "提示:",
			buttons: Ext.Msg.OK
		}, msgObj);
		return Ext.Msg.show(msgObj);
	}
	function loadAjaxData(options) {
		Ext.apply(options, {
			method : 'POST',
			failure : function(response, options) {
				alertMsg({msg:"操作失败", icon:Ext.Msg.ERROR});
			}
		});
		Ext.Ajax.request(options);
	}
	// 设置天气现象下拉框
	var PhenomenaCombo = new Ext.form.ComboBox({
		fieldLabel : '天气现象',
		valueField : 'value',
		allowBlank : true,
		displayField : 'text',
		mode : 'local',
		width : 150,
		triggerAction : 'all',
		editable : true,
		selectOnFocus : false,
		forceSelection : true,
		listeners : { // 主要这里添加监听事件
			select : function(combo, record, index) {
			}
		},
		store : new Ext.data.SimpleStore({
			fields : [ 'value', 'text' ],
			// autoload:true,
			data : [],
			sortInfo : {
				field : 'value',
				dir : 'ASC'
			}
		})
	});
	function getPhenomenaData() {
		loadAjaxData({
			url : _BaseUrl+'/loadPhenomenaCodes',
			success : function(response, options) {
				var obj = Ext.decode(response.responseText);
				var data = [];
				for ( var v in obj) {
					data.push([ v, obj[v] ]);
				}
				PhenomenaCombo.store.loadData(data);// 给comboBox加载新得到的数据
			}
		});
	}
	// 设置风力下拉框
	var WindPowCombo = new Ext.form.ComboBox({
		fieldLabel : '风力',
		id : 'WindPowCombo',
		valueField : 'value',
		allowBlank : true,
		displayField : 'text',
		mode : 'local',
		width : 150,
		triggerAction : 'all',
		editable : true,
		selectOnFocus : false,
		forceSelection : true,
		listeners : { // 主要这里添加监听事件
			select : function(combo, record, index) {
			}
		},
		store : new Ext.data.SimpleStore({
			fields : [ 'value', 'text' ],
			data : []
		})
	});
	function getWindPowData() {
		loadAjaxData({
			url : _BaseUrl+'/loadWindPowCodes',
			success : function(response, options) {
				var obj = Ext.decode(response.responseText);
				var data = [];
				for ( var v in obj) {
					data.push([ v, obj[v] ]);
				}
				WindPowCombo.store.loadData(data);// 给comboBox加载新得到的数据
			}
		});
	}
	// 设置风向下拉框
	var WindDirCombo = new Ext.form.ComboBox({
		fieldLabel : '风向',
		id : 'WindDirCombo',
		valueField : 'value',
		allowBlank : true,
		displayField : 'text',
		mode : 'local',
		width : 150,
		triggerAction : 'all',
		editable : true,
		selectOnFocus : false,
		forceSelection : true,
		listeners : { // 主要这里添加监听事件
			select : function(combo, record, index) {
			}
		},
		store : new Ext.data.ArrayStore({
			fields : [ 'value', 'text' ],
			data : []
		})
	});
	function getWindDirData() {
		loadAjaxData({
			url : _BaseUrl+'/loadWindDirCodes',
			success : function(response, options) {
				var obj = Ext.decode(response.responseText);
				var data = [];
				for ( var v in obj) {
					data.push([ v, obj[v] ]);
				}
				WindDirCombo.store.loadData(data);// 给comboBox加载新得到的数据
			}
		});
	}
	//getPhenomenaData();
	//getWindPowData();
	//getWindDirData();

	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect : false
	});

	function _buildCodeFields(days) {
		days = days||7;
		var fields = [];
		for(var i=1;i<=days;i++) {
			fields.push({
				name: 'phenomena{DAY}From'.replace('{DAY}', i)
			}, {
				name: 'phenomena{DAY}To'.replace('{DAY}', i)
			}, {
				name: 'windDir{DAY}From'.replace('{DAY}', i)
			}, {
				name: 'windDir{DAY}To'.replace('{DAY}', i)
			}, {
				name: 'windPow{DAY}From'.replace('{DAY}', i)
			}, {
				name: 'windPow{DAY}To'.replace('{DAY}', i)
			}, {
				name: 'temp{DAY}From'.replace('{DAY}', i)
			}, {
				name: 'temp{DAY}To'.replace('{DAY}', i)
			});
		}
		return fields;
	}
	
	var codeFields = [ 'id', 
		'stationNo',
		'stationName'
	].concat(_buildCodeFields());
	var codeModel = Ext.data.Record.create(codeFields);
	var ForecastWriter = Ext.extend(Ext.data.JsonWriter, {
		forecast : null,
		encode : false,
		writeAllFields : true,
		render : function(params, baseParams, data) {
			var forecast = this.forecast;
			if (forecast) {
				if (!data.length) {
					data = [ data ];
				}
				// alert(data.length);
				forecast.codes = data;
				data = this.forecast;
				// alert(forecast.id+', '+forecast.createBy);
				var jdata = Ext.apply({}, baseParams);
				Ext.apply(jdata, forecast);
				params.jsonData = jdata;
				// alert(data);
			}
		}
	});
	Ext.MyJsonProxy = Ext.extend(Ext.data.HttpProxy, {
		onWrite : function(action, o, response, rs) {
			if (action === Ext.data.Api.actions.create) {
				var res = Ext.decode(response.responseText);
				if (res.success) {
					alertMsg({msg:res.message, icon:Ext.Msg.INFO});
					forecastDataStore.reload({
						params : {
							id : res.data
						}
					});
					forecastListStore.reload();
				}
			} else {
				return Ext.MyJsonProxy.superclass.onWrite.call(this, action, o,
						response, rs);
			}
		}
	});
	var forecastDataStore = new Ext.data.Store({
		proxy : new Ext.MyJsonProxy({
			api : {
				read : _BaseUrl+'/loadData',
				create : _BaseUrl+'/saveData',
				update : _BaseUrl+'/saveData'
			}
		}),
		listeners : {
			load : function(store, records, options) {
				var forecast = store.reader.jsonData.record;
				_fid = forecast.id;
				var timeType = forecast.timeType;
				var createTime = forecast.createTime;				
				createTime = createTime? createTime : new Date().format('Y-m-d H:i');				
				var values = {
					shortCreateBy: forecast.shortCreateBy,
					yubaoyuan : forecast.createBy,
					createTime: createTime,
					e_timeType : timeType
				};
				infoForm.getForm().reset();
				infoForm.getForm().setValues(values);
				loadSendTimeType();
			},
			write : function(proxy, action, result, res, rs) {
				if (res.raw.success) {
					alertMsg({msg:res.raw.message});
					forecastDataStore.reload({
						params : {
							id : res.raw.data
						}
					});
					forecastListStore.reload();
				}

			}
		},
		autoSave : false,
		reader : new Ext.data.JsonReader({
			root : 'codes',
			successProperty : 'success',
			totalProperty : ''
		}, codeModel),
		writer : new Ext.data.JsonWriter(),
		remoteSort : false
	});
	
	function _buildCodeGridColumns(days) {
		days = days||7;
		var columns = [];
		for(var i=1;i<=days;i++) {			
			var hour = i*24;
			var col = {
				header : '天气现象{H}小时'.replace('{H}', hour-12),
				width : 100,
				dataIndex : 'phenomena{DAY}From'.replace('{DAY}',i)		
			};
			if(_EnableEdit) {
				col.editor = PhenomenaCombo;
			}
			columns.push(col);
			col = {
				header : '天气现象{H}小时'.replace('{H}', hour),
				width : 100,
				dataIndex : 'phenomena{DAY}To'.replace('{DAY}',i)						
			};
			if(_EnableEdit) {
				col.editor = PhenomenaCombo;
			}
			columns.push(col);
			col = {
				header : '风向{H}小时'.replace('{H}', hour-12),
				width : 80,
				dataIndex : 'windDir{DAY}From'.replace('{DAY}', i)
			};
			if(_EnableEdit) {
				col.editor = WindDirCombo;
			}
			columns.push(col);
			col = {
				header : '风力{H}小时'.replace('{H}', hour-12),
				width : 80,
				dataIndex : 'windPow{DAY}From'.replace('{DAY}', i)
			};
			if(_EnableEdit) {
				col.editor = WindPowCombo;
			}
			columns.push(col);
			col = {
				header : '风向{H}小时'.replace('{H}', hour),
				width : 80,
				dataIndex : 'windDir{DAY}To'.replace('{DAY}', i)
			};
			if(_EnableEdit) {
				col.editor = WindDirCombo;
			}
			columns.push(col);
			col = {
				header : '风力{H}小时'.replace('{H}', hour),
				width : 80,
				dataIndex : 'windPow{DAY}To'.replace('{DAY}', i)
			};
			if(_EnableEdit) {
				col.editor = WindPowCombo;
			}
			columns.push(col);
			columns.push({
				header : '温度{H}小时'.replace('{H}', hour-12),
				width : 90,
//				editor : new Ext.grid.GridEditor(
//						new Ext.ux.form.SpinnerField({
//							minValue : -50,
//							maxValue : 50,
//							allowDecimals : true,
//							decimalPrecision : 1,
//							incrementValue : 1,
//							// alternateIncrementValue: 2.1,
//							accelerate : true
//						})),
				dataIndex : 'temp{DAY}From'.replace('{DAY}', i),
				renderer0: function(value, meta, record) {
					var resultStr = ["<div class='controlBtn'>", value, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
							"<a href='javascript:void(0);' class='a' onclick='StationCodeForecast.showTempWindow({H})'>选择</a>".replace('{H}', hour-12),
							"&nbsp;&nbsp;&nbsp;&nbsp;</div>"].join('');
					return resultStr;
				}
			}, {
				header : '温度{H}小时'.replace('{H}', hour),
				width : 90,
//				editor : new Ext.grid.GridEditor(
//						new Ext.ux.form.SpinnerField({
//							minValue : -50,
//							maxValue : 50,
//							allowDecimals : true,
//							decimalPrecision : 1,
//							incrementValue : 1,
//							// alternateIncrementValue: 2.1,
//							accelerate : true
//						})),
				dataIndex : 'temp{DAY}To'.replace('{DAY}', i),
				renderer0: function(value, meta, record) {
					var resultStr = ["<div class='controlBtn'>", value, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
							"<a href='javascript:void(0);' class='a' onclick='StationCodeForecast.showTempWindow({H})'>选择</a>".replace('{H}', hour),
							"&nbsp;&nbsp;&nbsp;&nbsp;</div>"].join('');
					return resultStr;
				}
			});
		}
		return columns;
	}

	// 列表
	var codeColModel = new Ext.grid.ColumnModel({
		columns : [new Ext.grid.RowNumberer(), {
			header : '站点号',
			width : 60,
			dataIndex : 'stationNo'
		}, {
			header : '站名',
			width : 80,
			dataIndex : 'stationName'
		}].concat(_buildCodeGridColumns()),
		defaults : {
			sortable : false,
			menuDisabled : true
		}
	});

	var pagingBartp = new Ext.PagingToolbar({
		store : forecastDataStore,
		displayInfo : true,
		displayMsg : '当前显示第 {0} - {1} 条记录，一共 {2} 条',
		emptyMsg : '没有数据!'
	});

	var codeGrid = new Ext.grid.EditorGridPanel({
		store : forecastDataStore,
		cm : codeColModel,
		columnLines: true,
		border : true,
		// tbar面板顶部工具条
		tbar : [ {
			text : '批量保存',
			iconCls : 'icon-save',
			handler : saveAllForecast,
			hidden: true
		}, {
			text: '预览指导预报',
			iconCls: 'icon-search',
			handler: previewZDRXYB
		}],
		region : "center",
		loadMask : true, // 遮罩效果
		sm : sm, // CheckboxSelectionModel多个复选框，singleSelect为false,可选多行
		enableColumnMove : false, // 列不可拖动
		stripeRows : true, // 显示行的分隔符
		clicksToEdit : 2, // 1为单击，2为双击
		iconCls : 'grid-icon', // 背景图片样式，用于面板头部图标
		listeners : {
			rowdblclick : function(grd, rowIndex, ev) {
			},
			cellclick : function(grid, rowIndex, columnIndex, e) {
			}
		}
	});
	
	function previewZDRXYB() {
		showPreviewWindow({
			url: _BaseUrl+'/viewZRYBText',
			sendUrl: _BaseUrl+'/publishZDRXYB',
			params: {
				fid: _fid,
				sendTimeType: _SendTimeType
			}
		});
	}

	function saveAllForecast() {
		if (infoForm.getForm().isValid()) {
			var reader = forecastDataStore.reader;
			var forecast = reader.jsonData.record;
			var forecastData = forecastDataStore.data.items;
			var datas = [];
			var hasModified = (forecastDataStore.getModifiedRecords().length > 0);
			for ( var i = 0; i < forecastData.length; i++) {
				var d = forecastData[i].data;
				if (!hasModified) {
					hasModified = !d.id;
				}
				datas.push(d);
			}
			if (!hasModified) {
				return;
			}
			forecast.codes = datas;
			Ext.Ajax.request({
				url : _BaseUrl+'/saveForecast',
				method : 'post',
				jsonData : forecast,
				success : function(response, options) {
					var res = Ext.decode(response.responseText);
					alertMsg({msg:res.message, icon:Ext.Msg.INFO});
					if (res.success) {
						forecastDataStore.reload({
							params : {
								id : res.data
							}
						});
						forecastListStore.reload();
					}
				},
				failure : function() {
					alert('数据保存失败!');
				}
			});
		}
	}
	// 定义查询 Form
	var infoForm = new Ext.FormPanel({
		// buttonAlign:'center',
		id : 'infoForm',
		frame : true,
		height : 35,
		collapsible : false,
		region : "north",
		// title:'查询条件:',
		border : false,
		bodyBorder : false,
		labelAlign : 'left',
		layout : 'column',
		labelWidth : 80,
		defaults: {
			padding: '0 0 0 5'
		},
		items : [{
			layout : 'form',
			autoWidth : true,
			items : {
				disabled: true,
				xtype : 'combo',
				fieldLabel : '短期预报员',
				name: 'shortCreateBy',
				valueField : 'value',
				allowBlank : true,
				displayField : 'text',
				mode : 'local',
				width : 120,
				emptyText : "请选择预报员",
				allowBlank : false,
				triggerAction : 'all',
				editable : true,
				selectOnFocus : false,
				forceSelection : true,
				listeners : { // 主要这里添加监听事件
					select : function(combo, record, index) {
						var reader = forecastDataStore.reader;
						var forecast = reader.jsonData.record;
						forecast.createBy = record.get('text');
					}
				},
				store : new Ext.data.SimpleStore({
					fields : [ 'value', 'text' ],
					// autoload:true,
					data : [ [ '马筛燕', '马筛燕' ], [ '马金仁', '马金仁' ],
							[ '邵建', '邵建' ], [ '闫军', '闫军' ],
							[ '辛尧胜', '辛尧胜' ], [ '赵蔚', '赵蔚' ],
							[ '刘迁迁', '刘迁迁' ], [ '贾宏元', '贾宏元' ],
							[ '陈豫英', '陈豫英' ], [ '裴晓蓉', '裴晓蓉' ],
							[ '孔维娜', '孔维娜' ], [ '陈晓娟', '陈晓娟' ],
							[ '陆晓静', '陆晓静' ], [ '穆建华', '穆建华' ],
							[ '赵光平', '赵光平' ], [ '丁永红', '丁永红' ],
							[ '周虎', '周虎' ], [ '纪晓玲', '纪晓玲' ],
							[ '刘梅', '刘梅' ], [ '郑鹏徽', '郑鹏徽' ] ]
				})
			}
		}, {	
			layout : 'form',
			autoWidth : true,
			items : {
				disabled: true,
				xtype : 'combo',
				fieldLabel : '中期预报员',
				id : 'yubaoyuan',
				valueField : 'value',
				allowBlank : true,
				displayField : 'text',
				mode : 'local',
				width : 120,
				emptyText : "请选择预报员",
				allowBlank : false,
				triggerAction : 'all',
				editable : true,
				selectOnFocus : false,
				forceSelection : true,
				listeners : { // 主要这里添加监听事件
					select : function(combo, record, index) {
						var reader = forecastDataStore.reader;
						var forecast = reader.jsonData.record;
						forecast.createBy = record.get('text');
					}
				},
				store : new Ext.data.SimpleStore({
					fields : [ 'value', 'text' ],
					// autoload:true,
					data : [ [ '马筛燕', '马筛燕' ], [ '马金仁', '马金仁' ],
							[ '邵建', '邵建' ], [ '闫军', '闫军' ],
							[ '辛尧胜', '辛尧胜' ], [ '赵蔚', '赵蔚' ],
							[ '刘迁迁', '刘迁迁' ], [ '贾宏元', '贾宏元' ],
							[ '陈豫英', '陈豫英' ], [ '裴晓蓉', '裴晓蓉' ],
							[ '孔维娜', '孔维娜' ], [ '陈晓娟', '陈晓娟' ],
							[ '陆晓静', '陆晓静' ], [ '穆建华', '穆建华' ],
							[ '赵光平', '赵光平' ], [ '丁永红', '丁永红' ],
							[ '周虎', '周虎' ], [ '纪晓玲', '纪晓玲' ],
							[ '刘梅', '刘梅' ], [ '郑鹏徽', '郑鹏徽' ] ]
				})
			}
		}, {
			layout : 'form',
			items : {
				fieldLabel : '制作时间',
				width: 120,
				name : 'createTime',
				xtype : 'textfield',
				disabled : true
			}
		}, {
			layout : 'form',
			autoWidth : true,
			items : {
				xtype: 'textfield',
				fieldLabel : '时间类型',
				width : 80,
				disabled : true
			}
		}, {
			layout : 'form',
			autoWidth : true,
			items : {
				xtype: 'textfield',
				fieldLabel : '发布时次',
				name: 'sendTimeType',
				id: 'sendTimeTypeField',
				width : 80,
				disabled : true
			}
		} ]
	});
	if(IS_TEST) {
		infoForm.add({
			xtype: 'combo',
			fieldLabel: '预报类型',
			displayField: 'text',
			mode: 'local',
			width : 80,
			triggerAction: 'all',
			store: new Ext.data.ArrayStore({
				fields: ['text'],
				data: [['短期'],['中期']]
			}),
			listeners: {
				select : function(combo, record, index) {
					var type = record.get('text');
					var termType = null;
					switch(type) {
					case '短期':
						termType = 72;
						break;
					case '中期':
						termType = 168;
						break;
					}
					forecastDataStore.load({
						params : {
							termType: termType 
						}
					});
				}
			}
		});
	}
	
	function buildForecast() {
		loadAjaxData({
			url: _ctxPath+'/forecast/gridToCodeForecast/buildForecast',
			success: function(resp) {
				var json = Ext.decode(resp.responseText);
				var msg = json.message||json.error;				
				if(json.success) {
					alertMsg({msg:msg, icon:Ext.Msg.INFO});
					return forecastListStore.reload();
				}
				alertMsg({msg:msg, icon:Ext.Msg.ERROR});
			}
		});
	}

	function addForecast() {
		cardPanel.layout.setActiveItem(TabPanel);
		TabPanel.setActiveTab(p_tp);
		infoForm.getForm().reset();
		forecastDataStore.load();
		var now = new Date(); // 创建Date对象
		var year = now.getFullYear(); // 获取年份
		var month = now.getMonth(); // 获取月份
		var date = now.getDate(); // 获取日期
		var day = now.getDay(); // 获取星期
		var hour = now.getHours(); // 获取小时
		var minute = now.getMinutes(); // 获取分钟
		var second = now.getSeconds(); // 获取秒钟
		createTime = year.toString() + "-" + month.toString() + "-"
				+ date.toString() + " " + hour.toString() + ":"
				+ minute.toString() + ":" + second.toString();
		// alert(createTime);
	}
	
	var _SendTimeType = null;
	function loadSendTimeType() {
		loadAjaxData({
			url: _BaseUrl+'/loadSendTimeType',
			disableCaching: true,
			callback: function(options, success, response ) {
				var val = response.responseText;
				_SendTimeType = val? val : null;				
				if(_SendTimeType==null) {
					return;
				}
				Ext.getCmp('sendTimeTypeField').setValue(_SendTimeType);
			}			
		});
	}
	loadSendTimeType();

	function editForecast() {
		var selModel = dataSelModel;
		if (!selModel.hasSelection()) {
			alertMsg({msg:"请选择要修改的记录!", icon:Ext.Msg.WARNING});
			return;
		}
		if (selModel.getSelections().length > 1) {
			alertMsg({msg:"请选择一条记录进行修改!", icon:Ext.Msg.WARNING});
			return;
		}
		cardPanel.layout.setActiveItem(TabPanel);
		TabPanel.setActiveTab(p_tp);
		forecastDataStore.load({
			params : {
				id : selModel.getSelected().get('id')
			}
		});
	}

	function deleteForecast() {
		if (!dataGrid.getSelectionModel().hasSelection()) {
			alertMsg({msg:"请选择要删除的记录!", icon:Ext.Msg.WARNING});
			return;
		}
		if (dataGrid.getSelectionModel().getSelections().length > 1) {
			alertMsg({msg:"请选择一条记录进行删除!", icon:Ext.Msg.WARNING});
			return;
		}
		Ext.Ajax.request({
			url : _BaseUrl+'/remove',
			params : {
				id : dataGrid.getSelectionModel().getSelected().get('id')
			},
			method : 'POST',
			success : function(response, options) {
				var obj = Ext.decode(response.responseText);
				if (obj.success) {
					alertMsg({msg:"数据删除成功！", icon:Ext.Msg.INFO});
					forecastListStore.reload();
				}

				// Ext.MessageBox.alert('成功', '从服务端获取结果: ' +
				// response.responseText);
			},
			failure : function(response, options) {
				alertMsg({msg:"操作失败!", icon:Ext.Msg.ERROR});
			}
		});
	}
	function fixForecast() {
		window.open("/weathersys/frame/guideforecast/fixCodeForecast");
	}
	// 预览电码
	var showPreviewWindow = StationCodeForecast.showViewWindow = function(options) {
		var rec = dataSelModel.getSelected();
		if(!rec) {
			alertMsg({msg:"请选择要预览的预报记录!", icon:Ext.Msg.WARNING});
			return;
		}
		var settings = Ext.apply({
			url : _BaseUrl+'/makeForecastText',
			params : {
				fid : rec.get('id'),
				sendTimeType: _SendTimeType
			},
			sendUrl : _BaseUrl+'/publish',
			success : function(res) {
				var text = res.responseText;
				Ext.getCmp('view').setValue(text);
				if(text.indexOf('error:')==0) {
					return;
				}
				viewWindow.publishBtn.show();
			},
			// 失败
			failure : function(res) {
				// var responseJson = Ext.decode(res.responseText);
				Ext.Msg.alert("提示:", "操作失败！");
			}
		}, options);
		if(viewWindow) {
			viewWindow.publishBtn.hide();
		}
		Ext.Ajax.request(settings);
		
		if (viewWindow == null) {
			var viewForm = new Ext.FormPanel({
				collapsible : false,
				frame : true,
				border : false,
				// bodyStyle: 'overflow-x:scroll; overflow-y:scroll',
				labelAlign : 'left',
				items : [ {
					layout : 'column',
					items : [ new Ext.form.TextArea({
						// disabled:'disabled',
						readOnly : true,
						// disabledClass:'backgroundColor:FFFFFF',
						// autoScroll
						// :"overflow-x：'scroll',overflow-y：'scroll'",
						// wrap:'off',
						// style:"word-wrap : normal",
						autoScroll : true,
						id : 'view',
						name : 'view',
						height : 320,
						width : 830,
						blankText : '此文件类型不可在页面直接查看',
						hideLabel : true
					}) ]
				} ]
			});
			viewWindow = new Ext.Window({
				width : 850,
				height : 400,
				shadow : true,
				closeAction : 'hide',
				modal : true,
				title : '指导预报电码预览',
				closable : false,
				minWidth : 810,
				minHeight : 400,
				buttons : [{
					text : '发布',
					ref: '../publishBtn',
					hidden: true,
					handler : function() {
						if(!_SendTimeType) {
							alertMsg({msg:"当前非预报发布时段!", icon:Ext.Msg.WARNING});
							return;
						}
						var rec = dataSelModel.getSelected();
						loadAjaxData({
							url: viewWindow.sendUrl,
							params: {
								fid: rec.get('id'),
								sendTimeType: _SendTimeType
							},
							success: function(res) {
								var obj = Ext.decode(res.responseText);
								var msg = obj.message||obj.error;
								if (obj.success) {
									alertMsg({msg:msg, icon:Ext.Msg.INFO});
									viewWindow.hide();
									forecastListStore.reload();
								} else {
									alertMsg({msg:msg, icon:Ext.Msg.ERROR});
								}
							}
						});
					}
				}, {
					text : '关闭',
					id : 'closebtn',
					handler : function() {
						viewWindow.hide();
					}
				}],
				items : [ viewForm ]
			});
		}
		var viewForm = viewWindow.getComponent(0);
		viewForm.getForm().reset();
		viewWindow.sendUrl = settings.sendUrl;
		viewWindow.show();
	}

	// 温度 弹窗
	var record3 = [ {
		name : 'stationNo',
		type : 'string'
	}, {
		name : 'centerForecast',
		type : 'string'
	}, {
		name : 'ecmos',
		type : 'string'

	}, {
		name : 'ecpp',
		type : 'string'
	}, {
		name : 'uk',
		type : 'string'
	}, {
		name : 'yahoo',
		type : 'string'
	}, {
		name : 'integration1',
		type : 'string'
	}, {
		name : 'integration2',
		type : 'string'
	}, {
		name : 'integration3',
		type : 'string'
	}, {
		name : 'wrf3km',
		type : 'string'
	}, {
		name : 'wrf9km',
		type : 'string'
	}, {
		name : 'wrfRuc',
		type : 'string'
	}, {
		name : 'ec2m',
		type : 'string'
	}, {
		name : 't369',
		type : 'string'
	}, {
		name : 'tempReal',
		type : 'string'
	}

	];

	var tpRecord3 = Ext.data.Record.create(record3);

	var forecastDataStore3 = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy(new Ext.data.Connection({
			timeout : 0,
			url : _ctxPath+'/forecast/getForecastTemp'
		})),
		reader : new Ext.data.JsonReader({
			root : 'data.arr',
			totalProperty : 'totalProperty'
		}, tpRecord3),

		remoteSort : false
	});

	// CM 用于温度弹出window
	var tpCm3 = new Ext.grid.ColumnModel(
			{
				columns : [
						// dataSelModel,
						{
							header : '站点号',
							width : 60,
							// hidden:true,
							dataIndex : 'stationNo'
						},
						{
							header : '实况温度',
							width : 60,
//							editor : new Ext.grid.GridEditor(
//									new Ext.ux.form.SpinnerField({
//										minValue : -50,
//										maxValue : 50,
//										allowDecimals : true,
//										decimalPrecision : 1,
//										incrementValue : 1,
//										// alternateIncrementValue: 2.1,
//										accelerate : true
//									})),
							// renderer :tempReal,
							dataIndex : 'tempReal'
						}

						,
						{
							header : '中央预报',
							width : 60,
							renderer : function(value, meta, rec, rowIdx,
									colIdx, ds) {
								if (value - rec.data.tempReal > 2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else if (value - rec.data.tempReal < -2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else {
									return "<span style='color:green;font-weight:bold;'>"
											+ value + "</span>";

								}
							},
							dataIndex : 'centerForecast'
						},
						{
							header : 'ECMOS',
							width : 60,
							renderer : function(value, meta, rec, rowIdx,
									colIdx, ds) {
								if (value - rec.data.tempReal > 2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else if (value - rec.data.tempReal < -2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else {
									return "<span style='color:green;font-weight:bold;'>"
											+ value + "</span>";

								}
							},
							dataIndex : 'ecmos'
						},
						{
							header : 'ECPP',
							width : 60,
							renderer : function(value, meta, rec, rowIdx,
									colIdx, ds) {
								if (value - rec.data.tempReal > 2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else if (value - rec.data.tempReal < -2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else {
									return "<span style='color:green;font-weight:bold;'>"
											+ value + "</span>";

								}
							},
							dataIndex : 'ecpp'
						},
						{
							header : 'UK',
							width : 60,
							renderer : function(value, meta, rec, rowIdx,
									colIdx, ds) {
								if (value - rec.data.tempReal > 2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else if (value - rec.data.tempReal < -2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else {
									return "<span style='color:green;font-weight:bold;'>"
											+ value + "</span>";

								}
							},
							dataIndex : 'uk'
						},
						{
							header : 'YAHOO',
							width : 60,
							renderer : function(value, meta, rec, rowIdx,
									colIdx, ds) {
								if (value - rec.data.tempReal > 2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else if (value - rec.data.tempReal < -2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else {
									return "<span style='color:green;font-weight:bold;'>"
											+ value + "</span>";

								}
							},
							dataIndex : 'yahoo'
						},
						{
							header : '集成温度1',
							width : 80,
							renderer : function(value, meta, rec, rowIdx,
									colIdx, ds) {
								if (value - rec.data.tempReal > 2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else if (value - rec.data.tempReal < -2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else {
									return "<span style='color:green;font-weight:bold;'>"
											+ value + "</span>";

								}
							},
							dataIndex : 'integration1'
						},
						{
							header : '集成温度2',
							width : 80,
							renderer : function(value, meta, rec, rowIdx,
									colIdx, ds) {
								if (value - rec.data.tempReal > 2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else if (value - rec.data.tempReal < -2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else {
									return "<span style='color:green;font-weight:bold;'>"
											+ value + "</span>";

								}
							},
							dataIndex : 'integration2'
						},
						{
							header : '集成温度3',
							width : 80,
							renderer : function(value, meta, rec, rowIdx,
									colIdx, ds) {
								if (value - rec.data.tempReal > 2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else if (value - rec.data.tempReal < -2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else {
									return "<span style='color:green;font-weight:bold;'>"
											+ value + "</span>";

								}
							},
							dataIndex : 'integration3'
						},
						{
							header : 'WRF3km',
							width : 60,
							renderer : function(value, meta, rec, rowIdx,
									colIdx, ds) {
								if (value - rec.data.tempReal > 2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else if (value - rec.data.tempReal < -2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else {
									return "<span style='color:green;font-weight:bold;'>"
											+ value + "</span>";

								}
							},
							dataIndex : 'wrf3km'
						},
						{
							header : 'WRF9km',
							width : 60,
							renderer : function(value, meta, rec, rowIdx,
									colIdx, ds) {
								if (value - rec.data.tempReal > 2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else if (value - rec.data.tempReal < -2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else {
									return "<span style='color:green;font-weight:bold;'>"
											+ value + "</span>";

								}
							},
							dataIndex : 'wrf9km'
						},
						{
							header : 'WRFRuc',
							width : 60,
							renderer : function(value, meta, rec, rowIdx,
									colIdx, ds) {
								if (value - rec.data.tempReal > 2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else if (value - rec.data.tempReal < -2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else {
									return "<span style='color:green;font-weight:bold;'>"
											+ value + "</span>";

								}
							},
							dataIndex : 'wrfRuc'
						},
						{
							header : 'EC2m',
							width : 60,
							renderer : function(value, meta, rec, rowIdx,
									colIdx, ds) {
								if (value - rec.data.tempReal > 2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else if (value - rec.data.tempReal < -2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else {
									return "<span style='color:green;font-weight:bold;'>"
											+ value + "</span>";

								}
							},
							dataIndex : 'ec2m'
						},
						{
							header : 'T369',
							width : 60,
							renderer : function(value, meta, rec, rowIdx,
									colIdx, ds) {
								if (value - rec.data.tempReal > 2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else if (value - rec.data.tempReal < -2) {
									return "<span style='color:red;font-weight:bold;'>"
											+ value + "</span>";
								} else {
									return "<span style='color:green;font-weight:bold;'>"
											+ value + "</span>";
								}
							},
							dataIndex : 't369'
						} ],
				defaults : {
					sortable : false,
					menuDisabled : true
				}
			});

	var pagingBartp3 = new Ext.PagingToolbar({
		store : forecastDataStore3,
		displayInfo : true,
		displayMsg : '当前显示第 {0} - {1} 条记录，一共 {2} 条',
		emptyMsg : '没有数据!'
	});

	var tpGrid3 = new Ext.grid.EditorGridPanel({
		store : forecastDataStore3,
		cm : tpCm3,
		border : true,
		split : true,
		// sm:dataSelModel,
		// tbar面板顶部工具条
		tbar : [ {
			text : '+1',
			iconCls : 'icon-add',
			handler : addTempReal
		}, '-', {
			text : '-1',
			iconCls : 'icon-delete',
			handler : subTempReal
		} ],
		region : "center",
		// hight:'auto',
		loadMask : true,
		enableColumnMove : false,
		stripeRows : true,
		iconCls : 'grid-icon',
		clicksToEdit : 2, // 1为单击，2为双击
		bbar : pagingBartp3,
		listeners : {
			rowdblclick : function(grd, rowIndex, ev) {

			}
		}
	});

	// 温度加1
	function addTempReal() {

		var tempVals = forecastDataStore3.data;
		var tempMap = {};
		for ( var i = 0; i < tempVals.length; i++) {
			var val = tempVals.get(i);
			var stationNo = val.get('stationNo');
			var temp = val.get('tempReal');
			var stationNo = val.get('stationNo');
			// tempMap[stationNo] = temp;
			if (temp == "") {
				Ext.Msg.alert("提示:", "站点号" + stationNo
						+ "实况温度为空，操作失败！请手动编辑此站点实况温度数据后再进行—1操作！");
				return;
			}
			var intTemp = parseInt(temp);
			val.set('tempReal', intTemp + 1);
		}
	}

	// 温度减一
	function subTempReal() {
		var tempVals = forecastDataStore3.data;
		var tempMap = {};
		for ( var i = 0; i < tempVals.length; i++) {
			var val = tempVals.get(i);
			var stationNo = val.get('stationNo');
			var temp = val.get('tempReal');
			var stationNo = val.get('stationNo');
			// tempMap[stationNo] = temp;
			if (temp == "") {
				Ext.Msg.alert("提示:", "站点号" + stationNo
						+ "实况温度为空，操作失败！请手动编辑此站点实况温度数据后再进行—1操作！");
				return;
			}
			var intTemp = parseInt(temp);
			val.set('tempReal', intTemp - 1);

		}

	}

	// 显示温度弹出框
	StationCodeForecast.showTempWindow = function(time) {
		// 全局变量，用于时间选择
		var stations = forecastDataStore.collect("stationNo");

		timetype = time;
		forecastDataStore3.load({
			params : {
				start : 0,
				limit : 20,
				timeSpan : time,
				createTime : createTime,
				stations : stations
			}
		});
		if (opSelectWindow_12 == null) {
			opSelectWindow_12 = new Ext.Window({ // 定义对话框
				width : 1050,
				height : 450,
				shadow : true,
				layout : 'border',
				title : '温度选择',
				closeAction : 'hide',
				modal : true,
				closable : true,
				minWidth : 500,
				minHeight : 500,
				buttons : [ {
					text : '选择',
					iconCls : 'icon-tick',
					handler : onOpSelect
				}, {
					text : '关闭',
					handler : function() {
						opSelectWindow_12.hide()
					}
				} ],
				items : [ tpGrid3 ]
			// 将定义的表单加到对话框里
			});
		}

		opSelectWindow_12.show();

	}

	// 选择按钮
	function onOpSelect() {

		var filedName;
		var value = timetype / 12;
		if (value == "1") {
			filedName = 'temp1From';
		} else if (value == "2") {
			filedName = 'temp1To';
		} else if (value == "3") {
			filedName = 'temp2From';
		} else if (value == "4") {
			filedName = 'temp2To';
		} else if (value == "5") {
			filedName = 'temp3From';
		} else if (value == "6") {
			filedName = 'temp3To';
		} else if (value == "7") {
			filedName = 'temp4From';
		} else if (value == "8") {
			filedName = 'temp4To';
		} else if (value == "9") {
			filedName = 'temp5From';
		} else if (value == "10") {
			filedName = 'temp5To';
		} else if (value == "11") {
			filedName = 'temp6From';
		} else if (value == "12") {
			filedName = 'temp6To';
		} else if (value == "13") {
			filedName = 'temp7From';
		} else if (value == "14") {
			filedName = 'temp7To';
		}
		var tempVals = forecastDataStore3.data;
		var tempMap = {};
		for ( var i = 0; i < tempVals.length; i++) {
			var val = tempVals.get(i);
			var stationNo = val.get('stationNo');
			var temp = val.get('tempReal');
			tempMap[stationNo] = temp;
		}
		var codeList = forecastDataStore.data;
		for ( var i = 0; i < codeList.length; i++) {
			var code = codeList.get(i);
			var stationNo = code.get('stationNo');
			var val = tempMap[stationNo];
			code.set(filedName, val);
		}
		opSelectWindow_12.hide();
	}

	// 清空按钮
	function onOpClear() {

	}

	var p_shortCode = new Ext.Panel({
		layout : 'border',
		border : false,
		title : '站点预报',
		split : true,
		items : [ dataGrid ],
		listeners : {
			activate : function(p) {
				p_tp.doLayout(true);
			}
		}
	});

	var p_tp = new Ext.Panel({
		layout : 'border',
		border : false,
		title : '预报编辑',
		split : true,
		items : [ infoForm, codeGrid ],
		listeners : {
			activate : function(p) {
				p_tp.doLayout(true);
			}
		}
	});

	var TabPanel = new Ext.TabPanel({
		region : 'center',
		activeTab : 0,
		border : true,
		items : [ p_shortCode, p_tp ]
	});

	var cardPanel = new Ext.Panel({
		border : false,
		layout : 'card',
		region : 'center',
		margins : "3 0 0 0",
		activeItem : 0,
		items : [ TabPanel ]
	});

	var innerPanel = new Ext.Panel({
		layout : 'border',
		border : false,
		split : true,
		title : '站点指导预报',
		iconCls : 'icon-plugin',
		items : [ cardPanel ]
	});

	var bigTabPanel = new Ext.TabPanel({
		region : 'center',
		activeTab : 0,
		border : false,
		plain : true,
		frame : false,
		items : [ innerPanel ]
	});

	function loadGrid(store) {
		store.load({
			params : {
				start : 0,
				limit : 30
			}
		});
	}

	Ext.onReady(function() {
		var viewport = new Ext.Viewport({
			layout : 'border',
			split : true,
			items : [ bigTabPanel ]
		});
		forecastListStore.load();
	});

}