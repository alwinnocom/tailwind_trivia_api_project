const { Question } = require("../models/questionModel.js");
const { Answer } = require("../models/answerModel.js");
const triviaRegex = require("./triviaRegex");

const saveData = (questionData) => {
    
        let correctAnswers = {};
        let questionTypes = {};

        for (i = 0; i < questionData.length; i++) {

            let question;

            question = questionData[i].question;
            correctAnswer = questionData[i].correct_answer;
            // incorrectAnswers = questionData[i].incorrect_answers;
 
            triviaRegex(question, correctAnswer);

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