// Tell the application to switch to the debug database
process.env.DEBUG = 1;

// Include modules needed
var Question = require('../models/question.js');
var questionDAO = require('../models/questionsDAO.js');
var database =  require('../lib/databaseConnection.js');
var assert = require('assert');

describe("Question object", function() {
    
    var controlQuestion = new Question.Question(1, 'test', 'test', 0, ['a', 'b']);;
    var testQuestion;
    
    beforeEach(function() {
        testQuestion = new Question.Question();
    });
    
    it("tells correctly inequality with different object", function() {
        expect(controlQuestion.equals(testQuestion)).not.toBe(true);
    });
    
    xit("tells correctly inequality with default objects", function() {
        expect((new Question.Question()).equals(new Question.Question())).not.toBe(true);
    });
    
    xit("tells correctly inequality between object with different tags", function() {
        testQuestion = controlQuestion;
        testQuestion.tags.append('d');
        expect(controlQuestion.equals(testQuestion)).not.toBe(true);
    });
    
    it("tells correctly equality with differents object", function() {
        testQuestion = controlQuestion;
        expect(controlQuestion.equals(testQuestion)).toBe(true);
    });
    
    it("tells correctly equality with same object", function() {
        expect(controlQuestion.equals(controlQuestion)).toBe(true);
    });
    
});

describe("Question CRUD model", function(){
    
    var testQuestion = new Question.Question(1, 'test', 'test', 0, ['a', 'b']);
    
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
    
    xit("create a specific question", function() {
        var result = questionDAO.create(testQuestion);
        expect(result).toBe(true); 
    });
    
    it("retrieve a specific question", function() {
        questionDAO.read(1, function(err, result){
            assert.equal(err, null);
            if (result === undefined && result === null) {
                result = new Question.Question();
            }
            expect(result.equals(testQuestion)).toBe(true);
        });
    });
    
    xit("update a specific question", function() {
        var updated_question = new Question.Question("test_up", "test_up", 10, []);
        expect(questionDAO.update(updated_question)).toBe(true);
    });
    
    xit("delete a specific question", function() {
        expect(questionDAO._delete(1)).toBe(true);
    });
    
    xit("search a specific question by tag", function() {
        expect(false).toBe(true);
    });
    
    

});