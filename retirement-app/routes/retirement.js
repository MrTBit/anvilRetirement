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
    var ror = parseFloat(req.body.ror)*.01;
    var ror_option = req.body.ror_option;
    var income = parseFloat(req.body.income);
    var income_rise = parseFloat(req.body.income_rise)*.01;
    var income_to_savings_percent = parseFloat(req.body.income_to_savings_percent)*.01;
    var ror_post = parseFloat(req.body.ror_post)*.01;
    var retirement_income = parseFloat(req.body.retirement_income);
    var retirement_expenses = parseFloat(req.body.retirement_expenses);
    var inflation_rate = parseFloat(req.body.inflation_rate)*.01;
    var yearCurrent = new Date().getFullYear();

    function FV(rate, nper, pmt, pv, type){
     
      pmt = pmt*-1; //needs to be negative
      pv = pv*-1; // also needs to be negative

      var pow = Math.pow(1 + rate, nper), fv;
      

      pv = pv || 0;
      type = type || 0;

      if (rate){
        fv = (pmt*(1+rate*type)*(1-pow)/rate)-pv*pow;
      } else {
        fv = -1 * (pv + pmt * nper);
      }
      return fv;
    }

    var fv = FV(ror, age_retirement-age, (income*income_to_savings_percent),savings);

    var ageCol = []
    var yearCol = []
    var startBalCol = []
    var retirementIncomeCol = []
    var annualExpenseCol = []
    var endBalanceCol = []

    startBalCol.push(fv)
    annualExpenseCol.push(retirement_expenses * 12)

    for(i = age_retirement; i <= age_death; i++){
      if(!startBalCol[i-age_retirement]){
        startBalCol.push(endBalanceCol[i-age_retirement-1])
        annualExpenseCol.push(annualExpenseCol[i-age_retirement-1]*(1+inflation_rate))
      }
      ageCol.push(i)
      yearCol.push((yearCurrent + (age_retirement - age)) + (i - age_retirement))
      retirementIncomeCol.push(12*retirement_income)
      endBalanceCol.push((startBalCol[i-age_retirement]*(1+ror_post)+retirementIncomeCol[i-age_retirement]-annualExpenseCol[i-age_retirement]))
    }


    res.render('retirementPost', {title: 'Retirement App Results', year: yearCurrent, yearStart: yearCurrent+(age_retirement-age), 
    yearEnd: yearCurrent+(age_death-age), savings: savings, fv: fv, ageCol: ageCol,
    yearCol: yearCol, startBalCol: startBalCol, retirementIncomeCol: retirementIncomeCol, annualExpenseCol: annualExpenseCol, endBalanceCol: endBalanceCol});
});

module.exports = router;
