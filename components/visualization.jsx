var React = require('react'),
	mui = require('material-ui'),
	Paper = mui.Paper,
	agenciesChart = require('../utils/agencieschart.js'),
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
		from: React.PropTypes.number,
		to: React.PropTypes.number,
		agencies: React.PropTypes.string,
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
				agenciesChart(dom, this.props);
				break;
			case 1: 
				mapChart(dom, this.props);
				break;
			case 2: 
				streamChart(dom, this.props);
				break;
			case 3: 
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
				agenciesChart(dom, this.props);
				break;
			case 1: 
				mapChart(dom, this.props);
				break;
			case 2: 
				streamChart(dom, this.props);
				break;
			case 3: 
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