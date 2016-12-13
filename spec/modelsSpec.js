// Tell the application to switch to the debug database
process.env.DEBUG = 1;

// Include modules needed
var Question = require('../models/question.js');
var questionDAO = require('../models/questionsDAO.js');
var database =  require('../lib/databaseConnection.js');
var assert = require('assert');

describe("Question CRUD model", function(){
    
    var testQuestion = new Question.Question(1, 'test', 'test', 0,'test_category', ['a', 'pattern2']);
    var testQuestion2 = new Question.Question(2, 'test2', 'test2', 1,'test_category2', ['pattern', 'd']);
    var allTestQuestions = { 
        'category_one': [testQuestion],
        'category_two': [testQuestion2]
    }
    
    beforeEach(function(done) {
        database.client.connect(database.url, function(err, db) {
            assert.equal(null, err);
            var collection = db.collection(database.defaultCollection);
            collection.insertMany([testQuestion, testQuestion2], function(err, result) {
                assert.equal(err, null);
                db.collection(database.defaultCollection).createIndex({
                    tags: "text"
                }, function(err, result){
                    db.close();
                    done(); 
                });
            });
        });
    });
    
    afterEach(function(done) {
        database.client.connect(database.url, function(err, db) {
            assert.equal(null, err);
            var collection = db.collection(database.defaultCollection);
            collection.drop();
            db.collection(database.categoryCollection).drop();
            db.close();
            done();
        });
    });

    // Before calling all the spec, clear the
    // debug database to prevent any problem regarding
    // duplicated keys, collections, etc.
    beforeAll(function(done) {
        database.client.connect(database.url, function(err, db) {
            assert.equal(null, err);
            var collection = db.collection(database.defaultCollection);
            collection.drop();
            db.close();
            done();
        });
    });
    
    it("retrieve all questions group by category", function(){
        questionDAO.readAll(function(err, result){
            var testResult = [testQuestion2, testQuestion];
            var i = 0;
            for (var key in result) {
                if (result.hasOwnProperty(key)) {
                    expect(testResult[i].equals(result[key][i])).toBe(true);
                }
            }
        });
    });
    
    it("retrieve a specific question", function() {
        questionDAO.read(2, function(err, result){
            assert.equal(err, null);
            if (result === undefined || result === null) {
                result = new Question.Question();
            }
            expect(testQuestion2.equals(result)).toBe(true);
        });
    });
    
    it("fail to retrieve a specific question", function() {
        questionDAO.read(7, function(err, result){
           assert.equal(err, null);
            if (result === undefined || result === null) {
                result = new Question.Question();
            }
            expect(testQuestion.equals(result)).toBe(false); 
        });
    });
    
    it("update a specific question with an empty set of tags", function() {
        var updated_question = new Question.Question(1, "test_up", "test_up", 10, 'test_category_up',['c']);
        questionDAO.update(1, updated_question, function(err, result) {
            assert.equal(err, null);
            if (result === undefined || result === null) {
                result = new Question.Question();
            }
            expect(updated_question.equals(result)).toBe(true); 
        });
    });
    
    it("update a specific question with a non-empty set of tags", function() {
        var updated_question = new Question.Question(1, "test_up", "test_up", 10, 'test_category_up',['c']);
        questionDAO.update(1, updated_question, function(err, result) {
            assert.equal(err, null);
            if (result === undefined || result === null) {
                result = new Question.Question();
            }
            expect(updated_question.equals(result)).toBe(true); 
        });
    });
    
    it("search a specific question by tag", function() {
        questionDAO.search("pattern2", function(err, result){
            expect(testQuestion2.equals(result[0])).toBe(true);
        });        
    });
    
    xit("delete a specific question", function() {
        expect(questionDAO._delete(1)).toBe(true);
    });
        
    xit("create a specific question", function() {
        var result = questionDAO.create(testQuestion);
        expect(result).toBe(true); 
    });

});