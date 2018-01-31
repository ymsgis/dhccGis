/**
 * 实况数据加载
 */
var NxgridRealtime = window.NxgridRealtime || {};
// 站点实况加载
NxgridRealtime.loadStation = function(pdata){
	console.info(pdata);
	$.post(NxgridConfig.MapConfig.nxRealtimeUrl,pdata,function(data) {
		var vmap =   map;
		var maplevel = vmap.getLevel();
		var showArr = [];
		if (maplevel >= 7) {
			var all = JSON.parse(data.all);
			if (all == null)
				return;
			var rtObj = all.DS;
			if(undefined!=rtObj){
				for (var i = 0; i < rtObj.length; i++) {
					var stationInfo = rtObj[i];
					showArr.push(stationInfo);
				}
			}
		} else {
			var djz = JSON.parse(data.djz);
			if (djz == null)
				return;
			var rtObj = djz.DS;
			if(undefined!=rtObj){
				for (var i = 0; i < rtObj.length; i++) {
					showArr.push(rtObj[i]);
				}
			}
		}

		//show 
		if (showArr == null || showArr.length == 0) {
			alert("cimiss接口没有数据!!")
			return;
		}
		else{
			var tdate = new Date(showArr[0].Year, showArr[0].Mon - 1, showArr[0].Day, showArr[0].Hour, 0, 0);
			var t_s=tdate.getTime();
			tdate.setTime(t_s+8000*60*60);//设置新时间比旧时间多一小时
			NxgridRealtime.addTimeStrToMap(tdate.getFullYear(),tdate.getMonth() + 1,tdate.getDate(),tdate.getHours());
		}
		vmap.graphics.clear();
		for (var i = 0; i < showArr.length; i++) {
			var stationInfo = showArr[i];
			var lon = stationInfo.Lon;
			var lat = stationInfo.Lat;
			var pt = new esri.geometry.Point(lon, lat);
			var txtsm = new esri.symbol.TextSymbol(stationInfo.Station_Name)
					.setFont(new esri.symbol.Font("8pt")).setColor(
							new esri.Color([ 0, 0, 255, 1 ])).setOffset(12, 0);
			var graphicName = new esri.Graphic(pt, txtsm);
			vmap.graphics.add(graphicName);

			txtsm = new esri.symbol.TextSymbol(stationInfo.TEM).setFont(
					new esri.symbol.Font("8pt")).setColor(
					new esri.Color([ 0, 0, 255, 1 ])).setOffset(12, -12);
			var graphicTem = new esri.Graphic(pt, txtsm);
			vmap.graphics.add(graphicTem);

			txtsm = new esri.symbol.TextSymbol(stationInfo.PRE_1h).setFont(
					new esri.symbol.Font("8pt")).setColor(
					new esri.Color([ 0, 255, 0, 1 ])).setOffset(-12, -12);
			var graphicPre = new esri.Graphic(pt, txtsm);
			vmap.graphics.add(graphicPre);
//
			var winSymbol = com.nxgrid.giscommon.symboltool.getWindSymbols(
					 parseFloat(stationInfo.WIN_S_Avg_2mi),  parseFloat(stationInfo.WIN_D_Avg_2mi), 0,
					0);
			
			var graphicWin = new esri.Graphic(pt, winSymbol);
			vmap.graphics.add(graphicWin);
//
			var now = stationInfo.WEP_Now;
			var picUrl = "../images/micaps/" + now + ".png";
			var wsymbol = new esri.symbol.PictureMarkerSymbol(picUrl, 10, 10)
					.setOffset(-13, 0);
			var graphicNow = new esri.Graphic(pt, wsymbol);
			vmap.graphics.add(graphicNow);
		}
		localStorage.setItem("realTime", "true");
		localStorage.setItem("satationDate", pdata.qdate);

	}, "json");
}

NxgridRealtime.addTimeStrToMap=function(year,month,day,hour){
	var str="站点小时实况："+year;
	if(month<10){
		str+="0";
	}
	str+=month;
	if(day<10){
		str+="0";
	}
	str+=day;
	if(hour<10){
		str+="0";
	}
	str+=hour;
	showMapTips(str);
}