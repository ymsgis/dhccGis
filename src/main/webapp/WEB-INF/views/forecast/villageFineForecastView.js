(function() {

function ForecastView(options) {	
	var viewer = null;
	var _BaseUrl = _ctxPath+'/forecast/villageFineForecast';	
	var _dataList = null;
	var _textList = null;
	function _loadRegionData(rid) {
		if(rid.length>4) {
			var grid = viewer.datagrid;
			var gridData = grid._loaded;
			if(!gridData) {
				gridData = grid.datagrid('getData');
				grid._loaded = gridData;
			}
			var data = gridData.rows;
			var list = [];
			for(var i=0;i<data.length;i++) {
				var rec = data[i];
				if(rec.stationNo.indexOf(rid)==0) list.push(rec);
			}
			grid.datagrid('loadData', list);
			return;
		}
		var allData = _dataList;
		var obj = null;
		for(var i=0;i<allData.length;i++) {
			var d = allData[i];
			var info = d.record;
			if(info.id==rid) {
				obj = d;
				break;
			}
		}
		obj = obj||{};
		if(!obj.code) {
			obj = obj.record||obj;
			var params = {
				regionCode: obj.regionId||rid
			};
			return viewer.loadData(params);
		}
		return viewer.loadViewData(obj);
	}
	var settings = $.extend(options, {
		baseUrl: _BaseUrl,
		queryParams: {
			notAll: true
		},
		hourSpan: 6,
		hourCount: 24,
		termSpan: 24,
		termHour: 144, 
		dataColumns: _buildDataColumns(),
		gridConfig: {
			rownumbers: true
		},
		textType: 'json',
		onInitView: function() {
			$('#regionQuery').combobox({
				editable: false,
				onChange: function(newVal, oldVal) {
					if(oldVal=='') return;
					_loadRegionData(newVal);
				}
			});
			function _processRegionData(data, parent) {
				for(var i=0;i<data.length;i++) {
					var rec = data[i];
					rec.text = rec.text||rec.unitName;
					_processRegionData(rec.children, rec);
				};
				return data;
			}
//			$('#regionTreeField').combotree({
//				url: _ctxPath+'/data/basicRegion/loadTree?level=2',
//				editable: false,
//				loadFilter: function(data, parent) {
//					_processRegionData(data,parent);
//					return data;
//				},
//				onChange: function(newVal, oldVal) {
//					if(oldVal=='') return;				
//					_loadRegionData(newVal);
//				}
//			});			
			$('#textIdSel').combobox({
				editable: false,
				onChange: function(newVal, oldVal) {
					var text = _textList[newVal];
					viewer.showTextWin(text);
				}
			});
		},
		onLoadData: function(data) {
			_dataList = data;
			var infoList = [];
			var regionCombo = $('#regionQuery');
			var fcId = regionCombo.combobox('getValue');
			var obj = null;
			for(var i=0;i<data.length;i++) {
				var d = data[i];
				var info = d.record;
				if(fcId && info.id==fcId) {
					obj = d;					
				} else {
					obj = obj||d;
				}				
				infoList.push({
					text: info.regionName,
					value: info.id
				});
			}			
			if(!infoList.length) return obj;
			regionCombo.combobox('loadData', infoList);
			fcId = fcId||infoList[0].value;
			regionCombo.combobox('setValue', fcId);
			return obj;
		},
		onLoadDataText: function(data) {
			for(var p in data) {
				data = data[p];break;
			}
			_textList = data;
			var list = [];
			var text = null;
			for(var i=0;i<data.length;i++) {
				var obj = data[i];
				text = text||obj;
				var idx = obj.indexOf('预报');
				var title = idx>0? obj.substring(0, idx+2) : '预报-'+(i+1);
				list.push({
					text: title,
					value: i
				});
			}
			$('#textIdSel').combobox('loadData', list);
			$('#textIdSel').combobox('setValue', list[0].value);			
			return text;
		},
		onPublishData: function(param) {
			var fids = [];
			var list = _dataList;
			for(var i=0;i<list.length;i++) {
				var d = list[i];
				var info = d.record;	
				fids.push(info.id);
			}
			param.fids = fids;
			return param;
		}
	});
	viewer = new StationForecastView(settings);
	return viewer;
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
this.VillageFineForecastView = ForecastView;

})(window);