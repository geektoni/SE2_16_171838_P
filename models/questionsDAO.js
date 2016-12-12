var assert = require('assert');
var Question = require('./question.js');
var database = require('../lib/databaseConnection.js');

function create() {
    return false;
}

function _delete(id) {
    return false;
}

function read(id, callback) {
    database.client.connect(database.url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection(database.defaultCollection);
        collection.findOne({id: id}, function(err, result) {
            assert.equal(null, err);
            if (result !== null) {
                var tmp = new Question.Question();
                tmp.setId(result.id);
                tmp.setTitle(result.title);
                tmp.setAnswer(result.answer);
                tmp.setRating(result.rating);
                tmp.setTags(Array.from(result.tags));
                result = tmp;
            }
            db.close();
            callback(null, result);
        });
    });
}

function update(id, new_question, callback) {
    database.client.connect(database.url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection(database.defaultCollection);
        collection.findOneAndUpdate(
            {id: id}, 
            {   $set: {
                    title: new_question.title,
                    answer: new_question.answer,
                    rating: new_question.rating,
                    tags: new_question.tags
                }
            }, 
            {
                returnOriginal: false
            }
        , function(err, result) {
            assert.equal(null, err);
            if (result.value !== null) {
                var tmp = new Question.Question();
                tmp.setId(result.value.id);
                tmp.setTitle(result.value.title);
                tmp.setAnswer(result.value.answer);
                tmp.setRating(result.value.rating);
                tmp.setTags(Array.from(result.value.tags));
                result = tmp;
            }
            db.close();
            callback(null, result);
        });
    });
}

module.exports.create = create;
module.exports._delete = _delete;
module.exports.read = read;
module.exports.update = update;