'use strict';

exports.rootGET = function(args, res, next) {
  /**
   * parameters expected in the args:
  **/
    var examples = {};
  examples['application/json'] = [ {
  "category" : [ {
    "answer" : "aeiou",
    "rating" : {
      "up" : "",
      "down" : ""
    },
    "title" : "aeiou",
    "category" : "aeiou",
    "tags" : [ "aeiou" ]
  } ]
} ];
  if(Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  }
  else {
    res.end();
  }
  
}

