//jshint esversion:6

const https = require("https");

const express = require('express'); 
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});

app.use(express.static('public'));


// HTTPS Module to parse JSON.

let [numberOfQuestions, category, difficulty, type] = [1, 0, "", ""];

let url = `https://opentdb.com/api.php?amount=${numberOfQuestions}`

function customAPI (num, cat, dif, typ) {

    // API Call gives 1-50 questions.
    if (num < 1 || num > 50) {
        console.log("Error: Number of questions must be from 1-50.")
    }

    // Specific Category only
    else if (cat > 8 && dif === "" && typ === "") {
        url = `https://opentdb.com/api.php?amount=${num}&category=${cat}`
                    
        httpsResponse();
    }

    // Specific Difficulty only
    else if (cat === 0 && dif !== "" && typ === "") {
        url = `https://opentdb.com/api.php?amount=${num}&difficulty=${cat}`
                    
        httpsResponse();
    }

    // Specific Type only
    else if (cat === 0 && dif === "" && typ !== "") {
        url = `https://opentdb.com/api.php?amount=${num}&type=${typ}`
                
        httpsResponse();
    }

    // Specific Category + Difficulty
    else if (cat > 8 && dif !== "" && typ === "") {
        url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${dif}`
                
        httpsResponse();
    }

    // Specific Category + Type
    else if (cat > 8 && dif === "" && typ !== "") {
        url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&type=${typ}`
                
        httpsResponse();
    }


    // Specific Difficulty + Type
    else if (cat === 0 && dif !== "" && typ !== "") {
        url = `https://opentdb.com/api.php?amount=${num}&difficulty=${dif}&type=${typ}`
            
        httpsResponse();
    }

    // Specific ALL (Category, Difficulty, Type)
    else if (cat > 8 && dif !== "" && typ !== "") {
        url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${dif}&type=${typ}`
            
        httpsResponse();
    }

    // Any Category, Difficulty, and Type.
    else if (cat === 0 && dif === "" && typ === "") {
        url = `https://opentdb.com/api.php?amount=${num}`
    
        httpsResponse();
    }

    else {
       console.log(`Error. If statement is not working. Number of Questions = ${num}, Category=${cat}, Difficulty=${dif}, Type=${typ}`);
    }

}

function httpsResponse() {
    https.get(url, (response) => {
        
        response.on('data', (data) => {
            newData = JSON.parse(data);
            console.log(newData);
        });

        // app.post("/", (req, res) => {
        //     res.render(newData);
        // })

    })
}

customAPI(numberOfQuestions, category, difficulty, type);

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