//jshint esversion:6

const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/question');



const https = require('https');

// API Data Segmented Into Variables
let numberOfQuestions, category, difficulty, type;

// Create a global array that any app.get(file_name) can use to res.render(). 
// Credit goes to Angela Yu's Blog Project for this approach. Her code was "let posts = []; app.post("/compose", function(req, res){
// const post = {  }; posts.push(post); });

let url = ``;

const customAPI = require('./utilities/getQuestions.js');
const httpsResponse = require('./utilities/httpsResponse.js');

const { questionSchema, Question } = require('./utilities/models/questionModel.js');

// const { questionCategory, questionType, questionDifficulty, question, correctAnswer, incorrectAnswers } = require('./utilities/httpsResponse.js');
// console.log(`Question Category starts out as ${questionCategory}`);
// const httpsResponse = require('./utilities/httpsResponse.js');

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});

app.route('/results')
      .get((req, res) => {

      

      Question.find(function (err, response) {
                            
        
              if (err) {console.log("Error is ", err)}

              else {
                  res.render("results", {response: response});
                  //  res.send(response);
                  //  let renderedData = [];
                  //  console.log(`Rendered data is ${renderedData}`);

                  //  for (let i = 0; i++; i < response.length) {
                    
                  //   //  https://stackoverflow.com/questions/48784166/how-to-run-a-for-loop-in-res-render-on-a-get-request-in-node-js-i-am-using-hbs
                  //   renderedData.push({questionNumber: `Question ${i}`, questionCategory: `${response[i].questionCategory}`, questionType: `${response[i].questionType}`, questionDifficulty: `${response[i].questionDifficulty}`, question: `${response[i].question}`, correctAnswer: `${response[i].correctAnswer}`, incorrectAnswers: `${response[i].incorrectAnswers}`});
                  //   console.log(renderedData);
                  
                    //  res.render("results", {
                    //       questionCategory: response[i].questionCategory,
                    //       questionType: response[i].questionType,
                    //       questionDifficulty: response[i].questionDifficulty,
                    //       question: response[i].question,
                    //       correctAnswer: response[i].correctAnswer,
                    //       incorrectAnswers: response[i].incorrectAnswers
                    //  }); 
                }

                // res.render("results", {renderedData: renderedData});
          // }
      });

      
                          // res.send('You are on the results page.')

                          // res.render("results", {
                          //   numberOfQuestions: numberOfQuestions,
                          //   category: category,
                          //   difficulty: difficulty,
                          //   type: type
                          // })

   })

                          .post((req, res) => {
  
                            // const newQuestion = new Question({
                            //   question_number: "Question 1",
                            //   actual_question: "Can you see this? If you can, then the Mongoose connection is working."
                            // })
                        
                            // newQuestion.save();
                        
                            // HTTPS Module to parse JSON.
                        
                            [numberOfQuestions, category, difficulty, type] = [req.body.numberOfQuestions, req.body.category, req.body.difficulty, req.body.type];
                        
                            // Async/Await: Make sure customAPI function goes first. res.redirect() needs to wait because you don't want to render
                            // the results.ejs page until the customAPI function finds the JSON data required to output to results.ejs.
                        
                            
                        customAPI(numberOfQuestions, category, difficulty, type)
                            .then(httpsResponse())
                            .catch((e) => {
                                        console.log('e', e)
                                    })
                            // .then(console.log(`After the Promise, questionCategory is ${questionCategory}`))
                            // .catch((e) => {
                            //   console.log('e', e)
                            // })
                            
                            
                        
                            // .then(sendResponseResult(questionCategory, questionType, questionDifficulty, question, correctAnswer, incorrectAnswers))
                            // .catch((e) => {
                            //     console.log('e', e)
                            // })
                        
                            .then(res.redirect("/results"))
                            .catch((e) => {
                              console.log('e', e)
                            })
                        
                        
                        
                            // const displayResultsEJS = async () => {
                            //     const triviaResult = await customAPI(numberOfQuestions, category, difficulty, type);
                            //     return triviaResult;
                            // }
                        
                            // // const waitForHttpsVariables = async () => {
                            // //     const httpsSuccessful = await httpsResponse();
                            // //     return httpsSuccessful;
                            // // }
                            
                            // displayResultsEJS()
                            //     .then(httpsResponse())
                            //     .catch((e) => {
                            //         console.log('e', e)
                            //     })
                                
                            //     .then(res.redirect("/results"))
                        
                            // waitForHttpsVariables().then((result) => {
                            //     console.log('result', result)
                            // }).catch((e) => {
                            //     console.log('e', e)
                            // })
                        
                            // console.log(displayResultsEJS());
                        
                            // if (displayResultsEJS()) {
                            //     res.redirect("/results");
                            // }
                        
                            // If result of async/await exists, then redirect to results.ejs to send a Get request to results.ejs.
                        
                        });
                          
                            // res.render("results", {
                            //                 questionCategory: questionCategory,
                            //                 questionType: questionType,
                            //                 questionDifficulty: questionDifficulty,
                            //                 question: question,
                            //                 correctAnswer: correctAnswer,
                            //                 incorrectAnswers: incorrectAnswers
                            //             });

                            //  console.log(`Question Data = ${questionData}`)
                            // console.log(`Question Category finishes as ${questionCategory}, Question Type = ${questionType}, Question Difficulty = ${questionDifficulty}, Question = ${question}, Correct Answer = ${correctAnswer}, Incorrect Answers = ${incorrectAnswers}`);
                        

// Goal of index.ejs page:
// 1. Take in user input via form.
// 2. Send form data to change results.ejs page via Post Request
// 3. The URL is formatted according to the customAPI function before launching the HTTPS response.
// 4. Get request to results.ejs page via res.redirect("/results")
// 5. Get request takes user to results.ejs page, where the user-affected variables show up in HTML View
// for User to see because of ejs.




app.route('/')
  .get((req, res) => {
    res.render("index");

    
  })
  
