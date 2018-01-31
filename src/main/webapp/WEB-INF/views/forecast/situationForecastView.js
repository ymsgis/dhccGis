(function() {

	var _Labels = [ {
		labelA : '今天下午',
		labelB : '今天前半夜',
		labelC : '今天后半夜',
		labelD : '明天白天'
	}, {
		labelA : '今天前半夜',
		labelB : '今天后半夜',
		labelC : '明天上午',
		labelD : '明天下午'
	} ];

	function ForecastView(options) {
		var _BaseUrl = _ctxPath + '/forecast/situationForecast';
		var settings = $.extend(options, {
			baseUrl : _BaseUrl,
			onLoadData : function(data) {
				var labelData = data.timeType < 12 ? _Labels[0] : _Labels[1];
				var suffix = [ 'A', 'B', 'C', 'D' ];
				for (var i = 0; i < suffix.length; i++) {
					var s = suffix[i];
					var label = $('#weatherLabel' + s);
					label.text(labelData['label' + s]);
				}
				var fcTime = data.createTime;
				var year = parseInt(fcTime.substring(0, 4));
				var month = parseInt(fcTime.substring(5, 7));
				var day = parseInt(fcTime.substring(8, 10));
				var time = new Date(year, month-1, day);
				var day1 = getDay(time, 1);
				var day2 = getDay(time, 2);
				var day3 = getDay(time, 3);
				var label2 = $('#weatherLabel2');
				label2.text(day1+'日夜间到'+day2+'日白天');
				var label3 = $('#weatherLabel3');
				label3.text(day2+'日夜间到'+day3+'日白天');
			}
		});
		return new TextForecastView(settings);
	}

	var _DayMS = 24*60*60*1000;
	
	function getDay(time, day) {
		var dayTime = new Date(time.getTime()+_DayMS*day);
		var tYear = dayTime.getFullYear();		
		var tMonth = dayTime.getMonth();
		var tDate = dayTime.getDate();
		return tDate;
	}

	this.SituationForecastView = ForecastView;

})(window);