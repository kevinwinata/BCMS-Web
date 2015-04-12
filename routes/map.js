var express = require('express');
var router = express.Router();
var Complaint = require('../models/complaint.js');

router.get('/', function(req, res) {
	var agencies = [],
		from = req.query.datefrom/1000,
		to = req.query.dateto/100;

	for(var i = 0; i < req.query.agencies.length; i++) {
		if(req.query.agencies.substring(i,i+1) == "1") {
			agencies.push(i);
		}
	}

	console.log("Querying database from date "+from+" to "+to);
	Complaint.aggregate([
		{
			$match : { 
				"topic" : { $ne: "" },
				"location.name" : { $ne: "" },
				$and : [
					{ "timestamp": { $gte: from } },
					{ "timestamp": { $lte: to } }
				],
				"destinations": { $in: agencies } 
			}
		},
		{
			$group : {
				"_id" : { 
					"name" : "$location.name", 
					"latitude" : "$location.latitude",
					"longitude" : "$location.longitude",
					"topic" : "$topic",
				},
				"count" : { "$sum" : 1 }
			}
		},
		{
			$group : {
				"_id" : { 
					"name" : "$_id.name", 
					"latitude" : "$_id.latitude",
					"longitude" : "$_id.longitude"
				},
				"topics" : { $push: { 
					"topic": "$_id.topic", 
					"count": "$count"  
				} },
				"total" : { "$sum" : "$count" }
			}
		},
		{
			$sort: { total : -1 }
		}], 
		function (err, result) {
			if (err) return console.log(err);
			console.log("Query success, sending result.");
			res.json(result);
		});
});

module.exports = router;