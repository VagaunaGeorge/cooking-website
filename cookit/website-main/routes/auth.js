const { response } = require('express');
var express = require('express');
var router = express.Router();
const axios = require('axios').default;
var fs = require('fs');
var path = require('path');



router.get('/logout', function (req, res, next) {
  res.clearCookie('user_email');
  res.clearCookie('admin');
  res.clearCookie('errStatus');
  res.clearCookie('regStatus');
  res.render('logout', { title: 'Logout' });
  alert('You`ve been logged out!');

});

/* GET home page. */
router.get('/login', function (req, res, next) {
  let logged = false;
  if (req.cookies.user_email) {
    logged = true;
  }
  if (req.cookies.errStatus) {
    res.cookie('errStatus', true)
  }
  res.locals.user = req.cookies.user_email;
  res.render('login', {
    title: 'Login',
    logged: logged,
    user_name: req.cookies.user_email,
    errStatus: req.cookies.errStatus
  })
})

router.post('/login', function (req, res, next) {
  axios.post('http://localhost:3001/auth/login',
    {
      email: req.body.email,
      password: req.body.password
    })
    .then(function (response) {
      if (response.status === 200) {
        let user = response.data;
        if (user[0]) {
          res.cookie('user_email', req.body.email);
          res.redirect('/recipes')
        }
        res.cookie('errStatus', false)
      }
    }).catch(function (err) {
      let status = err.response.status;
      if (status === 404) {
        res.cookie('errStatus', true)
        res.redirect('/auth/login');
      }
    });
});

router.get('/register', function (req, res) {
  if (req.cookies.regStatus) {
    res.cookie('regStatus', true)
  }
  res.render('register', { title: 'Register', regStatus: req.cookies.regStatus });
});

router.post('/register', function (req, res) {

  axios.post('http://localhost:3001/auth/register',
    {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      repassword: req.body.repassword
    })
    .then(function (response) {
      let user = response.data;
      if (user[0]) {
        res.cookie('user_email', req.body.email);
        res.redirect('/recipes');
      }
      res.cookie('regStatus', false);
    }).catch(function (err) {
      let status = err.response.status;
      console.log(status)
      if (status === 409) {
        res.cookie('regStatus', true);
      }

    });
});

module.exports = router;