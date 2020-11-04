// https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express

const express = require('express'),
     router = express.Router();

router.get('/', (req, res) => {

  res.render("index", {infoForUser: "Error: There are not enough questions in the category, difficulty, and type that you specified."});
    
});

res.redirect("/");
 
module.exports = router;
