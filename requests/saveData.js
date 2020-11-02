const { Question } = require("../models/questionModel.js");
const { Answer } = require("../models/answerModel.js");
const triviaRegex = require("./triviaRegex");

const saveData = (questionData) => {
    
        let correctAnswers = {};
        let questionTypes = {};

        for (i = 0; i < questionData.length; i++) {

            let question;

            question = questionData[i].question.toString();
            correctAnswer = questionData[i].correct_answer.toString();
            // incorrectAnswers = questionData[i].incorrect_answers;

            question = question.split('&#039;').join("’");
            question = question.split('&quot;').join('’');
            question = question.split('&deg;').join('°');
            question = question.split('&ouml;').join('ö');
            question = question.split('&amp;').join('and');
            
            correctAnswer = correctAnswer.split('&#039;').join("’");
            correctAnswer = correctAnswer.split('&quot;').join('’');
            correctAnswer = correctAnswer.split('&deg;').join('°');
            correctAnswer = correctAnswer.split('&ouml;').join('ö');
            correctAnswer = correctAnswer.split('&amp;').join('and');

            correctAnswers[i] = correctAnswer;
            questionTypes[i] = questionData[i].type;

            let questionOne = new Question({
                _id: i,
                totalQuestions: questionData.length,
                questionCategory: questionData[i].category,
                questionType: questionData[i].type,
                questionDifficulty: questionData[i].difficulty, 
                question: question,
                correctAnswer: correctAnswer,
                incorrectAnswers: questionData[i].incorrect_answers
            })

            questionOne.save();
            
        }

        let answerOne = new Answer({
            correctAnswers: correctAnswers,
            questionTypes: questionTypes
        })
        
        answerOne.save();
}

module.exports = saveData;