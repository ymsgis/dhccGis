(function() {

function ForecastView(options) {	
	var _BaseUrl = _ctxPath+'/forecast/smsForecast';
	var me = this;
	var settings = $.extend(options, {
		baseUrl: _BaseUrl,
		onLoadData: function(data) {
			var timeType = data.timeType;
			if(data.success) {
				timeType = data.results;
				data.timeType = timeType;
			}
			$('#fltTimeTypeField').combobox('setValue', timeType);
		},
		onLoadFailed: function() {
			me.destroy();
		}
	});
	return TextForecastView.call(me, settings);
}
	
function _buildWeatherLabel() {
}
this.SmsForecastView = ForecastView;

})(window);