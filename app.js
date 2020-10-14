//jshint esversion:6

const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

const https = require('https');

// API Data Segmented Into Variables
let numberOfQuestions, category, difficulty, type;

let url = ``;

const customAPI = require('./utilities/getQuestions.js');
const { questionCategory, questionType, questionDifficulty, question, correctAnswer, incorrectAnswers } = require('./utilities/httpsResponse.js');
// const httpsResponse = require('./utilities/httpsResponse.js');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});

// Goal of index.ejs page:
// 1. Take in user input via form.
// 2. Send form data to change results.ejs page via Post Request
// 3. The URL is formatted according to the customAPI function before launching the HTTPS response.
// 4. Get request to results.ejs page via res.redirect("/results")
// 5. Get request takes user to results.ejs page, where the user-affected variables show up in HTML View
// for User to see because of ejs.

app.route("/results")
.get((req, res) => {
    res.render("results", {
        numberQuestions: numberOfQuestions,
        category: category,
        difficulty: difficulty,
        type: type,
        questionCategory: questionCategory,
        questionType: questionType,
        questionDifficulty: questionDifficulty,
        question: question,
        correctAnswer: correctAnswer,
        incorrectAnswers: incorrectAnswers
     });

    //  console.log(`Question Data = ${questionData}`)
    //  console.log(`Question Category = ${questionCategory}, Question Type = ${questionType}, Question Difficulty = ${questionDifficulty}, Question = ${question}, Correct Answer = ${correctAnswer}, Incorrect Answers = ${incorrectAnswers}`);
})

app.route('/')
  .get((req, res) => {
    res.render("index");
  })

  .post((req, res) => {
      
    // HTTPS Module to parse JSON.

    [numberOfQuestions, category, difficulty, type] = [req.body.numberOfQuestions, req.body.category, req.body.difficulty, req.body.type];

    // Async/Await: Make sure customAPI function goes first. res.redirect() needs to wait because you don't want to render
    // the results.ejs page until the customAPI function finds the JSON data required to output to results.ejs.

    const displayResultsEJS = async () => {
        const triviaResult = await customAPI(numberOfQuestions, category, difficulty, type);
        return triviaResult;
    }

    // const waitForHttpsVariables = async () => {
    //     const httpsSuccessful = await httpsResponse();
    //     return httpsSuccessful;
    // }
    
    displayResultsEJS().then((result) => {
        console.log('result', result)
    }).catch((e) => {
        console.log('e', e)
    })

    // waitForHttpsVariables().then((result) => {
    //     console.log('result', result)
    // }).catch((e) => {
    //     console.log('e', e)
    // })

    console.log(displayResultsEJS());

    if (displayResultsEJS() && waitForHttpsVariables()) {
        res.redirect("/results");
    }

    // If result of async/await exists, then redirect to results.ejs to send a Get request to results.ejs.

});