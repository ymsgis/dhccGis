var workers = {
		"forecast-field":{
			"text": "预报场",
	      "consumers": 0
		},
		"grid-live":{
			"text": "格点实况",
	      "consumers": 0
		},
		"inspection-and-evaluation":{
			"text": "检验评估",
	      "consumers": 1
		},
		"deviation-correction":{
			"text": "偏差订正",
	      "consumers": 2,
			"inputQueue": "inspection-and-evaluation"
		},
		"retesting":{
			"text": "再检验",
	      "consumers": 3,
		  "inputQueue": "deviation-correction"
		},
		"el-air-and-el-leakage":{
			"text": "消空消漏",
	      "consumers": 4,
		  "inputQueue": "retesting"
		},
		"kalman":{
			"text": "卡尔曼滤波",
	      "consumers": 4,
		  "inputQueue": "retesting"
		},
		"bestsquare":{
			"text": "最优背景场",
	      "consumers": 5
		},
	    "identifier": {
		  "text": "审核订正",
	      "consumers": 6,
		  "inputQueue": "bestsquare"
	    },
	    "lost-and-found": {
			"text": "格点转站点",
	      "consumers": 7,
	      "inputQueue": "identifier"
	    },
	    "monitor": {
			"text": "格点转灾害天气落区",
	      "consumers": 8,
	      "inputQueue": "identifier"
	    },
	    "meta-enricher": {
			"text": "对流性灾害落区",
	      "consumers": 9,
	      "inputQueue": "identifier"
	    },
	    "geo-enricher": {
			"text": "客观预警产品",
	      "consumers": 10,
		  "inputQueue": "monitor"
	    },
	    "elasticsearch-writer": {
			"text": "审核发布",
	      "consumers": 11,
	      "inputQueue": "geo-enricher"
	    }
	  };

	  // Set up zoom support
	  var svg = d3.select("svg"),
	      inner = svg.select("g"),
	      zoom = d3.behavior.zoom().on("zoom", function() {
	        inner.attr("transform", "translate(" + d3.event.translate + ")" +
	                                    "scale(" + d3.event.scale + ")");
	      });
	  svg.call(zoom);

	  var render = new dagreD3.render();

	  // Left-to-right layout
	  var g = new dagreD3.graphlib.Graph();
	  g.setGraph({
	    nodesep: 40,
	    ranksep: 20,
	    rankdir: "LR",
	    marginx: 10,
	    marginy: 10
	  });
	  
	  function draw(isUpdate) {
	    for (var id in workers) {
	      var worker = workers[id];
	      var className = worker.consumers ? "running" : "stopped";
	      var html = "<div>";
	      html += "<span class=ui-step-cont-number>"+worker.consumers+"</span>";
		  html += "<span class=ui-step-cont-text>"+worker.text+"</span>";
	      html += "</div>";
	      g.setNode(id, {
	        labelType: "html",
	        label: html,
	        rx: 10,
	        ry: 10,
	        padding: 2,
	        class: className
	      });
		  g.setEdge("lost-and-found", "geo-enricher", {
			arrowheadClass: 'arrowhead'
		  });
		   g.setEdge("meta-enricher", "geo-enricher", {
			arrowheadClass: 'arrowhead'
		  });
		  g.setEdge("el-air-and-el-leakage", "bestsquare", {
			arrowheadClass: 'arrowhead'
		  });
		  g.setEdge("kalman", "bestsquare", {
			arrowheadClass: 'arrowhead'
		  });
		  g.setEdge("forecast-field", "inspection-and-evaluation", {
			arrowheadClass: 'arrowhead'
		  });
		  g.setEdge("grid-live", "inspection-and-evaluation", {
			arrowheadClass: 'arrowhead'
		  });
	      if (worker.inputQueue) {
	        g.setEdge(worker.inputQueue, id, {
	         // label: worker.inputThroughput + "/s",
	         // width: 40
				
	        });
	      }
	    }

	    inner.call(render, g);

	    // Zoom and scale to fit
	    var graphWidth = g.graph().width;
	    var graphHeight = g.graph().height;
	    var width = parseInt(svg.style("width").replace(/px/, ""));
	    var height = parseInt(svg.style("height").replace(/px/, ""));
	    var zoomScale = Math.min(width / graphWidth, height / graphHeight) - 0.01;
	    var translate = [(width/2) - ((graphWidth*zoomScale)/2), (height/2) - ((graphHeight*zoomScale)/2)];
	    zoom.translate(translate);
	    zoom.scale(zoomScale);
	    zoom.event(isUpdate ? svg.transition().duration(500) : d3.select("svg"));
	  }
	  draw();