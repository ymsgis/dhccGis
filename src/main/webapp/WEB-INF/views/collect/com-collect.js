var AppMod = Ext.ns('nxgrid');
AppMod.CollectConnComboBase = {
	xtype: 'combo',
	triggerAction: 'all',
	valueField: 'code',
	displayField: 'name',	
	editable: false,
	width: 150,
	store: {
		xtype: 'jsonstore',
		autoDestroy: true,
		url: _ctxPath+'/collect/collectConnect/loadList',		
		fields: ['id','name'],
		autoLoad: true
	}
};