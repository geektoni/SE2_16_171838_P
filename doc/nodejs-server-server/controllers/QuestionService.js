'use strict';

exports.questionsGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * query (String)
  **/
    var examples = {};
  examples['application/json'] = [ {
  "answer" : "aeiou",
  "rating" : {
    "up" : "",
    "down" : ""
  },
  "title" : "aeiou",
  "category" : "aeiou",
  "tags" : [ "aeiou" ]
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.questionsIdGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (BigDecimal)
  **/
    var examples = {};
  examples['application/json'] = {
  "answer" : "aeiou",
  "rating" : {
    "up" : "",
    "down" : ""
  },
  "title" : "aeiou",
  "category" : "aeiou",
  "tags" : [ "aeiou" ]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

exports.questionsIdUpdatePOST = function(args, res, next) {
  /**
   * parameters expected in the args:
  * id (BigDecimal)
  * new_question (Question)
  **/
    var examples = {};
  examples['application/json'] = {
  "answer" : "aeiou",
  "rating" : {
    "up" : "",
    "down" : ""
  },
  "title" : "aeiou",
  "category" : "aeiou",
  "tags" : [ "aeiou" ]
};
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

