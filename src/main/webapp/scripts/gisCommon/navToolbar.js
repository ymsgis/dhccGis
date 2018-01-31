/*
	工具条
*/
var navToolbar = window.navToolbar || {};
navToolbar.loadTool = function(myMap, measureDiv) {

	require([ "esri/toolbars/navigation"],
			function(Navigation) {
				var navToolbar = new Navigation(myMap);

				$("#zoomin").click(function(){
					navToolbar.activate(Navigation.ZOOM_IN);
				});

				$("#zoomout").click(function(){
					navToolbar.activate(Navigation.ZOOM_OUT);
				});

				$("#zoomfullext").click(function(){
					navToolbar.zoomToFullExtent();
				});

				$("#pan").click(function(){
					navToolbar.activate(Navigation.PAN);
				});

				$("#deactivate").click(function(){
					navToolbar.deactivate();
					myMap.graphics.clear();
					deleteNode();
				});
				
				$("#measure").click(function(){
					
						if(measureDiv.style.display == 'none'){
							measureDiv.style.display = 'block';
							initToolbar(myMap);
						}else if(measureDiv.style.display == 'block'){
							measureDiv.style.display = 'none';
							measurement.setTool("area", false);
						}
					
				});
			}); 
	var measurement = null;
	function initToolbar(mymap) {
        //define a new line symbol and point symbol to use for measure tools
        var pms = new esri.symbol.PictureMarkerSymbol("../images/navToolbar/flag.png",24,24);
        pms.setOffset(9,11);
        var sls = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DOT,
            new dojo.Color([255,0,0,0.55]), 4);
        measurement = new esri.dijit.Measurement({
          map: mymap,
          lineSymbol: sls,
          pointSymbol: pms
        }, dojo.byId('measurementDiv'));
        measurement.startup();
        measurement.setTool("area", false);
      }
}