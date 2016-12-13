/**
* Database configuration file.
*
* Here are specified all the objects,
* configuration parameters to use correctly
* the MongoDB database.
*/

// Require the mongodb client
var MongoClient = require('mongodb').MongoClient

// Connection URLS
var DEBUG = 'mongodb://staging:StAgInG2016sweng2@ds119508.mlab.com:19508/se2-16-171838-staging';
var PRODUCTION = 'mongodb://production:PrOdUcTiOnsweng22016@ds113958.mlab.com:13958/se2-16-171838-production';

// Collections name
var defaultCollection = 'questions';

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
module.exports.url = url;