const https = require("https");

const express = require('express'); 
const app = express();

const httpsResponse = () => {
    https.get(url, (response) => {
        
        response.on('data', (data) => {
            newData = JSON.parse(data);

            // console.log(newData);
            // console.log(newData.results);
            // console.log(newData.results[0]);
            // let questionData = ""
            // for (i = 0; i++; i < numberOfQuestions) {
            //     questionData = newData.results[i];
            //     console.log(questionData);

                let questionData = newData.results[0];
                
                [questionCategory, questionType, questionDifficulty, question, correctAnswer, incorrectAnswers] = [questionData.category, questionData.type, questionData.difficulty, questionData.question, questionData.correct_answer, questionData.incorrect_answers];
                
                console.log(`In the HTTPS Response, Question Category = ${questionCategory}`);

                if (questionCategory && questionType && questionDifficulty && question && correctAnswer && incorrectAnswers) {
                    app.route("/results")
                        .get((req, res) => {
                            res.render("results", {
                                            questionCategory: questionCategory,
                                            questionType: questionType,
                                            questionDifficulty: questionDifficulty,
                                            question: question,
                                            correctAnswer: correctAnswer,
                                            incorrectAnswers: incorrectAnswers
                                        });

                            //  console.log(`Question Data = ${questionData}`)
                            console.log(`Question Category finishes as ${questionCategory}, Question Type = ${questionType}, Question Difficulty = ${questionDifficulty}, Question = ${question}, Correct Answer = ${correctAnswer}, Incorrect Answers = ${incorrectAnswers}`);
                        })
                }

                // console.log("Https response received.");
                // console.log(`Question Category = ${questionCategory}, Question Type = ${questionType}, Question Difficulty = ${questionDifficulty}, Question = ${question}, Correct Answer = ${correctAnswer}, Incorrect Answers = ${incorrectAnswers}`)
            });

    })
}

module.exports = httpsResponse;

// https://stackoverflow.com/questions/32558514/javascript-es6-export-const-vs-export-let
// module.exports.questionCategory = questionCategory;
// module.exports.questionType = questionType;
// module.exports.questionDifficulty = questionDifficulty;
// module.exports.question = question;
// module.exports.correctAnswer = correctAnswer;
// module.exports.incorrectAnswers = incorrectAnswers;