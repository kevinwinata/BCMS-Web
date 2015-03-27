var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
  res.render('index', { title: '#Bandung CMS' });
});

router.get('/map', function(req, res) {
    var datefrom = Date.parse(req.query.from);
    var dateto = Date.parse(req.query.to);
    var data = [
		[500, 200, 10, "RS A", [ [1,7],[2,5],[3,8],[4,2] ]],
		[480, 90, 20, "Jalan B", [ [1,5],[2,8],[3,3],[4,1] ]],
		[250, 500, 30, "Jalan C", [ [1,4],[2,1],[3,5],[4,2] ]],
		[800, 33, 40, "Taman X", [ [1,2],[2,3],[3,5],[4,8] ]],
		[330, 95, 50, "Gang Y", [ [1,7],[2,6],[3,5],[4,3] ]],
		[410, 12, 60, "Jembatan Z", [ [1,6],[2,5],[3,9],[4,2] ]],
		[475, 244, 70, "Gedung A", [ [1,9],[2,6],[3,4],[4,9] ]],
		[400, 540, 80, "Jalan D", [ [1,2],[2,7],[3,5],[4,9] ]],
		[85, 210, 90, "Jalan E", [ [1,9],[2,9],[3,7],[4,7] ]],
		[720, 488, 100, "Jalan F", [ [1,5],[2,9],[3,7],[4,5] ]]
	];
    res.json(data);
});

router.get('/stream', function(req, res) {
    var datefrom = Date.parse(req.query.from);
    var dateto = Date.parse(req.query.to);
    var data = [
		{ key: 'Jalan Rusak', value: 1, date: '01/08/13' },
		{ key: 'Jalan Rusak', value: 15, date: '01/09/13' },
		{ key: 'Jalan Rusak', value: 35, date: '01/10/13' },
		{ key: 'Jalan Rusak', value: 38, date: '01/11/13' },
		{ key: 'Jalan Rusak', value: 22, date: '01/12/13' },
		{ key: 'Jalan Rusak', value: 16, date: '01/13/13' },
		{ key: 'Jalan Rusak', value: 07, date: '01/14/13' },
		{ key: 'Jalan Rusak', value: 02, date: '01/15/13' },
		{ key: 'Jalan Rusak', value: 17, date: '01/16/13' },
		{ key: 'Jalan Rusak', value: 33, date: '01/17/13' },
		{ key: 'Jalan Rusak', value: 4, date: '01/18/13' },
		{ key: 'Jalan Rusak', value: 32, date: '01/19/13' },
		{ key: 'Jalan Rusak', value: 26, date: '01/20/13' },
		{ key: 'Jalan Rusak', value: 35, date: '01/21/13' },
		{ key: 'Jalan Rusak', value: 4, date: '01/22/13' },
		{ key: 'Jalan Rusak', value: 32, date: '01/23/13' },
		{ key: 'Jalan Rusak', value: 26, date: '01/24/13' },
		{ key: 'Jalan Rusak', value: 22, date: '01/25/13' },
		{ key: 'Jalan Rusak', value: 16, date: '01/26/13' },
		{ key: 'Jalan Rusak', value: 22, date: '01/27/13' },
		{ key: 'Jalan Rusak', value: 1, date: '01/28/13' },
		{ key: 'Banjir', value: 35, date: '01/08/13' },
		{ key: 'Banjir', value: 36, date: '01/09/13' },
		{ key: 'Banjir', value: 37, date: '01/10/13' },
		{ key: 'Banjir', value: 22, date: '01/11/13' },
		{ key: 'Banjir', value: 24, date: '01/12/13' },
		{ key: 'Banjir', value: 26, date: '01/13/13' },
		{ key: 'Banjir', value: 34, date: '01/14/13' },
		{ key: 'Banjir', value: 21, date: '01/15/13' },
		{ key: 'Banjir', value: 18, date: '01/16/13' },
		{ key: 'Banjir', value: 45, date: '01/17/13' },
		{ key: 'Banjir', value: 32, date: '01/18/13' },
		{ key: 'Banjir', value: 35, date: '01/19/13' },
		{ key: 'Banjir', value: 3, date: '01/20/13' },
		{ key: 'Banjir', value: 28, date: '01/21/13' },
		{ key: 'Banjir', value: 27, date: '01/22/13' },
		{ key: 'Banjir', value: 26, date: '01/23/13' },
		{ key: 'Banjir', value: 15, date: '01/24/13' },
		{ key: 'Banjir', value: 3, date: '01/25/13' },
		{ key: 'Banjir', value: 35, date: '01/26/13' },
		{ key: 'Banjir', value: 42, date: '01/27/13' },
		{ key: 'Banjir', value: 42, date: '01/28/13' },
		{ key: 'Sampah', value: 21, date: '01/08/13' },
		{ key: 'Sampah', value: 25, date: '01/09/13' },
		{ key: 'Sampah', value: 27, date: '01/10/13' },
		{ key: 'Sampah', value: 23, date: '01/11/13' },
		{ key: 'Sampah', value: 24, date: '01/12/13' },
		{ key: 'Sampah', value: 21, date: '01/13/13' },
		{ key: 'Sampah', value: 35, date: '01/14/13' },
		{ key: 'Sampah', value: 39, date: '01/15/13' },
		{ key: 'Sampah', value: 4, date: '01/16/13' },
		{ key: 'Sampah', value: 36, date: '01/17/13' },
		{ key: 'Sampah', value: 33, date: '01/18/13' },
		{ key: 'Sampah', value: 43, date: '01/19/13' },
		{ key: 'Sampah', value: 4, date: '01/20/13' },
		{ key: 'Sampah', value: 34, date: '01/21/13' },
		{ key: 'Sampah', value: 28, date: '01/22/13' },
		{ key: 'Sampah', value: 26, date: '01/23/13' },
		{ key: 'Sampah', value: 37, date: '01/24/13' },
		{ key: 'Sampah', value: 41, date: '01/25/13' },
		{ key: 'Sampah', value: 46, date: '01/26/13' },
		{ key: 'Sampah', value: 47, date: '01/27/13' },
		{ key: 'Sampah', value: 41, date: '01/28/13' },
		{ key: 'Macet', value: 1, date: '01/08/13' },
		{ key: 'Macet', value: 15, date: '01/09/13' },
		{ key: 'Macet', value: 35, date: '01/10/13' },
		{ key: 'Macet', value: 38, date: '01/11/13' },
		{ key: 'Macet', value: 22, date: '01/12/13' },
		{ key: 'Macet', value: 16, date: '01/13/13' },
		{ key: 'Macet', value: 07, date: '01/14/13' },
		{ key: 'Macet', value: 02, date: '01/15/13' },
		{ key: 'Macet', value: 17, date: '01/16/13' },
		{ key: 'Macet', value: 33, date: '01/17/13' },
		{ key: 'Macet', value: 4, date: '01/18/13' },
		{ key: 'Macet', value: 32, date: '01/19/13' },
		{ key: 'Macet', value: 26, date: '01/20/13' },
		{ key: 'Macet', value: 35, date: '01/21/13' },
		{ key: 'Macet', value: 4, date: '01/22/13' },
		{ key: 'Macet', value: 32, date: '01/23/13' },
		{ key: 'Macet', value: 26, date: '01/24/13' },
		{ key: 'Macet', value: 22, date: '01/25/13' },
		{ key: 'Macet', value: 16, date: '01/26/13' },
		{ key: 'Macet', value: 22, date: '01/27/13' },
		{ key: 'Macet', value: 1, date: '01/28/13' },
		{ key: 'Polusi', value: 1, date: '01/08/13' },
		{ key: 'Polusi', value: 15, date: '01/09/13' },
		{ key: 'Polusi', value: 35, date: '01/10/13' },
		{ key: 'Polusi', value: 38, date: '01/11/13' },
		{ key: 'Polusi', value: 22, date: '01/12/13' },
		{ key: 'Polusi', value: 16, date: '01/13/13' },
		{ key: 'Polusi', value: 07, date: '01/14/13' },
		{ key: 'Polusi', value: 02, date: '01/15/13' },
		{ key: 'Polusi', value: 17, date: '01/16/13' },
		{ key: 'Polusi', value: 33, date: '01/17/13' },
		{ key: 'Polusi', value: 4, date: '01/18/13' },
		{ key: 'Polusi', value: 32, date: '01/19/13' },
		{ key: 'Polusi', value: 26, date: '01/20/13' },
		{ key: 'Polusi', value: 35, date: '01/21/13' },
		{ key: 'Polusi', value: 4, date: '01/22/13' },
		{ key: 'Polusi', value: 32, date: '01/23/13' },
		{ key: 'Polusi', value: 26, date: '01/24/13' },
		{ key: 'Polusi', value: 22, date: '01/25/13' },
		{ key: 'Polusi', value: 16, date: '01/26/13' },
		{ key: 'Polusi', value: 22, date: '01/27/13' },
		{ key: 'Polusi', value: 1, date: '01/28/13' },
		{ key: 'Keamanan', value: 1, date: '01/08/13' },
		{ key: 'Keamanan', value: 15, date: '01/09/13' },
		{ key: 'Keamanan', value: 35, date: '01/10/13' },
		{ key: 'Keamanan', value: 38, date: '01/11/13' },
		{ key: 'Keamanan', value: 22, date: '01/12/13' },
		{ key: 'Keamanan', value: 16, date: '01/13/13' },
		{ key: 'Keamanan', value: 07, date: '01/14/13' },
		{ key: 'Keamanan', value: 02, date: '01/15/13' },
		{ key: 'Keamanan', value: 17, date: '01/16/13' },
		{ key: 'Keamanan', value: 33, date: '01/17/13' },
		{ key: 'Keamanan', value: 4, date: '01/18/13' },
		{ key: 'Keamanan', value: 32, date: '01/19/13' },
		{ key: 'Keamanan', value: 26, date: '01/20/13' },
		{ key: 'Keamanan', value: 35, date: '01/21/13' },
		{ key: 'Keamanan', value: 4, date: '01/22/13' },
		{ key: 'Keamanan', value: 32, date: '01/23/13' },
		{ key: 'Keamanan', value: 26, date: '01/24/13' },
		{ key: 'Keamanan', value: 22, date: '01/25/13' },
		{ key: 'Keamanan', value: 16, date: '01/26/13' },
		{ key: 'Keamanan', value: 22, date: '01/27/13' },
		{ key: 'Keamanan', value: 1, date: '01/28/13'}
	];
    res.json(data);
});

router.get('/word', function(req, res) {
    var datefrom = Date.parse(req.query.from);
    var dateto = Date.parse(req.query.to);
    var trend = [ 	{value: 25, date: '01/09/13'},
					{value: 35, date: '01/10/13'},
					{value: 38, date: '01/11/13'},
					{value: 22, date: '01/12/13'},
					{value: 26, date: '01/13/13'},
					{value: 27, date: '01/14/13'},
					{value: 22, date: '01/15/13'},
					{value: 27, date: '01/16/13'},
					{value: 33, date: '01/17/13'} ];
    var data = [
		['The', 2, trend], ['key', 3, trend], ['function', 5, trend], ['also', , trend], ['determines', 1, trend], 
		['the', 7, trend], ['enter', 7, trend], ['and', 4, trend], ['exit', 8, trend], ['selections', 1, trend], 
		['the', 4, trend], ['new', 1, trend], ['data', 5, trend], ['for', 6, trend], ['which', 5, trend], ['there', 8, trend], 
		['is', 1, trend], ['no', 1, trend], ['corresponding', 4, trend], ['key', 2, trend], ['in', 1, trend], ['the', 3, trend], 
		['old', 2, trend], ['data', 9, trend], ['become', 1, trend], ['the', 1, trend], ['enter', 5, trend], 
		['selection', 7, trend], ['and', 8, trend], ['the', 6, trend], ['old', 3, trend], ['data', 5, trend], ['for', 1, trend], 
		['which', 4, trend], ['there', 1, trend], ['is', 2, trend], ['no', 1, trend], ['corresponding', 1, trend], 
		['key', 1, trend], ['in', 2, trend], ['the', 1, trend], ['new', 2, trend], ['data', 6, trend], ['become', 1, trend], 
		['the', 6, trend], ['exit', 8, trend], ['selection', 1, trend]
	];
    res.json(data);
});

module.exports = router;
