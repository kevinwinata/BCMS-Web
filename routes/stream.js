var express = require('express');
var router = express.Router();
var Complaint = require('../models/complaint.js');

router.get('/', function(req, res) {
	var agencies = [],
		from = req.query.datefrom/1000,
		to = req.query.dateto/1000;

	for(var i = 0; i < req.query.agencies.length; i++) {
		if(req.query.agencies.substring(i,i+1) == "1") {
			agencies.push(i);
		}
	}

	console.log("Querying database from date "+from+" to "+to);
	Complaint.aggregate([
		{
			$match : { 
				"topic" : { $ne: "" } ,
				$and : [
					{ "timestamp": { $gte: from } },
					{ "timestamp": { $lte: to } }
				],
				"destinations": { $in: agencies } 
			}
		},
		{
			$project : {
				"topic" : 1,
				"date" : { $add: [new Date(0), { $multiply: ["$timestamp",1000]} ] }
			}
		},
		{
			$group : {
				"_id" : { 
					"topic" : "$topic", 
					"day" : { $dayOfMonth: "$date" },
					"month" : { $month: "$date" },  
					"year" : { $year: "$date" }
				},
				"count" : { "$sum" : 1 },
			}
		},
		{
			$project : {
				"_id" : 0,
				"key" : "$_id.topic", 
				"value" : "$count",
				"date" : { $concat : [ 
					{$substr: [ "$_id.month", 0, 2]},  "/", 
					{$substr: [ "$_id.day", 0, 2]}, "/", 
					{$substr: [ "$_id.year", 2, 4]}
				] }
			}
		},
		{
			$sort: { key : 1 }
		}], 
		function (err, result) {
			if (err) return console.log(err);
			console.log("Query success, sending result.");
			res.json(result);
		});

	// var data = [
	// 	{ key: 'Jalan Rusak', value: 1, date: '03/08/15' },
	// 	{ key: 'Jalan Rusak', value: 15, date: '03/09/15' },
	// 	{ key: 'Jalan Rusak', value: 35, date: '03/10/15' },
	// 	{ key: 'Jalan Rusak', value: 38, date: '03/11/15' },
	// 	{ key: 'Jalan Rusak', value: 22, date: '03/12/15' },
	// 	{ key: 'Jalan Rusak', value: 16, date: '03/13/15' },
	// 	{ key: 'Jalan Rusak', value: 07, date: '03/14/15' },
	// 	{ key: 'Jalan Rusak', value: 02, date: '03/15/15' },
	// 	{ key: 'Jalan Rusak', value: 17, date: '03/16/15' },
	// 	{ key: 'Jalan Rusak', value: 33, date: '03/17/15' },
	// 	{ key: 'Jalan Rusak', value: 4, date: '03/18/15' },
	// 	{ key: 'Jalan Rusak', value: 32, date: '03/19/15' },
	// 	{ key: 'Jalan Rusak', value: 26, date: '03/20/15' },
	// 	{ key: 'Jalan Rusak', value: 35, date: '03/21/15' },
	// 	{ key: 'Jalan Rusak', value: 4, date: '03/22/15' },
	// 	{ key: 'Jalan Rusak', value: 32, date: '03/23/15' },
	// 	{ key: 'Jalan Rusak', value: 26, date: '03/24/15' },
	// 	{ key: 'Jalan Rusak', value: 22, date: '03/25/15' },
	// 	{ key: 'Jalan Rusak', value: 16, date: '03/26/15' },
	// 	{ key: 'Jalan Rusak', value: 22, date: '03/27/15' },
	// 	{ key: 'Jalan Rusak', value: 1, date: '03/28/15' },
	// 	{ key: 'Banjir', value: 35, date: '03/08/15' },
	// 	{ key: 'Banjir', value: 36, date: '03/09/15' },
	// 	{ key: 'Banjir', value: 37, date: '03/10/15' },
	// 	{ key: 'Banjir', value: 22, date: '03/11/15' },
	// 	{ key: 'Banjir', value: 24, date: '03/12/15' },
	// 	{ key: 'Banjir', value: 26, date: '03/13/15' },
	// 	{ key: 'Banjir', value: 34, date: '03/14/15' },
	// 	{ key: 'Banjir', value: 21, date: '03/15/15' },
	// 	{ key: 'Banjir', value: 18, date: '03/16/15' },
	// 	{ key: 'Banjir', value: 45, date: '03/17/15' },
	// 	{ key: 'Banjir', value: 32, date: '03/18/15' },
	// 	{ key: 'Banjir', value: 35, date: '03/19/15' },
	// 	{ key: 'Banjir', value: 3, date: '03/20/15' },
	// 	{ key: 'Banjir', value: 28, date: '03/21/15' },
	// 	{ key: 'Banjir', value: 27, date: '03/22/15' },
	// 	{ key: 'Banjir', value: 26, date: '03/23/15' },
	// 	{ key: 'Banjir', value: 15, date: '03/24/15' },
	// 	{ key: 'Banjir', value: 3, date: '03/25/15' },
	// 	{ key: 'Banjir', value: 35, date: '03/26/15' },
	// 	{ key: 'Banjir', value: 42, date: '03/27/15' },
	// 	{ key: 'Banjir', value: 42, date: '03/28/15' },
	// 	{ key: 'Sampah', value: 21, date: '03/08/15' },
	// 	{ key: 'Sampah', value: 25, date: '03/09/15' },
	// 	{ key: 'Sampah', value: 27, date: '03/10/15' },
	// 	{ key: 'Sampah', value: 23, date: '03/11/15' },
	// 	{ key: 'Sampah', value: 24, date: '03/12/15' },
	// 	{ key: 'Sampah', value: 21, date: '03/13/15' },
	// 	{ key: 'Sampah', value: 35, date: '03/14/15' },
	// 	{ key: 'Sampah', value: 39, date: '03/15/15' },
	// 	{ key: 'Sampah', value: 4, date: '03/16/15' },
	// 	{ key: 'Sampah', value: 36, date: '03/17/15' },
	// 	{ key: 'Sampah', value: 33, date: '03/18/15' },
	// 	{ key: 'Sampah', value: 43, date: '03/19/15' },
	// 	{ key: 'Sampah', value: 4, date: '03/20/15' },
	// 	{ key: 'Sampah', value: 34, date: '03/21/15' },
	// 	{ key: 'Sampah', value: 28, date: '03/22/15' },
	// 	{ key: 'Sampah', value: 26, date: '03/23/15' },
	// 	{ key: 'Sampah', value: 37, date: '03/24/15' },
	// 	{ key: 'Sampah', value: 41, date: '03/25/15' },
	// 	{ key: 'Sampah', value: 46, date: '03/26/15' },
	// 	{ key: 'Sampah', value: 47, date: '03/27/15' },
	// 	{ key: 'Sampah', value: 41, date: '03/28/15' },
	// 	{ key: 'Macet', value: 1, date: '03/08/15' },
	// 	{ key: 'Macet', value: 15, date: '03/09/15' },
	// 	{ key: 'Macet', value: 35, date: '03/10/15' },
	// 	{ key: 'Macet', value: 38, date: '03/11/15' },
	// 	{ key: 'Macet', value: 22, date: '03/12/15' },
	// 	{ key: 'Macet', value: 16, date: '03/13/15' },
	// 	{ key: 'Macet', value: 07, date: '03/14/15' },
	// 	{ key: 'Macet', value: 02, date: '03/15/15' },
	// 	{ key: 'Macet', value: 17, date: '03/16/15' },
	// 	{ key: 'Macet', value: 33, date: '03/17/15' },
	// 	{ key: 'Macet', value: 4, date: '03/18/15' },
	// 	{ key: 'Macet', value: 32, date: '03/19/15' },
	// 	{ key: 'Macet', value: 26, date: '03/20/15' },
	// 	{ key: 'Macet', value: 35, date: '03/21/15' },
	// 	{ key: 'Macet', value: 4, date: '03/22/15' },
	// 	{ key: 'Macet', value: 32, date: '03/23/15' },
	// 	{ key: 'Macet', value: 26, date: '03/24/15' },
	// 	{ key: 'Macet', value: 22, date: '03/25/15' },
	// 	{ key: 'Macet', value: 16, date: '03/26/15' },
	// 	{ key: 'Macet', value: 22, date: '03/27/15' },
	// 	{ key: 'Macet', value: 1, date: '03/28/15' },
	// 	{ key: 'Polusi', value: 1, date: '03/08/15' },
	// 	{ key: 'Polusi', value: 15, date: '03/09/15' },
	// 	{ key: 'Polusi', value: 35, date: '03/10/15' },
	// 	{ key: 'Polusi', value: 38, date: '03/11/15' },
	// 	{ key: 'Polusi', value: 22, date: '03/12/15' },
	// 	{ key: 'Polusi', value: 16, date: '03/13/15' },
	// 	{ key: 'Polusi', value: 07, date: '03/14/15' },
	// 	{ key: 'Polusi', value: 02, date: '03/15/15' },
	// 	{ key: 'Polusi', value: 17, date: '03/16/15' },
	// 	{ key: 'Polusi', value: 33, date: '03/17/15' },
	// 	{ key: 'Polusi', value: 4, date: '03/18/15' },
	// 	{ key: 'Polusi', value: 32, date: '03/19/15' },
	// 	{ key: 'Polusi', value: 26, date: '03/20/15' },
	// 	{ key: 'Polusi', value: 35, date: '03/21/15' },
	// 	{ key: 'Polusi', value: 4, date: '03/22/15' },
	// 	{ key: 'Polusi', value: 32, date: '03/23/15' },
	// 	{ key: 'Polusi', value: 26, date: '03/24/15' },
	// 	{ key: 'Polusi', value: 22, date: '03/25/15' },
	// 	{ key: 'Polusi', value: 16, date: '03/26/15' },
	// 	{ key: 'Polusi', value: 22, date: '03/27/15' },
	// 	{ key: 'Polusi', value: 1, date: '03/28/15' },
	// 	{ key: 'Keamanan', value: 1, date: '03/08/15' },
	// 	{ key: 'Keamanan', value: 15, date: '03/09/15' },
	// 	{ key: 'Keamanan', value: 35, date: '03/10/15' },
	// 	{ key: 'Keamanan', value: 38, date: '03/11/15' },
	// 	{ key: 'Keamanan', value: 22, date: '03/12/15' },
	// 	{ key: 'Keamanan', value: 16, date: '03/13/15' },
	// 	{ key: 'Keamanan', value: 07, date: '03/14/15' },
	// 	{ key: 'Keamanan', value: 02, date: '03/15/15' },
	// 	{ key: 'Keamanan', value: 17, date: '03/16/15' },
	// 	{ key: 'Keamanan', value: 33, date: '03/17/15' },
	// 	{ key: 'Keamanan', value: 4, date: '03/18/15' },
	// 	{ key: 'Keamanan', value: 32, date: '03/19/15' },
	// 	{ key: 'Keamanan', value: 26, date: '03/20/15' },
	// 	{ key: 'Keamanan', value: 35, date: '03/21/15' },
	// 	{ key: 'Keamanan', value: 4, date: '03/22/15' },
	// 	{ key: 'Keamanan', value: 32, date: '03/23/15' },
	// 	{ key: 'Keamanan', value: 26, date: '03/24/15' },
	// 	{ key: 'Keamanan', value: 22, date: '03/25/15' },
	// 	{ key: 'Keamanan', value: 16, date: '03/26/15' },
	// 	{ key: 'Keamanan', value: 22, date: '03/27/15' },
	// 	{ key: 'Keamanan', value: 1, date: '03/28/15'}
	// ];
	// res.json(data);
});

module.exports = router;