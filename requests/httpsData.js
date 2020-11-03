const https = require("https");
const saveData = require("../requests/saveData");

const express = require('express'); 
const app = express();

// const homeRouter = require('./routers/getHomeRouter');

// app.use('/', homeRouter);


const httpsResponse = () => {
        
    return new Promise ((resolve, reject) => {

        https.get(url, (response) => {
            
            response.on('data', (data) => {

                const newData = JSON.parse(data);

                let questionData = newData.results;

                let responseCode = newData.response_code;

                // Debug bad HTTP Requests with response codes.
                console.log(`Response Code is ${responseCode}.`);

                // if (responseCode === 1) {

                //     app.get('/', function(req, res) {
                //         res.render("index", {infoForUser: "Sorry, there are not enough questions in the Open Trivia API to satisfy your request. Try lowering the number of questions."});
                //     })
                // }

                saveData(questionData);
            });
        });

        resolve("Successful httpsResponse");
    })

}


module.exports = httpsResponse;