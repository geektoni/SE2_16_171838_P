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
                tmp.setCategory(result.category);
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
                    category: new_question.category,
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
                tmp.setCategory(result.value.category);
                tmp.setTags(Array.from(result.value.tags));
                result = tmp;
            }
            db.close();
            callback(null, result);
        });
    });
}

function readAll(callback) {
    database.client.connect(database.url, function(err, db) {
        assert.equal(null, err);
        var collectionq = db.collection(database.defaultCollection);
        collectionq.find({}).toArray(
            function(err, items) {
                var test = {};
                for (var i=0; i<items.length; i++) {
                    if (test[items[i].category] === undefined) {
                      test[items[i].category] = [];
                    }
                    var tmp = new Question.Question();
                    tmp.setId(items[i].id);
                    tmp.setTitle(items[i].title);
                    tmp.setAnswer(items[i].answer);
                    tmp.setRating(items[i].rating);
                    tmp.setCategory(items[i].category);
                    tmp.setTags(Array.from(items[i].tags));
                    test[items[i].category].push(tmp);
                }
                callback(null, test);        
        });
    });
}

function search(text, callback) {
    database.client.connect(database.url, function(err, db) {
        assert.equal(null, err);
        var collectionq = db.collection(database.defaultCollection);
        collectionq.find({
            $text: {
                $search: text,
                $caseSensitive: false
            }},
            { score: { $meta: "textScore" }}
        ).sort( { score: { $meta: "textScore" } } ).toArray(
            function(err, items) {
                if (items === undefined || items === null) {
                    items = [];
                }
                var test = [];
                for (var i=0; i<items.length; i++) {
                    var tmp = new Question.Question();
                    tmp.setId(items[i].id);
                    tmp.setTitle(items[i].title);
                    tmp.setAnswer(items[i].answer);
                    tmp.setRating(items[i].rating);
                    tmp.setCategory(items[i].category);
                    tmp.setTags(Array.from(items[i].tags));
                    test.push(tmp);
                }
                callback(null, test);        
        });
    });
}

module.exports.create = create;
module.exports._delete = _delete;
module.exports.read = read;
module.exports.update = update;
module.exports.readAll = readAll;
module.exports.search = search;