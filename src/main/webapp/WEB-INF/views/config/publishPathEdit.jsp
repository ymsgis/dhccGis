<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="../include/include.inc.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>发布路径配置</title>
<link rel="stylesheet" href="${extPath}/resources/css/ext-lightblue.css" />
<link rel="stylesheet" href="${extPath}/css/ext.css" />
<script type="text/javascript" src="${extPath}/ext-base.js"></script>
<script type="text/javascript" src="${extPath}/ext-all.js"></script>
<script type="text/javascript" src="${extPath}/ext-lang-zh_CN.js"></script>
<script type="text/javascript">
var _ctxPath = '${contextPath}';
</script>
</head>

<body>
<script type="text/javascript">
(function() {
var grid = new Ext.grid.EditorGridPanel({
	ref: 'grid',
	xtype: 'grid',
	region: 'center',
	columnLines: true,
	loadMask : true,
	tbar: [/*{
		text: '添加',
		iconCls: 'icon-add',
		handler: function() {
			var grid = getGrid();
			var store = grid.getStore();
			var DataType = store.recordType;
			var rec = new DataType({
				name: 'Name:',
				key: 'Key',
				value: 'Value'
			});
            grid.stopEditing();
            store.insert(0, rec);
            grid.startEditing(0, 0);				
		}
	}, {
		text: '删除',
		iconCls: 'icon-del'
	},*/
	{
		text: '加载配置',
		iconCls: 'icon-info',
		handler: function() {
			var grid = getGrid();
			var store = grid.getStore();
			store.reload();
		}
	},'-', {
		text: '保存',
		iconCls: 'icon-save',
		handler: function() {
			var grid = getGrid();
			var store = grid.getStore();
			store.clearFilter();
			var recs = store.data.items;
			var modifieds = [];
			for(var i=0;i<recs.length;i++) {
				modifieds.push(recs[i]);
			}
			store.modified = modifieds;	
			store.save();
		}
	},'-'],
	bbar: new Ext.Toolbar({
		html: '配置修改'
	}),
	initComponent: function() {
		var me = this;
		var store = me.store;
		var url = _ctxPath+'/config/publishPathConfig';
		store = Ext.apply({
			xtype: 'store',
			autoLoad: true,
			autoSave: false,			
			reader: new Ext.data.JsonReader({
    			xtype: 'reader.json',
    			record: 'Config',
    			idProperty: 'name',
    			root: 'results',
    			messageProperty: 'message',
    			fields: [{name:'name',allowBlank:false}, {name:'key',allowBlank:false}, {name:'value',allowBlank:false},
    				 {name:'dataKey'},{name:'comment'}]
			}),
			writer: new Ext.data.JsonWriter({
				writeAllFields: true
			}),
			proxy: new Ext.data.HttpProxy({
	    		url: url+'/load',
	    		api: {
	    			create: url+'/save',
	    			update: url+'/save'
	    		}
			}),
			listeners: {
				write: function(store, action, result, res, rs) {
					var msg = result.message||'操作成功';
					var iconCls = 'false'!=(''+result.success)? Ext.MessageBox.INFO : Ext.MessageBox.ERROR;
			        Ext.Msg.show({msg: msg, icon: iconCls, buttons:Ext.MessageBox.OK});						
				},
				exception: function(proxy, type, action, options, result, arg) {
					var msg = result.message||result.error||'操作出错';
					Ext.Msg.show({title:'操作出错!',  msg:msg, icon:Ext.MessageBox.ERROR, buttons:Ext.MessageBox.OK});
				}
			}
		}, store);
		me.store = store;
		me.columns = [{
				header:'名称', dataIndex:'name', width:150
				//, editor:{xtype:'textfield', allowBlank:false}
			},{
				header:'键', dataIndex:'key', width:200
				//, editor:{xtype:'textfield', allowBlank:false}
			},{
				header:'数据Key', dataIndex:'dataKey', width: 200,
				editor:{xtype:'textfield'}
			},{
				header:'值', dataIndex:'value', width:500
				, editor:{xtype:'textfield', allowBlank:false}
			},{
				header:'备注', dataIndex:'comment', width:200
				, editor:{xtype:'textfield'}
			}
		];
		Ext.grid.GridPanel.prototype.initComponent.call(me);
	}		
});
var searchForm = Ext.create({		
	xtype: 'form',
	title: '发布路径配置',
	region: 'north',
	cls: 'x-form-inline',
	labelWidth: 'auto',
	height: 65,
	defaultType: 'textfield',
	frame: true,
	items: [{
		fieldLabel: '名称',
		name: 'name'
	}, {
		xtype: 'button',
		iconCls: 'icon-search',
		text: '搜索',
		handler: function() {
			searchForm.submit();			
		}
	}],
	submit: function() {
		var formValues = this.getForm().getValues();
		var matches = [];
		for(var p in formValues) {
			var mv = formValues[p];
			if(!mv && mv!==0) {
				continue;
			}
			matches.push(new RegExp('.*('+mv+').*'));
		}
		var store = grid.getStore();
		store.clearFilter();
		if(!matches.length) {
			return;
		}
		store.filterBy(function(rec, id) {			
			for(var i=0;i<matches.length;i++) {
				var expr = matches[i];
				var rv = rec.get(p);
				return expr.test(rv);
			}			
		});
	}
});
var viewport = Ext.create({
	xtype: 'viewport',
	layout: 'border',
	items: [searchForm, grid]
});
function getGrid() {
	return viewport.grid;
}
function loadConfig(options) {
	var main = viewport.main;
	var settings = Ext.applyIf(options, {
		useCache: false,
		success: function(resp) {
			main.getEl().unmask();
			var json = Ext.decode(resp.responseText);
			showResult(json);
		},
		failure: function(resp, error) {
			Ext.Msg.alert('Error', error);
		}
	});
	main.getEl().mask("载入中...");
	Ext.Ajax.request(settings);
}
function showResult(obj) {
	var main = viewport.main,
		cls = (obj.success==false)? 'failure' : 'success';
		msg = obj.message||obj;
	main.update('<b class="msg_'+cls+'">'+msg+'</b>');
}
})();
</script>
</body>
</html>