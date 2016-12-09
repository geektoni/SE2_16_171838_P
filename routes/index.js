var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'UnInforma', jsfile: 'jExpand.js', cssfile: 'index.css' });
});

module.exports = router;
