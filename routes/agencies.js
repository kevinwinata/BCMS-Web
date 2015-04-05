var express = require('express');
var router = express.Router();
var Complaint = require('../models/complaint.js');

router.get('/', function(req, res) {
	// var db = req.db;
 //    db.on('open', function(callback){
	// 	Complaint.aggregate([
	// 		{
	// 			"$match" : { 
	// 				"destinations": { 
	// 					$in: agenciesQueryArr(req.queries.agencies) 
	// 				} 
	// 			}
	// 		},
	// 		{
	// 			"$unwind" : "$destinations"
	// 		},
	// 		{
	// 			"$group" : {
	// 				"_id" : "$destinations",
	// 				"count" : { "$sum" : 1 }
	// 			}
	// 		}
	// 	], function (err, result) {
	// 		if (err) return handleError(err);
	// 		console.log(result);
	// 		res.json(result);
	// 	});
	// });
	var params = { 
		agencies: req.query.agencies,
		from: req.query.from/1000,
		to: req.query.to/1000 
	};
	var data = [];
	for(var i = 0; i < params.agencies.length; i++) {
		if(params.agencies.substring(i,i+1) != '0')
			data.push([i,Math.random()*10]);
	}
	res.json(data);
});

module.exports = router;