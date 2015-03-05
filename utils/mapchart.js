var palette = require('./palette.js');

var mapChart = function(dom, props) {
	var width = props.width;
	var height = props.height;
	var data = props.data;

	var svg = d3.select(dom)
				.append("svg")
				.attr("width", width)
				.attr("height", height)
				.attr("id", "mapvisualization");

	svg.selectAll("circle")
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
					return palette.getRandomColor();
				})
				.attr("fill-opacity", 0.7);

};

module.exports = mapChart;
