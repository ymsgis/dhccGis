	
	function sealDrawComplete(evt) {
		NxgridConfig.CommonToolConfig.sealDrawTool.deactivate();
	}

	function getMap() {
		return map;
	}

	function getGridGraphicLayer() {
		return gridGraphicLayer;
	}

	function showLoading() {
		$.messager.progress({
			title : '加载数据',
			msg : '加载格点数据中,请稍后...'
		});
	}
	function closeLoading() {
		$.messager.progress('close');
	}

	function getMapLevel() {
		return map.getLevel();
	}