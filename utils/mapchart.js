var palette = require('./palette.js');

var mapChart = function(dom, props) {
	var width = props.width;
	var height = props.height;
	var data = props.data;

	d3.selection.prototype.moveToFront = function() {
		return this.each(function(){
			this.parentNode.appendChild(this);
		});
	};

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
				return palette.getRandomMid(i);
			})
			.attr("fill-opacity", 0.7)
			.attr("stroke-width", "0px")
			.attr("stroke", "#FFFFFF")
			.on("click", function(d){
				var self = d3.select(this);
				self.moveToFront();
				self.transition()
					.attr("cx", width/2)
					.attr("cy", height/2)
					.attr("r", height/2 - 40)
					.attr("fill-opacity", 1)
					.each('end',  function(d){  });
			})
			.on("mouseover", function(d) {
				d3.select(this)
					.attr("fill-opacity", 1)
					.attr("stroke-width", "2px");
			})
			.on("mouseout", function(d) {
				d3.select(this)
					.attr("fill-opacity", 0.7)
					.attr("stroke-width", "0px");
			});

	svg.selectAll("text")
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

};

module.exports = mapChart;
