var express = require('express');
var router = express.Router();
var Complaint = require('../models/complaint.js');


function agenciesQueryArr(str) {
	var arr = [];
	for(var i = 0; i < str.length; i++) {
		if(str.substring(i,i+1) == "1") {
			arr.push(i);
		}
	}
	return arr;
}

router.get('/', function(req, res) {
	var agencies = agenciesQueryArr(req.query.agencies),
		from = req.query.datefrom/1000,
		to = req.query.dateto/100;

	console.log("Querying database from date "+from+" to "+to);
	Complaint.aggregate([
			{
				"$match" : { 
					 $and : [
						{ "timestamp": { $gte: from } },
						{ "timestamp": { $lte: to } }
					],
					"destinations": { $in: agencies } 
				}
			},
			{
				"$unwind" : "$destinations"
			},
			{
				"$group" : {
					"_id" : "$destinations",
					"count" : { "$sum" : 1 }
				}
			},
			{
				"$match" : { 
					"_id": { $in: agencies } 
				}
			}], 
		function (err, result) {
			if (err) return console.log(err);
			console.log("Query success, sending result.");
			res.json(result);
		});
	// var data = [];
	// for(var i = 0; i < agencies.length; i++) {
	// 	if(agencies.substring(i,i+1) != '0')
	// 		data.push([i,Math.random()*10]);
	// }
	// res.json(data);
});

module.exports = router;