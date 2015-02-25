var React = require('react'),
	palette = require('./palette.js');

var MapVisualization = React.createClass({	

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
		var divStyle = {
			width: this.props.width,
			height: this.props.height,
			backgroundImage: 'url(' + '/images/bandung.svg' + ')',
			backgroundSize: '100% 100%',
			backgroundRepeat: 'no-repeat'
		};
		return (
			<div className="bandung-map" style={divStyle} />
		);
	}

});


function createChart(dom, props){
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
					return palette.getColor(i);
				})
				.attr("fill-opacity", 0.7);
 
};

module.exports = MapVisualization;
