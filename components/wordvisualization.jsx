var React = require('react'),
	d3 = require('d3'),
	cloud = require('./d3.layout.cloud.js')
	palette = require('./palette.js');

var WordVisualization = React.createClass({	

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

	var fill = d3.scale.category20();

	cloud().size([props.width, props.height])
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
				.attr("transform", "translate(300,300)")
			.selectAll("text")
				.data(words)
			.enter().append("text")
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

module.exports = WordVisualization;
