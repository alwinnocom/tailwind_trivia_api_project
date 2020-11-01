//jshint esversion:6

const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/question', {useNewUrlParser: true, useUnifiedTopology: true});


// Module Imports
const https = require('https');

const customAPI = require('./utilities/customAPI.js');
const httpsResponse = require('./utilities/httpsData.js');

const { Question } = require('./utilities/models/questionModel.js');
const { Answer } = require('./utilities/models/answerModel.js');
const { Compare_Answer } = require('./utilities/models/compareAnswerModel.js');

// Express App
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});


// API Data Segmented Into Variables
let numberOfQuestions, category, difficulty, type;

let url = ``;
let infoForUser = ``;


// Get questions from Mongoose "questions" collection.
app.route('/questions')
      .get((req, res) => {

            Question.find((err, response) => {

              if (err) {
                  console.log("Error is ", err);
              }

              // Response returns [] if nothing is found. - https://stackoverflow.com/questions/9660587/do-something-if-nothing-found-with-find-mongoose 
              else if (!response.length) {

                // Restrict the number of requests so the browser does not say 'Error: Too Many Requests'
                setTimeout(() => {res.redirect("/questions")}, 1000);

              }

              // To be safe: 32/50 Max. Alternate: 33/50 Questions Maximum. Too many questions? Try this.
              // https://stackoverflow.com/questions/3594923/chrome-uncaught-syntaxerror-unexpected-end-of-input
              // https://stackoverflow.com/questions/20827372/json-parsing-error-syntax-error-unexpected-end-of-input

              else {
                
                  res.render("questions", {
                    numberOfQuestions: numberOfQuestions,
                    ejsResponse: response
                  }) 
                
              }

              });


          Compare_Answer.deleteMany((err) => {
            if (err) {
              console.log(err);
            }
          });
  
     })

     .post((req, res) => {
                      
        // HTTPS Module to parse JSON.      
        [numberOfQuestions, category, difficulty, type] = [req.body.numberOfQuestions, req.body.category, req.body.difficulty, req.body.type];
        

        // Correct Number of Questions
        if (typeof(numberOfQuestions) === "string" || numberOfQuestions < 1 || numberOfQuestions > 30) {
          infoForUser = "Please type a valid number of questions between 1 and 30.";

          res.redirect("/");
        }


        // Synchronous Code: Make sure customAPI function goes first. res.redirect() needs to wait because you don't want to render
        // the questions.ejs page until the customAPI function finds the JSON data required to output to questions.ejs.

        async function redirectToQuestions() {

          let stepOne = await customAPI(numberOfQuestions, category, difficulty, type);

            console.log(`Step One is ${stepOne}`);

          let stepTwo = await httpsResponse();

            console.log(`Step Two is ${stepTwo}`);

          return "Complete";

        }

        redirectToQuestions().then(res.redirect("/questions"));

     });


// Get Request to act as a Delete Request
app.get("/questions/delete", (req, res) => {
    
    Compare_Answer.deleteMany((err) => {
      if (err) {
        console.log(err);
      }
    })

    Answer.deleteMany((err) => {
      if (err) {
        console.log(err);
      }
    })
  
    Question.deleteMany((err) => {
        if (!err) {

          infoForUser = "All questions deleted.";

        }

        else {
          infoForUser = "Sorry, the questions were not deleted.";

          console.log(err);
        }

        res.redirect("/");
       })

     });
                        

// Goal of index.ejs page:
// 1. Take in user input via form.
// 2. Send form data to change questions.ejs page via Post Request
// 3. The URL is formatted according to the customAPI function before launching the HTTPS response.
// 4. Get request to questions.ejs page via res.redirect("/questions")
// 5. Get request takes user to questions.ejs page, where the user-affected variables show up in HTML View
// for User to see because of ejs.


app.route('/')
  .get((req, res) => {
    res.render("index", {infoForUser: infoForUser});
});


  // Goal of results.ejs page
  // 1. Grab user inputs from questions.ejs page
  // 2. Compare req.body with "answers" collection in Mongoose.
  // 3. Save result into compare_answers collection in Mongoose if it is correct or incorrect.

app.route('/results')
  .get((req, res) => {
    Compare_Answer.find(function (err, response) {
                                
      if (err) {
        console.log("Error is ", err);
      }

      // else if (response.length === 0) {
      //   console.log("Why is there no response?");
      // }

      else {

          res.render("results", {
            response: response
          });

      }
    });
  })

  .post((req, res) => {
    let userAnswers = req.body;
    let realAnswers;

    Answer.find(function (err, response) {
                                
      if (err) {
        console.log("Error is ", err);
      }

      else {
        realAnswers = response[0].correctAnswers;

        let i = 0;

            while (userAnswers[i] !== undefined) {

                if (realAnswers[i] !== userAnswers[i]) {
                  console.log(`Incorrect Answer. User Answer was id_ = ${i}, answer = ${userAnswers[i]}. Real Answer was id_ = ${i}, answer = ${realAnswers[i]}`);
                
                  let compareAnswer = new Compare_Answer({
                    question_number: `${i+1}`,  
                    points_earned: 0,
                    result: `Incorrect Answer. Your Answer was ${userAnswers[i]}. The real answer was ${realAnswers[i]}`
                  })

                  compareAnswer.save()

                }

                else {
                  console.log(`Correct! User Answer was id_ = ${i}, answer = ${userAnswers[i]}. Real Answer was id_ = ${i}, answer = ${realAnswers[i]}`);
                
                  let compareAnswer = new Compare_Answer({
                    question_number: `${i+1}`,  
                    points_earned: 1,
                    result: `Correct!. Your Answer was ${userAnswers[i]}. The real answer was ${realAnswers[i]}`
                  })

                  compareAnswer.save()
                
                }

              i++;
            }

          res.redirect("/results");
      }

    });

});