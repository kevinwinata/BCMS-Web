var express = require('express');
var router = express.Router();
var Complaint = require('../models/complaint.js');

router.get('/', function(req, res) {
	var params = { 
		agencies: req.query.agencies,
		from: req.query.from/1000,
		to: req.query.to/1000 
	};
    var data = [
		["kebakaran",62],
		["macet",15],
		["mati",15],
		["mengalir",12],
		["menggunung",12],
		["banjir",9],
		["sampah",9],
		["belum",6],
		["air",5],
		["longsor",5],
		["terendam banjir",5],
		["apartemen",5],
		["tidak mengalir",5],
		["kebakaran besar",4],
		["penyerangan",4],
		["rusak",4],
		["bocor",4],
		["keadaan flash",4],
		["penyiksa monyet",3],
		["tempat sampah",3],
		["rusak parah",3],
		["berisik",3],
		["trotoar",3],
		["pengemis",3],
		["pohon",3],
		["memaksa",3],
		["baru",3],
		["pohon tumbang menimpa kabel",3],
		["perbaikan drainase",2]
	];
    res.json(data);
});


module.exports = router;