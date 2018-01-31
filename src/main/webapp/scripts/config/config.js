/**
 * for all config
 */

/**
 * url 配置
 */
var NxgridConfig = window.NxgridConfig || {};

var _ArcGISRoot = 'http://192.168.1.246:8399';
//_ArcGISRoot = 'http://10.178.12.182:6080';
var _GTRestRoot = 'http://192.168.1.113:8888/gt/rest/';
//_GTRestRoot = 'http://172.23.105.85:9999/rest/';
 
_ServerRoot = '/nxgrid/';
//3小时间隔
var _QueryRoot3 = 'http://172.23.105.85:9999/trend';
//_QueryRoot3 = 'http://localhost:8888/gt/trend';
//24小时间隔
var _QueryRoot24 = 'http://172.23.105.85:9999/trend24';
//_QueryRoot24 = 'http://localhost:8888/gt/trend24';
_webSocketUrl = 'ws://127.0.0.1:8080/nxgrid/websocket',
//_menuUrl="http://172.23.105.85:8080/rmis_new/service/getMenuForAppSys.json?sysCode=nxgrid&position=frontend&";
_menuUrl="http://localhost:8080/rmis_new/service/getMenuForAppSys.json?sysCode=nxgrid&position=frontend&";
var _provinceOraganId = "b6b7b04a-4b8c-47f4-87a1-c2e60fc72a26";
// 地图相关的配置
NxgridConfig.MapConfig = {
	nxmapUrl : _ArcGISRoot + '/arcgis/rest/services/nx/XZQ/MapServer',
	nxadmiUrl : _ArcGISRoot + '/arcgis/rest/services/nx/XZQ_DYNAMIC/MapServer/',
	// nxLoadGridUrl:'http://172.23.105.85:9999/rest/',
	nxLoadGridUrl : _GTRestRoot,
	nxBackLoadUrl : _ServerRoot + "gridFile/readMicapsFile",
	nxRealtimeUrl:_ServerRoot + "cimiss/datahour",
	nxBackLoadLiveUrl : _ServerRoot + "gridFile/readMicapsLiveFile",
	nxBackLoadBestUrl : _ServerRoot + "gridFile/readMicapsFileBest",
	geomertryServiceUrl : _ArcGISRoot
			+ '/arcgis/rest/services/Geometry/GeometryServer',
	nxGridQueryShowUrl : _QueryRoot3,
	nx24GridQueryShowUrl : _QueryRoot24,
	nxPrintTaskUrl : 'http://127.0.0.1:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
	proxyUrl:'/proxy/proxy.jsp'
};

/**
 * 格点行列个数配置
 */
NxgridConfig.GridSizeConfig = {
	Width : 74,
	Height : 89,
	Length : 6585,
}

/**
 *  micaps4格点文件参数配置文件
 */
NxgridConfig.Micaps4FileConfig = {
	mHour : 240,
	xdim : 74,
	ydim : 89,
	perDzx : 10,
	startDzx : -300,
	stopDzx : 300,
	smooth : 1,
	bold : 0,
	logDistance : 0.05,
	latDistance : 0.05,
	fromLog : 104.150,
	toLog : 107.800,
	fromLat : 35.100,
	toLat : 39.500
}
//通用工具配置
NxgridConfig.GPToolConfig = {
		dzmClipFeature:null
}
// 通用工具配置
NxgridConfig.CommonToolConfig = {
	drawType : null,
	locationdrawtool : null,
	sealDrawTool : null,
	drawTool : null,
	drawToolLineWind : null,
	drawToolAreaWind : null,
	drawToolAreaLineWind : null,
	/*drawToolWarnSignal : null,   //手动绘制预警信号点
	drawToolAreaDisaster : null   //手动绘制灾害性落区*/
};

NxgridConfig.LocationEditToolsP = {
	gridLayer : null,
	nxGetcntyUrl : '/nxgrid/grid/edit/admiArea/getCountyByUpCde?UpCde=',
	nxGetcityUrl : '/nxgrid/grid/edit/admiArea/getCityList',
	nxGetallUrl : '/nxgrid/grid/edit/admiArea/getAll',
	pts : []
};

NxgridConfig.disaster = {
	savelistUrl : '/nxgrid/disasterZone/savelist',	
	getProductUrl:'/nxgrid/warnProduct/getproduct?productId=',
	getProductListUrl:'/nxgrid/warnProduct/getlist',
	getWarnSignalUrl:'/nxgrid/warnSignal/getByType?type=',
	saveWarnProductUrl:'/nxgrid/warnProduct/save',
	viewWarnProductUrl:'/nxgrid/warnProduct/view',
	getPictureUrl:'/nxgrid/warnProduct/getpicture?picUrl=',
};

NxgridConfig.TrendCorrect = {
	trendBoudQueryUrl : '/nxgrid/data/weatherStaion/getWeatherStation?',
	trendCurve : 'single24/TMP?'
};


NxgridConfig.gridTrend = {
	disAndValue:"2,0.8;4,0.6;6,0.4;8,0.2;10,0.1",
	influenceDis:20
};

