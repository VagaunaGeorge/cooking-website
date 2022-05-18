var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  let logged = false;
  if (req.cookies.user_email && req.cookies.admin) {
    logged = true;
  }
  res.locals.user = req.cookies.user_email;
  res.render('index', {
    title: 'Homepage',
    logged: logged,
    user_name: req.cookies.user_email
  })

});

module.exports = router;
