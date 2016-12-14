'use strict';

var url = require('url');


var Question = require('./QuestionService');


module.exports.questionsGET = function questionsGET (req, res, next) {
  Question.questionsGET(req.swagger.params, res, next);
};

module.exports.questionsIdGET = function questionsIdGET (req, res, next) {
  Question.questionsIdGET(req.swagger.params, res, next);
};

module.exports.questionsIdUpdatePOST = function questionsIdUpdatePOST (req, res, next) {
  Question.questionsIdUpdatePOST(req.swagger.params, res, next);
};
