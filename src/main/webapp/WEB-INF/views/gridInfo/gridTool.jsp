<%@ page contentType="text/html; charset=UTF-8"%>
<script src="${contextPath}/scripts/gisCommon/echartsTrend.js"></script>
<script src="${contextPath}/scripts/gisCommon/sealEditTool.js"></script>
<script src="${contextPath}/scripts/gisCommon/locationAreaEditTool.js"></script>
<script src="${contextPath}/scripts/gisCommon/symbolTool.js"></script>
<script src="${contextPath}/scripts/gisCommon/bufferanalyse.js"></script>
<script src="${contextPath}/scripts/gisCommon/editToolWind.js"></script>
<script src="${contextPath}/scripts/gisCommon/weatherLegend.js"></script>
<script src="${contextPath}/scripts/grid/gridType.js"></script>


<script type="text/javascript">
$(document).ready(function(){	
	$("#zone").click(function(){
		if($(".zone").css("display") == 'none'){
			$(".zone").css("display","block");
			$(".fallarea").css("display","none");
			$(".seal").css("display","none");
			$(".trend").css("display","none");
			$(".winddirt").css("display","none");
			$(".chartBox").css("visibility", "hidden");
		}else if($(".zone").css("display") == 'block'){
			$(".zone").css("display","none");
		}
	});
	/* $('#addSilder').slider({
		showTip:false,
		min:-10,
		max:10,
		step:1,
		rule: [-10,10],
		onComplete:function(v) {
			var textv=v;					
			$('#addValueT').textbox('setValue', textv);
			com.nxgrid.giscommon.admiAreaEditTools.setValue(v);
		}
	});	 */
	/* $('#changeSliderV').slider({
		showTip:false,
		min:-10,
		max:10,
		step:1,
		rule: [-10,10],
		onComplete:function(v) {
			var textv=v;					
			$('#changeSliderT').textbox('setValue', textv);
			com.nxgrid.giscommon.admiAreaEditTools.changeValue(v);
		}
	});	 */
	/* $('#setSliderVal').slider({
		showTip:false,
		min:-10,
		max:10,
		step:1,
		rule: [-10,10],
		onComplete:function(v) {
			var textv=v;					
			$('#setValueT').textbox('setValue', textv);
			com.nxgrid.giscommon.admiAreaEditTools.setValue(v);
		}
	});	 */
	
	 $('#setValueT').textbox('textbox').keydown(function (e) {
         if (e.keyCode == 13) {
        	 var textv=$('#setValueT').textbox('getValue');
			 com.nxgrid.giscommon.admiAreaEditTools.setValue(textv);
         }
     });
	 $('#changeSliderT').textbox('textbox').keydown(function (e) {
         if (e.keyCode == 13) {
        	 var textv=$('#changeSliderT').textbox('getValue');
        	 com.nxgrid.giscommon.admiAreaEditTools.changeValue(textv);
         }
     });
	/*  $('#addValueT').textbox('textbox').keydown(function (e) {
         if (e.keyCode == 13) {
        	 var textv=$('#addValueT').textbox('getValue');
			 com.nxgrid.giscommon.admiAreaEditTools.setValue(textv);
         }
     }); */

	
	$("#fallarea").click(function(){
		if($(".fallarea").css("display") == 'none'){
			$(".fallarea").css("display","block");
			$(".zone").css("display","none");
			$(".seal").css("display","none");
			$(".trend").css("display","none");
			$(".winddirt").css("display","none");
			$(".chartBox").css("visibility", "hidden");
		}else if($(".fallarea").css("display") == 'block'){
			$(".fallarea").css("display","none");
		}
	});
     
     $("#singletrend").click(function(){
 		if($(".chartBox").css("visibility") == 'hidden'){
 			$(".chartBox").css("visibility", "visible");
 			showReleaseTime();
//  			//图层格点事件
//  			var graphicChange = gridGraphicLayer.on("click", clickHandler);
 			$(".trend").css("display","none");
 			$(".zone").css("display","none");
 			$(".fallarea").css("display","none");
 			$(".seal").css("display","none");
 			$(".winddirt").css("display","none");	
 		}else if($(".chartBox").css("visibility") == 'visible'){
 			$(".chartBox").css("visibility","hidden");
 			deleteNode();
 			graphicChange.remove();
 		}
 	});
	
	$("#winddirt").click(function(){
		if($(".winddirt").css("display")=='none'){
			$(".winddirt").css("display","block");
			$(".zone").css("display","none");
			$(".seal").css("display","none");
			$(".trend").css("display","none");
			$(".fallarea").css("display","none");
			$(".chartBox").css("visibility", "hidden");
		}
		else{
			$(".winddirt").css("display","none");
		}
	});
	
	$("#seal").click(function(){
		if($(".seal").css("display") == 'none'){
			$(".seal").css("display","block");
			$(".zone").css("display","none");
			$(".fallarea").css("display","none");
			$(".trend").css("display","none");
			$(".winddirt").css("display","none");
			$(".chartBox").css("visibility", "hidden");
		}else if($(".seal").css("display") == 'block'){
			$(".seal").css("display","none");
		}
	});
	
	$("#trend").click(function(){
		if($(".trend").css("display") == 'none'){
			$(".trend").css("display","block");
			$(".zone").css("display","none");
			$(".fallarea").css("display","none");
			$(".seal").css("display","none");
			$(".winddirt").css("display","none");
			$(".chartBox").css("visibility", "hidden");
		}else if($(".trend").css("display") == 'block'){
			$(".trend").css("display","none");
		}
	});
	
	$("#remove").click(function(){
		if($(".trend").css("display") == 'block'){
			$(".trend").css("display","none");
		}
	});

	$('#FreehandPolygon').click(function(){
		var rgb = $(this).css("background-color");
		var hex = getHexBackgroundColor(rgb);
		if(hex=="#8080ff"){
      	  $(this).css("background-color","#F58F1D");
      	  $('#EditLocation').css("background-color","#8080ff");
      	  com.nxgrid.giscommon.locationEditTools.locationDraw();
        }else if(hex=="#f58f1d"){
      	  $(this).css("background-color","#8080ff");
        }
	}); 
	$('#ClearLocation').click(function(){
		 $('#FreehandPolygon').css("background-color","#8080ff");
		 $('#EditLocation').css("background-color","#8080ff");
		 com.nxgrid.giscommon.locationEditTools.locationClear();
	}); 
	
	$('#EditLocation').click(function(){
		var rgb = $(this).css("background-color");
		var hex = getHexBackgroundColor(rgb);
		if(hex=="#8080ff"){
      	  $(this).css("background-color","#F58F1D");
      	  $('#FreehandPolygon').css("background-color","#8080ff");
      	  com.nxgrid.giscommon.locationEditTools.locationEdit();
      	  
        }else if(hex=="#f58f1d"){
      	  $(this).css("background-color","#8080ff");
        }
	}); 
	$("#removeli").mouseover(function(){
		  $(this).css("background-color","none");
	  });
	$("#clearli").mouseover(function(){
		  $(this).css("background-color","none");
	  });
	
	$('li').bind('click',function(){
		
		 var rgb = $(this).css("background-color");
			var hex = getHexBackgroundColor(rgb);
			if(hex=="#ffffff"){
	      	 	$(this).css("background-color","#006400");
	      	 	var curVal=$(this).text();
			  	curVal=parseInt(curVal);
			  	com.nxgrid.giscommon.sealEditTools.sealInter=curVal;
	        }else if(hex=="#006400"){
	      	  	$(this).css("background-color","#ffffff");
	      	   com.nxgrid.giscommon.sealEditTools.sealInter=null;
	        }
		 	 
	 	 
	}); 
	
	$('#sealBtn').bind('click',function(){
		var rgb = $(this).css("background-color");
		var hex = getHexBackgroundColor(rgb);
		if(hex=="#ffffff"){
			
      	 	$(this).css("background-color","#006400");
      	 	com.nxgrid.giscommon.sealEditTools.drawSealArea();
        }else if(hex=="#006400"){
        	
      	  	$(this).css("background-color","#ffffff");
      	  if(com.nxgrid.giscommon.sealEditTools.mapClickEvt != null)
				com.nxgrid.giscommon.sealEditTools.mapClickEvt.remove();
			if(com.nxgrid.giscommon.sealEditTools.mapMoveEvt != null)
				com.nxgrid.giscommon.sealEditTools.mapMoveEvt.remove();
			map.graphics.clear();
        }
	 	 
	}); 
	$('#selSealVal').bind('keyup', function(event) {
	 
	   if(event.keyCode=="13")
	   {
		   
		   com.nxgrid.giscommon.sealEditTools.drawSealArea();
	   }
	  
	   
	});
	
	$('#addSealStep').bind('click',function(){
		var curVal=document.getElementById("selSealVal").value;
		curVal=parseInt(curVal); 
		curVal+=1;
		document.getElementById("selSealVal").value=curVal;
	});
	$('#decSealStep').bind('click',function(){
		//document.getElementById("decSealStep").value+=1;
		var curVal=document.getElementById("selSealVal").value;
		curVal=parseInt(curVal); 
		curVal-=1;
		document.getElementById("selSealVal").value=curVal;
	});
	

	//趋势订正的加载
	$('#loadData').click(function(){
		var dutyCat = $("#dutyCat").combobox('getValue');
		var dutySel = $("#dutySel").combobox('getText');
// 		alert(dutyCat+" "+dutySel);
		getValues();
	});
	
	//趋势订正应用
	$('#application').click(function(){
		showData();
	});
	 
	$('#doBtn').click(function(){
		//com.nxgrid.giscommon.admiAreaEditTools.
		 var chav=$('#changeSliderT').textbox('getValue');
		 var setv=$('#setValueT').textbox('getValue');
		 if(setv!=null)
		 {
			 com.nxgrid.giscommon.admiAreaEditTools.setValue(setv);
		 }
		/*  if(chav!=null)
		 {
			 com.nxgrid.giscommon.admiAreaEditTools.changeValue(chav);
		 }
		 */
         
	});
	 
	$('#admiAddBtn').click(function(){
		 var chav=$('#changeSliderT').textbox('getValue');
		 var chaName=this.textContent;
		 if(chav!=null)
		 {
			 com.nxgrid.giscommon.admiAreaEditTools.changeValue(chaName,chav);
		 }  
	});
	$('#admiDecBtn').click(function(){
		
		 var chav=$('#changeSliderT').textbox('getValue');
		 var chaName=this.textContent;
		 if(chav!=null)
		 {
			 com.nxgrid.giscommon.admiAreaEditTools.changeValue(chaName,chav);
		 }  
	});
	
	$('#zoneduty').combobox({
		 onSelect: function (record) {
			/* alert(record.value); */
			var t=record.value;
			editHandler(t);
			//com.nxgrid.giscommon.admiAreaEditTools.editHandler(t);
		 }  
	}); 
	
	
	$('#dutyCat').combobox({
		 onSelect: function (record) {
			
			/* alert(record.value); */
			var t=record.value;
			boundarySelect(t);
		 }
	}); 
	$('#timeSel').combobox({
		 onSelect: function (record) {
			
			/* alert(record.value); */
			var t=record.value;
			timeSelect(t);
		 }
	}); 
	
	function getHexBackgroundColor(rgb){
		  rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		  function hex(x) {
		  return ("0" + parseInt(x).toString(16)).slice(-2);
		  }
		  rgb= "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		  return rgb; 
	  }

    
});
</script>

	<div id="left">
		<div id="fallarea">
			<button>落区</button>
		</div>
		<div id="zone">
			<button>区划</button>
		</div>
		<div id="trend">
			<button>区划趋势</button>
		</div>
		<div id="singletrend">
			<button>单点趋势</button>
		</div>
		<div id="winddirt">
			<button>风向</button>
		</div>
		<div id="windspeed">
			<button>风速</button>
		</div>
		<div id="seal">
			<button>盖章</button>
		</div>
	</div>
	
	<!-- 区划订正开始 -->
	<div class="zone" style="display: none;">
		
		<table >
		    <tr>
				<td>
					<label>区域：</label>
				</td>		    
		    	<td>
		    	    <select id="zoneduty" class="easyui-combobox" name="zoneType"
						style="width:100px;" panelHeight="auto">
						<option selected="selected">请选择边界</option>
						<option >全区</option>
						<option value="640100">银川市</option>
						<option value="640200">石嘴山</option>
						<option value="640300">吴忠市</option>
						<option value="640400">固原市</option>
						<option value="640500">中卫市</option>
					</select>
				</td>
				<td>
					<div id="selDiv">
					： <select id="xduty" class="easyui-combobox" name="zoneSelected"
						style="width: 110px;" panelHeight="auto">
					</select>
					</div>
		    	</td>
		    </tr>
			<tr style="height:40px">
				<td>
					<label>赋值：</label>
				</td>
				<td >
					<input id="setValueT"class="easyui-textbox" style="width:50px" value="0"/>
					<button id="doBtn" style="width:45px">执行</button>
				</td> 
			</tr>
			<tr style="height:40px">
				<td>
					<label>加减：</label>
				</td>
				<td>
					<button id="admiAddBtn" style="width:30px">+</button>
					<input id="changeSliderT"class="easyui-textbox" style="width:30px;text-align:center" value="0"/>
					<button id="admiDecBtn" style="width:30px">-</button>
				</td>
			</tr>
		</table>
	</div>
	<!-- 区划订正结束  -->
	
	<!-- 落区订正开始  -->
	<div class="fallarea" id="info" style="display: none;">
		<button id="FreehandPolygon">绘制落区</button>
		<button id="ClearLocation" >清除落区</button>
		<button id="">拾取落区</button>
		<button id="EditLocation">修改落区</button>
	</div>
	<!-- 落区订正结束 -->
	
	<!-- 风向订正  -->
	<div class="winddirt" style="display: none;">
		<span>影响半径：</span><input id="windRadius" type="text" value="10" style="width: 120px;"/>
		
		<button id="windLineDrawBtn" onclick="javascripts:com.nxgrid.giscommon.editToolWind.lineDraw()">自由绘制</button>
		<button id="windAreaDrawBtn" onclick="javascripts:com.nxgrid.giscommon.editToolWind.areaDraw()">落区绘制</button>
	</div>
	
	<!-- 盖章开始 -->
	<div class="seal" style="display: none;">
	<!-- <ul> -->
	    <table style="width:100%;height:100%">
		    <tr>
		   	 <td>
		   	 	<li>1</li><li>2</li><li>3</li><li>4</li><li>5</li>
				<li>6</li><li>7</li><li>8</li><li>9</li><li>10</li>
				<li>15</li><li>20</li><li>25</li><li>30</li><li>35</li>
				<li>40</li><li>45</li><li>50</li><li>75</li><li>100</li>
		   	 </td>
		    </tr>
		    <tr>
		    	<td>
		    	    <label>半径：</label>
			    	<button id="addSealStep" style="width:25px">+</button>
					<input id="selSealVal" type="text" style="width:45px;text-align:center " value="20" />
					<button id="decSealStep" style="width:25px">-</button>
		    	</td>
		    </tr>
		    <tr>
		    	<td style="text-align:center">
		    		<button id="sealBtn" style="width:60px;" >盖章</button>
		    	</td>
		    </tr>
	    </table>
		
	</div>
	<!-- 盖章结束 -->
	
	<!-- 趋势开始 -->
<div class="trend" style="display: none;">
	<div id="trendTop">
		<span class="trendSpan">趋势订正</span>
		<button id="remove"></button>
	</div>
	<div id="trendLeft">
		<span>市级区域：</span><select id="dutyCat" class="easyui-combobox"
			name="dutyCat" style="width: 120px;" panelHeight="auto">
			<!-- <option selected="selected" value="city">地市边界</option>
			<option value="county">县边界</option> -->
			<option selected="selected">请选择边界</option>
			<option value="640100">银川市</option>
			<option value="640200">石嘴山</option>
			<option value="640300">吴忠市</option>
			<option value="640400">固原市</option>
			<option value="640500">中卫市</option>
		</select></br> 
		<span>县级区域：</span>
		<select id="dutySel"
			class="easyui-combobox" name="dutySel" style="width: 120px;" panelHeight="auto">
		</select>
		<br>
		<span>时间选择：</span><select id="timeSel"
			class="easyui-combobox" name="timeSel" style="width: 120px;" panelHeight="auto">
			<option selected="selected" value="1">1天</option>
			<option value="2">2天</option>
			<option value="3">3天</option>
			<option value="4">4天</option>
			<option value="5">5天</option>
			<option value="6">6天</option>
			<option value="7">7天</option>
			<option value="8">8天</option>
			<option value="9">9天</option>
			<option value="10">10天</option>
		</select><br>
		<!-- <span>代表站点：</span><input type="text" value="武威（52679）" style="width: 114px;"/><br> -->
		<span>
			<!-- <button id="loadData">加载</button> -->
			<button id="application" style="margin-left: 30px;">应用</button>
		</span>
	</div>
	<div id="trendRight"></div>
</div>
<!-- 趋势结束 -->