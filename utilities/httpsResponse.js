const https = require("https");
const { questionSchema, Question } = require("./models/questionModel");
const { answerSchema, Answer } = require("./models/answerModel");

const httpsResponse = () => {

    https.get(url, (response) => {
        
        response.on('data', (data) => {

                const newData = JSON.parse(data);
                
                const questionData = newData.results;

                let correctAnswers = {};

                for (i = 0; i < questionData.length; i++) {

                    correctAnswers[i] = questionData[i].correct_answer;
                    console.log(`Id is ${correctAnswers[i]}, and its Corresponding Answer is ${questionData[i].correct_answer}`)

                    let questionOne = new Question({
                        _id: i,
                        totalQuestions: questionData.length,
                        questionCategory: questionData[i].category,
                        questionType: questionData[i].type,
                        questionDifficulty: questionData[i].difficulty, 
                        question: questionData[i].question,
                        correctAnswer: questionData[i].correct_answer,
                        incorrectAnswers: questionData[i].incorrect_answers
                    })

                    questionOne.save();
                    
                }

                let answerOne = new Answer({
                    correctAnswers: correctAnswers
                })
                
                answerOne.save();

        });

    })
}

module.exports = httpsResponse;