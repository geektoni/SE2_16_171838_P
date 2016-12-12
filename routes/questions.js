var express = require('express');
var questionDAO = require('../models/questionsDAO.js');
var router = express.Router();

/* GET question page */
router.get('/:id', function(req, res, next) {
    var id = parseInt(req.params["id"]);
    if (id === null || isNaN(id)) {
        next('route');
    } else {
       questionDAO.read(id, function(err, result) {
            if (result == null || result == undefined) {
                next('route');
            } else {
                 res.render('question', { title: 'UnInforma', 
                                    jsfile: 'jExpand.js', 
                                    cssfile: 'index.css', 
                                    title: result.title,
                                    answer: result.answer,
                                    tags: result.tags
                                   });  
            }
        }); 
    }
});

module.exports = router;
