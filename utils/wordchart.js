var palette = require('./palette.js'),
	cloud = require('./d3.layout.cloud.js');

var wordChart = function(dom, props) {
	var width = dom.offsetWidth;
	var height =  width/1.46 - 50;
	var fill = d3.scale.category20();
	var data = props.data;

	cloud().size([width, height])
			.words(data.map(function(d) {
				return {text: d._id, size: Math.log(d.count)*20 };
			}))
			.padding(5)
			.rotate(function() { return ~~0; })
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
				return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
			})
			.text(function(d) { return d.text; });	
	}
}

module.exports = wordChart;
