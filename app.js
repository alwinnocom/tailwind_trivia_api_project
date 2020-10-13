//jshint esversion:6

const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

const https = require('https');

let numberOfQuestions, category, difficulty, type;
let url = ``;

const customAPI = require('./utilities/getQuestions.js');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});

app.route("/results")
.get((req, res) => {
    res.render("results", {
        numberQuestions: numberOfQuestions,
        category: category,
        difficulty: difficulty,
        type: type
     });
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

    displayResultsEJS().then((result) => {
        console.log('result', result)
    }).catch((e) => {
        console.log('e', e)
    })

    if (displayResultsEJS()) {
        res.redirect("/results");
    }

    // If result of async/await exists, then redirect to results.ejs to send a Get request to results.ejs.

});