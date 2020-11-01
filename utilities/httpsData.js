const https = require("https");
const saveData = require("./saveData");

const httpsResponse = () => {
        
        https.get(url, (response) => {
            
            response.on('data', (data) => {

                const newData = JSON.parse(data);

                let questionData = newData.results;

                saveData(questionData);
            });
        });

}


module.exports = httpsResponse;