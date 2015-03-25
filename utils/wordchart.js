var palette = require('./palette.js'),
	cloud = require('./d3.layout.cloud.js');

var wordChart = function(dom, props) {
	var width = dom.offsetWidth;
	var height = document.getElementById("toolbar").offsetHeight;
	var fill = d3.scale.category20();
	var data = props.data;

	cloud().size([width, height])
			.words(data.map(function(d) {
				return {text: d[0], size: d[1]*10 };
			}))
			.padding(5)
			.font("Roboto")
			.fontSize(function(d) { return d.size; })
			.on("end", draw)
			.start();

	function draw(words) {
		var svg = d3.select(dom).append("svg")
				.attr("width", width)
				.attr("height", height);

		var g = svg.append("g")
				.attr("transform", "translate("+width/2+","+height/2+")");

		g.selectAll("t")
			.data(words)
			.enter().append("text")
			.transition()
			.delay(function(d, i) {
				return i * 1000 / words.length;
			})
			.duration(1000)
			.style("font-size", function(d) { 
				return d.size + "px"; 
			})
			.style("font-family", "Roboto")
			.style("fill", function(d, i) { 
				return fill(i); 
			})
			.attr("id",function(d,i) {
				return "c"+i;
			})
			.attr("text-anchor", "middle")
			.attr("transform", function(d) {
				return "translate(" + [d.x, d.y] + ")";
			})
			.text(function(d) { return d.text; });

		g.selectAll("text")
			.on("click", drawLines);

		function drawLines() {
			var self = d3.select(this);
			var id = self.attr("id");
			var clickedWord = parseInt(id.substring(1,id.length));
			var dat = data[clickedWord][2];

			svg.append("rect")
				.attr("id", "rect")
				.attr("width", width)
				.attr("height", height)
				.attr("x", 0)
				.attr("y", 0)
				.attr("fill", "#FFFFFF")
				.attr("fill-opacity", 0.85)
				.on("click", function(){ 
					var xAxis = d3.select("#xAxis");
					xAxis.transition()
						.duration(500)
						.attr("fill-opacity", 0)
						.each('end', function(){ this.remove() });
					var yAxis = d3.select("#yAxis");
					yAxis.transition()
						.duration(500)
						.attr("fill-opacity", 0)
						.each('end', function(){ this.remove() });
					var path = d3.select("#path");
					path.transition()
						.duration(500)
						.attr("fill-opacity", 0)
						.each('end', function(){ this.remove() });
					var rect = d3.select("#rect");
					rect.transition()
						.duration(500)
						.attr("fill-opacity", 0)
						.each('end', function(){ this.remove() });
				});

			var parseDate = d3.time.format("%m/%d/%y").parse;

			var x = d3.time.scale()
				.range([30, width-30]);

			var y = d3.scale.linear()
				.range([height-30, 30]);

			var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom");

			var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left");

			var line = d3.svg.line()
				.x(function(d) { return x(d.date); })
				.y(function(d) { return y(d.value); });

			dat.forEach(function(d) {
				d.date = parseDate(d.date);
				d.value = +d.value;
			});

			x.domain(d3.extent(dat, function(d) { return d.date; }));
			y.domain([0,d3.max(dat, function(d) { return d.value; })]);

			svg.append("g")
					.attr("id", "xAxis")
					.attr("class", "x axis")
					.attr("transform", "translate(0,"+100+")")
					.call(xAxis);

			svg.append("g")
					.attr("id", "yAxis")
					.attr("class", "y axis")
					.call(yAxis)
				.append("text")
					.attr("transform", "translate(100,100)rotate(-90)")
					.attr("y", 6)
					.attr("dy", ".71em")
					.style("text-anchor", "end")

			svg.append("path")
					.datum(dat)
					.attr("id", "path")
					.attr("class", "line")
					.attr("d", line);

		}
	}
}

module.exports = wordChart;
