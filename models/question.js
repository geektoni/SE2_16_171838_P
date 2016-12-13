/**
* Question model.
*
* These are the methods and the
* definition of the "question" model that is
* the basic object that the application use.
*
*/

/**
* @brief The main Question object
* @param The question id
* @param The question title
* @param The question answer
* @param The question rating
* @param The question category
* @param The question tags
*/
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


/**
* @brief Set the question id.
* @param The new question id.
*/
function setId(id) {
    this.id = id;
}

/**
* @brief Set the question title.
* @param The new question title.
*/
function setTitle(title) {
    this.title = title;
}

/**
* @brief Set the question answer.
* @param The new question answer.
*/
function setAnswer(answer) {
    this.answer = answer;
}

/**
* @brief Set the question rating.
* @param The new question rating.
*/
function setRating(rating) {
    this.rating = rating;
}

/**
* @brief Set the question category.
* @param The new question category.
*/
function setCategory(category) {
    this.category = category;
}

/**
* @brief Set the question tags.
* @param The new question tags.
*/
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

/**
* @brief Check if a question object is equal to another question object.
* @param the question I want to check equality.
*/
function equals(question) {
    if (question === null || question === undefined)
    {
        return false;
    }
    return this.title === question.title &&
                this.answer === question.answer &&
                this.rating === question.rating &&
                this.category === question.category && 
                arraysEqual(this.tags, question.tags);
}

/**
* @brief Check if two arrays are equal.
* @param a the first array.
* @param b the second array.
*/
function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length != b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}


module.exports.Question = Question;

