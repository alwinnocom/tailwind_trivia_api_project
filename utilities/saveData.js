const { Question } = require("./models/questionModel");
const { Answer } = require("./models/answerModel");
const triviaRegex = require("./triviaRegex");

const saveData = (questionData) => {
    
        let correctAnswers = {};

        for (i = 0; i < questionData.length; i++) {

            let question;

            question = questionData[i].question;
            correctAnswer = questionData[i].correct_answer;
            // incorrectAnswers = questionData[i].incorrect_answers;
 
            triviaRegex(question, correctAnswer);

            correctAnswers[i] = correctAnswer;

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
            correctAnswers: correctAnswers
        })
        
        answerOne.save();
}

module.exports = saveData;