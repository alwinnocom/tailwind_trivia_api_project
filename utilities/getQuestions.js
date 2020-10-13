const https = require("https");

const customAPI = (num = 2, cat = 9, dif = "easy", typ = "multiple") => {

    return new Promise((resolve, reject) => {
    // API Call gives 1-50 questions.

    if (num < 1 || num > 50) {
        reject("Error: Number of questions must be from 1-50.")
    }

    // Specific Category only
    else if (cat > 8 && dif === "any" && typ === "any") {
        url = `https://opentdb.com/api.php?amount=${num}&category=${cat}`
                    
        return httpsResponse();
    }

    // Specific Difficulty only
    else if (cat === 0 && dif !== "any" && typ === "any") {
        url = `https://opentdb.com/api.php?amount=${num}&difficulty=${cat}`
                    
        return httpsResponse();
    }

    // Specific Type only
    else if (cat === 0 && dif === "any" && typ !== "any") {
        url = `https://opentdb.com/api.php?amount=${num}&type=${typ}`
                
        return httpsResponse();
    }

    // Specific Category + Difficulty
    else if (cat > 8 && dif !== "any" && typ === "any") {
        url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${dif}`
                
        return httpsResponse();
    }

    // Specific Category + Type
    else if (cat > 8 && dif === "any" && typ !== "any") {
        url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&type=${typ}`
                
        return httpsResponse();
    }


    // Specific Difficulty + Type
    else if (cat === 0 && dif !== "any" && typ !== "any") {
        url = `https://opentdb.com/api.php?amount=${num}&difficulty=${dif}&type=${typ}`
            
        return httpsResponse();
    }

    // Specific ALL (Category, Difficulty, Type)
    else if (cat > 8 && dif !== "any" && typ !== "any") {
        url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${dif}&type=${typ}`
            
        return httpsResponse();
    }

    // Any Category, Difficulty, and Type.
    else if (cat === 0 && dif === "any" && typ === "any") {
        url = `https://opentdb.com/api.php?amount=${num}`
    
        return httpsResponse();
    }

    else {
       reject(`Error. If statement is not working. Number of Questions = ${num}, Category=${cat}, Difficulty=${dif}, Type=${typ}`);
    }
});

function httpsResponse() {
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
                let [questionCategory, questionType, questionDifficulty, question, correctAnswer, incorrectAnswers] = [questionData.category, questionData.type, questionData.difficulty, questionData.question, questionData.correct_answer, questionData.incorrect_answers];
                
                console.log("Https response received.");
                console.log(`Question Category = ${questionCategory}, Question Type = ${questionType}, Question Difficulty = ${questionDifficulty}, Question = ${question}, Correct Answer = ${correctAnswer}, Incorrect Answers = ${incorrectAnswers}`)
            });

    })
}

}

module.exports = customAPI;

/*
API Possibilities:

1. Number of Questions is invalid.
2. Cat only
3. Dif only 
4. Typ only
5. Cat + Dif 
6. Cat + Typ
7. Dif + Typ
8. Cat + Dif + Typ
9. All ANY (only valid Num is inputted)

n, c, d, t, [c + d], [c + t], [d + t], [c + d + t], ANY

Combinatorics: 1 + 3C1 + 3C2 + 3C3 + 3C0 = 1 + 3 + 3 + 1 + 1 = 9 Possible Dynamic API URLs. 
*/