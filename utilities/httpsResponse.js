const https = require("https");
const { questionSchema, Question } = require("./models/questionModel");
const { answerSchema, Answer } = require("./models/answerModel");

const httpsResponse = () => {

    https.get(url, (response) => {
        
        response.on('data', (data) => {

                const newData = JSON.parse(data);
                
                const questionData = newData.results;

                for (i = 0; i < questionData.length; i++) {

                    let questionOne = new Question({
                        totalQuestions: questionData.length,
                        questionCategory: questionData[i].category,
                        questionType: questionData[i].type,
                        questionDifficulty: questionData[i].difficulty, 
                        question: questionData[i].question,
                        correctAnswer: questionData[i].correct_answer,
                        incorrectAnswers: questionData[i].incorrect_answers
                    })

                    let answerOne = new Answer({
                        correctAnswer: questionData[i].correct_answer
                    })
            
                    // console.log(`Question One is currently ${questionOne}`);
                    // console.log(`Answer One is currently ${answerOne}`);
                    
                    questionOne.save();
                    answerOne.save();

                }

        });

    })
}

module.exports = httpsResponse;