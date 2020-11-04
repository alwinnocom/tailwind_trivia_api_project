//jshint esversion:6

const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/question', {useNewUrlParser: true, useUnifiedTopology: true});


// Module Imports
const https = require('https');

const customAPI = require('./requests/customAPI.js');
const httpsResponse = require('./requests/httpsData.js');

const { Question } = require('./models/questionModel.js');
const { Answer } = require('./models/answerModel.js');
const { Compare_Answer } = require('./models/compareAnswerModel.js');


// Express App
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});


let url = ``
let infoForUser = ``;


// API Data Segmented Into Variables
let numberOfQuestions, category, difficulty, type;


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
                    
      [numberOfQuestions, category, difficulty, type] = [Math.floor(req.body.numberOfQuestions), req.body.category, req.body.difficulty, req.body.type];
      

      // Correct Number of Questions
      const numberVerifier = () => {

        return new Promise ((resolve, reject) => {
        if (isNaN(numberOfQuestions) || numberOfQuestions < 1 || numberOfQuestions > 30) {
            reject("Please type a valid number of questions between 1 and 30.");
            // reject({0: "This is a very long message.", 1: "But wait, there is a 2nd part to it."})
        }
    
        else {
            resolve("Number is verified.");
        }
        });
      }

      async function redirectToQuestions() {

              let stepOne = await numberVerifier();
              // console.log(`Step One is ${stepOne}`);

              let stepTwo = await customAPI(numberOfQuestions, category, difficulty, type);
               // console.log(`Step Two is ${stepTwo}`);

              let stepThree = await httpsResponse();
              // console.log(`Step Three is ${stepThree}`);

              res.redirect("/questions");
      }

      redirectToQuestions()
        .then()
        .catch((e) => {
          console.log(`Error is: ${e}`);
          if (typeof(e) === "string") {
            infoForUser = e;
          }

          else {
            infoForUser = e[0];
          }
          
          res.redirect("/");
        });
      
      // res.redirect("/questions");

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
                        

// index.ejs
app.route('/')
  .get((req, res) => {
    
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
       if (err) {
         console.log(err);
       }
    })
    
    res.render("index", {infoForUser: infoForUser});
});


// results.ejs
app.route('/results')
  .get((req, res) => {

    Compare_Answer.find(function (err, response) {
                                
      if (err) {
        console.log("Error is ", err);
      }

      else if (!response.length) {
        setTimeout(() => {res.redirect("/results")}, 1000);
      }

      else {

          res.render("results", {
            response: response,
            numberOfQuestions: numberOfQuestions
          });

      }
    });
  })

  .post((req, res) => {
    let userAnswers = req.body;

    let realAnswers;
    let questionTypeVerifier;

    Answer.find(function (err, response) {
                                
      if (err) {
        console.log("Error is ", err);
      }

      else {
        realAnswers = response[0].correctAnswers;

        console.log(`Real Answers from Mongoose = ${realAnswers}`);

        questionTypeVerifier = response[0].questionTypes;
        
        let totalPointsPossible = 0;
        let j = 0;

            while (questionTypeVerifier[j] !== undefined) {
                if (questionTypeVerifier[j] === "boolean") {
                    totalPointsPossible += 1;
                    j++;
                }

                else {
                    totalPointsPossible += 3;
                    j++;
                }
            }

            let countTotalPoints = new Compare_Answer({
              totalPointsPossible: totalPointsPossible
            })

            countTotalPoints.save();


        let i = 0;
        let yourPointsEarned = 0;
        let yourCorrectQuestions = 0;

            while (userAnswers[i] !== undefined) {

                if (realAnswers[i] !== userAnswers[i] && questionTypeVerifier[i] === "boolean") {
                
                  let compareAnswer = new Compare_Answer({
                    question_number: `${i+1}`,  
                    points_earned: 0,
                    points_possible: 1,
                    result: `Incorrect Answer. Your Answer was ${userAnswers[i]}. The real answer was ${realAnswers[i]}`
                  })

                  compareAnswer.save()

                }

                else if (realAnswers[i] !== userAnswers[i] && questionTypeVerifier[i] === "multiple") {
                    let compareAnswer = new Compare_Answer({
                      question_number: `${i+1}`,  
                      points_earned: 0,
                      points_possible: 3,
                      result: `Incorrect Answer. Your Answer was ${userAnswers[i]}. The real answer was ${realAnswers[i]}`
                    })

                    compareAnswer.save()
                }


                else {        

                    if (questionTypeVerifier[i] === "boolean") {
                      let compareAnswer = new Compare_Answer({
                        question_number: `${i+1}`,  
                        points_earned: 1,
                        points_possible: 1,
                        
                        result: `Correct! Your Answer was ${userAnswers[i]}. The real answer was ${realAnswers[i]}`
                      })

                      yourPointsEarned += 1;
                      yourCorrectQuestions += 1;

                      compareAnswer.save();
                    }
                  
                    else {
                      let compareAnswer = new Compare_Answer({
                        question_number: `${i+1}`,  
                        points_earned: 3,
                        points_possible: 3,
                        result: `Correct! Your Answer was ${userAnswers[i]}. The real answer was ${realAnswers[i]}`
                      })

                      yourPointsEarned += 3;
                      yourCorrectQuestions += 1;

                      compareAnswer.save();
                    }
                
                }

              i++;
            }

            let userScore = new Compare_Answer({
              yourPointsEarned: yourPointsEarned,
              yourCorrectQuestions: yourCorrectQuestions
            })

            userScore.save();

          res.redirect("/results");
      }

    });

});