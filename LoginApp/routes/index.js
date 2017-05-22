var express = require('express');
var router = express();

// Get Homepage
router.get('/', function(req, res){
    res.render('index');
});

module.exports = router;