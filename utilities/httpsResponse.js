const https = require("https");
const {  Question } = require("./models/questionModel");
const { Answer } = require("./models/answerModel");

const httpsResponse = () => {

    https.get(url, (response) => {
        
        response.on('data', (data) => {

                const newData = JSON.parse(data);

                const questionData = newData.results;
                
                console.log(`Question Data is ${questionData}`);

                let correctAnswers = {};

                for (i = 0; i < questionData.length; i++) {

                    console.log(`Current Question Data is ${questionData[i]} Type is ${typeof(questionData[i])}`)
                    // questionData[i].toString().replaceAll("&#\039;", "\"");

                    correctAnswers[i] = questionData[i].correct_answer;
                    
                    // console.log(`Id is ${correctAnswers[i]}, and its Corresponding Answer is ${questionData[i].correct_answer}`)

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