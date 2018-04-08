var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('retirementIndex', {title: 'Retirement App'});
});

//home page POST
router.post('/', function(req, res, next){
    res.send('NOT IMPLEMENTED: Submission Handling (Home Page POST)');
});

module.exports = router;
