var TweetList = require('../components/tweetlist.jsx');

var TweetListReq = function(dom, from, to, ag, tpc, loc) {

	$.get('/tweet', { 
		datefrom: from, 
		dateto: to, 
		agencies: ag,
		topic: tpc,
		location: loc
	}, 
	function(data) {
		React.render(<TweetList 
			data = {data} />, 
		dom);
	});
}

module.exports = TweetListReq;