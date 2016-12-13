var MongoClient = require('mongodb').MongoClient

// Connection URLS
var DEBUG = 'mongodb://staging:StAgInG2016sweng2@ds119508.mlab.com:19508/se2-16-171838-staging';
var PRODUCTION = 'mongodb://localhost/se2-16-171838-production';

// Collections names
var defaultCollection = 'questions';
var categoryCollection = 'categories';

// Exposed database url
var url = PRODUCTION;

// Check if we are in debug mode
// then change database
if (process.env.DEBUG) {
    url = DEBUG;
}

// Export variables
module.exports.client = MongoClient;
module.exports.defaultCollection = defaultCollection;
module.exports.categoryCollection = categoryCollection;
module.exports.url = url;