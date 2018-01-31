/**
 * 灾害性落区
 */

var DisasterZone = window.DisasterZone || {};
DisasterZone.symbolblue;
DisasterZone.symbolyellow;
DisasterZone.symbolorange;
DisasterZone.symbolred;
DisasterZone.listzone;
DisasterZone.warnProductType; //预警产品类型：预警信号产品signal,预警指导产品guide;
DisasterZone.selectedSignal;  //当前选中的预警信号（包括预警信号类型和等级）
DisasterZone.warnnSignals;  //当前类型的预警信号组
DisasterZone.curSelSignalIndex;//当前要绘制的预警信号Index
DisasterZone.drawToolAreaDisaster; //手动绘制灾害性落区
DisasterZone.drawToolWarnSignal;//手动绘制预警信号点

require(["esri/toolbars/edit",
         "esri/tasks/PrintTask",
         "esri/symbols/SimpleFillSymbol",
         "esri/symbols/SimpleLineSymbol",
         "esri/symbols/PictureMarkerSymbol",
         "esri/geometry/Polygon",
         "esri/graphic",
         "esri/layers/GraphicsLayer",
         "esri/tasks/PrintTemplate",
         "esri/tasks/PrintParameters",
         "esri/Color",
         "esri/toolbars/draw",
         "esri/config",
         "dojo/_base/event"],
		function(Edit,PrintTask,SimpleFillSymbol,SimpleLineSymbol,PictureMarkerSymbol,Polygon,Graphic,
				GraphicsLayer,PrintTemplate,PrintParameters,Color,Draw,esriConfig,baseEvent) {
	
	DisasterZone.getDateStr=function(date,isInit) {
	    var year = date.getFullYear().toString();
	    var month = (date.getMonth() + 1);
	    var day = date.getDate();

	    if (month < 10) {
	        month = "0" + month;
	    }
	    if (day < 10) {
	        day = "0" + day;
	    }

	    if(isInit==false){
	    	return year + month + day;
	    }
	    else{
	    	return year +"-"+ month +"-"+ day;
	    }
	}

	DisasterZone.createAccordion=function (title,arr){
		//var content='<a id="btn" href="#" class="easyui-linkbutton" data-options="iconCls:'+"'icon-search'" +'">easyui</a>';
		var content='';
		var tiltleStr=title;
		var len=arr.length;
		var panel={};
		var btnLabel='';
		for(var i=0;i<len;i++){
			btnLabel = "时次（"+arr[i].aging+"）";
			content += '<a id="'+arr[i].aging+'" href="javascript:DisasterZone.btnClickHandler('+arr[i].id+')"  class="easyui-linkbutton" data-options="iconCls:'+
			"'icon-search'"+'" style='+ '"padding-left:20px;padding-right:20px" >' +btnLabel +'</a><br/>';
		}
		
		if(len>0){
			tiltleStr +="（"+len+"条）";
			var tools=[{
				iconCls:'icon-edit',
				handler:function(){}
			}];
			panel.tools=tools;
		}
		panel.title = tiltleStr;
		var iconCls='icon-save';
		
		if("暴雨"==title){
			iconCls='icon-baoyu';
		}
		else if("暴雪"==title){
			iconCls='icon-baoxue';
		}
		else if("大风"==title){
			iconCls='icon-dafeng';
		}
		else if("大雾"==title){
			iconCls='icon-dawu';
		}
		else if("道路结冰"==title){
			iconCls='icon-dljb';
		}
		else if("高温"==title){
			iconCls='icon-gaowen';
		}
		else if("寒潮"==title){
			iconCls='icon-hanchao';
		}
		else if("霾"==title){
			iconCls='icon-mai';
		}
		else if("沙尘暴"==title){
			iconCls='icon-shachenbao';
		}
		else if("霜冻"==title){
			iconCls='icon-shuangdong';
		}
		
		panel.iconCls = iconCls;
		//panel.style = "overflow:auto;padding-left:10px;height:40px";
		panel.content = content;
		
		//panel = {title: title,iconCls: 'icon-save',style: "overflow:auto;padding:15px;",content:content,tools:tools};
		$('#accordion').accordion('add', panel);
	}

	DisasterZone.btnClickHandler=function (productId){
		if(undefined==DisasterZone.symbolblue){
			DisasterZone.symbolblue=new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
					new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,255]), 1),new Color([0,0,255,0.25]));
		}
		if(undefined==DisasterZone.symbolyellow){
			DisasterZone.symbolyellow=new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
					new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,255]), 1),new Color([255,255,0,0.25]));
		}
		if(undefined==DisasterZone.symbolorange){
			DisasterZone.symbolorange=new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
					new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,255]), 1),new Color([255,128,0,0.25]));
		}
		if(undefined==DisasterZone.symbolred){
			DisasterZone.symbolred=new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
					new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,255]), 1),new Color([255,0,0,0.25]));
		}
		
		$.ajax({
			type:'GET',
	 		url: NxgridConfig.disaster.getProductUrl+productId,
	 		dataType: 'json',
	 		success: function(data) {
	 			$('#frmProduct').form('load',data);
	 			//绘制地图预警区域
	 			window.parent.map.graphics.clear();
	 			
	 			DisasterZone.listzone=data.disasterZones;
	 			var len=DisasterZone.listzone.length;
	 			var jsonStr;
	 			for (var i=0;i<len;i++){
	 				jsonStr ='{"rings":'+DisasterZone.listzone[i].coords+',"spatialReference":{"wkid":4326}}';
	 				
	 				var polygon = new Polygon(JSON.parse(jsonStr));
	 				var rings=polygon.rings;
	 				var rlen=rings.length;
	 				for(var j=0;j<rlen;j++){
	 					var strTemp=jsonStr ='{"rings":[[['+rings[j]+']]],"spatialReference":{"wkid":4326}}';
	 					var polygonTemp = new Polygon(JSON.parse(jsonStr));
	 					var pointTemp = polygonTemp.getExtent().getCenter();
	 					var graphicPoint=new Graphic(pointTemp, 
	 	 						new PictureMarkerSymbol(NxgridConfig.disaster.getPictureUrl+encodeURIComponent(DisasterZone.listzone[i].icon), 25, 25),
	 	 						{zoneId:DisasterZone.listzone[i].id,geoType:'point'});
	 					window.parent.map.graphics.add(graphicPoint);
	 				}
	 				
	 				var graphicPolygon=new Graphic(polygon,
	 						DisasterZone.getfillSymbol(DisasterZone.listzone[i].level),
	 						{zoneId:DisasterZone.listzone[i].id,geoType:'polygon'});
	 				window.parent.map.graphics.add(graphicPolygon);
	 			}
	 		},
	 		error: function(){
	 			$.messager.progress('close');
	 		}
		});
		
		var curDisasterType=$('#accordion').accordion('getSelected').panel('options').title;
		var index=curDisasterType.indexOf('（');
		if(index>0){
			curDisasterType=curDisasterType.substr(0,index);
		}
		
		$.ajax({
			type:'GET',
	 		url: NxgridConfig.disaster.getWarnSignalUrl+encodeURIComponent(curDisasterType),
	 		dataType: 'json',
	 		success: function(data) {
	 			//alert("11")
	 			DisasterZone.warnnSignals=data;
	 			//绘制预警信号图标到预警产品制作页面，供预报员选择
	 			var len=data.length;
	 			var innerHtml="<label>选择预警信号：";
	 			for(var i=0;i<len;i++){
	 				innerHtml=innerHtml.concat('<img src="'+NxgridConfig.disaster.getPictureUrl+encodeURIComponent(data[i].warningSignalIcon)+
	 						'" onclick="DisasterZone.siginalIconClick('+i+')" width="40" height="40"/>');
	 			}
	 			innerHtml=innerHtml.concat("</label>");
	 			$("#divSignal").html(innerHtml);
	 		},
	 		error: function(error){
	 			alert(error.status);
	 			$.messager.progress('close');
	 		}
		});
	}

	//根据预警信号等级获取填充区域颜色
	DisasterZone.getfillSymbol=function(lvl){
		if("蓝色"==lvl){
			return DisasterZone.symbolblue;
		}
		else if("黄色"==lvl){
			return DisasterZone.symbolyellow;
		}
		else if("橙色"==lvl){
			return DisasterZone.symbolorange;
		}
		else if("红色"==lvl){
			return DisasterZone.symbolred;
		}
	}

	DisasterZone.btnHideClickHandler=function (isPoint){
		var gcArr=window.parent.map.graphics.graphics;
		var len=gcArr.length;
		
		if(isPoint){ //如果是点
			for(var i=0;i<len;i++){
				if(gcArr[i].attributes!=undefined && gcArr[i].attributes.geoType=="point"){
					gcArr[i].visible=!$('#btnHide').linkbutton("options").selected;
				}
			}
		}
		else{
			for(var i=0;i<len;i++){
				if(gcArr[i].attributes!=undefined && gcArr[i].attributes.geoType=="polygon"){
					gcArr[i].visible=!$('#btnHideArea').linkbutton("options").selected;
				}
			}
		}
		window.parent.map.graphics.redraw();
	}

	DisasterZone.btnPublishClickHandler=function (){
		if("signal"==DisasterZone.warnProductType){ //如果是预览预警信号产品
			$.messager.progress();
			$('#frmProduct').form('submit',{
				url:NxgridConfig.disaster.saveWarnProductUrl,
				onSubmit:function(param){
					param.zones=JSON.stringify(DisasterZone.listzone);
					param.productType=DisasterZone.warnProductType;
					param.urlPictureSource="";
						
					var isValid = $(this).form('enableValidation').form('validate');
					if (!isValid){
						alert("请将预警产品填写完整！");
						$.messager.progress('close');
					}
					return isValid;
				},
				success: function(){
					$.messager.progress('close');
				}
			});
		}
		else{
			DisasterZone.exportMapPicture(false);
		}
	}

	DisasterZone.btnViewClickHandler=function(type){
		DisasterZone.warnProductType=type;
		var isValid = $("#frmProduct").form('enableValidation').form('validate');
		if (!isValid){
			alert("请将预警产品填写完整！");
		}else{
			DisasterZone.judgeSelectedSignalNames();
		}
	}

	DisasterZone.signalClickHandler=function(){
		 var value='';  
	     var radio = document.getElementsByName("signal");  
	     for(var i = 0;i<radio.length;i++) {  
	         if(radio[i].checked==true){
	        	 value = radio[i].value;  
	        	 break;
	         }  
	     }
	     if(''==value){
	    	 alert("请设置预警信号！");
	     }
	     else{
	    	 DisasterZone.selectedSignal = value;
	    	 $('#windowSignalSelect').window('close');
	    	 if("signal"==DisasterZone.warnProductType){  //预览预警信号产品
	    		 DisasterZone.viewDocument();
	    	 }
	    	 else{
	    		 DisasterZone.exportMapPicture(true);
	    	 }
	     }
	}

	DisasterZone.judgeSelectedSignalNames=function(){
		var len=DisasterZone.listzone.length;
		if(1==len){
			DisasterZone.selectedSignal = DisasterZone.listzone[0].type+DisasterZone.listzone[0].level;
			if("signal"==DisasterZone.warnProductType){  //预览预警信号产品
				DisasterZone.viewDocument();
			}
			else{  //先进行截取当前地图，然后再进行预览
				//DisasterZone.exportMapPicture(true);
				window.parent.exportMapPicture();
			}
		}
		else{
			$('#windowSignalSelect').window('open');
			var contentHtml =''; 
			var sname='';
			for(var i=0;i<len;i++){
				sname=DisasterZone.listzone[i].type+DisasterZone.listzone[i].level;
				contentHtml+='<label><input type="radio" name="signal" value="'+sname+'"/>'+sname+'</label>';
			}
			$("#divSignalSel").empty();
			$('#divSignalSel').append(contentHtml);
		}
	}

	DisasterZone.viewDocument=function(){
		$.messager.progress();
		var param = DisasterZone.createDocParam(); 
		$.ajax({
			type:'POST',
	 		url: NxgridConfig.disaster.viewWarnProductUrl,
	 		data:param,
	 		dataType: 'json',
	 		success: function(json) {
	 			$('#widowPdf').window('open');
	 			var pdfUrl = NxgridConfig.disaster.getPictureUrl+json;
	 			$('#pdfContainer').attr('src',pdfUrl);
	 			$.messager.progress('close');
	 		},
	 		error: function(){
	 			$.messager.progress('close');
	 		}
		});
	}

	DisasterZone.createDocParam=function(){
		var param={};
		param.issuer=$('#selQianfa').combobox('getText');
		param.serialNum=$('#txtSerial').textbox('getValue');
		param.imagePath1 = null;
		param.imagePath2 = null;
		param.imagePath3 = null;
		param.warnType = DisasterZone.warnProductType;
		
		if("guide"==DisasterZone.warnProductType){ //如果是预览指导产品
			param.imagePath1 = null;
			param.imagePath2 = null;
			param.imagePath3 = null;
			param.imageNum = 1;
			param.createBy = $('#selCreator').combobox('getText');
			param.shouxi =  $('#selShenhe').combobox('getText');
			param.effectArea =$('#txtEffectArea').textbox('getValue');
			
		}
		else{
			var len=DisasterZone.listzone.length;
			for(var i=0;i<len;i++){
				if(DisasterZone.selectedSignal.indexOf(DisasterZone.listzone[i].level)>-1){
					param["imagePath1"]=DisasterZone.listzone[i].icon;
					break;
				}
			}
			param.imageNum = 1;
		}
		
		param.content = $('#txtContent').textbox('getValue');
		param.defense = $('#txtDefense').textbox('getValue');
		param.department = "宁夏气象台";
		param.signal = DisasterZone.selectedSignal;
		param.aging = $('#selTimeSpan').combobox('getValue');
		
		var timeStr = $('#dbPublishTime').datetimebox('getValue');
		param.publishDay = timeStr.substr(0,10);
		param.publishHour = timeStr.substr(11,2);
		param.publishMin = timeStr.substr(14,2);
		param.area = "宁夏";
		return param;
	}

	DisasterZone.btnClearClickHandler=function(){
		window.parent.map.graphics.clear();
		window.parent.getDisasterGraphicLayer().clear();
	}

	DisasterZone.siginalIconClick=function(index){
		//alert("click")
		//首先绘制image选中样式
		DisasterZone.curSelSignalIndex=index;
		//绘制模式开启
		DisasterZone.drawToolWarnSignal.activate(Draw.POINT);
	}

	DisasterZone.drawWarnSignalComplete=function(evt){
		DisasterZone.drawToolWarnSignal.deactivate();
		//在地图上绘制预警信号图标
		var graphic = new Graphic(evt.geometry,
						new PictureMarkerSymbol(NxgridConfig.disaster.getPictureUrl+encodeURIComponent(DisasterZone.warnnSignals[DisasterZone.curSelSignalIndex].warningSignalIcon), 25, 25),
						{index:DisasterZone.curSelSignalIndex,geoType:'point'});
		window.parent.getDisasterGraphicLayer().add(graphic);
	}
	
	DisasterZone.drawDisasterZone=function(){
		DisasterZone.drawToolAreaDisaster.activate(Draw.FREEHAND_POLYGON);
	}
	
	DisasterZone.drawAreaDisasterComplete=function(evt){
		//alert("cmp22")
		//绘制落区到地图上
		DisasterZone.drawToolAreaDisaster.deactivate();
	    var graphic = new Graphic(evt.geometry, new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL,
	    		new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255,0,0]), 2)));
	    window.parent.map.graphics.add(graphic);
		//分析影响村镇、影响站点；
	}
	
	DisasterZone.editDrawDisasterZone=function(){
		var editToolbar = new Edit(window.parent.map);
		
		window.parent.map.graphics.on("click", function(event) {
			baseEvent.stop(event);
	        editToolbar.activate(Edit.EDIT_VERTICES| Edit.MOVE, event.graphic);
	      });
		DisasterZone.editcmptDisasterZone("vertex-move-stop",editToolbar);
		DisasterZone.editcmptDisasterZone("graphic-move-stop",editToolbar);
		window.parent.map.on("click", function(event){
	        editToolbar.deactivate();
	    });
	}

	DisasterZone.editcmptDisasterZone=function(evtName,editToolbar){
		//alert(evtName);
		editToolbar.on(evtName,function(evt){
			//alert("aa");
			//区域编辑之后应该进行的相关操作，如计算影响区域、影响范围等
		});
	}

	DisasterZone.searchDisasterZone=function(){
		var panels = $('#accordion').accordion('panels');
		var len=panels.length;
		for(var i=0;i<len;i++){
			 $('#accordion').accordion('remove', 0);
		}
		
		$.ajax({
			type:'GET',
	 		url: NxgridConfig.disaster.getProductListUrl,
	 		data:{date:$('#dateSearch').combobox('getValue'),hour:$('#agingSearch').combobox('getValue')},
	 		dataType: 'json',
	 		success: function(json) {
	 			for(var p in json) {
	 				DisasterZone.createAccordion(p,json[p]);
	 				$.messager.progress('close');
	 			}
	 		},
	 		error: function(){
	 			$.messager.progress('close');
	 		}
		});
	}

	DisasterZone.exportMapPicture=function(isView){
		$.messager.progress();
		esriConfig.defaults.io.proxyUrl = NxgridConfig.MapConfig.proxyUrl;
		esriConfig.defaults.io.alwaysUseProxy = false;
		//创建地图打印对象
		var printMap =new PrintTask(NxgridConfig.MapConfig.nxPrintTaskUrl);  
		 //创建地图打印模版
	    var template = new PrintTemplate(); 
	    //创建地图的打印参数，参数里面包括：模版和地图
        var params = new PrintParameters(); 
        //输出图片的空间参考
        printMap.outSpatialReference = window.parent.map.SpatialReference;
        //打印图片的各种参数
	    template.exportOptions = {  
	        width: 800,  
	        height: 600,  
	        dpi: 96 
	    };  
	    //打印输出的格式
	    template.format = "PNG32";  
	    //输出地图的布局
	    template.layout = "MAP_ONLY";  
	    //设置参数地图  
	    params.map = window.parent.map; 
	    //设置参数模版
	    params.template = template;
	    //运行结果
	    printMap.execute(params, function(evt){ 
	    	alert(isView)
			var param = DisasterZone.createDocParam(); 
			if(isView){  //预览预警指导产品
				param.urlPictureSource=evt.url;
				$.ajax({
					type:'POST',
			 		url: NxgridConfig.disaster.viewWarnProductUrl,
			 		data:param,
			 		dataType: 'json',
			 		success: function(json) {
			 			$('#widowPdf').window('open');
			 			//alert(json);
			 			var pdfUrl = NxgridConfig.disaster.getPictureUrl+json;
			 			$('#pdfContainer').attr('src',pdfUrl);
			 			$.messager.progress('close');
			 		},
			 		error: function(){
			 			alert("error");
			 			$.messager.progress('close');
			 		}
				});
			}
			else{//发布预警指导产品
				$.messager.progress();
				$('#frmProduct').form('submit',{
					url:NxgridConfig.disaster.saveWarnProductUrl,
					onSubmit:function(param){
						param.zones=JSON.stringify(DisasterZone.listzone);
						param.productType=DisasterZone.warnProductType;
						param.urlPictureSource=evt.url;
							
						var isValid = $(this).form('enableValidation').form('validate');
						if (!isValid){
							alert("请将预警产品填写完整！");
							$.messager.progress('close');
						}
						return isValid;
					},
					success: function(){
						$.messager.progress('close');
					}
				});
			}
	        
	    });  
	}
	
	$(function(){
		//手动绘制灾害性落区
		DisasterZone.drawToolAreaDisaster = new Draw(window.parent.map, {showTooltips : true});
		DisasterZone.drawToolAreaDisaster.on("draw-end",DisasterZone.drawAreaDisasterComplete);
		
		//手动绘制预警信号 点
		DisasterZone.drawToolWarnSignal = new Draw(window.parent.map, {showTooltips : true});
		DisasterZone.drawToolWarnSignal.on("draw-end",DisasterZone.drawWarnSignalComplete);
		
		//清除格点显示的内容
		window.parent.getGridGraphicLayer().clear();
		
		$.messager.progress();
		var mydate=new Date();
		var hour=mydate.getHours();
		hour = hour<15?8:20;
		$("#dateSearch").datebox('setValue', DisasterZone.getDateStr(mydate,true));
		$("#agingSearch").combobox("setValue", hour);  
		$.ajax({
			type:'GET',
	 		url: NxgridConfig.disaster.getProductListUrl,
	 		data:{date:DisasterZone.getDateStr(mydate,false),hour:hour},
	 		dataType: 'json',
	 		success: function(json) {
	 			for(var p in json) {
	 				DisasterZone.createAccordion(p,json[p]);
	 				$.messager.progress('close');
	 			}
	 		},
	 		error: function(){
	 			$.messager.progress('close');
	 		}
		});
	});
});

