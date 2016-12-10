var Question = require('./question.js');

function create() {
    return false;
}

function _delete(id) {
    return false;
}

function read(id) {
    return new Question.Question();
}

function update(question) {
    return false;
}

module.exports.create = create;
module.exports._delete = _delete;
module.exports.read = read;
module.exports.update = update;