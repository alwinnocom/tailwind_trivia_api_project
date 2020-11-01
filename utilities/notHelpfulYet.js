const { answerSchema, Answer } = require("./models/answerModel");

// List of only the Website's Answers

const userAnswers = (data) => {
    
    const answerData = data.results;

    for (i = 0; i < answerData.length; i++) {

        let answerOne = new Answer({
            correctAnswer: answerData[i].correct_answer
        })

        console.log(`Answer One is currently ${answerOne}`);
        
        answerOne.save();

    }

    resolve("Answer population complete.");

}

module.exports = userAnswers;