
(function() {
	Namespace.register("com.nxgrid.giscommon.sealEditTools");
	require([
	    "esri/toolbars/draw",
	    "esri/graphic",
	    "esri/geometry/Point",
	    "esri/symbols/SimpleFillSymbol",
	    "esri/symbols/SimpleLineSymbol",
	    "esri/symbols/SimpleMarkerSymbol",
	    "esri/geometry/Circle",
	    "esri/units",
	    "esri/Color",
	    "esri/SpatialReference"
	  ],
	  function(
	    Draw,
	    Graphic,
	    Point,
	    SimpleFillSymbol,
	    SimpleLineSymbol,
	    SimpleMarkerSymbol,
	    Circle,
	    Units,
	    Color,
	    SpatialReference
	  ) {
		com.nxgrid.giscommon.sealEditTools=
		{
			sealInter:null,
			mapClickEvt:null,
			mapMoveEvt:null,
			drawSealArea:function()
 			{
				var circleSymb = new SimpleFillSymbol(
						SimpleFillSymbol.STYLE_NULL, new SimpleLineSymbol(
								SimpleLineSymbol.STYLE_SHORTDASHDOTDOT,
								new Color([ 105, 105, 105 ]), 2), new Color([
								255, 255, 0, 0.25 ]));

				var circle;				
				com.nxgrid.giscommon.sealEditTools.mapMoveEvt=getGridGraphicLayer().on("mouse-move",function(evt){
					var rad = document.getElementById("selSealVal").value;
					rad = parseFloat(rad);
					circle = new Circle({
						center : evt.mapPoint,
						geodesic : false,
						radius : rad,
						radiusUnit : Units.KILOMETERS
					});
					map.graphics.clear();
					var graphic = new Graphic(circle, circleSymb);
					map.graphics.add(graphic);
				});
				com.nxgrid.giscommon.sealEditTools.mapClickEvt=getGridGraphicLayer().on("click", function(evt) {
				   
					var mList = JSON.parse(localStorage.getItem("points"));
					var tempList=[];
					
					var graphic = new Graphic(circle, circleSymb);
					map.graphics.add(graphic);
					 
					if(mList!=null)
					{
						for (var i = 0; i < mList.length; i++) 
						{
							var p = new Point(mList[i].lng, mList[i].lat,new SpatialReference({ wkid:4326 }));
							
							if (circle.contains(p)) {
								//alert(com.nxgrid.giscommon.sealEditTools.sealInter);
								var distance=com.nxgrid.giscommon.sealEditTools.getDistance(mList[i].lat,mList[i].lng,evt.mapPoint.y,evt.mapPoint.x);
								//alert(mList[i].value);
								var tempMap= new Object();
								tempMap.distance=distance.toFixed(3);
								tempMap.lng=mList[i].lng;
								tempMap.lat=mList[i].lat;
								tempMap.value=mList[i].value;
								tempMap.id=mList[i].id;
								tempList.push(tempMap);
							
							}

						}
						
						if(tempList!=null)
						{
							
							var disList=[];
							for(var i=0;i<tempList.length;i++)
							{
								disList.push(tempList[i].distance);
							}
							var minDis=Math.min.apply(null,disList);
							var maxDis=Math.max.apply(null,disList);
							
							var interValue = com.nxgrid.giscommon.sealEditTools.sealInter;
							if(document.getElementById("sealCheck").checked){
								interValue = interValue*-1;
							}
							var rvList=com.nxgrid.giscommon.sealEditTools.ratedValue(interValue,minDis);
						
                            //数组按距离排序
							//tempList=com.nxgrid.giscommon.sealEditTools.sortByDis(tempList);
                            //alert(tempList[0].value);
                            if(tempList.length>1 && rvList.length>1)
                            {
                            	 
                        		for(var j=0;j<tempList.length;j++)
    							{ 
                        			//alert(j+"  dis:"+tempList[j].distance);
    								for(var n=0;n<rvList.length;n++)
    								{
    									//alert(n+"rvList"+rvList[n].dis);
    									if(n<rvList.length-1)
    									{
    										if(n==0&&tempList[j].distance==rvList[0].dis)
    										{
    											//alert(rvList[0].dis+"tempList[0]"+tempList[0].distance);
    											var tl=parseFloat(tempList[j].value);
    			                            	var rl=parseFloat(rvList[0].rVal)
    			                            	 tl+=rl ;
    			                            	tempList[j].value=tl;
    											
    										}else if(parseFloat(tempList[j].distance)>parseFloat(rvList[n].dis) && parseFloat(tempList[j].distance)<=parseFloat(rvList[n+1].dis))
    										{
    										   
    											//alert("修改前：tempList["+j+"].distance:"+tempList[j].distance+" value"+tempList[j].value+"rvList["+n+"].rVal:"+ parseFloat(rvList[n].rVal));
    											//tempList[j].value=parseFloat(tempList[j].value)
    											var tl1=parseFloat(tempList[j].value);
    			                            	var rl1=parseFloat(rvList[n+1].rVal);
    			                            	 tl1+=rl1;
    			                            	tempList[j].value=tl1;
    											//tempList[j].value+= parseFloat(rvList[n].rVal);
    											//alert("修改后："+tempList[j].value);
    											
    										}
    									}else if(n==rvList.length-1)
    									{
    										if(parseFloat(tempList[j].distance)<=parseFloat(rvList[n].dis) && parseFloat(tempList[j].distance)>parseFloat(rvList[n-1].dis))
    										{
    											
    											var tl2=parseFloat(tempList[j].value);
    			                            	var rl2=parseFloat(rvList[n].rVal);
    			                            	tl2 += rl2 ;
    			                            	tempList[j].value=tl2;
    											//tempList[j].value += parseFloat(rvList[n].rVal);
    											
    										}
    									}
    									
    								}
    								
    							}
                            }else if(tempList.length==1 )
                            {
                            	//alert("修改前："+tempList[0].value+"  rvList[0].rVal:"+rvList[0].rVal);
                            	var tl2=parseFloat(tempList[0].value);
                            	var rl2=parseFloat(rvList[0].rVal)
                            	 tl2+=rl2 ;
                            	tempList[0].value=tl2;
                            	//alert("修改后："+tempList[0].value);
                            }
                            //testVar2=tempList;
                            //alert(tempList[0].value);
							for(var g=0;g<mList.length;g++)
							{
								for(var k=0;k<tempList.length;k++)
								{
									if(tempList[k].lng==mList[g].lng && tempList[k].lat==mList[g].lat)
									{
										var tmpVar=parseFloat(tempList[k].value);
										mList[g].value=tmpVar.toFixed(2);
										//mList[g].value=(mList[g].value).toFixed(2);
										//break;
									}
									
								}
							}
							//alert(minDis);
							localStorage.setItem("points",JSON.stringify(mList));
							com.nxgrid.giscommon.sealEditTools.reDrawGrid(tempList);
							com.nxgrid.giscommon.gridTrendService.doTrendArea(circle,NxgridConfig.gridTrend.influenceDis,map,interValue);
						}
					}	
					//com.nxgrid.giscommon.sealEditTools.mapClickEvt.remove();
				});
				
			},
			sortByDis:function(disList)
			{
				var a=disList;
				for(var i=0;i<a.length;i++){
				    for(var j = i + 1;j<a.length;j++){
				        
				        if(parseFloat(a[i].distance)>parseFloat(a[j].distance)){
				            var tmp = a[i];
				            a[i] = a[j];
				            a[j] = tmp;
				        }
				    }
				}
				return a;
			},
			ratedValue:function(cVal,minDis)
			{
				var r=document.getElementById("selSealVal").value;
				r=parseFloat(r);
				if(cVal==null)
				{
					alert("没有选择，中心点的值，请选择！");
					return null;
				}
				var rvList=[];
				var s=(5*Math.sqrt(2)).toFixed(3)*1000;
				var p=s.toFixed(3);
				var n=Math.round(r/5);
				//var minDis=0;
				var m=(cVal/n).toFixed(2);
				if(n<1)
				{
					n=1;
				}
				for(var i=0;i<=n;i++)
				{
					if(i==0)
					{
						var tmp=new Object();
						tmp.rVal=cVal.toFixed(2);
						tmp.dis=minDis;
						rvList.push(tmp);
					}else if(i>0)
					{
						cVal -= m;
						minDis +=5000;
						var tmp=new Object();
						tmp.rVal=cVal.toFixed(2);
						tmp.dis=minDis.toFixed(3);
						rvList.push(tmp);
					}
					
				}
				return rvList;
			},
			reDrawGrid:function(pList)
			{
				//alert("重绘格点数据");
				var graphicLayer= getGridGraphicLayer();
				var gList = getGridGraphicLayer().graphics;
				if(pList!=null && gList!=null)
				{
					
					for(var i=0;i<pList.length;i++)
					{
						for(var j=0;j<gList.length;j++)
						{
							if(pList[i].lat==gList[j].attributes.lat && pList[i].lng==gList[j].attributes.log)
							{
								
								var n= parseFloat(pList[i].value); 
								n= n.toFixed(2); 
								getGridGraphicLayer().graphics[j].attributes.gridValue=n;
								getGridGraphicLayer().graphics[j].symbol.text=n;
								
							}
							//修改编辑区内的格点图例
							if("cl"+pList[i].id==gList[j].attributes.id)
							{
								
								var type=JSON.parse(localStorage.getItem("gridType")); 
								
								var f= parseFloat(pList[i].value); 
								f= f.toFixed(2); 
								if(type!=null)
								{
									var cl=getRGBNumList(type,f);
								}
								getGridGraphicLayer().graphics[j].symbol.color.r=cl[0];
								getGridGraphicLayer().graphics[j].symbol.color.g=cl[1];
								getGridGraphicLayer().graphics[j].symbol.color.b=cl[2];
								
							}
						}
					}
				}
				else 
				{
					alert("数据加载失败，请重试！");
				}
				//localStorage.setItem("points",JSON.stringify(mList)); 
				//localStorage.setItem("innerPoints",JSON.stringify(pList));
				getGridGraphicLayer().redraw();
			},
			toRad:function(d)
			{
				return d * Math.PI / 180; 
			},
			getDistance:function(lat1, lng1, lat2, lng2)
			{
				
				var EARTH_RADIUS = 6378137.0;    //单位M
			  
				var f = com.nxgrid.giscommon.sealEditTools.toRad((lat1 + lat2)/2);
		        var g = com.nxgrid.giscommon.sealEditTools.toRad((lat1 - lat2)/2);
		        var l = com.nxgrid.giscommon.sealEditTools.toRad((lng1 - lng2)/2);
		        
		        var sg = Math.sin(g);
		        var sl = Math.sin(l);
		        var sf = Math.sin(f);
		        
		        var s,c,w,r,d,h1,h2;
		        var a = EARTH_RADIUS;
		        var fl = 1/298.257;
		        
		        sg = sg*sg;
		        sl = sl*sl;
		        sf = sf*sf;
		        
		        s = sg*(1-sl) + (1-sf)*sl;
		        c = (1-sg)*(1-sl) + sf*sl;
		        
		        w = Math.atan(Math.sqrt(s/c));
		        r = Math.sqrt(s*c)/w;
		        d = 2*w*a;
		        h1 = (3*r -1)/2/c;
		        h2 = (3*r +1)/2/s;
		        
		        return d*(1 + fl*(h1*sf*(1-sg) - h2*(1-sf)*sg));
			},
			sealhandle:function()
			{
				
				//com.nxgrid.giscommon.sealEditTools.mapClickEvt.;
				//com.nxgrid.giscommon.sealEditTools.mapClickEvt.remove();
				//alert("2");
				com.nxgrid.giscommon.sealEditTools.drawSealArea();
			},
			removeClick:function()
			{
				
				map.graphics.clear();
				if(com.nxgrid.giscommon.sealEditTools.mapClickEvt != null)
					com.nxgrid.giscommon.sealEditTools.mapClickEvt.remove();
				if(com.nxgrid.giscommon.sealEditTools.mapMoveEvt != null)
					com.nxgrid.giscommon.sealEditTools.mapMoveEvt.remove();
			}
		}
	});
})();