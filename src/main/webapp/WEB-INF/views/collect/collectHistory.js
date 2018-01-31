Ext.onReady(function() {
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
    var CollectInfoList = []; //采集任务配置
    var CollectTaskList = []; //采集时间配置
    var SourceType = []; //源类型
    var CollectStatus = []; //采集运行状态
    var TaskStatus = []; //任务时间配置状态    
    var ConnConfig = [];
    var LogStatus = [];
    var collectId = null;
    var historyId = null;
	var winMask;
	
	var fltCollectNameCombo = Ext.create({
		xtype: 'combo',
		fieldLabel: '所属采集',
        hiddenName: 'EQ_L_collectId',
        valueField : 'id',				
        allowBlank : true,
        displayField : 'name',
		mode : 'local',
		width:150,
		triggerAction : 'all',
		editable: false,										
		selectOnFocus : false,
		forceSelection : true,
		listeners : {  //主要这里添加监听事件     
		    select : function(combo, record, index) {		    	
		    	CollectTaskList = [];
		    	collectId = combo.getValue();
		    	getTaskNameList();
		    }
		},
		store :new Ext.data.JsonStore( {
			fields : ['id', 'name'],
		//	autoload:true,
			data :CollectInfoList
		})
	});
	var fltTaskNameCombo = Ext.create({
		xtype: 'combo',
		fieldLabel: '所属任务',
        hiddenName: 'EQ_L_taskId',
        valueField : 'id',				
        allowBlank : true,
        displayField : 'taskName',
		mode : 'local',
		width:150,
		triggerAction : 'all',
		editable: false,										
		selectOnFocus : true,
		forceSelection : true,		
		store :new Ext.data.JsonStore( {
			fields : ['id', 'taskName'],
		//	autoload:true,
			data : CollectTaskList
		})
	});
	var fltCollectTypeCombo = Ext.create({
		xtype: 'combo',						
		fieldLabel: '采集类型',
        hiddenName: 'getherType',
        valueField : 'value',				
        allowBlank : true,
        displayField : 'text',
		mode : 'local',
		width:150,
		triggerAction : 'all',
		editable: false,
		selectOnFocus : false,
		forceSelection : true,
		store :  new Ext.data.SimpleStore( {
			fields : ['value', 'text'],
			data : CollectType
		}) 
	});
	var fltStatusCombo = Ext.create({
		xtype: 'combo',				
		fieldLabel: '状态',
        hiddenName: 'status',
        valueField : 'value',				
        allowBlank : true,
        displayField : 'text',
		mode : 'local',
		width:150,
		triggerAction : 'all',
		editable: false,
		selectOnFocus : true,
		forceSelection : true,		
		store :new Ext.data.SimpleStore( {
			fields : ['value', 'text'],															
			data : LogStatus
		})
	});	
    //获取连接配置下拉框数据
    function getCollectInfoList(){      
        Ext.Ajax.request({
                url: _ctxPath+'/collect/collectInfo/loadList',               
                params: {},
                method: 'POST',
                success:  function (response, options) {                                  
                    var json =  Ext.decode(response.responseText);
                    CollectInfoList = json;
                    fltCollectNameCombo.store.loadData(CollectInfoList);
				   //    Ext.MessageBox.alert('成功', '从服务端获取结果: ' +response.responseText);				                         
                },
                failure: function (response, options) {
                   var responseJson =  Ext.decode(response.responseText);
						Ext.Msg.alert("提示:", "操作失败");
                }
            });	  
    }
    getCollectInfoList();
    //获取连接配置下拉框数据
    function getTaskNameList(){
    	if(!collectId) return;
        Ext.Ajax.request({
                url: _ctxPath+'/collect/collectTask/loadList',               
                params: {collectId: collectId},
                method: 'POST',
                success:  function (response, options) {                                  
                    var json =  Ext.decode(response.responseText);
                    CollectTaskList = json;
                    fltTaskNameCombo.store.loadData(CollectTaskList);
				   //    Ext.MessageBox.alert('成功', '从服务端获取结果: ' +response.responseText);				                         
                },
                failure: function (response, options) {
                   var responseJson =  Ext.decode(response.responseText);
						Ext.Msg.alert("提示:", "操作失败");
                }
            });	  
    }
	// 获取编码下拉框数据
	function getComboBaseData() {
		Ext.Ajax.request({
			url : _ctxPath + '/common/commonData/getBaseData',
			params : {
				types : [ 'taskStatus', 'collectType', 'timeType', 
				          'sourceType', 'dataType', 'parseType', 'cleanStrategy', 'logType' ]
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
				LogStatus = json.logType;			
                viewport.loadGrid();
                fltStatusCombo.store.loadData(LogStatus);
                fltCollectTypeCombo.store.loadData(CollectType);
//						fltUseForCombo.store.loadData(ConnUserFor);
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
	
	function renderCollectType(value) {
		for(var i=0;i<CollectType.length;i++) {
			if(CollectType[i][0]==value) {
				return CollectType[i][1];
			}
		}
	}
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
    function rendererLogStatus(value){
		for(var i=0;i<LogStatus.length;i++){
			if(LogStatus[i][0]==value)
				return LogStatus[i][1];
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
    //用于详情面板
    var taskLogGrid = Ext.create({
    	xtype: 'datagrid',
    	dataUrl: _ctxPath+'/collect/collectTaskLog',
    	baseParams: { flt_EQ_L_historyId : historyId},
    	autoLoad: false,
    	dataFields: [
	         //{name : 'collectLogId',type : 'string'},
	 		{name : 'logInfo'}, 
	 		{name : 'logTime'},
	 		{name : 'logType'}		
		],
        gridColumns: [{
			header:'内容',
			width:350,
			dataIndex : 'logInfo'
		}, {
			header : '记录时间 ',
			width:150,
			dataIndex:'logTime'
		}, {
			header : '状态 ',
			width:150,
			dataIndex:'logType'
		}],	
        region : "center",
        iconCls : 'grid-icon',
        tbar: false
    });
    var viewport = Ext.create({
    	xtype:'datagridview',
    	autoLoad: false,
    	dataFields: [
		    {name : 'id'},
			{name : 'collectName'}, 
			{name : 'taskName'},
			{name : 'getherType'},	 
			{name : 'startTime'},
			{name : 'endTime'},								
			{name : 'status'},				
			{name : 'remark'}    	             
    	],
		dataUrl: _ctxPath+'/collect/collectHistory',
		gridTbar: false,
		gridColumns: [{
			header:'编号',
			width:65,
			dataIndex : 'id'
		}, {
			header:'采集名称',
			width:100,
			dataIndex : 'collectName'
		}, {
			header : '任务名称',
			width:100,
			dataIndex:'taskName'
		}, {
			header : '采集类型 ',
			width:150,
			renderer:renderCollectType,
			dataIndex:'getherType'
		}, {
			header : '开始时间',
			width:150,
			
			dataIndex:'startTime'
		}, {
			header : '结束时间',
			dataIndex:'endTime',
			width:140
			
		}, {
			header : '状态',
			dataIndex:'status',
			renderer:rendererLogStatus,
			width:100
		}, {
			header : '日志内容',
			dataIndex:'remark',
			width:150
		}, {
			header: '操作',					
			width:210,
			renderer:function(value, meta, record) {
				var btns = [];
				var rid = record.id;
				btns.push('<a href="javascript:void(0);" title="查看详情" class="alarm_detail" onclick="onClickQuery(_RID_)">详情</a>');
				//btns.push("<a href='javascript:void(0);' class='alarm_detail' onclick='onClickSupplyCollect(_RID_)'>补采</a>");
				//btns.push("<a href='javascript:void(0);' class='alarm_detail' onclick='onClickReCollect(_RID_)'>重采</a>");
                return '<div class="controlBtn">'+btns.join('|').replace(/_RID_/g, rid)+'</div>';  
			}
		}],
		searchCfg: {
			height: 100
		},
		searchFields: [{
			xtype: 'container',
			layout: 'form',
			columnWidth: 0.4,
			items:[fltCollectTypeCombo,
	            fltCollectNameCombo, {
				xtype: 'datefield',
	            name:"GE_D_startTime",
	            fieldLabel: '开始时间',
	            editable:false, //不允许对日期进行编辑  
	            width:150,  
	            format:"Y-m-d"
			}]}, {
				xtype: 'container',
				layout: 'form',
				columnWidth: 0.4,
				items:[fltStatusCombo,
				fltTaskNameCombo, {
				xtype: 'datefield',
				name:"LE_D_endTime",
				fieldLabel: '结束时间',
				editable:false, //不允许对日期进行编辑  
				width:150,
				format:"Y-m-d"
	        }]
		}],
		editCfg: {
			title: '采集任务日志',
			items: taskLogGrid
		},
		onShowDataWin: function(record) {
			var me = this;
			var infoGrid = taskLogGrid;
			var infoStore = infoGrid.getStore();
			var rid = record && record.id;
			var isNew = !rid;
			if(isNew) {
				infoGrid.hide();
			} else {
				infoGrid.show();
				infoStore.baseParams['flt_EQ_L_historyId'] = rid;
				infoStore.reload();
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
	function _onClickQuery(id) {
		var dataGrid = viewport.dataGrid;
		var record = dataGrid.getStore().getById(id);
		dataGrid.showDataWin(record);
		return;
	    var url = '/collect/collectTask/startByCollectId';
	    var paramName = 'collectId';
	    switch(type) {
	    case 'task':
	    	dataGrid = taskLogGrid;
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
	window.onClickQuery = _onClickQuery;
});