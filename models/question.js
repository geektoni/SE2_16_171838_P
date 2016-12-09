function setTitle(title) {
    this.title = title;
}

function setAnswer(answer) {
    this.answer = answer;
}

function setRating(rating) {
    this.answer = answer;
}

function setTags(tags) {
    var found = false;
    for (var i=0; i<tags.length; i++) {
        found = false;
        for (var j=0; j<this.tags.length; j++) {
            if (tags[i] == this.tags[j]) {
                found=true;
                break;
            }
        }
        if (!found) {
            this.tags.append(tags[i]);
        }
    }
}

function Question(title, answer, rating, tags) {
    this.title = title;
    this.answer = answer;
    this.rating = rating;
    this.tags = tags;
    this.setTitle = setTitle;
    this.setAnswer = setAnswer;
    this.setRating = setRating;
    this.setTags = setTags;
}

module.exports.question = Question;

