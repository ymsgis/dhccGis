(function() {

	function ForecastView(options) {
		var _BaseUrl = _ctxPath + '/forecast/stationHumidityForecast';
		var me = this;
		var settings = $.extend(options, {
			baseUrl : _BaseUrl,
			hourSpan : 6,
			hourCount : 24,
			termSpan : 24,
			termHour : 48,
			dataColumns : _buildDataColumns(),
			onLoadFailed: function() {
				me.destroy();
			},			
			onSaveGridData : function(param) {
				var infoForm = $('#infoForm');
				var info = {
				};
				param = {
					fid : this.getFcid(),
					codes : param,
					info : info
				};
				console.log(param);
				return param;
			}
		});
		return StationForecastView.call(me, settings);
	}

	function _buildDataColumns() {
		var columns = [ {
			title : '站点编号',
			field : 'stationNo',
			width : 60
		}, {
			title : '站点名称',
			field : 'stationName',
			width : 60
		} ];
		var col = null;
		col = {
			title : '湿度1',
			width : 90,
			dataType : 'humidity',
			field : 'fromVal'
		};
		columns.push(col);
		col = {
			title : '湿度2',
			width : 90,
			dataType : 'humidity',
			field : 'toVal'
		};
		columns.push(col);
		return columns;
	}
	this.StationHumidityForecastView = ForecastView;

})(window);