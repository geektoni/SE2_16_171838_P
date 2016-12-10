var Question = require('../models/question.js');
var questionDAO = require('../models/questionsDAO.js');
var database =  require('../lib/databaseConnection.js');

var assert = require('assert');

var testQuestion = new Question.Question('test', 'test', 0, ['a', 'b']);

describe("Question model", function(){
    
    beforeEach(function() {
        database.client.connect(database.url, function(err, db) {
            assert.equal(null, err);
            db.createCollection("testingCollection",
                function(err, results) {
                    console.log("Collection created.");
                }
            );
            db.close();
        });
    });
    
    afterEach(function() {
        database.client.connect(database.url, function(err, db) {
            assert.equal(null, err);
            db.testingCollection.drop()
            db.close();
        });
    });
    
    it("create a specific question", function() {
        var result = questionDAO.create(testQuestion);
        expect(result).toBe(true); 
    });
    
    it("retrieve a specific question", function() {
        database.client.connect(database.url, function(err, db) {
            assert.equal(null, err);
            var collection = db.collection('testingCollection');
            collection.insertOne(testQuestion, function(err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                assert.equal(1, result.ops.length);
                db.close();
                return true;
            });
        });
        
        var found_question = questionDAO.read(1);
        expect(found_question.equals(testQuestion)).toBe(true);
    });
    
    it("update a specific question", function() {
        database.client.connect(database.url, function(err, db) {
            assert.equal(null, err);
            var collection = db.collection('testingCollection');
            collection.insertOne(testQuestion, function(err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                assert.equal(1, result.ops.length);
                db.close();
                return true;
            });
        });
        
        var updated_question = new Question.Question("test_up", "test_up", 10, []);
        expect(questionDAO.update(updated_question)).toBe(true);
    });
    
    it("delete a specific question", function() {
        database.client.connect(database.url, function(err, db) {
            assert.equal(null, err);
            var collection = db.collection('testingCollection');
            collection.insertOne(testQuestion, function(err, result) {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
                assert.equal(1, result.ops.length);
                db.close();
                return true;
            });
        });
        expect(questionDAO._delete(1)).toBe(true);
    });
    
    it("search a specific question by tag", function() {
        expect(false).toBe(true);
    });
    
    

});