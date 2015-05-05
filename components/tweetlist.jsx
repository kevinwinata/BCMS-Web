var React = require('react'),
	mui = require('material-ui'),
	Paper = mui.Paper,
	Menu = mui.Menu;

var TweetList = React.createClass({	

	getInitialState: function() {
		return {data: []};
	},
	
	propTypes: {,
		data: React.PropTypes.array.isRequired,
		from: React.PropTypes.number,
		to: React.PropTypes.number
	},

	componentDidMount: function() {
		var dom =  this.getDOMNode();
		while (dom.lastChild) {
			dom.removeChild(dom.lastChild);
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
		return false;
	},

	render: function() {
		var tweetTexts = [];
		for(var i = 0; i < data.length; i++) {
			tweetTexts[i] = { 
				payload : (i+1).toString(),
				text : data.text
			}
		}
		return ( 
			<Paper zDepth={1} >
				<Menu menuItems={tweetTexts} />
			</Paper>
		);
	}

});

module.exports = TweetList;