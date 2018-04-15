var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('retirementIndex', {title: 'Retirement App'});
});

//home page POST
router.post('/', function(req, res, next){
    var age = parseInt(req.body.age);
    var age_retirement = parseInt(req.body.age_retirement);
    var age_death = parseInt(req.body.age_death);
    var savings = parseFloat(req.body.savings);
    var ror = parseFloat(req.body.ror);
    var ror_option = req.body.ror_option;
    var income = parseFloat(req.body.income);
    var income_rise = parseFloat(req.body.income_rise);
    var income_to_savings_percent = parseFloat(income_to_savings_percent);
    var ror_post = parseFloat(req.body.ror_post);
    var retirement_income = parseFloat(req.body.retirement_income);
    var retirement_expenses = parseFloat(req.body.retirement_expenses);
    var inflation_rate = parseFloat(req.body.inflation_rate);

    function FV(rate, nper, pmt, pv, type){
      var pow = Math.pow(1 + rate, nper), fv;
      pmt = pmt*-1; //needs to be negative
      pv = pv*-1; // also needs to be negative

      pv = pv || 0;
      type = type || 0;

      if (rate){
        fv = (pmt*(1+rate*type)*(1-pow)/rate)-pv*pow;
      } else {
        fv = -1 * (pv + pmt * nper);
      }
      return fv;
    }



    var magicNumber = FV(ror, age_retirement-age, income*income_to_savings_percent,savings);
    console.log(magicNumber);
});

module.exports = router;
