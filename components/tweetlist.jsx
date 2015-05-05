var React = require('react'),
	mui = require('material-ui'),
	Paper = mui.Paper,
	Menu = mui.Menu;

var TweetList = React.createClass({	
	
	propTypes: {
		data: React.PropTypes.array.isRequired,
		from: React.PropTypes.number,
		to: React.PropTypes.number
	},

	render: function() {
		var tweetTexts = [];
		for(var i = 0; i < this.props.data.length; i++) {
			var tweet = this.props.data[i];
			var date = new Date(tweet.timestamp*1000);
			tweetTexts[i] = { 
				payload : (i+1).toString(),
				text: date.toLocaleDateString('id'),
				data : tweet.text
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