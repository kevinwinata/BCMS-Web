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
			$sort: { count : -1 }
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
				} }
			}
		}], 
		function (err, result) {
			if (err) return console.log(err);
			console.log("Query success, sending result.");
			res.json(result);
		});
	// var data = [
	// 	[0.55, 0.45, 40, "Jl. Dago", [ ["Jalanan macet",7],["Parkir sembarangan",5],["Polusi",2] ]],
	// 	[0.7, 0.78, 50, "Jl. Soekarno Hatta", [ ["Jalanan macet",5],["Parkir sembarangan",8],["Banyak sampah",3],["Polusi",1] ]],
	// 	[0.5, 0.84, 25, "Jl. Moh. Toha", [ ["Jalanan macet",4],["Banjir",1],["Banyak sampah",5],["Polusi",2] ]],
	// 	[0.4, 0.8, 60, "Jl. Kopo", [ ["Jalanan macet",2],["Banjir",3],["Banyak sampah",5],["Polusi",8] ]],
	// 	[0.3, 0.4, 70, "Jl. Pasteur", [ ["Jalanan macet",14],["Polusi",3] ]],
	// 	[0.68, 0.5, 20, "Jl. Ahmad Yani", [ ["Jalanan macet",6],["Banjir",5],["Banyak sampah",9] ]],
	// 	[0.4, 0.3, 30, "Jl. Sukajadi", [ ["Jalanan macet",9],["Banjir",6] ]],
	// 	[0.5, 0.6, 20, "Jl. Jend Sudirman", [ ["Jalanan macet",9] ]],
	// 	[0.2, 0.35, 40, "Cimahi", [ ["Banjir",7],["Banyak sampah",5],["Polusi",9] ]]
	// ];
 //    res.json(data);
});

module.exports = router;