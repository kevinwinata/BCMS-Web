var React = require('react'),
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
		if (this.props.mode == 0) {
			var divStyle = {
				width: this.props.width,
				height: this.props.height,
				backgroundImage: 'url(' + '/images/bandung.svg' + ')',
				backgroundSize: '100% 100%',
				backgroundRepeat: 'no-repeat'
			};
			return ( <div className="bandung-map" style={divStyle} /> );
		}
		else {
			return ( <div /> );
		}
	}

});

module.exports = Visualization;