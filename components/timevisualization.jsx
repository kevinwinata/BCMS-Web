var React = require('react'),
	d3 = require('d3'),
	palette = require('./palette.js');

var TimeVisualization = React.createClass({	

	getInitialState: function() {
		return {data: []};
	},

	propTypes: {
		width: React.PropTypes.number,
		height: React.PropTypes.number,
		data: React.PropTypes.array.isRequired
	},
	
	getDefaultProps: function() {
		return {
			width: 943,
			height: 648
		};
	},

	componentDidMount: function() {
		var dom =  this.getDOMNode();
		createChart(dom, this.props);
	},

	shouldComponentUpdate: function() {
		var dom =  this.getDOMNode();
		createChart(dom, this.props);
		return false;
	},

	render: function() {
		return (
			<div />
		);
	}
	
});

function createChart(dom, props){
	var data = props.data;

	var format = d3.time.format("%m/%d/%y");

	var margin = {top: 20, right: 30, bottom: 30, left: 40},
			width = props.width - margin.left - margin.right,
			height = props.height - margin.top - margin.bottom;

	var x = d3.time.scale()
			.range([0, width]);

	var y = d3.scale.linear()
			.range([height, 0]);

	var z = d3.scale.category20c();

	var xAxis = d3.svg.axis()
			.scale(x)
			.orient("bottom")
			.ticks(d3.time.days, 5);

	var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left");

	var stack = d3.layout.stack()
			.offset("zero")
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
			.call(yAxis);
 
};

module.exports = TimeVisualization;