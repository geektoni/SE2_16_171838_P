var MongoClient = require('mongodb').MongoClient

// Connection URL
var url = 'mongodb://staging:StAgInG2016sweng2@ds113608.mlab.com:13608/se2-16-171838-staging';

// NON ESPORTA QUESTA VARIABILE
module.exports.client = MongoClient;
module.exports.url = url;