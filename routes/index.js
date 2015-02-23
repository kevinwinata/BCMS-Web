var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '#Bandung CMS' });
});

router.post('/', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify(req.body));
});

module.exports = router;
