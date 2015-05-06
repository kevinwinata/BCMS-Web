var palette = require('./palette.js'),
	img = new Image(),
	TweetListReq = require('./tweetlistreq.jsx');

var mapChart = function(dom, props) {
	var width = dom.offsetWidth;
	var height =  width/1.46 - 50;
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
			.style("top",rect.top)
			.style("left",rect.left);

		var g = svg.append("g")
			.attr("id", "map")
			.call(zoom);

		var clickedCircle;

		g.selectAll("circle")
			.data(data)
			.enter()
			.append("circle")
			.attr("id",function(d,i) {
				return "c"+i;
			})
			.attr("cx", function(d) {
				if(d._id.latitude != 0 && d._id.longitude != 0) 
					return (d._id.latitude+6.834286) / (-0.141812) * width;
				else
					return width-50;
			})
			.attr("cy", function(d) {
				if(d._id.latitude != 0 && d._id.longitude != 0) 
					return (d._id.longitude-107.501859) / (0.20846) * height;
				else
					return 50;
			})
			.attr("r", function(d) {
				// var total = 0;
				// for (var i = 0; i < d.topics.length; i++)
				// 	total += d.topics[i].count;
				// return total;
				return d.total;
			})
			.attr("fill", function(d,i) {
				return palette.getRandomMid(i);
			})
			.attr("fill-opacity", 0.7)
			.attr("stroke-width", "0px")
			.attr("stroke", "#FFFFFF")
			.on("click", circleClick)
			.on("mouseover", circleOver)
			.on("mouseout", circleOut)

		g.selectAll("circle")
			.transition()
			.delay(function(d, i) {
				return i * 300 / data.length;
			})
			.duration(1000)
			.attr("r", function(d, i) {
				return Math.log(d3.select("#c"+i).attr("r")*3)*20;
			});

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
			var self = d3.select(this),
				id = self.attr("id");
			clickedCircle = parseInt(id.substring(1,id.length));
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
				.attr("fill", self.attr("fill"))
				.on("click", function() {
					TweetListReq(dom, props.from, props.to, props.agencies, "", data[clickedCircle]._id.name);
				});
			clone.transition()
				.duration(700)
				.attr("cx", width/2)
				.attr("cy", height/2)
				.attr("r", height/2 - 40)
				.attr("fill-opacity", 1)
				.each('end', drawPie);
		}

		function drawPie() { 
			var color = d3.scale.ordinal()
				.range(palette.getSwatch(clickedCircle));
			
			var arc = d3.svg.arc()
				.outerRadius(height/2 - 39)
				.innerRadius(height/2 - 200);
			
			var pie = d3.layout.pie()
				.sort(null)
				.value(function(d) { return d.count; });

			var dat = data[clickedCircle].topics;

			var piechart = svg.append("g")
				.attr("id", "piechart")
				.attr("width", width)
				.attr("height", height)
				.append("g")
				.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
			
			var pg = piechart.selectAll(".arc")
				.data(pie(dat))
				.enter().append("g")
				.attr("class", "arc");

			pg.append("path")
				.attr("d", arc)
				.style("fill", function(d) { return color(d.data.count); })
				.on("click", function(d) {
					TweetListReq(dom, props.from, props.to, props.agencies, 
						d.data.topic, data[clickedCircle]._id.name);
				});

			pg.append("text")
				.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
				.attr("dy", ".35em")
				.style("text-anchor", "middle")
				.text(function(d) { return d.data.topic; });
		 }

		function circleOver() {
			var self = d3.select(this),
				id = self.attr("id"),
				i = parseInt(id.substring(1,id.length));
			self.attr("fill-opacity", 1)
				.attr("stroke-width", "2px");
			g.append("text")
				.attr("id", "loctext")
				.text(data[i]._id.name)
				.attr("text-anchor", "middle")
				.attr("x", function() {
					if(data[i]._id.latitude != 0 && data[i]._id.longitude != 0) 
						return (data[i]._id.latitude+6.834286) / (-0.141812) * width;
					else
						return width-50;
				})
				.attr("y", function() {
					if(data[i]._id.latitude != 0 && data[i]._id.longitude != 0) 
						return (data[i]._id.longitude-107.501859) / (0.20846) * height;
					else
						return 50;
				})
				.attr("font-family", "Roboto")
				.attr("font-size", "15px")
				.attr("fill", "white")
				.style("pointer-events","none")
				.style("-webkit-text-stroke-width","1px")
   				.style("-webkit-text-stroke-color","black")
				.style("text-shadow", "-1px -1px 0 #000")
				.style("text-shadow", "1px -1px 0 #000")
				.style("text-shadow", "-1px 1px 0 #000")
				.style("text-shadow", "1px 1px 0 #000");
		}

		function circleOut() {
			d3.select(this)
				.attr("fill-opacity", 0.7)
				.attr("stroke-width", "0px");
			d3.select("#loctext").remove();
		}

		function rectClick() {
			var clone = d3.select("#clone")
			clone.transition()
				.duration(500)
				.attr("fill-opacity", 0)
				.each('end', function(){ this.remove() });
			var piechart = d3.select("#piechart")
			piechart.transition()
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
