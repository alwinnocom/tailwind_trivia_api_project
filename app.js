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
let deleteSuccessful = ``;


// Get questions from Mongoose "questions" collection.
app.route('/questions')
      .get((req, res) => {

            Question.find(function (err, response) {

              if (err) {
                  console.log("Error is ", err);
              }

              else {

                // console.log(`Type of Response is ${typeof(response)}`);
                // console.log(`Response is ${response}`);

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

        // let renderedResponse = "";

        // function findQuestions() {

          // let success = new Promise((resolve, reject) => {
          
          // while (true) {
          //   Question.find(function (err, response) {
                   
            

            // if (err) {
            //   console.log("Error is ", err);
            //   // reject("The Question Finder did not work. Check MongoDB.");
            // }

            // else if (response.length === 0) {
            //   console.log("Why is there no response?");
            // }

            // if (response !== "") {
            //   // res.render("questions", {
            //   //   ejsResponse: response
            //   // });
            //   renderedResponse = response;

            //   return renderedResponse;
            // }

            // else {

            //   // renderedResponse = response;
            //   // resolve("Database search successful.");
            //     res.render("questions", {
            //       ejsResponse: response
            //     });

            // }
          // })

        //   break
        // }

        // res.render("questions", {
        //   ejsResponse: renderedResponse
        // });
      
      // return success;
    // }

    // async function waitForQuestionFinder() {
    //   let wait = await findQuestions();
    //   return wait;
    // }

    //   waitForQuestionFinder()
    //     .then(res.render("questions", {
    //       ejsResponse: renderedResponse
    //     }))
    //     .catch("Error is ", err);

      // customAPI(numberOfQuestions, category, difficulty, type)
      //         .then(httpsResponse())
      //         .then(res.redirect("/questions"))
      //         .catch((e) => {
      //               console.log('e', e)
      //         })
     .post((req, res) => {
                      
        // HTTPS Module to parse JSON.
        // let questionData = "";                
        [numberOfQuestions, category, difficulty, type] = [req.body.numberOfQuestions, req.body.category, req.body.difficulty, req.body.type];
                        
        // Synchronous Code: Make sure customAPI function goes first. res.redirect() needs to wait because you don't want to render
        // the questions.ejs page until the customAPI function finds the JSON data required to output to questions.ejs.
        
        // customAPI(numberOfQuestions, category, difficulty, type);

        // httpsResponse();

        // res.redirect("/questions");
        
        

          customAPI(numberOfQuestions, category, difficulty, type);
          
          httpsResponse();

          res.redirect("/questions");

          // function checkFind() {
          //   Question.find(function (err, response) {

          //     return new Promise ((resolve, reject) => {

          //         if (err) {
          //             console.log("Error is ", err);
          //         }

          //         // else if (!(response)) {

          //         //   reject("Response not found yet.");

          //         // }

          //         else {

          //           resolve("Successful Find");
                    
          //         }

          //       });

          //     });
          // }

          // async function redirectToQuestions() {

          //   let stepOne = await customAPI(numberOfQuestions, category, difficulty, type);

          //     console.log(`Step One is ${stepOne}`);

          //   let stepTwo = await httpsResponse();

          //     console.log(`Step Two is ${stepTwo}`);

          //   let stepThree = getAnswers(questionData);

          //     console.log(`Step Three is ${stepThree}`);

          //   // let stepFour = checkFind();

          //   // console.log(`Step Four is ${stepFour}`);
            
          //   return "Complete";

          // }

          // redirectToQuestions().then(res.redirect("/questions"));
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

          deleteSuccessful = "All questions deleted.";

        }

        else {
          deleteSuccessful = "Sorry, the questions were not deleted.";

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
    res.render("index", {deleteSuccessful: deleteSuccessful});
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