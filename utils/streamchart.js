var palette = require('./palette.js'),
	TweetListReq = require('./tweetlistreq.jsx');

var streamChart = function(dom, props) {
	var data = props.data;

	var datearray = [];
	var colorrange = palette.getSwatch(0);
	strokecolor = colorrange[0];

	var format = d3.time.format("%m/%d/%y");
	var margin = {top: 20, right: 40, bottom: 30, left: 30};
	var width = dom.offsetWidth - margin.left - margin.right;
	var height =  width/1.46 - margin.top - margin.bottom;

	var mouseOffsetX = document.getElementById("toolbar").offsetWidth;
	var mouseOffsetY = 100;

	var tooltip = d3.select(dom)
		.append("div")
		.attr("class", "remove")
		.attr("class", "tooltip")
		.style("position", "absolute")
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

	var paddedData = [];
	var from = new Date(props.from);
	var to = new Date(props.to);
	var keys = [];


	function findByKey(array, value) {
		for (var i = 0; i < array.length; i++) {
			if (array[i] == value) {
				return array[i];
			}
		}
		return null;
	}

	function findByDate(array, key, date) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].key == key && date &&
				array[i].date.getDate() == date.getDate() && 
				array[i].date.getMonth() == date.getMonth() && 
				array[i].date.getFullYear() == date.getFullYear()) {
				return array[i];
			}
		}
		return null;
	}

	data.forEach(function(d) {
		var date = format.parse(d.date);
		
		if(!findByKey(keys,d.key)) {
			keys.push(d.key);
			for (var di = new Date(from); di <= to; di.setDate(di.getDate() + 1)) {
				paddedData.push({
					key: d.key,
					value: 0,
					date: new Date(di)
				});
			}
		}

		var e = findByDate(paddedData,d.key,date);
		if(e) e.value = +d.value;
	});

	var layers = stack(nest.entries(paddedData));

	x.domain([from,to]);
	y.domain([0, d3.max(paddedData, function(d) { return d.y0 + d.y; })]);

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
				tooltip.html( "<p>" + d.key + "<br/>(" + pro + ")</p>" )
					.style("visibility", "visible")
					.style("left", d3.mouse(this)[0] + mouseOffsetX + "px")
					.style("top", d3.mouse(this)[1] + mouseOffsetY + "px");
			
		})
		.on("mouseout", function(d, i) {
			svg.selectAll(".layer")
				.transition()
				.duration(250)
				.attr("opacity", "1");
			d3.select(this)
				.classed("hover", false)
				.attr("stroke-width", "0px"), 
				tooltip.html( "<p>" + d.key + "<br/>(" + pro + ")</p>" )
					.style("visibility", "hidden");
		})
		.on("click", function(d) {
			TweetListReq(dom, props.from, props.to, props.agencies, d.key);
		})
		
	var rect = svg.append("rect")
		.attr("id", "rect")
		.attr("width", width)
		.attr("height", height+20)
		.attr("x", 0)
		.attr("y", -20)
		.attr("fill", "#FFFFFF");

	rect.transition()
		.duration(1000)
		.attr("x", width + 200);
};

module.exports = streamChart;