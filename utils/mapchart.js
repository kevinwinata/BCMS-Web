var palette = require('./palette.js'),
	img = new Image();

var mapChart = function(dom, props) {
	var width = dom.offsetWidth;
	var height = width/1.457;
	var data = props.data;

	d3.selection.prototype.moveToFront = function() {
		return this.each(function(){
			this.parentNode.appendChild(this);
		});
	};


	// d3.xml("/images/bandung.svg", "image/svg+xml", function(xml) {
	// 	var importedNode = document.importNode(xml.documentElement, true);
	// 	d3.select("#map").node().appendChild(importedNode);
	img.src = '/images/bandung.jpg';
	var loaded = false;
	function loadHandler() {
		if (loaded)
			return;
		loaded = true;
		drawMap();
	}
	img.onload = loadHandler;
	if (img.complete) {
		loadHandler();
	}

	function drawMap() {
		var canvas = d3.select(dom)
			.append("canvas")
			.attr("width", width)
			.attr("height", height)
			.node().getContext("2d");

		canvas.drawImage(img, 0, 0, width, height);

		var zoom = d3.behavior.zoom()
			.scaleExtent([1, 8])
			.on("zoom", zoomed);

		var rect = dom.getBoundingClientRect();

		var svg = d3.select(dom)
			.append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("id", "mapvisualization")
			.call(zoom)
			.style("position","absolute")
			.style("top",rect.top + 105)
			.style("left",rect.left);

		var g = svg.append("g")
			.attr("id", "map")
			.call(zoom);

		g.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("cx", function(d) {
				return d[0];
			})
			.attr("cy", function(d) {
				return d[1];
			})
			.attr("r", function(d) {
				return d[2];
			})
			.attr("fill", function(d,i) {
				return palette.getRandomMid(i);
			})
			.attr("fill-opacity", 0.7)
			.attr("stroke-width", "0px")
			.attr("stroke", "#FFFFFF")
			.on("click", circleClick)
			.on("mouseover", circleOver)
			.on("mouseout", circleOut);


		g.selectAll("t")
			.data(data)
			.enter()
			.append("text")
			.text(function(d) {
				return d[3];
			})
			.attr("text-anchor", "middle")
			.attr("x", function(d, i) {
				return d[0];
			})
			.attr("y", function(d) {
				return d[1];
			})
			.attr("font-family", "Roboto")
			.attr("font-size", function(d) {
				return (20-(150/d[2]))+"px"
			})
			.attr("fill", "white");

		function zoomed() {
			var t = d3.event.translate,
				s = d3.event.scale;
			// t[0] = Math.min(Math.max(0, t[0]), width/2);
			// t[1] = Math.min(Math.max(0, t[1]), height/2);
			zoom.translate(t);

			canvas.save();
			canvas.clearRect(0, 0, width, height);
			canvas.translate(t[0], t[1]);
			canvas.scale(s, s);
			canvas.drawImage(img, 0, 0, width, height);
			canvas.restore();

			g.attr("transform", "translate(" + t + ")scale(" + s + ")");
		}

		function circleClick() {
			var self = d3.select(this);
			svg.append("rect")
				.attr("id", "rect")
				.attr("width", width)
				.attr("height", height)
				.attr("x", 0)
				.attr("y", 0)
				.attr("fill", "#FFFFFF")
				.attr("fill-opacity", 0.7)
				.on("click", rectClick);
			var clone = svg.append("circle")
				.attr("id", "clone")
				.attr("cx", self.attr("cx"))
				.attr("cy", self.attr("cy"))
				.attr("r", self.attr("r"))
				.attr("fill", self.attr("fill"));
			clone.transition()
				.duration(700)
				.attr("cx", width/2)
				.attr("cy", height/2)
				.attr("r", height/2 - 40)
				.attr("fill-opacity", 1);
				//.each('end',  function(){  });
		}

		function circleOver() {
			d3.select(this)
				.attr("fill-opacity", 1)
				.attr("stroke-width", "2px");
		}

		function circleOut() {
			d3.select(this)
				.attr("fill-opacity", 0.7)
				.attr("stroke-width", "0px");
		}

		function rectClick() {
			var clone = d3.select("#clone")
			clone.transition()
				.duration(500)
				.attr("fill-opacity", 0)
				.each('end', function(){ this.remove() });
			var rect = d3.select("#rect");
			rect.transition()
				.duration(500)
				.attr("fill-opacity", 0)
				.each('end', function(){ this.remove() });
		}
	}

};

module.exports = mapChart;
