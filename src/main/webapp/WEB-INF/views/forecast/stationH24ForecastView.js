(function() {

function ForecastView(options) {	
	var _BaseUrl = _ctxPath+'/forecast/stationH24Forecast';
	var settings = $.extend(options, {
		baseUrl: _BaseUrl,
		dataColumns: _buildDataColumns()
	});
	return new StationForecastView(settings);
}
	
function _buildDataColumns() {
	var columns = [ {
			title : '站点编号',
			field: 'stationNo',
			width : 60					
	}, {
			title : '站点名称',
			field: 'stationName',
			width : 60					
	}];
		var col = {
			title : '天气现象',
//				field: 'phenomena{DAY}{SUB}Code'.replace('{DAY}',i),
			fieldFmt: 'phenomena{DAY}{SUB}Text',
			field: 'phenomena1Text',
			dataType: 'phenomena',
			width : 120
		};
		columns.push(col);
		col = {
			title : '风向',
			width : 100,
			dataType: 'windDir',
			fieldFmt: 'windDir{DAY}{SUB}Text',
			field: 'windDir1Text'
		};
		columns.push(col);
		col = {
			title : '风力',
			width : 80,
			dataType: 'windPow',
			fieldFmt: 'windPow{DAY}{SUB}Text',
			field: 'windPow1Text'
		};
		columns.push(col);
		col = {
			title : '温度1',
			width : 90,
			dataType: 'temp',
			fieldFmt: 'temp{DAY}{SUB}From',
			field: 'temp1From'
		};
		columns.push(col);
		col = {
			title : '温度2',
			width : 90,
			dataType: 'temp',
			fieldFmt: 'temp{DAY}{SUB}To',
			field: 'temp1To'
		};			
		columns.push(col);
	return columns;
}
this.StationH24ForecastView = ForecastView;

})(window);