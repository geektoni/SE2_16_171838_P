/**
* Question Controller
*
* This is the controller for the question page. It will
* manage all the urls that come in the form http://site/questions/{something}.
* The idea would be to implement a REST API.
*/

// Modules needed
var express = require('express');
var questionDAO = require('../models/questionsDAO.js');
var router = express.Router();

/**
* Get all the questions that match a full-text query
* previously passed.
*/
router.get('/', function(req, res, next) {
    
    // Check and sanitize the GET parameter
    var query = req.param("query");
    if ( query === undefined || query === null) {
        query = "";
    }
    
    // Search and render the page
    questionDAO.search(query, function(err, result) {
        if (result == null || result == undefined) {
            result = []
        }
        res.render('search', { title: 'UnInforma | Search', 
                                    cssfile: 'search.css', 
                                    result: result
                                   });  
    }); 
});

/**
* Show a question based on the id given  
*/
router.get('/:id', function(req, res, next) {
    
    // Sanitize the id and check for correctness
    var id = parseInt(req.params["id"]);
    if (id === null || isNaN(id)) {
        next('route');
    } else {
        
        // Search and render the page
        questionDAO.read(id, function(err, result) {
            if (result == null || result == undefined) {
                next('route');
            } else {
                 res.render('question', { title: 'UnInforma | '+result.title, 
                                    cssfile: 'question.css', 
                                    question: result.title,
                                    answer: result.answer,
                                    tags: result.tags
                                   });  
            }
        }); 
    }
});

// Export the router
module.exports = router;
