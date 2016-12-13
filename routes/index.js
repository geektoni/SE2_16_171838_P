var express = require('express');
var questionDAO = require('../models/questionsDAO.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    questionDAO.readAll(function(err, result){
       res.render('index', { 
           title: 'UnInforma', 
           jsfile: 'jExpand.js', 
           cssfile: 'index.css',
           items: result
       }); 
    });
});

module.exports = router;
