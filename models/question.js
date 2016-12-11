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

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function equals(question) {
    return this.title === question.title &&
                this.answer === question.answer &&
                this.rating === question.rating &&
                arraysEqual(this.tags, question.tags);
}

function Question(id, title, answer, rating, tags) {
    this.id = id;
    this.title = title;
    this.answer = answer;
    this.rating = rating;
    this.tags = tags;
    this.setTitle = setTitle;
    this.setAnswer = setAnswer;
    this.setRating = setRating;
    this.setTags = setTags;
    this.equals = equals;
}

module.exports.Question = Question;

