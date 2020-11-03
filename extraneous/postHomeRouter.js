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
