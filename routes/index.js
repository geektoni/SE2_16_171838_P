/**
* Index Controller
*
* This is the controller for the index page. It will
* manage all the urls that come in the form http://site/{something}
*/

// Modules needed
var express = require('express');
var questionDAO = require('../models/questionsDAO.js');
var router = express.Router();

/**
* Get the index page showing all the questions
* grouped by category.
*/
router.get('/', function(req, res, next) {
    questionDAO.readAll(function(err, result){
        // When the query end, render the page with this
        // JSON as configuration
        res.render('index', { 
           title: 'UnInforma', 
           jsfile: 'jExpand.js', 
           cssfile: 'index.css',
           items: result
       }); 
    });
});

// Export the router
module.exports = router;
