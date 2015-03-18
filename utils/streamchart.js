var palette = require('./palette.js');

var streamChart = function(dom, props) {
	var data = props.data;

	var datearray = [];
	var colorrange = palette.getSwatch(0);
	strokecolor = colorrange[0];

	var format = d3.time.format("%m/%d/%y");
	var margin = {top: 20, right: 40, bottom: 30, left: 30};
	var width = dom.offsetWidth - margin.left - margin.right;
	var height = document.getElementById("toolbar").offsetHeight
				 - margin.top - margin.bottom;

	var tooltip = d3.select(dom)
		.append("div")
		.attr("class", "remove")
		.style("position", "absolute")
		.style("background", "lightsteelblue")
		.style("opacity", 0.8)
		.style("border", "0px") 
 		.style("border-radius", "8px")
		.style("z-index", "20")
		.style("visibility", "hidden");

	var x = d3.time.scale()
			.range([0, width]);

	var y = d3.scale.linear()
			.range([height-10, 0]);

	var z = d3.scale.ordinal()
			.range(colorrange);

	var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(d3.time.weeks);

	var yAxis = d3.svg.axis()
			.scale(y);

	var yAxisr = d3.svg.axis()
			.scale(y);

	var stack = d3.layout.stack()
			.offset("silhouette")
			.values(function(d) { return d.values; })
			.x(function(d) { return d.date; })
			.y(function(d) { return d.value; });

	var nest = d3.nest()
			.key(function(d) { return d.key; });

	var area = d3.svg.area()
			.interpolate("cardinal")
			.x(function(d) { return x(d.date); })
			.y0(function(d) { return y(d.y0); })
			.y1(function(d) { return y(d.y0 + d.y); });

	var svg = d3.select(dom).append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	data.forEach(function(d) {
		d.date = format.parse(d.date);
		d.value = +d.value;
	});

	var layers = stack(nest.entries(data));

	x.domain(d3.extent(data, function(d) { return d.date; }));
	y.domain([0, d3.max(data, function(d) { return d.y0 + d.y; })]);

	svg.selectAll(".layer")
			.data(layers)
		.enter().append("path")
			.attr("class", "layer")
			.attr("d", function(d) { return area(d.values); })
			.style("fill", function(d, i) { return z(i); });


	svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);

	svg.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(" + width + ", 0)")
			.call(yAxis.orient("right"));

	svg.append("g")
			.attr("class", "y axis")
			.call(yAxis.orient("left"));

	svg.selectAll(".layer")
		.attr("opacity", 1)
		.on("mouseover", function(d, i) {
			svg.selectAll(".layer").transition()
			.duration(250)
			.attr("opacity", function(d, j) {
				return j != i ? 0.6 : 1;
		})})

		.on("mousemove", function(d, i) {
			mousex = d3.mouse(this);
			mousex = mousex[0];
			var invertedx = x.invert(mousex);
			invertedx = invertedx.getMonth() + invertedx.getDate();
			var selected = (d.values);
			for (var k = 0; k < selected.length; k++) {
				datearray[k] = selected[k].date
				datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
			}

			mousedate = datearray.indexOf(invertedx);
			pro = d.values[mousedate].value;

			d3.select(this)
			.classed("hover", true)
			.attr("stroke", strokecolor)
			.attr("stroke-width", "0.5px"), 
			tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" )
			.style("visibility", "visible")
			.style("left", d3.mouse(this)[0] + "px")
			.style("top", d3.mouse(this)[1] + 100 + "px");
			
		})
		.on("mouseout", function(d, i) {
		 svg.selectAll(".layer")
			.transition()
			.duration(250)
			.attr("opacity", "1");
			d3.select(this)
			.classed("hover", false)
			.attr("stroke-width", "0px"), 
			tooltip.html( "<p>" + d.key + "<br>" + pro + "</p>" )
			.style("visibility", "hidden");
	})
		
	// var vertical = d3.select(dom)
	// 			.append("div")
	// 			.attr("class", "remove")
	// 			.style("position", "absolute")
	// 			.style("z-index", "19")
	// 			.style("width", "1px")
	// 			.style("height", "380px")
	// 			.style("top", "200px")
	// 			.style("bottom", "30px")
	// 			.style("left", "0px")
	// 			.style("background", "#fff");

	// d3.select(dom)
	// 		.on("mousemove", function(){  
	// 			 mousex = d3.mouse(this);
	// 			 mousex = mousex[0] + 5;
	// 			 vertical.style("left", mousex + "px" )})
	// 		.on("mouseover", function(){  
	// 			 mousex = d3.mouse(this);
	// 			 mousex = mousex[0] + 5;
	// 			 vertical.style("left", mousex + "px")});
};

module.exports = streamChart;