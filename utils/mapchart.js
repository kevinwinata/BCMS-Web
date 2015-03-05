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
				return 1;
			})
			.attr("fill", function(d,i) {
				return palette.getRandomMid(i);
			})
			.attr("fill-opacity", 0.7);

	svg.selectAll("circle")
			.transition()
			.attr("r", function(d,i) {
				return data[i][2];
			});

	svg.selectAll("text")
			.data(data)
			.enter()
			.append("text")
			.text(function(d) {
				return d[2];
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
				return (30-(200/d[2]))+"px"
			})
			.attr("fill", "white");

};

module.exports = mapChart;
