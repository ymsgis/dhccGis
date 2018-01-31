Ext.onReady(function() {
	var pageSize = 20;
	var editData = null;
    var ConnEncoding = []; //编码方式
    var CleanStrategy = []; //保存时间
    var RenameStrategy = []; //重命名
    var ParseType = []; //解析类型
    var SourceType = []; //数源类型
    var TimeType = []; //数据时效
    var CollectType = []; //采集类型
    var DataType = []; //数据类别
    var ConnUserFor = []; //作用域
    var CollectConn = []; //FTP配置
    var SourceType = []; //源类型
    var CollectStatus = []; //采集运行状态
    var TaskStatus = []; //任务时间配置状态
    var ConnConfig = [];
    var collectId = null;
	var winMask;

	var enCodingCombo = Ext.create({
		xtype: 'combo',
		valueField : 'value',
		displayField : 'text',
		fieldLabel : '默认编码',
		mode : 'local',
		hiddenName:'dataEncoding',
		selectOnFocus : true,
		editable : false,
		resizable :false,
		width : 150,
		allowBlank : true,
		triggerAction : 'all',
		forceSelection : true,
		emptyText:'请选择',
		store :  new Ext.data.SimpleStore( {
			fields : ['value', 'text'],
			data : ConnEncoding
		})
	});
	var useForCombo = Ext.create({
		xtype: 'combo',
		valueField : 'value',
		displayField : 'text',
		fieldLabel : '作用域',				
		mode : 'local',
		hiddenName:'useFor',
		selectOnFocus : false,
		editable : false,
		resizable :true,
		width : 150,
		allowBlank : true,
		triggerAction : 'all',
		emptyText:'请选择',
		store :  new Ext.data.SimpleStore({
			fields : ['value', 'text'],
			data : ConnUserFor
		})
	});			
	var collectTypeCombo = Ext.create({
		xtype: 'combo',
		fieldLabel: '采集类型',
        hiddenName: 'getherType',
        valueField : 'value',				
        allowBlank : true,
        displayField : 'text',
		mode : 'local',
		width:180,
		triggerAction : 'all',
		editable:false,
		selectOnFocus : false,
		forceSelection : true,
		listeners : {  //主要这里添加监听事件     
		    select : function(combo, record, index) {  
		    	if( combo.getValue()=="localFile"){
		    		//   alert("关闭FTP配置");
		    		Ext.getCmp("ConnConfigPanel").hide();     
		    	} else {
		    		//   alert("关闭FTP配置");
		    		Ext.getCmp("ConnConfigPanel").show();
		    	}
		    }
		},
		store: new Ext.data.SimpleStore({
					fields : ['value', 'text'],
					data :CollectType
				}) 
	});
	var collectConnCombo = Ext.create({
		xtype: 'combo',
        hiddenName: 'configId',
        valueField : 'id',				
        allowBlank : false,
        displayField : 'connName',
		mode : 'local',
		width:180,
		triggerAction : 'all',
		editable: false,
		selectOnFocus : false,
		forceSelection : true,
		store :  new Ext.data.JsonStore( {
			fields : ['id', 'connName'],
			data : CollectConn
		})
	});
    //获取连接配置下拉框数据
    function getCollectConnList(){       
        Ext.Ajax.request({
                url: _ctxPath+'/collect/collectConnect/loadList',               
                params: {},
                method: 'POST',
                success:  function (response, options) {                                  
                    var json =  Ext.decode(response.responseText);
                    CollectConn = json;
                    collectConnCombo.store.loadData(CollectConn);
				   //    Ext.MessageBox.alert('成功', '从服务端获取结果: ' +response.responseText);				                         
                },
                failure: function (response, options) {
                   var responseJson =  Ext.decode(response.responseText);
						Ext.Msg.alert("提示:", "操作失败");
                }
            });	  
    }
    getCollectConnList();			
	var downFileNameCombo =	Ext.create({
		xtype: 'combo',
		fieldLabel: '',
        hiddenName: 'downFileName',
        valueField : 'value',				
        allowBlank : true,
        displayField : 'text',
		mode : 'local',
		width:100,
		triggerAction : 'all',
		editable:false,
		selectOnFocus : true,
		forceSelection : false,
	  //  onSelect:function(){alert("2")},
		listeners : {  //主要这里添加监听事件     
		    select : function(combo, record, index) { 
		         valueShow();
		         //var endValue= Ext.getCmp("addAndEdit_downFileName").getValue()+Ext.getCmp("addAndEdit_downFileNameCombo").getValue()
		         //Ext.getCmp("addAndEdit_downFileName").setValue(endValue);  
		   },
		   change:  function(combo, record, index) {
		        //   valueChange();				         
		        //  Ext.getCmp("addAndEdit_downFileName").clearValue(); 
		       //   alert("值改变")
		       //   Ext.getCmp("addAndEdit_downFileName").setValue(endValue);				   
		   }
		},
		store: new Ext.data.SimpleStore( {
					fields : ['value', 'text'],
					data : [['{YYMMDDHHmmSS}','{YYMMDDHHmmSS}'],['{YYMMDD}','{YYMMDD}'],['{MMDD}','{MMDD}']]
				}) 
	});
	var renameStrategyCombo = Ext.create({
		xtype: 'combo',
		fieldLabel: '重命名策略',
		hiddenName: 'renameStrategy',
		valueField : 'value',				
		allowBlank : true,
		displayField : 'text',
		mode : 'local',
		width:180,
		triggerAction : 'all',
		editable:false,
		selectOnFocus : false,
		forceSelection : true,
		store :  new Ext.data.SimpleStore( {
					fields : ['value', 'text'],
					data : RenameStrategy
				}) 
	});
	var cleanStrategyCombo = Ext.create({
		xtype: 'combo',
		fieldLabel: '保留期限',
        hiddenName: 'cleanStrategy',
        valueField : 'value',				
        allowBlank : true,
        displayField : 'text',
		mode : 'local',
		width:180,
		triggerAction : 'all',
		editable:false,
		selectOnFocus : false,
		forceSelection : true,
		store :  new Ext.data.SimpleStore( {
					fields : ['value', 'text'],
					data : CleanStrategy
				}) 
	});
	var timeTypeCombo = Ext.create({
		xtype: 'combo',
		fieldLabel: '数据时效',
		hiddenName: 'dataTimeType',
		valueField : 'value',				
		allowBlank : true,
		displayField : 'text',
		mode : 'local',
		width:180,
		triggerAction : 'all',
		editable:false,
		selectOnFocus : false,
		forceSelection : true,
		store :  new Ext.data.SimpleStore({
				fields : ['value', 'text'],
				data : TimeType
			}) 
	});
	var dataSourceTypeCombo = Ext.create({
		xtype: 'combo',
		fieldLabel: '源数类型',
        hiddenName: 'dataSourceType',
        valueField : 'value',				
        allowBlank : true,
        displayField : 'text',
		mode : 'local',
		width:180,
		triggerAction : 'all',
		editable:false,
		selectOnFocus : false,
		forceSelection : true,
		listeners : {  //主要这里添加监听事件     
			select : function(combo, record, index) {
				var sourceType= combo.getValue();
				getDataType(sourceType);  
			}
		},
		store :  new Ext.data.SimpleStore( {
				fields : ['value', 'text'],
				data : SourceType
			}) 
	});
	var dataTypeCombo = Ext.create({						
		xtype: 'combo',
		fieldLabel: '数据类别',
        hiddenName: 'dataType',
        valueField : 'value',				
        allowBlank : true,
        displayField : 'text',
		mode : 'local',
		width:180,
		triggerAction : 'all',
		editable:false,
		selectOnFocus : false,
		forceSelection : true,
		store :  new Ext.data.SimpleStore( {
					fields : ['value', 'text'],
					data : DataType
				}) 
	});
	var parseTypeCombo = Ext.create({
		xtype: 'combo',
		fieldLabel: '解析类型',
        hiddenName: 'needParse',
        valueField : 'value',				
        allowBlank : true,
        displayField : 'text',
		mode : 'local',
		width:180,
		triggerAction : 'all',
		editable:false,
		selectOnFocus : false,
		forceSelection : true,
		store :  new Ext.data.SimpleStore( {
					fields : ['value', 'text'],
					data : ParseType
				}) 
	});
	// 获取编码下拉框数据
	function getComboBaseData() {
		Ext.Ajax.request({
			url : _ctxPath + '/common/commonData/getBaseData',
			params : {
				types : [ 'enCoding', 'taskStatus', 'collectStatus', 'connectUserFor', 'collectType', 'timeType', 
				          'sourceType', 'dataType', 'parseType', 'reNameStrategy', 'cleanStrategy' ]
			},
			success : function(response, options) {
				var json = Ext.decode(response.responseText);			
				ConnEncoding = json.enCoding;
				RenameStrategy = json.reNameStrategy;
				ParseType = json.parseType;
				SourceType = json.sourceType;
				DataType = json.dataType;
				TimeType = json.timeType;
				CollectType = json.collectType;
				CleanStrategy = json.cleanStrategy;
				ConnUserFor = json.connectUserFor;
				CollectStatus = json.collectStatus;
				TaskStatus = json.taskStatus;
				CollectType = json.collectType;
                viewport.loadGrid();
				enCodingCombo.store.loadData(ConnEncoding);
//						fltUseForCombo.store.loadData(ConnUserFor);
				useForCombo.store.loadData(ConnUserFor);
				collectTypeCombo.store.loadData(CollectType);
				renameStrategyCombo.store.loadData(RenameStrategy);
				cleanStrategyCombo.store.loadData(CleanStrategy);
				timeTypeCombo.store.loadData(TimeType);
				dataSourceTypeCombo.store.loadData(SourceType);
				parseTypeCombo.store.loadData(ParseType);
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
       //获取数据类别下拉框数据
    function getDataType(sourceType){
    	Ext.Ajax.request({
		    url: _ctxPath+'/common/commonData/getDataType',               
		    params: {sourceType:sourceType},
		    method: 'POST',
		    success:  function (response, options) {                                  
		        var json =  Ext.decode(response.responseText);
		        dataTypeCombo.store.loadData(json);
		    },
		    failure: function (response, options) {
		       var json =  Ext.decode(response.responseText);
		       Ext.Msg.alert("提示:", "操作失败");
		    }
		});	
    }
	getComboBaseData();
	// 保留期限 renderer	
	function rendererCleanStrategy(value){
		   for(var i=0;i<CleanStrategy.length;i++){
		    if(CleanStrategy[i][0]==value)
		      return CleanStrategy[i][1];
		    }
		
	}
    // 数据类型管理
    function rendererDataType(value){
		   for(var i=0;i<DataType.length;i++){
		    if( DataType[i][0]==value)
		      return  DataType[i][1];
		    }
		return "未知";
    }
    // 数据源类型管理
    function rendererSourceType(value){
		   for(var i=0;i<SourceType.length;i++){
		    if( SourceType[i][0]==value)
		      return  SourceType[i][1];
		    }
		return "未知";
    }		    
    // collect运行状态 renderer
    function rendererCollectStatus(value){
		   for(var i=0;i<CollectStatus.length;i++){
		    if(CollectStatus[i][0]==value)
		      return CollectStatus[i][1];
		    }
		return "未知";
    }
    // task运行状态 renderer
    function rendererTaskStatus(value){
		   for(var i=0;i<TaskStatus.length;i++){
		    if(TaskStatus[i][0]==value)
		      return TaskStatus[i][1];
		    }
		return "未知";
    }
    	
	 //CM用于展示中文名称 解析类型
    function rendererParseType(value) {
    	for(var i=0;i<ParseType.length;i++){
    		if(ParseType[i][0]==value)
    			return ParseType[i][1];
    	}
    }
    //用于修改面板
    var timeConfigGrid = Ext.create({
    	xtype: 'datagrid',
    	dataUrl: _ctxPath+'/collect/collectTask',
    	baseParams: { flt_EQ_L_collectId : collectId},
    	autoLoad: false,
    	dataFields: [
			{name : 'taskId',type : 'string'}, 
			{name : 'taskName',type : 'string'},
			{name : 'downFiles',type : 'string'}, 
			{name : 'yearExpress',type : 'string'},
			{name : 'monthExpress',type : 'string'},
			{name : 'weekExpress',type : 'string'}, 
			{name : 'dayExpress',type : 'string'},
			{name : 'hourExpress',type : 'string'},
			{name : 'minuteExpress',type : 'string'}, 
			{name : 'startTime',type : 'string'},
			{name : 'endTime',type : 'string'},
			{name : 'remark',type : 'string'},
			{name : 'status',type : 'string'}		
		],
        gridColumns: [{
			header:'序号',
			width:50,
			hidden:true,
			dataIndex : 'id'
		}, {
			header:'采集任务',
			hidden:true,
			dataIndex: 'collectId'
		}, {
			header:'任务名',
			width:100,
			dataIndex : 'taskName'
		}, {
			header : '操作',
			width:150,
			renderer:function(value,meta,record){
				var btns = ["<div class='controlBtn'>"];
				var rid = record.id;
				var status = record.get('status');
				switch(status) {
				case 'started':
					btns.push("<a href='javascript:void(0);' class='btn-act'  onclick='stopCollect(_RID_, \"task\")'>停止</a>&nbsp;&nbsp;&nbsp;&nbsp;");
					break;
				default:
					btns.push("<a href='javascript:void(0);' class='btn-act' onclick='startCollect(_RID_, \"task\")'>启动</a>&nbsp;&nbsp;&nbsp;&nbsp;");
				}
	               //   "<a href='javascript:void("+record.get('id')+");' class='btn-act' onclick='onDelete()'>删除</a>&nbsp;&nbsp;&nbsp;&nbsp;" +  
	              //      "<a href='javascript:void("+record.get('id')+");' class='btn-act'onclick='onClickQuery_add()'>详情</a>&nbsp;&nbsp;&nbsp;&nbsp;" + 
	             //       "<a href='javascript:void("+record.get('id')+");' class='btn-act' onclick='collectRecord()' >采集记录</a>&nbsp;&nbsp;&nbsp;&nbsp;" +  
				btns.push("</div>");  
                return btns.join('').replace(/_RID_/g, rid);  
              } 
		}, {
			header : '文件名',
			width:240,
			renderer:function(value){
			   var s=""+value;
			   return value;  
			
			},
			dataIndex:'downFiles'
		}, {
			header : '年',
			dataIndex:'yearExpress',
			width:40
		}, {
			header : '月',
			width:40,
			
			dataIndex:'monthExpress'
		}, {
			header : '周',
			width:40,
			hidden:true,
			dataIndex:'weekExpress'
		}, {
			header : '日',
			width:40,
			dataIndex:'dayExpress'
		}, {
			header : '时',
			width:40,
			dataIndex:'hourExpress'
		}, {
			header : '分',
			width:40,
			dataIndex:'minuteExpress'
		}, {
			header : '上次启动时间',
			width:120,
			dataIndex:'startTime'
		}, {
			header : '上次结束时间',
			width:120,
			dataIndex:'endTime'
		}, {
			header : '状态',
			width:100,
			renderer:rendererTaskStatus,
		//	hidden:true,
			dataIndex:'status'
		}, {
			header :'备注',
			width:100,
		//	hidden:true,
		//	renderer:rendererTaskStatus,
			dataIndex:'remark'
		}],		
        region : "center",
        iconCls : 'grid-icon',
        title:'采集时间配置',
        editCfg: {
        	height: 350,
			buttons: [{
				text :'验证',
				iconCls: 'icon-accept',
				handler: checkTimeConfig
			}]
        },
        editFields: [{
			xtype: 'hidden',
			name: 'collectId'
		}, {
			layout : 'column',
			xtype:'fieldset',
            title:'基本信息:',	            
			items : [{
				columnWidth : .5,
				layout : 'form',
				labelWidth:70,
				defaultType: 'textfield',
				items : [{
				    xtype:"textfield",
					fieldLabel : '任务名',
					name: 'taskName',
					width : 180,
					blankText:"任务名称不可为空",
					allowBlank : false
				}, {
				    fieldLabel: '文件名',  
				    name: 'downFiles',
				    width : 180,
				    allowBlank : false
				} , {
					fieldLabel : '年',
					name:'yearExpress',
					width: 180,
				    value:'*',
					allowBlank:true
				}, {
					fieldLabel : '月',
					name:'monthExpress',
					width: 180,
					value:'*',
					allowBlank:true							
				},	{
					fieldLabel : '日',
					value:'*',
					name:'dayExpress',
					width: 180,									
					allowBlank:true							
				}, {
					fieldLabel : '时',
					name: 'hourExpress',
					width: 180,									
					allowBlank:true							
				}, {
					fieldLabel : '分',
					name:'minuteExpress',
					width: 180,									
					allowBlank:true							
				}, {
					fieldLabel : '备注',
					name:'remark',
					width: 180,	
				//	hidden:true,								
					allowBlank:true							
				}]
			},{
				columnWidth : .5,
				labelWidth:30,
				layout : 'form',
				items : [{  
					html : '<font id="noFont"  class="x-form-item" style="font-size:20px" color="red">时间配置说明：</font>'  
                }, {  
					html : ['<font id="noFont"  class="x-form-item" style="padding-left:1px" color="black">文件名变量：</font>',
					        "<font color='blue'>"+"<yyyy>, <yyyyMM>, <yyMMdd>, <yyyyMMdd>, <yyyyMMddHH>".replace(/</g, '&lt;').replace(/>/g, '&gt;')+"</font>"]
                }, { 
                	html : '<font id="noFont" class="x-form-item" style="padding-left:1px" color="black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;月：请输入类似1-12(表示1至12月), 或1,3,5(表示1,3,5月)的有效月份数值</font>'  
                }, {  
                    html : '<font id="noFont" class="x-form-item" style="padding-left:1px" color="black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;日：请输入类似1-31(表示1至31号), 或1,3,5(表示1,3,5号)的有效日期数值</font>'  
                }]
			}]
		}],
		onShowDataWin: function(record) {
			var me = this;
			var status = record && record.get('status');
			if(status=='started') {
				return false;
			}
			var dataWin = me.getDataWin();
			var dataForm = me.getDataForm();
			dataForm.getForm().findField('collectId').setValue(collectId);
		}
    });
    var viewport = Ext.create({
    	xtype:'datagridview',
    	autoLoad: false,
    	dataFields: [
		    {name : 'id'},
	        {name : 'name',type : 'string'}, 
			{name : 'getherType',type : 'string'},
			{name : 'dataType',type : 'string'},
			{name : 'dataSourceType',type : 'string'},  
			{name : 'dataTimeType',type : 'string'},
			{name : 'downPath',type : 'string'},
			{name : 'savePath',type : 'string'},
			{name : 'cleanStrategy',type : 'string'},
			{name : 'status',type : 'string'},
			{name : 'renameStrategy',type : 'string'},
			{name : 'configId'},
			{name : 'dataEncoding',type : 'string'},		
			{name : 'needParse',type : 'string'}
		],
		dataUrl: _ctxPath+'/collect/collectInfo',
		gridColumns: [{
			header:'连接配置',
			width:100,
			hidden: true,
			dataIndex :'configId'
		}, {
			header:'文件编码',
			width:100,
			hidden:true,
			dataIndex : 'fileEncoding'
		}, {
			header:'采集名称',
			width:100,
			dataIndex : 'name'
		}, {
			header : '数据类别',
			width:100,
			renderer:rendererDataType,
			dataIndex:'dataType'
		}, {
			header : '源数类型',
			width:150,
			renderer:rendererSourceType,
			dataIndex:'dataSourceType'
		}, {
			header : '采集路径',
			width:150,
			dataIndex:'downPath'
		}, {
			header : '保存路径',
			dataIndex:'savePath',
			width:100
		}, {
			header : '解析类型',
			dataIndex:'needParse',		 		
			renderer:rendererParseType,
			width:100
		}, {
			header : '保留期限',
			dataIndex:'cleanStrategy',		
			renderer:rendererCleanStrategy,					
			width:100
		}, {
			header : '状态',
			dataIndex:'status',
			renderer:rendererCollectStatus, 
			width:100
		}, {
			header : '操作',
			width:210,
			renderer: function(value,meta,record) {
				var rid = record.id;
				var btns = ["<div class='controlBtn'>"];
				var status = record.get('status');
				switch(status) {
				case 'started':
				case 'part_started':
					btns.push("<a href='javascript:void(0);' class='btn-act' onclick='stopCollect(_RID_)'>停止</a>&nbsp;&nbsp;&nbsp;&nbsp;");
					break;
				default:
					btns.push("<a href='javascript:void(0)' class='btn-act' onclick='startCollect(_RID_)'>启动</a>&nbsp;&nbsp;&nbsp;&nbsp;");
				}
				btns.push("<a href='javascript:void(0);' class='btn-act'onclick='showCollect(_RID_)'>详情</a>&nbsp;&nbsp;&nbsp;&nbsp;");
	            btns.push("</div>");
                return btns.join("<label style='color:#ddd;'>|</label>").replace(/_RID_/g, rid);  
            }
		}],
		searchCfg: {
			height: 80
		},	
		searchFields: [{
			fieldLabel : '名称',
			name : 'LIKE_name',
			width : 120,
			allowBlank : true
		}, {
			fieldLabel : '数据类别',
			name: 'dataType',
			width : 120,
			allowBlank : true
		}, {
			fieldLabel : '数源类型',
			name: 'dataSourceType',
			width : 120,
			allowBlank : true
		}],
		editCfg: {
			width: 600,
			height: 500,
			items: [timeConfigGrid]
		},
		editFields: [{
			layout : 'column',
			xtype:'fieldset',
            title:'基本信息:',
			items : [{
				columnWidth : .50,
				layout : 'form',
				labelWidth:70,
				defaultType: 'textfield',
				items : [{
					fieldLabel : '采集名称',
					name:'name',
					width : 180,
					listeners:{blur:function (field){
				        checkCollectNameUsable();
					    //Ext.getCmp("onSaveButton").setDisabled(!field.getValue());
					}},
					allowBlank : false
				}, collectTypeCombo, { 
					fieldLabel: '连接配置',  
					xtype:"panel",//panel  
					layout:"column", 
					id:'ConnConfigPanel', 
					isFormField:true,  
					items: [collectConnCombo]  
    			}, {
    				fieldLabel : '采集路径',
					name: 'downPath',
					width:180,
					allowBlank:true							
				}, {
					fieldLabel : '保存路径',
					name:'savePath',
					width:180,
					allowBlank:true							
				}, renameStrategyCombo]
			}, {
				columnWidth : .50,
				labelWidth:70,
				layout : 'form',
				items : [cleanStrategyCombo,
				         timeTypeCombo,
				         dataSourceTypeCombo,							
				         dataTypeCombo,
				         parseTypeCombo,
				         enCodingCombo
				 ]
			}]//在此加上配置时间的grid
		}],
		onShowDataWin: function(record) {
			var me = this;
			var timeConfigStore = timeConfigGrid.getStore();
			var cid = record && record.id;
			var isNew = !cid;
			if(isNew) {
				timeConfigGrid.hide();
			} else {		
				timeConfigGrid.show();
				timeConfigStore.baseParams['flt_EQ_L_collectId'] = cid;
				timeConfigStore.reload();
			}
			collectId = cid;
			var status = record && record.get('status');
			var dataWin = me.getDataWin();
			var gridToolbar = timeConfigGrid.getTopToolbar();
			if(status=='started' || status=='part_started') {
				dataWin.saveBtn.hide();
				gridToolbar.hide();
			} else {
				dataWin.saveBtn.show();
				gridToolbar.show();
			}
		},
		handleSaveData: function(result) {
			var dataStore = this.getStore();
			if(result.success) {
				Ext.Msg.alert('恭喜', '保存成功！请配置采集时间');
				var record = result.results;
				timeConfigGrid.show();
				dataStore.reload();
				return false;
			}
		}
    });
	// 连接名称验证
	function checkCollectNameUsable() {
		var dataForm = viewport.getDataForm();
		var field = dataForm.getForm().findField('name');
		var nameValue = field.getValue();
		if (!nameValue) {
			return;
		}
		var dataGrid = viewport.dataGrid;
		var sel = dataGrid.getSelectionModel().getSelected();
		if (field.getValue() == (sel&&sel.get('connName'))) {
			return;
		}
		Ext.Ajax.request({
			method : 'POST',
			url : _ctxPath + '/collect/collectInfo/checkExists',
			params : {
				name : nameValue
			},
			success : function(response, options) {
				var json = Ext.decode(response.responseText);
				if (json || json.data) {
					Ext.Msg.alert("提示:", "采集名称： " + nameValue
							+ " 已经存在,请输入其它名称");
				}
			},
			failure : function(response, options) {
				var responseJson = Ext.decode(response.responseText);
				Ext.Msg.alert("提示:", "操作失败！", responseJson.errors);
			}
		});
	}
	// 验证采集任务时间配置
	function checkTimeConfig() {
		var dataForm = timeConfigGrid.getDataForm();
		var field = dataForm.getForm().findField('taskName');
		var nameValue = field.getValue();
		if (!nameValue) {
			return;
		}
		var params = dataForm.getForm().getValues();
		Ext.Ajax.request({
			method : 'POST',
			url : _ctxPath + '/collect/collectTask/checkTimeExpr',
			params : params,
			success : function(response, options) {
				var json = Ext.decode(response.responseText);
				if (json || json.data) {
					Ext.MessageBox.alert('提示', '时间配置正确！'+json||json.data);
					return;
				}
				Ext.MessageBox.alert('提示', '时间配置不正确！验证未通过！时间表达式输入有误，请重新输入！');
			},
			failure : function(response, options) {
				var responseJson = Ext.decode(response.responseText);
				Ext.Msg.alert("提示:", "操作失败！", responseJson.errors);
			}
		});
	}
	function _startCollect(id, type) {
		var dataGrid = viewport.dataGrid;
	    var url = '/collect/collectTask/startByCollectId';
	    var paramName = 'collectId';
	    switch(type) {
	    case 'task':
	    	dataGrid = timeConfigGrid;
	    	url = '/collect/collectTask/startById';
	    	paramName = 'taskId';
	    	break;
	    }
		var dataStore = dataGrid.getStore();
		var rec = dataStore.getById(id);
	    if(rec.get('status')=='started'){
	    	Ext.MessageBox.alert('提示', '该任务已经启动，不能重复操作！ ' );
	        return;
	    }
	    var params = {};
	    params[paramName] = id;
		Ext.Ajax.request({
	        url: _ctxPath+url,
	        params: params,
	        method: 'POST',
	        success:  function (response, options) {                                  
               var responseJson =  Ext.decode(response.responseText);                                                                                            						      				       				 
		       if (responseJson.success){
		         Ext.MessageBox.alert('成功', '启动任务成功！ ');	
		          dataStore.reload();
		    	   if('task'==type) {
		    		   viewport.dataGrid.getStore().reload();
		    	   }		       
		       }else  {
		          Ext.MessageBox.alert('提示', '启动任务失败 ！' );	
		       }			                         
	        },
	        failure: function (response, options) {
					Ext.Msg.alert("提示:", "操作失败!错误码："+response.status);
	        }
	    });
	}
	function _stopCollect(id, type) {		
		var dataGrid = viewport.dataGrid;
	    var url = '/collect/collectTask/stopByCollectId';
	    var paramName = 'collectId';
	    switch(type) {
	    case 'task':
	    	dataGrid = timeConfigGrid;
	    	url = '/collect/collectTask/stopById';
	    	paramName = 'taskId';
	    	break;
	    }
		var dataStore = dataGrid.getStore();
		var rec = dataStore.getById(id);	
	    if(rec.get('status')=='stoped'){
	    	Ext.MessageBox.alert('提示', '该任务已经停止，不能重复操作！ ' );
	        return;
	    }
	    var params = {};
	    params[paramName] = id;
		Ext.Ajax.request({
	        url: _ctxPath+url,
	        params: params,
	        method: 'POST',
	        success:  function (response, options) {                                  
	               var responseJson =  Ext.decode(response.responseText);                                                                                            						      				       				 
			       if (responseJson.success){
			    	   Ext.MessageBox.alert('成功', '停止任务成功！ ');	
			    	   dataStore.reload();
			    	   if('task'==type) {
			    		   viewport.dataGrid.getStore().reload();
			    	   }
			       } else  {
			    	   Ext.MessageBox.alert('提示', '停止任务失败 ！' );	
			       }			                         
	        },
	        failure: function (response, options) {
					Ext.Msg.alert("提示:", "操作失败!错误码："+response.status);
	        }
	    });
	}
	function _showCollect(id) {
		var dataGrid = viewport.dataGrid;
		var record = dataGrid.getStore().getById(id);
		dataGrid.showDataWin(record);
	}
	window.startCollect = _startCollect;
	window.stopCollect = _stopCollect;
	window.showCollect = _showCollect;
});