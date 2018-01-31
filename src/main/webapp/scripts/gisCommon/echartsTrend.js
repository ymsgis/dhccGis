
function boundarySelect(t) {
	if(t!="请选择边界"){
		var codeName="DIST_CODE";
		var url=NxgridConfig.MapConfig.nxadmiUrl+"1";
		var sqlStr=codeName+" = "+t;
		var level=1;
		//地图查询定位缩放
		admiQueryHandler(sqlStr,url);
		//加载曲线
		loadTrendChart(t,level);
		$('#dutySel').combobox('clear');
		$('#dutySel').combobox({
			url:NxgridConfig.LocationEditToolsP.nxGetcntyUrl+t,
			valueField:'code',
			textField:'name',
			onSelect: function (record) {
				var codeName="CNTY_CODE";
				var codeValue=record.code;
				var xurl=NxgridConfig.MapConfig.nxadmiUrl+"2";
				var sqlStr=codeName+" = "+codeValue;
				admiQueryHandler(sqlStr,xurl);
				loadTrendChart(codeValue,level);
			}
		});
	}
}
function loadTrendChart(code,level)
{
	$.ajax({		
		url:NxgridConfig.TrendCorrect.trendBoudQueryUrl,
		type:"POST",
		dataType : 'json',
		data:{code:code,level:level},
		success: function(data){
			var result=data;
			if(result.length==0)
			{
				alert("没有找到站点！");
			    return;
			}else{
				var qId="0"+result[0].gridX+"0"+result[0].gridY;
				//var station;
				var now =new Date();
				var qDate=now.getFullYear()+"-"+((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate();
				for(i=0;i<qDate.length;i++){
					qDate=qDate.replace("-","");
					}
				var qUrl = NxgridConfig.MapConfig.nxLoadGridUrl+NxgridConfig.TrendCorrect.trendCurve+"id="+code+'&date='+qDate+'&hour='+'8';
				alert(qUrl);
				$.ajax({
					url:qUrl,
					type:"POST",
					dataType : 'jsonp',
					success: function(data){
						var result=[];
						result=data.data;
						showTrend(result);
					},
					error:function(resp, msg)
					{
						var json = $.parseJSON(resp.responseText);
						console.log(json);
						alert("err："+msg);
						alert("ajax请求失败！");
					}
				});
			}
		},
		error:function(resp, msg)
		{
			var json = $.parseJSON(resp.responseText);
			console.log(json);
			alert("err："+msg);
			alert("ajax请求失败！");
		}
	});
	}
/*function zoomToRender(x,y,level)
{
	require([
		"esri/graphic",
		"esri/geometry/Point",
		"esri/symbols/SimpleFillSymbol",
		"esri/symbols/SimpleLineSymbol",
		"esri/Color",
		"esri/SpatialReference"
	],function(Graphic,Point,SimpleFillSymbol,SimpleLineSymbol,Color,SpatialReference){
		map.graphics.clear();
		var tmpSymb = new SimpleFillSymbol(SimpleFillSymbol.STYLE_NULL,
			    new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT,
			    	    new Color([255,0,0]), 2),new Color([255,255,0,0.25])
			    	  );
		var graphic = new Graphic(geometry, tmpSymb);
		var cPoint=new Point(x,y,new SpatialReference({ wkid:4326 }));
		map.graphics.add(graphic);
		map.centerAndZoom(cPoint,level);
	});
}
*/
function timeSelect(t)
{
	var n=t*24/3;
	var cataList=[];
	if(n!=0)
	{
		for(var i=1;i<=n;i++)
		{
			cataList.push(3*i);
		}
	}
  //GridLoad.loadGrid($(this).text(),$("#createTime").datebox('getValue'),$("#currentElement").combobox('getValue'),window.parent.getMapLevel());
   //showTrend(cataList);
}

function showTrend(data) {
	var symbolSize = 10;
	var categories = [ '3h', '6h', '9h', '12h', '15h', '18h', '21h', '24h' ];//类别数组（x轴值）
	var myChart = echarts.init(document.getElementById('trendRight'));

	myChart.setOption({
		tooltip : {
			triggerOn : 'none',
			formatter : function(params) {
				return 'X: ' + params.data[0].toFixed(2) + '<br>Y: '
						+ params.data[1].toFixed(2);
			}
		},
		xAxis : [ {
			
			type : 'category',
			splitNumber : 24,//划分为24个间隔
			boundaryGap : false,
			data : categories,
			axisLine : {//x轴的横坐标边框线
				show : false
			},
			axisTick : {
				show : false,
			},
			axisLabel : {
				show : true,
				textStyle : {
					fontSize : "8px",
					color : "black",
					align : "center"
				},
				formatter : function(e) {
					return e;
				}
			},
			splitLine : {//背景图的内置表格中“边框”的颜色线条  这个是x轴的竖线
				show : true,
				lineStyle : {
					color : "#e4e4e4",
					type : "solid",
					opacity : "0.75"
				}
			}
		} ],

		yAxis : [ {
			min : -20,
			max : 40,
			type : 'value',
			splitNumber : 7,
			axisLine : {
				show : true,
				lineStyle : {
					color : "#e4e4e4"
				}
			},
			axisTick : {
				show : false,
			},
			axisLabel : {
				show : true,
				textStyle : {
					fontSize : "8px",
					color : "black"
				}
			},
			splitLine : {//背景图的内置表格中“边框”的颜色线条   这个是y轴的横线
				show : true,
				lineStyle : {
					color : "#e4e4e4",
					type : "solid",
					opacity : "0.75"
				}
			}
		} ],
		lineStyle : {
			normal : {
				type : 'solid',
				color : "#28a5fc",
				opacity : "0.75"
			}
		},
		series : [ {
			id : 'a',
			type : 'line',
			smooth : true,
			symbolSize : symbolSize,
			lineStyle : {//折线的颜色
				normal : {
					color : "#1ba0fc",
					width : 1,
					type : 'solid',
					opacity : "0.75"
				//shadowBlur:80
				},
			
			},
			areaStyle : {
				normal : {
					color : new echarts.graphic.LinearGradient(0, 0, 0, 1, [ {
						offset : 0,
						color : 'rgba(40, 182, 252, 0.85)'
					}, {
						offset : 1,
						color : 'rgba(28, 159, 255, 0.2)'
					} ])
				}
			},
			itemStyle : {
				normal : {
					color : "#96BBCD",
					barBorderColor : "#FAFCFD",
				}
			},
			data : data
		} ],
		grid : {
			left : 20,
			top : 10,
			bottom : 20,
			right : 10,
			show : true,
			borderColor : "#e4e4e4",//网格边框线
			shadowColor : "#e4e4e4",
			borderWidth : "0.2",
			containLabel : false
		}
	});

	myChart.setOption({
		graphic : echarts.util.map(data, function(item, dataIndex) {
			return {
				type : 'circle',
				position : myChart.convertToPixel('grid', item),
				shape : {
					r : symbolSize / 2,
				},
				invisible : true,
				draggable : true,
				ondrag : echarts.util.curry(onPointDragging, dataIndex),
				onmousemove : echarts.util.curry(showTooltip, dataIndex),
				onmouseout : echarts.util.curry(hideTooltip, dataIndex),
				z : 100
			};
		})

	});

	window.addEventListener('resize', function() {
		myChart.setOption({
			graphic : echarts.util.map(data, function(item, dataIndex) {
				return {
					position : myChart.convertToPixel('grid', item)
				};
			})
		});
	});

	function showTooltip(dataIndex) {//显示鼠标移入圆圈点的数值
		myChart.dispatchAction({
			type : 'showTip',
			seriesIndex : 0,
			dataIndex : dataIndex
		});
	}

	function hideTooltip(dataIndex) {//隐藏
		myChart.dispatchAction({
			type : 'hideTip'
		});
	}

	function onPointDragging(dataIndex, dx, dy) {
		data[dataIndex] = myChart.convertFromPixel('grid', this.position);
		myChart.setOption({
			series : [ {
				id : 'a',
				data : data
			} ]
		});
		var dataValues = data;
		localStorage.setItem("data", JSON.stringify(dataValues));
	}
}

function appTrendH() {
	//var dList = JSON.parse(localStorage.getItem("data"));
	/*if (dList != null && dList.length > 0) {
		var yData = [];
		for (i = 0; i < dList.length; i++) {
			yData.push(dList[i]);
		}
		alert(yData['3']);
	}*/
	var qDate;
	
	var mList = JSON.parse(localStorage.getItem("points"));
}
