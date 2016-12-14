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
                console.log(result.rating);
                 res.render('question', { title: 'UnInforma | '+result.title, 
                                    cssfile: 'question.css',
                                    id : result.id,
                                    question: result.title,
                                    answer: result.answer,
                                    rating: result.rating,
                                    tags: result.tags
                                   });  
            }
        }); 
    }
});

router.post('/:id/update', function(req, res, next){
    var id = parseInt(req.params["id"]);
    if (id === null || isNaN(id)) {
        next('route');
    } else {
        questionDAO.read(id, function(err, result) {
            if (result == null || result == undefined) {
                next('route');
            } else {
                
                if (!isNaN(parseInt(req.body["up"]))) {
                     result.rating['up'] = parseInt(result.rating["up"]) + parseInt(req.body["up"]);   
                }
                if (!isNaN(parseInt(req.body["down"]))) {
                    result.rating['down'] = parseInt(result.rating["down"]) + parseInt(req.body["down"]);   
                }
                
                questionDAO.update(id, result, function(err, result2) {
                    if (result2 == null || result2 == undefined) {
                        next('route');
                    } else {
                        res.render('question', { title: 'UnInforma | '+result.title, 
                                    cssfile: 'question.css',
                                    id: result.id,
                                    question: result.title,
                                    answer: result.answer,
                                    rating: result.rating,
                                    tags: result.tags,
                                    voted: true
                                   });  
                    }
                });     
            }
        }); 
    }
});

module.exports = router;
