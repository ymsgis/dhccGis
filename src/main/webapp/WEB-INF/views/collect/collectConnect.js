Ext.onReady(function() {
	var pageSize = 20;
	var editData = null;
	var dataForm;
	var dataWin;
	var connUserFor = []; // 作用域
	var enCoding = []; // 默认编码
	var connConfigType = []; // ftp类型
	var myMask;

	// 获取编码下拉框数据
	function getComboBaseData() {
		Ext.Ajax.request({
			url : ctxPath + '/common/commonData/getBaseData',
			params : {
				types : [ 'enCoding', 'connectUserFor', 'connectType' ]
			},
			success : function(response, options) {
				var json = Ext.decode(response.responseText);
				enCoding = json.enCoding;
				connUserFor = json.connectUserFor;
				connConfigType = json.connectType;
				enCodingCombo.store.loadData(enCoding);
				typeCombo.store.loadData(connConfigType);
				fltUseForCombo.store.loadData(connUserFor);
				useForCombo.store.loadData(connUserFor);				
				// Ext.MessageBox.alert('成功', '从服务端获取结果: ' +
				// response.responseText);
			},
			failure : function(response, options) {
				var responseJson = Ext.util.JSON
						.decode(response.responseText);
				Ext.Msg.alert("提示:", "操作失败");
			}
		});
	}
	getComboBaseData();
	var enCodingCombo = new Ext.form.ComboBox({
		valueField : 'value',
		displayField : 'text',
		fieldLabel : '默认编码',
		mode : 'local',
		hiddenName : 'enCoding',
		selectOnFocus : true,
		editable : false,
		width : 120,
		allowBlank : true,
		triggerAction : 'all',
		forceSelection : true,
		emptyText : '请选择',
		store : new Ext.data.SimpleStore({
			fields : [ 'value', 'text' ],
			data : enCoding
		})
	});

	var fltUseForCombo = new Ext.form.ComboBox({
		fieldLabel : '作用域',
		hiddenName : 'EQ_I_useFor',
		allowBlank : true,
		displayField : 'text',
		mode : 'local',
		width : 120,
		triggerAction : 'all',
		selectOnFocus : true,
		forceSelection : true,
		valueField : 'value',
		emptyText : '请选择',
		store : new Ext.data.SimpleStore({
			fields : [ 'value', 'text' ],
			data : connUserFor
		})
	})
	var useForCombo = new Ext.form.ComboBox({
		valueField : 'value',
		displayField : 'text',
		fieldLabel : '作用域',
		mode : 'local',
		hiddenName : 'useFor',
		selectOnFocus : false,
		editable : false,
		width : 120,
		triggerAction : 'all',
		emptyText : '请选择',
		allowBlank : false,
		store : new Ext.data.SimpleStore({
			fields : [ 'value', 'text' ],
			data : connUserFor
		})

	})

	var typeCombo = new Ext.form.ComboBox({
		fieldLabel : '类型',
		hiddenName : 'type',
		displayField : 'text',
		mode : 'local',
		width : 120,
		triggerAction : 'all',
		selectOnFocus : true,
		forceSelection : true,
		editable : false,
		allowBlank : false,
		valueField : 'value',
		emptyText : '请选择',
		store : new Ext.data.SimpleStore({
			fields : [ 'value', 'text' ],
			data : connConfigType
		})
	})

	var selModel = new Ext.grid.CheckboxSelectionModel({
		singleSelect : false
	});
	var dataModel = Ext.data.Record.create([{
		name : 'id'
	}, {
		name : 'connName'
	}, {
		name : 'port'
	}, {
		name : 'remark'
	}, {
		name : 'url'
	}, {
		name : 'useFor'
	}, {
		name : 'userName'
	}, {
		name : 'password'
	}, {
		name : 'type'
	}, {
		name : 'enCoding'
	}]);

	var dataStore = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy(new Ext.data.Connection({
			timeout : 0,
			url : ctxPath + '/collect/collectConnect'
		})),
		reader : new Ext.data.JsonReader({
			root : 'rows'
		}, dataModel),
		remoteSort : false
	});

	dataStore.on('beforeload', function() {
		var params = searchForm.getForm().getValues();
		var fltParams = {};
		for(var n in params) {
			fltParams['flt_'+n] = params[n];
		}
		dataStore.baseParams = fltParams;
	});

	// 菜单查询列表
	var colModel = new Ext.grid.ColumnModel({
		columns : [ selModel, {
			header : '连接名称',
			width : 100,
			dataIndex : 'connName'
		}, {
			header : '连接地址',
			dataIndex : 'url'
		}, {
			header : '端口',
			dataIndex : 'port'
		}, {
			header : '类型',
			dataIndex : 'type',
			renderer : function(value) {
				if (value == "ftp") {
					return "连接";
				} else if (value == "share") {
					return "共享 文件连接";
				}
			}
		}, {
			header : '用户名',
			dataIndex : 'userName'
		}, {
			header : '作用域',
			dataIndex : 'useFor',
			renderer : function(value) {
				if (value == 1) {
					return "采集";
				} else {
					return "发布";
				}
			}
		}, {
			header : '默认编码',
			dataIndex : 'enCoding'
		} ],
		defaults : {
			sortable : false,
			menuDisabled : true
		}
	});

	var searchForm = new Ext.FormPanel({
		region : "north",
		buttonAlign : 'center',
		height : 65,
		id : 'searchForm',
		collapsible : false,
		frame : true,
		split : false,
		labelAlign : 'left',
		items : [ {
			layout : 'column',
			items : [ {
				columnWidth : .25,
				layout : 'form',
				labelWidth : 60,
				items : [ new Ext.form.TextField({
					fieldLabel : '连接名称',
					name : 'LIKE_connName',
					width : 120
				}), fltUseForCombo ]
			}, {
				columnWidth : .25,
				labelWidth : 60,
				layout : 'form',
				items : [ new Ext.form.TextField({
					fieldLabel : '连接地址',
					name : 'url',
					width : 120
				}), new Ext.form.TextField({
					fieldLabel : '用户名',
					name : 'userName',
					width : 120
				}) ]
			}, {
				columnWidth : .25,
				labelWidth : 60,
				layout : 'form',
				items : [ {
					html : '<br><br>'
				}, new Ext.Button({
					text : '查询',
					iconCls : 'icon-search',
					handler : function() {
						loadGrid(dataStore);
					}
				}) ]
			} ]

		} ]
	});

	var dataGrid = new Ext.grid.GridPanel({
		store : dataStore,
		cm : colModel,
		// tbar面板顶部工具条
		tbar : [ {
			text : '增加',
			iconCls : 'icon-add',
			handler : onAddData
		}, '-', {
			text : '修改',
			iconCls : 'icon-edit',
			handler : onEditData
		}, '-', {
			text : '批量删除',
			iconCls : 'icon-delete',
			handler : onDeleteData
		} ],
		region : "center",
		loadMask : true, // 遮罩效果
		selModel : selModel, // CheckboxSelectionModel多个复选框，singleSelect为false,可选多行
		enableColumnMove : false, // 列不可拖动
		stripeRows : true, // 显示行的分隔符
		iconCls : 'grid-icon', // 背景图片样式，用于面板头部图标
		bbar: {
			xtype: 'paging',
			store : dataStore,
			displayInfo : true,
			displayMsg : '当前显示第 {0} - {1} 条记录，一共 {2} 条',
			emptyMsg : '没有数据!'
		}, // 底部工具条
		listeners : {
			rowdblclick : function(grd, rowIndex, ev) {
				onEditData();
			}
		}
	});

	// 连接名称验证
	function checkConnNameUsable() {
		var field = dataForm.getForm().findField('connName');
		var connName = field.getValue();
		if (connName == "" || connName == null) {
			return;
		}
		var sel = dataGrid.getSelectionModel().getSelected();
		if (field.getValue() == (sel&&sel.get('connName'))) {
			return;
		}
		Ext.Ajax.request({
			method : 'POST',
			url : ctxPath + '/collect/collectConnect/checkExists',
			params : {
				connName : connName
			},
			success : function(response, options) {
				var json = Ext.decode(response.responseText);
				if (json || json.data) {
					Ext.Msg.alert("提示:", "连接名称： " + connName
							+ " 已经存在,请输入其它连接名");
				}
			},
			failure : function(response, options) {
				var responseJson = Ext.decode(response.responseText);
				Ext.Msg.alert("提示:", "操作失败！", responseJson.errors);
			}
		});
	}

	// 增加连接数据保存
	function onAddData() {
		showDataWin();
		dataWin.setTitle("增加连接");
		dataForm.getForm().reset();
		editData = null;
		// Ext.getCmp("savebtn").setDisabled(true);
	}

	// 显示连接的详细信息修改页面
	function onEditData() {
		var selModel = dataGrid.getSelectionModel();
		if (!selModel.hasSelection()) {
			Ext.Msg.alert("提示:", "请选择要修改的记录!");
			return;
		}
		if (selModel.getSelections().length > 1) {
			Ext.Msg.alert("提示:", "请选择一条记录进行修改!");
			return;
		}
		var record = dataGrid.getSelectionModel().getSelected();
		showDataWin();
		dataWin.setTitle("修改连接信息");
		dataForm.getForm().reset();
		// Ext.getCmp("savebtn").setDisabled(true);
		dataForm.getForm().loadRecord(record);
		editData = record;
	}

	// 显示增加、修改数据窗口
	function showDataWin() {
		if (dataWin == null) {
			dataForm = Ext.create({
				xtype : 'form',
				height : 450,
				collapsible : false,
				frame : true,
				border : false,
				labelAlign : 'left',
				items : [ {
					layout : 'column',
					items : [{
						columnWidth : .5,
						layout : 'form',
						labelWidth : 60,
						items : [{
							xtype: 'textfield',
							fieldLabel : '连接名称',
							name : 'connName',
							width : 120,
							allowBlank : false,
							listeners : {
								blur : function(field) {
									if (field.getValue() != "") {
										checkConnNameUsable();
									}
								}
							}									
						}, useForCombo ]
					}, {
								columnWidth : .5,
								labelWidth : 60,
								layout : 'form',
								items : [
										new Ext.form.NumberField(
												{
													fieldLabel : '端口',
													name : 'port',
													width : 120
												}),
										new Ext.form.TextField(
												{
													fieldLabel : '连接地址',
													name : 'url',
													width : 120,
													allowBlank : false
												}) ]
							},
							{
								columnWidth : .5,
								labelWidth : 60,
								layout : 'form',
								items : [
										new Ext.form.TextField(
												{
													fieldLabel : '用户名',
													name : 'userName',
													width : 120
												}),
										new Ext.form.TextField(
												{
													fieldLabel : '密码',
													inputType : 'password',
													name : 'password',
													width : 120
												}) ]
							},
							{
								columnWidth : .5,
								labelWidth : 60,
								layout : 'form',
								items : [ enCodingCombo,
										typeCombo ]
							},
							{
								columnWidth : 1.0,
								labelWidth : 60,
								layout : 'form',
								items : [ new Ext.form.TextArea(
										{
											fieldLabel : '备注',
											name : 'remark',
											width : 335,
											height : 50,
											allowBlank : true
										}) ]
							} ]
				} ]
			});

			dataWin = new Ext.Window({
				width : 460,
				height : 235,
				shadow : true,
				closable : true,
				closeAction : 'hide',
				modal : true,
				title : '连接增加',
				closable : false,
				minWidth : 500,
				minHeight : 185,
				buttons : [{
					text : '连接测试',
					id : 'testbtn',
					handler : function() {
						myMask = new Ext.LoadMask(Ext.getBody(), {
							msg : '正在测试连接，请稍后！',
							removeMask : true
						// 完成后移除
						});
						if (dataForm.getForm().isValid()) {
							myMask.show();
						}
						checkCollectUsable();
					}
				}, {
					text : '保存',
					id : 'savebtn',
					// disabled:'disabled',
					handler : function() {
						myMask = new Ext.LoadMask(Ext.getBody(), {
							msg : '正在保存数据，请稍后！',
							removeMask : true
						// 完成后移除
						});
						if (dataForm.getForm().isValid()) {
							myMask.show();
						}
						checkCollectUsable(true);
					}
				}, {
					text : '关闭',
					id : 'closebtn',
					handler : function() {
						dataWin.hide();
					}
				} ],
				items : [ dataForm ]
			// 将定义的表单加到对话框里
			});
		}
		dataWin.show();
		dataForm.getForm().reset();

	}

	// 连接保存验证
	function checkCollectUsable(isSave) {
		if (dataForm.getForm().isValid()) {
			var params = dataForm.getForm().getValues();
			Ext.Ajax.request({
				method : 'POST',
				timeout : 0,
				url : ctxPath + '/collect/collectConnect/testConn',
				params : params,
				success : function(response, options) {
					var json = Ext.decode(response.responseText);
					myMask.hide();
					if (json.success) {
						if (isSave) {
							onSaveData();
						} else {
							Ext.Msg.alert("提示:", "此连接可用");
						}
					} else {
						Ext.Msg.alert("提示:",
								"此连接不可用,请检查用户名、密码、端口或连接地址是否输入正确");
					}
				},
				failure : function(response, options) {
					var responseJson = Ext.decode(response.responseText);
					myMask.hide();
					Ext.Msg.alert("提示:", "操作失败！", responseJson.errors);
				}
			});
		}
	}

	function loadGrid(store) {
		store.load({
			params : {
				start : 0,
				limit : pageSize
			}
		});
	}

	// 删除连接
	function onDeleteData() {
		var selModel = dataGrid.getSelectionModel();
		if (!selModel.hasSelection()) {
			Ext.Msg.alert("提示:", "请选择要删除的记录!");
			return;
		}
		Ext.Msg.confirm("提示:", "确定要删除此连接?", function(btn) {
			if (btn == 'yes') {
				var ids = [];
				var selects = selModel.getSelections();
				for (var i = 0; i < selects.length; i++) {
					ids.push(selects[i].get("id"));
				}
				Ext.Ajax.request({
					method : 'POST',
					url : ctxPath + '/collect/collectConnect/delete',
					params : {
						ids : ids
					},
					// 成功时回调
					success : function(response, options) {
						// 获取响应的json字符串
						var ftpjson = Ext.decode(response.responseText);
						if (ftpjson.success) {
							Ext.Msg.alert('提示', '删除成功！');
							dataStore.reload();
						} else {
							Ext.Msg.alert("提示：", "删除失败！");
						}
					},
					// 失败
					failure : function(response, options) {
						var responseJson = Ext.decode(response.responseText);
						Ext.Msg.alert("提示:", "操作失败！",
								responseJson.errors);
					}
				});
			}
		});
	}

	// 增加连接保存
	function onSaveData() {
		var form = dataForm.getForm();
		if (form.isValid()) {
			var params = {};				
			if(editData) {
				params.id = editData.id;
			}
			dataForm.getForm().submit({
				method : 'POST',
				url : ctxPath + '/collect/collectConnect/save',
				params: params,
				// 成功时回调
				success : function(form, action) {
					// 获取响应的json结果
					var json = action.result||action.response;
					json = json.responseText? Ext.decode(json.responseText) : json;
					if (json.success) {
						Ext.Msg.alert('恭喜', '保存成功！');
						dataWin.hide();
						dataStore.reload();
					} else {
						Ext.Msg.alert("提示：", "保存失败！");
					}
				},
				// 失败
				failure : function(response, options) {
					var responseJson = Ext.decode(response.responseText);
					Ext.Msg.alert("提示:", "操作失败！",
							responseJson.errors);
				}
			});
		}
	}

	Ext.create({
		xtype : 'viewport',
		layout : 'fit',
		items : {
			xtype : 'tabpanel',
			region : 'center',
			activeTab : 0,
			items : [ {
				xtype : 'panel',
				layout : 'border',
				title : '连接管理',
				iconCls : 'icon-plugin',
				layout : 'border',
				title : '查询条件',
				items : [ searchForm, dataGrid ]
			} ]
		}
	});

	loadGrid(dataStore);
});