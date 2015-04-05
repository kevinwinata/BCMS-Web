var mongoose = require('mongoose');
var Complaint = require('../models/complaint.js');

var dbQuery = {

	getPieVizData: function(db,params,res) {
		db.on('open', function(callback){
			Complaint.aggregate([
				{
					"$match" : { 
						"destinations": { 
							$in: agenciesQueryArr(params.agencies) 
						} 
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
				}
			], function (err, result) {
				if (err) return handleError(err);
				console.log(result);
				res.json(result);
			});
		});
	},

	getMapVizData: function(db,params) {
		
	},

	getStreamVizData: function(db,params) {
		
	},

	getWordVizData: function(db,params) {
		
	},

	function agenciesQueryArr(str) {
		var arr = [];
		for(var i = 0; i < str.length; i++) {
			if(str.substring(i,i+1) == "1") {
				arr.push(i);
			}
		}
		return arr;
	}
};

module.exports(dbQuery);