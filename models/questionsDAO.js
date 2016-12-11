var assert = require('assert');
var Question = require('./question.js');
var database = require('../lib/databaseConnection.js');

function create() {
    return false;
}

function _delete(id) {
    return false;
}

function read(id, callback) {
    database.client.connect(database.url, function(err, db) {
        assert.equal(null, err);
        var collection = db.collection(database.defaultCollection);
        collection.findOne({id: id}, function(err, result) {
            assert.equal(null, err);
            var tmp = new Question.Question();
            tmp.setId(result.id);
            tmp.setTitle(result.title);
            tmp.setAnswer(result.answer);
            tmp.setRating(result.rating);
            tmp.setTags(Array.from(result.tags));
            result = tmp;
            db.close();
            callback(null, result);
        });
    });
}

function update(question) {
    return false;
}

module.exports.create = create;
module.exports._delete = _delete;
module.exports.read = read;
module.exports.update = update;