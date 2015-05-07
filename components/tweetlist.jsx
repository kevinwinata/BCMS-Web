var React = require('react'),
	mui = require('material-ui'),
	Paper = mui.Paper;

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
			tweetTexts.push(
				<p>
					<b>{ date.toLocaleDateString('id') }, &nbsp;
					{ date.toLocaleTimeString('id') }</b>
					<br/>{ tweet.text }
				</p>);
		}
		return ( 
			<Paper zDepth={1} >
				<div>{tweetTexts}</div>
			</Paper>
		);
	}

});

module.exports = TweetList;