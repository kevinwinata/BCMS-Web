var palette = require('./palette.js'),
	cloud = require('./d3.layout.cloud.js');

var wordChart = function(dom, props) {
	var width = dom.offsetWidth;
	var height = document.getElementById("toolbar").offsetHeight;
	var fill = d3.scale.category20();

	cloud().size([width, height])
			.words(props.data.map(function(d) {
				return {text: d[0], size: d[1]*10 };
			}))
			.padding(5)
			.font("Roboto")
			.fontSize(function(d) { return d.size; })
			.on("end", draw)
			.start();

	function draw(words) {
		d3.select(dom).append("svg")
				.attr("width", props.width)
				.attr("height", props.height)
			.append("g")
				.attr("transform", "translate(500,250)")
			.selectAll("text")
				.data(words)
			.enter().append("text")
				.transition()
				.delay(function(d, i) {
					return i * 1000 / words.length;
				})
				.duration(1000)
				.style("font-size", function(d) { return d.size + "px"; })
				.style("font-family", "Roboto")
				.style("fill", function(d, i) { return fill(i); })
				.attr("text-anchor", "middle")
				.attr("transform", function(d) {
					return "translate(" + [d.x, d.y] + ")";
				})
				.text(function(d) { return d.text; });
	}
}

module.exports = wordChart;
