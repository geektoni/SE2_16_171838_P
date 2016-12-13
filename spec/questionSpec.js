// Tell the application to switch to the debug database
process.env.DEBUG = 1;

// Include modules needed
var Question = require('../models/question.js');
var questionDAO = require('../models/questionsDAO.js');
var database =  require('../lib/databaseConnection.js');
var assert = require('assert');

describe("Question object", function() {
    
    var controlQuestion = new Question.Question(1, 'test', 'test', 0, 'test_category',['a', 'b']);
    var testQuestion; 
    
    beforeEach(function() {
        testQuestion = new Question.Question(1, 'test2', 'test', 0, 'test_category',['a', 'b']);
    });
    
    it("tells correctly inequality with different object", function() {
        expect(controlQuestion.equals(testQuestion)).not.toBe(true);
    });
    
    it("tells correctly equality with default objects", function() {
        expect((new Question.Question()).equals(new Question.Question())).toBe(true);
    });
    
    it("tells correctly inequality between object with different tags", function() {
        testQuestion.tags.push('d');
        expect(controlQuestion.equals(testQuestion)).not.toBe(true);
    });
    
    it("tells correctly equality with differents object", function() {
        testQuestion = controlQuestion;
        expect(controlQuestion.equals(testQuestion)).toBe(true);
    });
    
    it("tells correctly equality with same object", function() {
        expect(controlQuestion.equals(controlQuestion)).toBe(true);
    });
    
    it("tells correctly inequality when null or undefined object is passed", function() {
        var tmp;
        expect(controlQuestion.equals(tmp)).toBe(false); 
    });
    
    it("tells correctly inequality when not object question is passed", function() {
        var tmp;
        expect(controlQuestion.equals("test")).toBe(false); 
    });
    
});

