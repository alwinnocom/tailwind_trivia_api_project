//jshint esversion:6

const https = require("https");
const url = "https://opentdb.com/api.php?amount=10";    

const express = require('express'); 
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("Server started on port 3000.");
});


// HTTPS Module to parse JSON.

https.get(url, (response) => {
    
    response.on('data', (data) => {
        newData = JSON.parse(data);
        console.log(newData);
    });

    app.post("/", (req, res) => {
        res.render(newData);
    })

})







