const https = require("https");
const { questionSchema, Question } = require("./models/questionModel");

const httpsResponse = () => {
    
    https.get(url, (response) => {
        
        response.on('data', (data) => {

                const newData = JSON.parse(data);
                
                const questionData = newData.results;

                for (i = 0; i < questionData.length; i++) {

                    let questionOne = new Question({
                        questionCategory: questionData[i].category,
                        questionType: questionData[i].type,
                        questionDifficulty: questionData[i].difficulty, 
                        question: questionData[i].question,
                        correctAnswer: questionData[i].correct_answer,
                        incorrectAnswers: questionData[i].incorrect_answers
                    })

                    console.log(`Question One is currently ${questionOne}`);
                    
                    questionOne.save();

                }

        });

    })
}

module.exports = httpsResponse;