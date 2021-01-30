//jshint esversion:6

const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

const mongoose = require('mongoose');
// MongoDB Atlas Cluster to push code to Heroku. Use the MongoDB Atlas Cluster to view data, as the MongoDB connection is already running. You have to cancel this connection before using localhost:27017, which is not recommended.
mongoose.connect("mongodb+srv://admin-alwin:aGq5DdasHMkw5Di@tailwindtrivia.g4cpx.mongodb.net/question?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});


// Module Imports
const https = require('https');

const customAPI = require('./requests/customAPI.js');
const httpsResponse = require('./requests/httpsData.js');

const { Question } = require('./models/questionModel.js');
const { Answer } = require('./models/answerModel.js');
const { Compare_Answer } = require('./models/compareAnswerModel.js');
const { resolve } = require('path');


// Express App
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, () => {
    console.log("Server started on port 3000.");
});


// Info for User Requests
let infoForUser = ``;
let tryDifferentCategory = ``;
let tryDifferentDifficulty = ``;
let tryDifferentType = ``;

let pleaseAnswerEveryQuestion = ``;
let savedUserResponse = ``;
let hideAllCorrectAnswers = ``;
let percent_correct = 0;
let totalPointsPossible = 0;
let yourCorrectQuestions = 0;
let yourPointsEarned = 0;


// API Data Segmented Into Variables
let numberOfQuestions, category, difficulty, type;
let url = ``
let category_list = {0: "Free-For-All", 9: "General Knowledge", 10: "Books", 11: "Film", 12: "Music", 13: "Theaters & Musicals", 14: "Television", 15: "Video Games", 16: "Board Games", 17: "Science & Nature", 18: "Computers", 19: "Math", 20: "Mythology", 21: "Sports", 22: "Geography", 23: "History", 24: "Politics", 25: "Art", 26: "Celebrities", 27: "Animals", 28: "Vehicles", 29: "Comics", 30: "Gadgets", 31: "Japanese Anime & Manga", 32: "Cartoon & Animations"}

// Get questions from Mongoose "questions" collection.
app.route('/questions')
    .get((req, res) => {

      Question.find((err, response) => {

        if (err) {
            console.log("Question.find Error is ", err);
        }

        // Response returns [] if nothing is found. - https://stackoverflow.com/questions/9660587/do-something-if-nothing-found-with-find-mongoose 
        else if (!response.length) {

          // Restrict the number of requests so the browser does not say 'Error: Too Many Requests'
          setTimeout(() => {res.redirect("/questions")}, 1000);

        }

        
        else {

            res.render("questions", {
              numberOfQuestions: numberOfQuestions,
              ejsResponse: response,
              pleaseAnswerEveryQuestion: pleaseAnswerEveryQuestion,
              savedUserResponse: savedUserResponse,
              category: category_list[category]
            }) 
          
            hideAllCorrectAnswers = "";
        }

      });


      Compare_Answer.deleteMany((err) => {
        if (err) {
          console.log("Compare_Answer Delete Many Error is ", err);
        }
      })


    //   Answer.deleteMany((err) => {
    //     if (err) {
    //       console.log("Answer Delete Many Error is ", err);
    //     }
    //   })


    //   Answer.find(function (err, response) {
                                    
    //     if (err) {
    //       console.log("Answer Find Error is ", err);
    //     }

    //     else {
    //       realAnswers = response[0].correctAnswers;

    //       questionTypeVerifier = response[0].questionTypes;
          
    //             for (j = 0; j < numberOfQuestions; j++) {
    //               if (questionTypeVerifier[j] === "boolean") {
    //                   totalPointsPossible += 1;
    //                   j++;
    //               }

    //               else {
    //                   totalPointsPossible += 3;
    //                   j++;
    //               }
    //           }


    //   }
    // })
  

    .post((req, res) => {
                    
      [numberOfQuestions, category, difficulty, type] = [Math.floor(req.body.numberOfQuestions), req.body.category, req.body.difficulty, req.body.type];
      

      // Correct Number of Questions
      const numberVerifier = () => {

        return new Promise ((resolve, reject) => {
        if (isNaN(numberOfQuestions) || numberOfQuestions < 1 || numberOfQuestions > 25) {
            reject("Please type a valid number of questions between 1 and 25.");
        }
    
        else if (!numberOfQuestions) {
            reject("Please type a number.")
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
        .then(() => {
          // Reset variables after a successful user request.
          infoForUser = ``;
          tryDifferentCategory = ``;
          tryDifferentDifficulty = ``;
          tryDifferentType = ``;
        })
        .catch((e) => {
            // Display Error Message to User
            if (typeof(e) === "string") {
              infoForUser = e;
            }

            else {
              infoForUser = e[0];
              tryDifferentCategory = e[1];
              tryDifferentDifficulty = e[2];
              tryDifferentType = e[3];
            }
            
            res.redirect("/");
        });

    });
  });

// Get Request to act as a Delete Request
app.get("/questions/delete", (req, res) => {
    
    Compare_Answer.deleteMany((err) => {
      if (err) {
        console.log("Deleting Compare answer is " + err);
      }
    })

    Answer.deleteMany((err) => {
      if (err) {
        console.log("Answer Delete Many Error is ", err);
      }
    })
  
    Question.deleteMany((err) => {
        if (!err) {
          infoForUser = "All questions deleted.";
        }

        else {
          infoForUser = "Sorry, the questions were not deleted.";
          console.log("Question Delete Many Error is ", err);
        }

        res.redirect("/");
    })
});
                        

// index.ejs
app.route('/')
  .get((req, res) => {
    
    pleaseAnswerEveryQuestion = ``;

    Compare_Answer.deleteMany((err) => {
      if (err) {
        console.log("Compare Answer Error is ", err);
      }
    })

    Answer.deleteMany((err) => {
      if (err) {
        console.log("Answer Delete Many Error is ", err);
      }
    })
  
    Question.deleteMany((err) => {
       if (err) {
         console.log("Question Delete Many Error is ", err);
       }
    })
    
    res.render("index", {
      infoForUser: infoForUser,
      tryDifferentCategory, tryDifferentCategory,
      tryDifferentDifficulty: tryDifferentDifficulty,
      tryDifferentType: tryDifferentType
    });
});


// results.ejs
app.route('/results')
  .get((req, res) => {

    Compare_Answer.find(function (err, response) {
                                
      if (err) {
        console.log("Compare Answer Find Error is ", err);
      }

      // Just in case.
      else if (!response.length) {
        setTimeout(() => {res.redirect("/results")}, 1000);
      }

      else {
          res.render("results", {
            response: response,
            numberOfQuestions: numberOfQuestions,
            hideAllCorrectAnswers: hideAllCorrectAnswers,
            percent_correct: (parseInt(response[response.length - 1].yourCorrectQuestions) / parseInt(numberOfQuestions)) * 100
          });
      }
    });
  })


  .post((req, res) => {
    let userAnswers = req.body;

    let realAnswers;
    let questionTypeVerifier;


    // Did the User Answer Every Question?

    const formVerifier = () => {
      return new Promise ((resolve, reject) => {
      if (Object.keys(userAnswers).length < numberOfQuestions) {
        reject(`Number of Questions Unanswered: ${numberOfQuestions - Object.keys(userAnswers).length}`);
      }

      else {
        resolve("The user has answered all the questions.")
      }
    });
    }
  
  // const findAnswers = () => {

  //     return new Promise ((resolve, reject) => {
  //       Question.find(function (err, response) {
                                    
  //         if (err) {
  //           console.log("Answer Find Error is ", err);
  //         }

  //         else {
  //           realAnswers = response;

  //               for (i = 0; i < numberOfQuestions; i++) {
  //                   if (realAnswers[i].correctAnswer !== userAnswers[i] && realAnswers[i].questionType === "boolean") {
                    
  //                     let compareAnswer = new Compare_Answer({
  //                       question_number: `${i+1}`,  
  //                       points_earned: 0,
  //                       points_possible: 1,
  //                       accuracy: `Incorrect Answer.`,
  //                       result: userAnswers[i],
  //                       correct_result: realAnswers[i]
  //                     })

  //                     compareAnswer.save()

  //                   }

  //                   else if (realAnswers[i].correctAnswer !== userAnswers[i] && realAnswers[i].questionType === "multiple") {
  //                       let compareAnswer = new Compare_Answer({
  //                         question_number: `${i+1}`,  
  //                         points_earned: 0,
  //                         points_possible: 3,
  //                         accuracy: `Incorrect Answer.`,
  //                         result: userAnswers[i],
  //                         correct_result: realAnswers[i]
  //                       })

  //                       compareAnswer.save()
  //                   }


  //                   else {        

  //                       if (realAnswers[i].questionType === "boolean") {
  //                         let compareAnswer = new Compare_Answer({
  //                           question_number: `${i+1}`,  
  //                           points_earned: 1,
  //                           points_possible: 1,
  //                           accuracy: `Correct!`,
  //                           result: userAnswers[i],
  //                           correct_result: realAnswers[i]
  //                         })

  //                         yourPointsEarned += 1;
  //                         yourCorrectQuestions += 1;

  //                         compareAnswer.save();
  //                       }
                      
  //                       else {
  //                         let compareAnswer = new Compare_Answer({
  //                           question_number: `${i+1}`,  
  //                           points_earned: 3,
  //                           points_possible: 3,
  //                           accuracy: `Correct!`,
  //                           result: userAnswers[i],
  //                           correct_result: realAnswers[i]
  //                         })

  //                         yourPointsEarned += 3;
  //                         yourCorrectQuestions += 1;

  //                         compareAnswer.save();
  //                       }
                    
  //                   }

  //                 i++;
  //               }

  //             resolve("Compare Answer is complete. You can go to results.ejs now.")
  //         }


  //       });
  //     });

  // }

    const findAnswers = () => {

      return new Promise ((resolve, reject) => {
        Answer.find(function (err, response) {
                                    
          if (err) {
            console.log("Answer Find Error is ", err);
          }

          else {
            realAnswers = response[0].correctAnswers;

            questionTypeVerifier = response[0].questionTypes;
            
            let totalPointsPossible = 0;
            // let j = 0;

                // while (questionTypeVerifier[j] !== undefined) {
                  for (j = 0; i < numberOfQuestions; j++) {
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

            // let i = 0;
            let yourPointsEarned = 0;
            let yourCorrectQuestions = 0;

                // while (userAnswers[i] !== undefined) {
                for (i = 0; i < numberOfQuestions; i++) {
                    if (realAnswers[i] !== userAnswers[i] && questionTypeVerifier[i] === "boolean") {
                    
                      let compareAnswer = new Compare_Answer({
                        question_number: `${i+1}`,  
                        points_earned: 0,
                        points_possible: 1,
                        accuracy: `Incorrect Answer.`,
                        result: userAnswers[i],
                        correct_result: realAnswers[i]
                      })

                      compareAnswer.save()

                    }

                    else if (realAnswers[i] !== userAnswers[i] && questionTypeVerifier[i] === "multiple") {
                        let compareAnswer = new Compare_Answer({
                          question_number: `${i+1}`,  
                          points_earned: 0,
                          points_possible: 3,
                          accuracy: `Incorrect Answer.`,
                          result: userAnswers[i],
                          correct_result: realAnswers[i]
                        })

                        compareAnswer.save()
                    }


                    else {        

                        if (questionTypeVerifier[i] === "boolean") {
                          let compareAnswer = new Compare_Answer({
                            question_number: `${i+1}`,  
                            points_earned: 1,
                            points_possible: 1,
                            accuracy: `Correct!`,
                            result: userAnswers[i],
                            correct_result: realAnswers[i]
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
                            accuracy: `Correct!`,
                            result: userAnswers[i],
                            correct_result: realAnswers[i]
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
                

              resolve("Compare Answer is complete. You can go to results.ejs now.")
          }


        });
      });

  }

    async function waitForFormVerifier() {
      let waitForForm = await formVerifier();
      let formVerifierComplete = await findAnswers();
      res.redirect("/results");
    }

    waitForFormVerifier()
      .then(() => {
        savedUserResponse = ``;
        pleaseAnswerEveryQuestion = ``;
      })
      .catch((e) => {
        // User's Saved Answers will be used to add "checked" attribute to any answers that the user already checked before.
        savedUserResponse = userAnswers;

        pleaseAnswerEveryQuestion = e;
        res.redirect("/questions");
      });

});

// Hide or Reveal Correct Answers on results.ejs
app.get("/results/hidden", (req, res) => {
  hideAllCorrectAnswers = "hide";
  res.redirect("/results");
});

app.get("/results/reveal", (req, res) => {
  hideAllCorrectAnswers = "";
  res.redirect("/results");
});

// 500-560 lines of JS. (567 not removing spaces)
// Almost 300 lines of EJS (294 not removing spaces)
// 73 lines of Mongoose code (not removing spaces)
// Total: Around 900-934 lines of code total