var React = require('react'),
	mui = require('material-ui'),
	Paper = mui.Paper,
	mapChart = require('../utils/mapchart.js'),
	streamChart = require('../utils/streamchart.js'),
	wordChart = require('../utils/wordchart.js');

var Visualization = React.createClass({	

	getInitialState: function() {
		return {data: []};
	},
	
	propTypes: {
		width: React.PropTypes.number,
		height: React.PropTypes.number,
		data: React.PropTypes.array.isRequired,
		mode: React.PropTypes.number
	},
	
	getDefaultProps: function() {
		return {
			width: 943,
			height: 648
		};
	},

	componentDidMount: function() {
		var dom =  this.getDOMNode();
		while (dom.lastChild) {
			dom.removeChild(dom.lastChild);
		}
		switch(this.props.mode) {
			case 0: 
				mapChart(dom, this.props);
				break;
			case 1: 
				streamChart(dom, this.props);
				break;
			case 2: 
				wordChart(dom, this.props);
				break;
		}
	},

	componentWillReceiveProps: function() {
		var dom =  this.getDOMNode();
		while (dom.lastChild) {
			dom.removeChild(dom.lastChild);
		}
	},

	componentDidUpdate: function() {
		var dom =  this.getDOMNode();
		switch(this.props.mode) {
			case 0: 
				mapChart(dom, this.props);
				break;
			case 1: 
				streamChart(dom, this.props);
				break;
			case 2: 
				wordChart(dom, this.props);
				break;
		}
		return false;
	},

	render: function() {
		return ( <Paper zDepth={1} /> );
	}

});

module.exports = Visualization;