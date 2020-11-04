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
            question = question.replace(/&#039;/g, "\'").replace(/&quot;/g, "\"").replace(/&amp;/g, "and");
            correctAnswer = correctAnswer.replace(/&#039;/g, "\'").replace(/&quot;/g, "\"").replace(/&amp;/g, "and");

            if (incorrectAnswers.length > 1) {
                let incorrectAnswersArray = [];

                console.log(`Length of incorrectAnswers = ${incorrectAnswers}`);

                for (j = 0; j < incorrectAnswers.length; j++) {
                    incorrectAnswers[j] = incorrectAnswers[j].replace(/&#039;/g, "\'").replace(/&quot;/g, "\"").replace(/&amp;/g, "and");
                    incorrectAnswersArray.push(incorrectAnswers[j]);
                }

                console.log(`incorrectAnswersArray after for loop push = ${incorrectAnswersArray}`);
                incorrectAnswers = incorrectAnswersArray;
                
            }

            console.log(`incorrectAnswers after regex = ${incorrectAnswers}`);
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