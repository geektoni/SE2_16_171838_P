var express = require('express');
var questionDAO = require('../models/questionsDAO.js');
var router = express.Router();

/* GET question page */
router.get('/', function(req, res, next) {
    var query = req.param("query");
    if ( query === undefined || query === null) {
        query = "";
    }
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

router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params["id"]);
    if (id === null || isNaN(id)) {
        next('route');
    } else {
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

module.exports = router;
