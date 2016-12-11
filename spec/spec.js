// Tell the application to switch to the debug database
process.env.DEBUG = 1;

// Include modules needed
var Question = require('../models/question.js');
var questionDAO = require('../models/questionsDAO.js');
var database =  require('../lib/databaseConnection.js');
var assert = require('assert');

var testQuestion = new Question.Question(1, 'test', 'test', 0, ['a', 'b']);

describe("Question model", function(){
    
    beforeEach(function(done) {
        database.client.connect(database.url, function(err, db) {
            assert.equal(null, err);
            var collection = db.collection(database.defaultCollection);
            collection.insertOne(testQuestion, function(err, result) {
                assert.equal(err, null);
                db.close();
                done();
            });
        });
    });
    
    afterEach(function(done) {
        database.client.connect(database.url, function(err, db) {
            assert.equal(null, err);
            var collection = db.collection(database.defaultCollection);
            collection.drop();
            db.close();
            done();
        });
    });
    
    // After all the spec have been called, clear the
    // debug database to prevent any problem regarding
    // duplicated keys, collections, etc.
    afterAll(function(done) {
        database.client.connect(database.url, function(err, db) {
            assert.equal(null, err);
            var collection = db.collection(database.defaultCollection);
            collection.drop();
            db.close();
            done();
        });
    });
    
    it("create a specific question", function() {
        var result = questionDAO.create(testQuestion);
        expect(result).toBe(true); 
    });
    
    it("retrieve a specific question", function() {
        expect(false).toBe(true);
    });
    
    it("update a specific question", function() {
        var updated_question = new Question.Question("test_up", "test_up", 10, []);
        expect(questionDAO.update(updated_question)).toBe(true);
    });
    
    it("delete a specific question", function() {
        expect(questionDAO._delete(1)).toBe(true);
    });
    
    it("search a specific question by tag", function() {
        expect(false).toBe(true);
    });
    
    

});