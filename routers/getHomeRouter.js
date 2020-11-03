// https://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express

const express = require('express'),
     router = express.Router();

router.get('/', (req, res) => {

  res.render("index", {infoForUser: "The router module is working."});
    
});
 
module.exports = router;