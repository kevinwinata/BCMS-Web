var express = require('express');
var router = express.Router();
var Complaint = require('../models/complaint.js');

router.get('/', function(req, res) {
	var agencies = [],
		from = req.query.datefrom/1000,
		to = req.query.dateto/1000,
		topic = req.query.topic,
		location = req.query.location;

	for(var i = 0; i < req.query.agencies.length; i++) {
		if(req.query.agencies.substring(i,i+1) == "1") {
			agencies.push(i);
		}
	}

	var conditions = {
		$and : [
			{ "timestamp": { $gte: from } },
			{ "timestamp": { $lte: to } }
		],
		"destinations": { $in: agencies } 
	};
	if(topic && topic != "") {
		conditions["topic"] = topic;
	}
	if(location && location != "") {
		conditions["location.name"] = location;
	}

	console.log("Querying database from date "+from+" to "+to);

	var query = Complaint.find(conditions, '-_id text timestamp').sort('timestamp');
	query.exec(function (err, result) {
		if (err) return console.log(err);
		console.log("Query success, sending result.");
		res.json(result);
	});
});


module.exports = router;