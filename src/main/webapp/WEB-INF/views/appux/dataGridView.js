/**
 * DataGrid Class
 */
Ext.ns('Ext.ux.grid');
Ext.ux.DataGrid = Ext.extend(Ext.grid.GridPanel, {
	dataFields: ['id', 'name'],
	gridColumns: [{
		header : 'ID',
		dataIndex : 'id'
	}, {
		header: 'Name',
		dataIndex: 'name'
	}],	
	editFields: [{xtype:'textfield', name:'name', fieldLabel:'Name'}],
	editCfg: null,
	initComponent: function() {
		var me = this;
		var dataModel = Ext.data.Record.create(me.dataFields);
		me.pageSize = me.pageSize||20;
		var dataStore = new Ext.data.Store({
			autoLoad: me.autoLoad==false? false : true,
			baseParams: me.baseParams,
			proxy : new Ext.data.HttpProxy({
				url : me.dataUrl
			}),
			reader : new Ext.data.JsonReader({
				root : me.dataRoot||'rows'
			}, dataModel),
			remoteSort : false			
		});
		dataStore.on('exception', function(proxy, type, action, options, response, arg) {
			var actUrl = options.url||me.dataUrl;
			var title = '操作请求出错!';
			var msg = '操作请求出错：'+actUrl;
			if('read'==action) {
			   title = '加载数据出错!';
			   msg = '加载数据出错: '+actUrl;
			}
			return Ext.Msg.show({
			   title: title,
			   msg: msg,
			   icon: Ext.Msg.ERROR
			});			
		});
		// CheckboxSelectionModel多个复选框，singleSelect为false,可选多行
		var selModel = new Ext.grid.CheckboxSelectionModel({});
		var gridColumns = [selModel].concat(me.columns||me.gridColumns);
		Ext.apply(me, {
			enableColumnHide: false,
			enableColumnMove: false,
			columnLines: true,
			store : dataStore,
			selModel: selModel,
			columns: gridColumns,
			loadMask : true, // 遮罩效果
			stripeRows : true, // 显示行的分隔符
			iconCls : 'grid-icon', // 背景图片样式，用于面板头部图标
			bbar: {
				xtype: 'paging',
				store : dataStore,
				pageSize: me.pageSize,
				displayInfo : true,
				displayMsg : '当前显示第 {0} - {1} 条记录，一共 {2} 条',
				emptyMsg : '没有数据!'
			}, // 底部工具条
			listeners : {
				rowdblclick : function(grd, rowIndex, ev) {
					me.onEditData();
				}
			}			
		});
		if(me.tbar!==false) {
			// tbar面板顶部工具条
			me.tbar = [ {
				text : '增加',
				iconCls : 'icon-add',
				handler : function() {
					me.onAddData();
				}
			}, '-', {
				text : '修改',
				iconCls : 'icon-edit',
				handler : function() {
					me.onEditData();
				}
			}, '-', {
				text : '批量删除',
				iconCls : 'icon-delete',
				handler : function() {
					me.onDeleteData();
				}
			}];
		}
		me.superclass().initComponent.call(me);
	},
	onAddData: function() {
		var me = this;
		me.showDataWin();
	},
	// 显示连接的详细信息修改页面
	onEditData: function() {
		var me = this;
		var selModel = me.getSelectionModel();
		if (!selModel.hasSelection()) {
			Ext.Msg.alert("提示:", "请选择要修改的记录!");
			return;
		}
		if (selModel.getSelections().length > 1) {
			Ext.Msg.alert("提示:", "请选择一条记录进行修改!");
			return;
		}
		var record = me.getSelectionModel().getSelected();
		me.showDataWin(record);
	},
	onShowDataWin: Ext.emptyFn,
	// 显示增加、修改数据窗口
	showDataWin: function(record) {
		var me = this;
		var dataForm = me.getDataForm? me.getDataForm() : null;
		var dataWin = me.getDataWin? me.getDataWin() : null;
		var winCfg = me.editCfg;
		if (!dataWin) {
			winCfg = Ext.apply({
				xtype: 'window',
				closeAction : 'hide',
				modal : true,
				title : '编辑窗口',
				width: 600,
				height: 300
			}, winCfg);
			var winItems = winCfg.items;
			if(me.editFields) {
				var formCfg = {
					xtype : 'form',
					frame : true,
					labelAlign : 'left',
					region: 'north'
				};
				formCfg = Ext.apply(formCfg, {
					height: winCfg.formHeight,
					autoHeight: winCfg.formHeight? null : true,
					items : me.editFields
				});
				dataForm = Ext.create(formCfg);
				winItems = winItems? [dataForm].concat(winItems) : [dataForm];
			} else {
				winItems = [{xtype:'container'}].concat(winItems);
			}
			if(winItems.length>1) {
				winCfg.layout = 'fit';
				winItems = Ext.create({
					xtype: 'panel',
					layout : 'border',
					border : false,
					iconCls : 'icon-plugin',
					split : true,
					items: winItems
				});
			}
			var winBtns = dataForm? [{
				text : '保存',
				iconCls: 'icon-save',
				ref: '../saveBtn',
				handler : function() {
					if (!dataForm.getForm().isValid()) {
						return false;
					}
					me.saveData();
				}
			}] : [];
			winBtns.push({
				text : '关闭',
				iconCls: 'icon-close',
				handler : function() {
					dataWin.hide();
				}
			});
			if(winCfg.buttons) {				
				winBtns = winCfg.buttons.concat(winBtns);
			}
			winCfg = Ext.apply(winCfg, {
				buttons : winBtns,
				// 将定义的表单加到对话框里
				items : winItems				
			});
			dataWin = Ext.create(winCfg);
			me.getDataWin = function() {
				return dataWin;
			}
			me.getDataForm = function() {
				return dataForm;
			};
		}
		if(me.onShowDataWin(record)==false) {
			return false;
		}
		if(!winCfg.title) {
			dataWin.setTitle(record? "修改信息" : "增加信息");
		}
		dataWin.show();
		if(dataForm) {
			dataForm.getForm().reset();
		// Ext.getCmp("savebtn").setDisabled(true);
			if(record) {
				dataForm.getForm().loadRecord(record);
			}
			dataForm._editData = record;
		}
	},
	handleSaveData: Ext.emptyFn,
	saveData: function() {
		var me = this;
		var dataForm = me.getDataForm();
		var form = dataForm.getForm();
		if (form.isValid()) {
			var editData = dataForm._editData;
			var params = {};				
			if(editData) {
				params.id = editData.id;
			}
			var editCfg = me.editCfg;
			var saveUrl = editCfg.url||(me.dataUrl+'/save');
			var dataStore = me.getStore();
			var dataWin = me.getDataWin();
			var msgMask = new Ext.LoadMask(Ext.getBody(), {
				msg : '正在保存数据，请稍后！',
				removeMask : true
			// 完成后移除
			});
			msgMask.show();
			dataForm.getForm().submit({
				method : 'POST',
				url : saveUrl,
				params: params,
				// 成功时回调
				success : function(form, action) {
					// 获取响应的json结果
					var json = action.result||action.response;
					json = json.responseText? Ext.decode(json.responseText) : json;
					msgMask.hide();
					if(me.handleSaveData(json)==false) {
						return false;
					}
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
	},
	onDeleteData: function() {
		var me = this;
		var selModel = me.getSelectionModel();
		if (!selModel.hasSelection()) {
			Ext.Msg.alert("提示:", "请选择要删除的记录!");
			return;
		}
		var dataStore = me.getStore();
		Ext.Msg.confirm("提示:", "确定要删除这些记录?", function(btn) {
			if (btn == 'yes') {
				var ids = [];
				var selects = selModel.getSelections();
				for (var i = 0; i < selects.length; i++) {
					ids.push(selects[i].id);
				}
				var deleteUrl = me.deleteUrl||(me.dataUrl+'/delete');
				Ext.Ajax.request({
					method : 'POST',
					url : deleteUrl,
					params : {
						ids : ids
					},
					// 成功时回调
					success : function(response, options) {
						// 获取响应的json字符串
						var json = Ext.decode(response.responseText);
						if (json.success) {
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
});
Ext.reg('datagrid', Ext.ux.DataGrid);
/**
 * DataGridView Class
 */
Ext.ux.DataGridView = Ext.extend(Ext.Viewport, {
	layout: 'border',
	dataFields: ['id', 'name'],
	gridColumns: [{
		header : 'ID',
		dataIndex : 'id'
	}, {
		header: 'Name',
		dataIndex: 'name'
	}],
	searchCfg: null,
	searchFields: [{xtype:'textfield', name:'id', fieldLabel:'ID'}, {xtype:'textfield', name:'name', fieldLabel:'Name'}],		
	editCfg: null,
	dataUrl: null,
	initComponent: function() {
		var me = this;
		me.items = me.items||[];
		me.initGrid();
		me.initSearchForm();
		me.superclass().initComponent.call(me);
	},
	initGrid: function() {
		var me = this;
		me.pageSize = me.pageSize||20;
		var dataGrid = Ext.create({
			xtype: 'datagrid',			
			autoLoad: me.autoLoad,
			dataUrl: me.dataUrl,
			dataFields: me.dataFields,
			pageSize: me.pageSize,
			tbar: me.gridTbar,
			gridColumns: me.gridColumns,
			region : "center",
			iconCls : 'grid-icon', // 背景图片样式，用于面板头部图标
			editCfg: me.editCfg,
			editFields: me.editFields,
			onShowDataWin: me.onShowDataWin,
			handleSaveData: me.handleSaveData
		});
		me.dataGrid = dataGrid;
		me.items.push(dataGrid);		
	},
	initSearchForm: function() {
		var me = this;
		var searchForm = Ext.create({
			xtype: 'form',
			layout: 'column',
			items: [{
				xtype: 'container',
				layout: 'form',
				cls: 'x-form-inline',
				labelWidth: 60,
				defaultType: 'textfield',
				items: me.searchFields
			}, {
				width: 300,
				xtype: 'container',
				layout: 'hbox',
				defaults: {margins:'0 0 0 5'},
				defaultType: 'button',
				items: [{
					text: '查询',
					iconCls: 'icon-search',
					handler : function() {
						me.loadGrid();
					}
				}, {
					text: '重置',
					iconCls: 'icon-search',
					handler : function() {
						searchForm.getForm().reset();
						me.loadGrid();
					}
				}]
			}]
		});
		me.searchForm = searchForm;
		var searchCfg = Ext.apply({
			xtype: 'panel',
			title: '查询条件',
			region : "north",
			frame: true,
			collapsible : false,
			autoScroll: true,
			split : false
		}, me.searchCfg);
		var searchHeight = searchCfg.height;
		Ext.apply(searchCfg, {
			autoHeight: searchHeight? false : true,
			items: searchForm
		});
		me.items.push(searchCfg);		
		var dataGrid = me.dataGrid;
		var dataStore = dataGrid.getStore();
		dataStore.on('beforeload', function() {
			var params = searchForm.getForm().getValues();
			var fltParams = {};
			for(var n in params) {
				fltParams['flt_'+n] = params[n];
			}
			dataStore.baseParams = fltParams;
		});
	},
	loadGrid: function() {
		var dataGrid = this.dataGrid;
		var store = dataGrid.getStore();
		var pageSize = this.pageSize;
		store.load({
			params : {
				start : 0,
				limit : pageSize
			}
		});
	},
	getDataForm: function() {
		return this.dataGrid? this.dataGrid.getDataForm() : null;
	}
});
Ext.reg('datagridview', Ext.ux.DataGridView);
