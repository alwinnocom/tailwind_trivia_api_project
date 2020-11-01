const https = require("https");
const saveData = require("./saveData");

const httpsResponse = () => {
        
    return new Promise ((resolve, reject) => {

        https.get(url, (response) => {
            
            response.on('data', (data) => {

                const newData = JSON.parse(data);

                let questionData = newData.results;

                saveData(questionData);
            });
        });

        resolve("Successful httpsResponse");
    })

}


module.exports = httpsResponse;