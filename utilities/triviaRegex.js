const triviaRegex = (question, correctAnswer) => {

    // https://dmitripavlutin.com/replace-all-string-occurrences-javascript/

    question = question.split('&#039;').join("\'");
    question = question.split('&quot;').join('\"');
    question = question.split('&deg;').join('°');
    question = question.split('&ouml;').join('ö');
    question = question.split('&amp;').join('&');
    
    correctAnswer = correctAnswer.split('&#039;').join("\'");
    correctAnswer = correctAnswer.split('&quot;').join('\"');
    correctAnswer = correctAnswer.split('&deg;').join('°');
    correctAnswer = correctAnswer.split('&ouml;').join('ö');
    correctAnswer = correctAnswer.split('&amp;').join('&');
    
    // Using this code will make the trivia take forever to load because you will be looking through all incorrect answers.
    // You'll probably need to come back to this later when you find a better data structure or algorithm.
    
    // for (i = 0; i < incorrectAnswers.length; i++) {
    //     incorrectAnswers[i] = incorrectAnswers[i].split('&#039;').join("\'");
    //     incorrectAnswers[i] = incorrectAnswers[i].split('&quot;').join('\"');
    //     incorrectAnswers[i] = incorrectAnswers[i].split('&deg;').join('°');
    //     incorrectAnswers[i] = incorrectAnswers[i].split('&ouml;').join('ö');
    //     incorrectAnswers[i] = incorrectAnswers[i].split('&amp;').join('&');
    // }

}

module.exports = triviaRegex;