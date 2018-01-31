// 获取RGB
function getRGB(color) {
	// var rgbnumList=[];
	var obj = new Object();
	obj.r = parseInt(color.substr(1, 2), 16);
	obj.g = parseInt(color.substr(3, 2), 16);
	obj.b = parseInt(color.substr(5, 2), 16);
	return obj;
}

// 获取颜色对象
function getColor(obj) {
	obj.r = Math.round(obj.r);
	obj.g = Math.round(obj.g);
	obj.b = Math.round(obj.b);	
	var color = '#';	
	color += (obj.r < 16 ? '0' : '') + obj.r.toString(16);
	color += (obj.g < 16 ? '0' : '') + obj.g.toString(16);
	color += (obj.b < 16 ? '0' : '') + obj.b.toString(16);
	color +='7f';
	return color;
}


// 动态创建图例按钮

//展示图例

function showWeaherLengContr(type, isShow) {	
	$('#temperCorLegendTD').html("");
	var ldiv = document.getElementById("temperCorLegend");
	if (isShow == true) {
		ldiv.style.visibility = "visible";
		setWeahterLeng(type);
	} else {
		// 关闭图例
		ldiv.style.visibility = "hidden";
		deleWeatherLegend();
	}
}

function deleWeatherLegend() {
	$('#temperCorLegendTD').html("");
}
//自动创建图例div
function dynCreatebtns(btnCount, obj, corName) {	
	for (i = 0; i < btnCount; i++) {
		var input = document.createElement("input");
		input.type = "button";
		input.value = obj[i].text;
		input.id = corName + (i + 1);
		curColor = obj[i];
		input.style.width = "60px";
		input.style.textAlign = "center";
		input.style.background = getColor(curColor);
		$('#temperCorLegendTD').append(input)
	}
}

/**
 * 根据类型获取颜色对象
 * 
 * @param type
 * @returns
 */
function setWeahterLeng(type) {
	var curColor = null;
	var str = JSON.stringify(type);
	var typeName = type;
	var cColor = getWeaherCorList(type);
	var cl = cColor.length;
	if (!document.getElementById(typeName + "CorBtn1")) {
		dynCreatebtns(cl, cColor, typeName + "CorBtn");
	}
}

function getWeaherCorList(type) {
	var curColor = null;
	switch (type) {
	case gridType.EDA10:
		curColor = NxgridConfig.weatherLegend.windCor;
		break;
	case gridType.ER03:
		curColor = NxgridConfig.weatherLegend.rainCor;
		break;
	case gridType.TMP:
	case gridType.TMAX:
	case gridType.TMIN:
		curColor = NxgridConfig.weatherLegend.temperatureCor;
		break;
	case gridType.ERH:
	case gridType.ERHA:
	case gridType.ERHI:
		curColor = NxgridConfig.weatherLegend.humidityCor;
		break;
	case gridType.VIS03:
		curColor = NxgridConfig.weatherLegend.VIS03Cor;
		break;
	case gridType.ECT:
		curColor = NxgridConfig.weatherLegend.ECTCor;
		break;
	case gridType.Haze03:
		curColor = NxgridConfig.weatherLegend.Haze03Cor;
		break;
	case gridType.SAND03:
		curColor = NxgridConfig.weatherLegend.SAND03Cor;
		break;
	case gridType.RAT03:
		curColor = NxgridConfig.weatherLegend.RAT03Cor;
		break;
	case gridType.SSM03:
		curColor = NxgridConfig.weatherLegend.SSM03Cor;
		break;
	case gridType.HAIL03:
	case  gridType.SMG03:
		curColor = NxgridConfig.weatherLegend.HAIL03Cor;
		break;
	case gridType.PPH03:
		curColor = NxgridConfig.weatherLegend.PPH03Cor;
		break;
	case gridType.FOG03:
		curColor = NxgridConfig.weatherLegend.FOG03Cor;
		break;
	default:
		curColor = NxgridConfig.weatherLegend.temperatureCor;
	}
	return curColor;
}
//对外接口获取各图例个数
function getLegendMemb(type)
{
	var legMembers = null;
	if (gridType.TMP == type || gridType.TMAX == type || gridType.TMIN == type)
		legMembers = NxgridConfig.weatherLegend.temperatureCor.length;
	else if (gridType.EDA10 == type)
		legMembers = NxgridConfig.weatherLegend.windCor.length;
	else if (gridType.ER03 == type)
		legMembers = NxgridConfig.weatherLegend.rainCor.length;
	else if (gridType.ERH == type || gridType.ERHA == type || gridType.ERHI == type)
		legMembers = NxgridConfig.weatherLegend.humidityCor.length;
	else if (gridType.VIS03 == type)
		legMembers = NxgridConfig.weatherLegend.VIS03Cor.length;
	else if (gridType.ECT == type)
		legMembers = NxgridConfig.weatherLegend.ECTCor.length;
	else if (gridType.Haze03 == type)
		legMembers = NxgridConfig.weatherLegend.Haze03Cor.length;
	else if (gridType.SAND03 == type)
		legMembers = NxgridConfig.weatherLegend.SAND03Cor.length;
	else if (gridType.RAT03 == type)
		legMembers = NxgridConfig.weatherLegend.RAT03Cor.length;
	else if (gridType.SSM03 == type)
		legMembers = NxgridConfig.weatherLegend.SSM03Cor.length;
	else if (gridType.HAIL03 == type || gridType.SMG03 == type)
		legMembers = NxgridConfig.weatherLegend.HAIL03Cor.length;
	else if (gridType.PPH03 == type)
		legMembers = NxgridConfig.weatherLegend.PPH03Cor.length;
	else if (gridType.FOG03 == type)
		legMembers = NxgridConfig.weatherLegend.FOG03Cor.length;
	else
		legMembers = NxgridConfig.weatherLegend.temperatureCor.length;
    return legMembers;
}
function getRGBById(RGBNumList,tempCor,index) {
	RGBNumList.push(tempCor[index].r);
 	RGBNumList.push(tempCor[index].g);
 	RGBNumList.push(tempCor[index].b);
 	return RGBNumList;
}
//对外根据id获取Rgb数值列表
function getCorById(type,index)
{
	var legMembers = null;
	var tempCor=null;
	var RGBNumList = [];
	if (gridType.TMP == type || gridType.TMAX == type || gridType.TMIN == type){
	 	tempCor = NxgridConfig.weatherLegend.temperatureCor;
	 	RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}
	else if (gridType.EDA10 == type)
	{

		tempCor = NxgridConfig.weatherLegend.windCor;
		RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}
	else if (gridType.ER03 == type)
	{
		tempCor = NxgridConfig.weatherLegend.rainCor;
		RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}
	else if (gridType.ERH == type || gridType.ERHA == type || gridType.ERHI == type)
	{
		tempCor = NxgridConfig.weatherLegend.humidityCor;
		RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}
	else if (gridType.VIS03 == type)
	{

		tempCor = NxgridConfig.weatherLegend.VIS03Cor;
		RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}
	else if (gridType.ECT == type)
	{
		tempCor = NxgridConfig.weatherLegend.ECTCor;
		RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}
	else if(gridType.Haze03 == type){
		tempCor = NxgridConfig.weatherLegend.Haze03Cor;
		RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}
	else if(gridType.SAND03 == type){
		tempCor = NxgridConfig.weatherLegend.SAND03Cor;
		RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}else if(gridType.RAT03 == type){
		tempCor = NxgridConfig.weatherLegend.RAT03Cor;
		RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}else if(gridType.SSM03 == type){
		tempCor = NxgridConfig.weatherLegend.SSM03Cor;
		RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}else if(gridType.HAIL03 == type || gridType.SMG03 == type){
		tempCor = NxgridConfig.weatherLegend.HAIL03Cor;
		RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}else if(gridType.PPH03 == type){
		tempCor = NxgridConfig.weatherLegend.PPH03Cor;
		RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}else if(gridType.FOG03 == type){
		tempCor = NxgridConfig.weatherLegend.FOG03Cor;
		RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}		
	else{
		tempCor = NxgridConfig.weatherLegend.temperatureCor;
		RGBNumList=getRGBById(RGBNumList,tempCor,index) ;
	}
	return RGBNumList;
}
//对外接口
function getRGBNumList(type, value) {
	var tempCor = null;
	if (gridType.TMP == type || gridType.TMAX == type || gridType.TMIN == type)
		tempCor = NxgridConfig.weatherLegend.temperatureCor;
	else if (gridType.EDA10 == type)
		tempCor = NxgridConfig.weatherLegend.windCor;
	else if (gridType.ER03 == type|| gridType.ER06 == type|| gridType.ER12 == type|| gridType.ER24 == type)
		tempCor = NxgridConfig.weatherLegend.rainCor;
	else if (gridType.ERH == type || gridType.ERHA == type || gridType.ERHI == type)
		tempCor = NxgridConfig.weatherLegend.humidityCor;
	else if (gridType.VIS03 == type)
		tempCor = NxgridConfig.weatherLegend.VIS03Cor;
	else if (gridType.ECT == type)
		tempCor = NxgridConfig.weatherLegend.ECTCor;
	else if (gridType.Haze03 == type)
		tempCor = NxgridConfig.weatherLegend.Haze03Cor;
	else if (gridType.SAND03 == type)
		tempCor = NxgridConfig.weatherLegend.SAND03Cor;
	else if (gridType.RAT03 == type)
		tempCor = NxgridConfig.weatherLegend.RAT03Cor;
	else if (gridType.SSM03 == type )
		tempCor = NxgridConfig.weatherLegend.SSM03Cor;
	else if (gridType.HAIL03 == type || gridType.SMG03 == type)
		tempCor = NxgridConfig.weatherLegend.HAIL03Cor;
	else if (gridType.PPH03 == type)
		tempCor = NxgridConfig.weatherLegend.PPH03Cor;
	else if (gridType.FOG03 == type)
		tempCor = NxgridConfig.weatherLegend.FOG03Cor;
	else
		tempCor = NxgridConfig.weatherLegend.temperatureCor;

	var RGBNumList = [];
	var tl = tempCor.length;
	//遍历配置文件，找到对应的rgb
	/*for (i = 0; i < tl - 1; i++) {
		var valmin = tempCor[i].value;
		var valmax = tempCor[i + 1].value;	
		
		if (value >= valmin && value < valmax) {
			RGBNumList.push(tempCor[i].r);
			RGBNumList.push(tempCor[i].g);
			RGBNumList.push(tempCor[i].b);
			break; 
		}		
	}*/
	var valmin,valmax=999;
	
	for (i = 0; i < tl; i++) {
		valmin = tempCor[i].value;
		if(i+1<tl){
			valmax = tempCor[i+1].value;
		}
		valmin = parseFloat(valmin);
		valmax = parseFloat(valmax);
		value = parseFloat(value);
		if (value >= valmin && value < valmax) {
			RGBNumList.push(tempCor[i].r);
			RGBNumList.push(tempCor[i].g);
			RGBNumList.push(tempCor[i].b);
			break; 
		}		
	}
	//判断溢出处理
	 if(RGBNumList.length  == 0){
		 RGBNumList.push(tempCor[tl - 1].r);
			RGBNumList.push(tempCor[tl - 1].g);
			RGBNumList.push(tempCor[tl - 1].b);
	 }
	return RGBNumList;
}