
var GridCount = window.GridCount || {};
/**
 * 根据id计算出格点数组中对应的index
 */
GridCount.getGridIndex = function(strid){
	
	if(strid == null || strid.length != 6)
		return  -1;
	
	var wd = strid.substr(0,3);
	var ht = strid.substr(4,3);
	
	if(wd.substr(0,2) == "00")
		wd = wd.substr(2,1);
	else if(wd.substr(0,1) == "0")
		wd = wd.substr(1,2);
	
	if(ht.substr(0,2) == "00")
		ht = ht.substr(2,1);
	else if(ht.substr(0,1) == "0")
		ht = ht.substr(1,2);
	
	
	return (wd)*(NxgridConfig.GridSizeConfig.height)+ ht;
	
	
}