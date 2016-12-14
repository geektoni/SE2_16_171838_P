'use strict';

var url = require('url');


var Index = require('./IndexService');


module.exports.rootGET = function rootGET (req, res, next) {
  Index.rootGET(req.swagger.params, res, next);
};
