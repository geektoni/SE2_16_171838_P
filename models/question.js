function setId(id) {
    this.id = id;
}

function setTitle(title) {
    this.title = title;
}

function setAnswer(answer) {
    this.answer = answer;
}

function setRating(rating) {
    // Rating structure {up: "", down: ""}
    this.rating = rating;
}

function setCategory(category) {
    this.category = category;
}

function setTags(tags) {
    var found = false;
    if (this.tags !== null && this.tags !== undefined) {
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
    } else {
        this.tags = tags;        
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

function ratingEqual(a, b) {
    if (a===b) return true;
    if (a == null || b == null) return false;
    if (a== undefined || b == undefined) return false;
    return (a['up'] === b['up'] && a['down'] === b['down']);
}

function equals(question) {
    if (question === null || question === undefined)
    {
        return false;
    }
    return this.title === question.title &&
                this.answer === question.answer &&
                ratingEqual(this.rating, question.rating) &&
                this.category === question.category && 
                arraysEqual(this.tags, question.tags);
}

function Question(id, title, answer, rating, category, tags) {
    this.id = id;
    this.title = title;
    this.answer = answer;
    this.rating = rating;
    this.category = category;
    this.tags = tags;
    this.setId = setId;
    this.setTitle = setTitle;
    this.setAnswer = setAnswer;
    this.setRating = setRating;
    this.setCategory = setCategory;
    this.setTags = setTags;
    this.equals = equals;
}

module.exports.Question = Question;

