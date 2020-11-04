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
                    reject("I'm sorry, but there are not enough questions for your particular request.");
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