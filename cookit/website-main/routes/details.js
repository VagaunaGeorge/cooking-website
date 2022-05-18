var express = require('express');
var axios = require('axios');
var router = express.Router();


router.get('/', function (req, res, next) {

  let recipe;
  let logged = false;

  if (req.cookies.user_email) {
    logged = true;
  }
  axios.get('http://localhost:3001/recipes/' + req.query.id)
    .then(function (response) {
      res.locals.user = req.cookies.user_email;
      recipe = response.data[0];
      res.render('details', { title: 'Details', recipe: recipe, user_name: req.cookies.user_email });
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

module.exports = router;
