const https = require("https");
const saveData = require("../requests/saveData");


// HTTPS Module to parse JSON.  
const httpsResponse = () => {
        
    return new Promise ((resolve, reject) => {

        https.get(url, (response) => {
            
            response.on('data', (data) => {

                const newData = JSON.parse(data);

                let questionData = newData.results;

                // Debug bad HTTP Requests with response codes.
                let responseCode = newData.response_code;
                console.log(`Response Code is ${responseCode}.`);


                if (responseCode === 1) {
                    console.log(`Question Data is currently ${questionData}`);
                    reject({0: "I'm sorry, but there are not enough questions for your particular request.", 1: "Open Trivia API may have less questions for this specific category than you requested.", 2: "You may need to change the difficulty to find enough questions in your desired category.", 3: "You may need to change the type to find enough questions in your desired category."});
                }

                else {
                    saveData(questionData);
                    resolve("HTTPS Response successful.");
                }
            });
        });

        
    })

}


module.exports = httpsResponse;