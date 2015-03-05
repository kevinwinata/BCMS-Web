var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '#Bandung CMS' });
});

router.get('/map', function(req, res) {
    var datefrom = Date.parse(req.query.from);
    var dateto = Date.parse(req.query.to);
    var data = [
		[500, 200, 10, "RS A"],
		[480, 90, 20, "Jalan B"],
		[250, 500, 30, "Jalan C"],
		[800, 33, 40, "Taman X"],
		[330, 95, 50, "Gang Y"],
		[410, 12, 60, "Jembatan Z"],
		[475, 244, 70, "Gedung A"],
		[400, 540, 80, "Jalan D"],
		[85, 210, 90, "Jalan E"],
		[720, 488, 100, "Jalan F"]
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
    var data = [
		['The', 2], ['key', 3], ['function', 5], ['also', ], ['determines', 1], 
		['the', 7], ['enter', 7], ['and', 4], ['exit', 8], ['selections', 1], 
		['the', 4], ['new', 1], ['data', 5], ['for', 6], ['which', 5], ['there', 8], 
		['is', 1], ['no', 1], ['corresponding', 4], ['key', 2], ['in', 1], ['the', 3], 
		['old', 2], ['data', 9], ['become', 1], ['the', 1], ['enter', 5], 
		['selection', 7], ['and', 8], ['the', 6], ['old', 3], ['data', 5], ['for', 1], 
		['which', 4], ['there', 1], ['is', 2], ['no', 1], ['corresponding', 1], 
		['key', 1], ['in', 2], ['the', 1], ['new', 2], ['data', 6], ['become', 1], 
		['the', 6], ['exit', 8], ['selection', 1]
	];
    res.json(data);
});

module.exports = router;
