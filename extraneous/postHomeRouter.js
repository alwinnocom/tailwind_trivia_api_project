const express = require('express'),
    router = express.Router();

router
.post('/', () => {
    
  });

  

 
module.exports = router;

// Goal of index.ejs page:
// 1. Take in user input via form.
// 2. Send form data to change questions.ejs page via Post Request
// 3. The URL is formatted according to the customAPI function before launching the HTTPS response.
// 4. Get request to questions.ejs page via res.redirect("/questions")
// 5. Get request takes user to questions.ejs page, where the user-affected variables show up in HTML View
// for User to see because of ejs.


// Goal of results.ejs page
// 1. Grab user inputs from questions.ejs page
// 2. Compare req.body with "answers" collection in Mongoose.
// 3. Save result into compare_answers collection in Mongoose if it is correct or incorrect.


// Path Code - https://stackoverflow.com/questions/26311577/node-js-cannot-require-a-js-file-in-the-same-directory
// const path = require('path');
// const httpsResponse = require( path.resolve(__dirname, "./httpsResponse.js"));


// To be safe: 32/50 Max. Alternate: 33/50 Questions Maximum. Too many questions? Try this.
// https://stackoverflow.com/questions/3594923/chrome-uncaught-syntaxerror-unexpected-end-of-input
// https://stackoverflow.com/questions/20827372/json-parsing-error-syntax-error-unexpected-end-of-input

// Async Code

// Synchronous Code: Make sure customAPI function goes first. res.redirect() needs to wait because you don't want to render
  // the questions.ejs page until the customAPI function finds the JSON data required to output to questions.ejs.

  // async function redirectToQuestions() {

  //   let stepOne = await customAPI(numberOfQuestions, category, difficulty, type);

  //     console.log(`Step One is ${stepOne}`);

  //     if (stepOne === "url concatenation successful") {
  //       res.redirect("/results");
  //     }

  //   let stepTwo = await httpsResponse();

  //     console.log(`Step Two is ${stepTwo}`);

  //   return "Complete";

  // }

      // customAPI(numberOfQuestions, category, difficulty, type)
      //     .then(httpsResponse())
      //     .catch((err) => {
      //       console.log(`Custom API Reject message is here: ${err}`);
      //         infoForUser = "The rejection of customAPI has succeeded.";

      //         res.redirect("/");
      //     })
      //     .then(res.redirect("/questions"))
      //     .catch((err) => {
      //       console.log(`HTTPS Response Reject message is here: ${err}`);
      //         infoForUser = "The rejection of customAPI has succeeded.";

      //         res.redirect("/");
      //     })
          
      

      // httpsResponse()
      //     .then()
      //     .catch((err) => {console.log(err);
      //       infoForUser = err;

      //       res.redirect("/");
      // });

      // res.redirect("/questions");


      // redirectToQuestions().then(res.redirect("/questions"));
      // res.redirect("/questions");

      // async function redirectToQuestions() {

      //   let stepOne = await customAPI(numberOfQuestions, category, difficulty, type);

      //     console.log(`Step One is ${stepOne}`);

      //     if (stepOne === "url concatenation successful") {
      //       // res.redirect("/results");
      //       console.log(`Step One verification complete.`); 
      //     }

      //   let stepTwo = await httpsResponse();

      //     console.log(`Step Two is ${stepTwo}`);

      //     if (stepTwo === "Successful httpsResponse") {
      //       // res.redirect("/results");
      //       console.log(`Step 2 verification complete.`); 
      //     }

      //   return "Complete";

      // }

      // redirectToQuestions().then(res.redirect("/questions"));

      // redirectToQuestions().then(res.redirect("/questions")).catch(() => {
      //   infoForUser = "Sorry, there are not enough questions in your specified category, difficulty, and type.",

      //   res.redirect("/")
      // });


      // Correct Number of Questions
      // if (isNaN(numberOfQuestions) || numberOfQuestions < 1 || numberOfQuestions > 30) {
      //   infoForUser = "Please type a valid number of questions between 1 and 30.";

      //   res.redirect("/");
      // }