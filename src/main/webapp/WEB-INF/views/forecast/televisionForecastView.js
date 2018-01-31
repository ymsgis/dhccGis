(function() {

function ForecastView(options) {	
	var _BaseUrl = _ctxPath+'/forecast/televisionForecast';
	var settings = $.extend(options, {
		baseUrl: _BaseUrl,
		hourSpan: 0,
		hourCount: 0,
		termSpan: 24,
		termHour: 72, 
		dataColumns: _buildDataColumns(),
		onSaveGridData: function(param) {
			var infoForm = $('#infoForm');
			var fctext1 = infoForm.find('[name="fctext1"]').val();
			var fctext2 = infoForm.find('[name="fctext2"]').val();
			var fctext3 = infoForm.find('[name="fctext3"]').val();
			var info = {
					fctext1: fctext1,
					fctext2: fctext2,
					fctext3: fctext3
			};
			param = {
					fid: this.getFcid(),
					codes: param,
					info: info
			};
			console.log(param);
			return param;
		}
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
			field: 'temp1From',
			precision : 0
		};
		columns.push(col);
		col = {
			title : '温度2',
			width : 90,
			dataType: 'temp',
			fieldFmt: 'temp{DAY}{SUB}To',
			field: 'temp1To',
			precision : 0
		};			
		columns.push(col);
	return columns;
}
this.StationStermForecastView = ForecastView;

})(window);