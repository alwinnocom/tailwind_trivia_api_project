const { Question } = require("../models/questionModel.js");
const { Answer } = require("../models/answerModel.js");

const saveData = (questionData) => {
    
        let correctAnswers = {};
        let questionTypes = {};

        for (i = 0; i < questionData.length; i++) {

            let question = questionData[i].question;
            let correctAnswer = questionData[i].correct_answer;
            let incorrectAnswers = questionData[i].incorrect_answers;

            
            

            // Trivia Regex
            question = question.replace(/&oacute;/g, "ó").replace(/&ldquo;/g, "\"").replace(/&rdquo;/g, "\"").replace(/&eacute;/g, "e").replace(/&#039;/g, "\'").replace(/&quot;/g, "\"").replace(/&amp;/g, "and");
            correctAnswer = correctAnswer.replace(/&oacute;/g, "ó").replace(/&ldquo;/g, "\"").replace(/&rdquo;/g, "\"").replace(/&eacute;/g, "e").replace(/&#039;/g, "\'").replace(/&quot;/g, "\"").replace(/&amp;/g, "and");

            if (incorrectAnswers.length > 1) {
                let incorrectAnswersArray = [];

                for (j = 0; j < incorrectAnswers.length; j++) {
                    incorrectAnswers[j] = incorrectAnswers[j].replace(/&oacute;/g, "ó").replace(/&ldquo;/g, "\"").replace(/&rdquo;/g, "\"").replace(/&eacute;/g, "e").replace(/&#039;/g, "\'").replace(/&quot;/g, "\"").replace(/&amp;/g, "and");
                    incorrectAnswersArray.push(incorrectAnswers[j]);
                }

                incorrectAnswers = incorrectAnswersArray;
                
            }

            correctAnswers[i] = correctAnswer;
            questionTypes[i] = questionData[i].type;

            // https://flaviocopes.com/how-to-uppercase-first-letter-javascript/

            let questionOne = new Question({
                _id: i,
                totalQuestions: questionData.length,
                questionCategory: questionData[i].category,
                questionType: questionData[i].type,
                questionDifficulty: questionData[i].difficulty.charAt(0).toUpperCase() + questionData[i].difficulty.slice(1), 
                question: question,
                correctAnswer: correctAnswer,
                incorrectAnswers: incorrectAnswers
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