/**
* Question DAO (Data Access Object) implementation.
*
* These methods implements ways to create, read, update 
* and delete question object from/to the database. These
* methods follow the CRUD paradigm. These are implemented
* as asyncronous methods (with a callback).
*
*/

// Module required
var assert = require('assert');
var Question = require('./question.js');
var database = require('../lib/databaseConnection.js');

/**
* @brief Insert an object in the database.
* @param The question I want to insert.
* @param The callback function that will be called on completion. 
*/
function create(question, callback) {
    return false;
}

/**
* @brief Delete an object from the database.
* @param The question id I want to delete.
* @param The callback function that will be called on completion. 
*/
function _delete(id, callback) {
    return false;
}

/**
* @brief Read an object from the database.
* @param The question id I want to read.
* @param The callback function that will be called on completion. 
*/
function read(id, callback) {
    database.client.connect(database.url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection(database.defaultCollection);
        
        // Find exactly one question with the specified id 
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

/**
* @brief Update an object in the database.
* @param The question id I want to update.
* @param The new question values
* @param The callback function that will be called on completion. 
*/
function update(id, new_question, callback) {
    database.client.connect(database.url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection(database.defaultCollection);
        
        // Find the question with the specified id and update it
        // with the new values
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
            // Return to the caller the updated question
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

/**
* @brief Read all the question from the database and group them by category.
* @param The callback function that will be called on completion. 
*/
function readAll(callback) {
    database.client.connect(database.url, function(err, db) {
        assert.equal(null, err);
        var collectionq = db.collection(database.defaultCollection);
        
        // Select all the questions in the collection and generate
        // a new array with the questions grouped by category.
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

/**
* @brief Perform a full-text search on the database to find questions
*        matching a specific query.
* @param The query.
* @param The callback function that will be called on completion. 
*/
function search(text, callback) {
    database.client.connect(database.url, function(err, db) {
        assert.equal(null, err);
        var collectionq = db.collection(database.defaultCollection);
        
        // Find questions that match the full-text query and sort
        // them by score
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

// Methods exports
module.exports.create = create;
module.exports._delete = _delete;
module.exports.read = read;
module.exports.update = update;
module.exports.readAll = readAll;
module.exports.search = search;