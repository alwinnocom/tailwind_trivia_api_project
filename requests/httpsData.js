const https = require("https");
const saveData = require("../requests/saveData");


// HTTPS Module to parse JSON.  
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

                //     reject("There are not enough questions to satisfy the request.")

                // }

                saveData(questionData);
            });
        });

        resolve("Successful httpsResponse");
    })

}


module.exports = httpsResponse;