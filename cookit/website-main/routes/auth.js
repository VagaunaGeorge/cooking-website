var express = require('express');
var router = express.Router();
const axios = require('axios').default;
var fs = require('fs');
var path = require('path');

router.get('/logout', function (req, res, next) {
  res.clearCookie('user_email');
  res.clearCookie('admin');
  res.render('logout', { title: 'Logout' });
  alert('You`ve been logged out!');

});
/* GET home page. */
router.get('/login', function (req, res, next) {
  let logged = false;
  if (req.cookies.user_email && req.cookies.admin) {
    logged = true;
  }
  res.locals.user = req.cookies.user_email;
  res.render('login', {
    title: 'Login',
    logged: logged,
    user_name: req.cookies.user_email
  })
})

router.post('/login', function (req, res, next) {
  axios.post('http://localhost:3001/auth/login',
    {
      email: req.body.email,
      password: req.body.password
    })
    .then(function (response) {
      let user = response.data;
      if (user) {
        res.cookie('user_email', user.email).cookie('admin', user.admin);
        if (user.email === 'admin@shop.ro') {
          res.redirect('/users');
        } else if (user) {
          res.redirect('/recipes')
        }
        else {
          res.redirect('/auth/login');
        }
      }
    }).catch(function (err) {
      console.log(err);
      res.send(err);
    });
});

router.get('/register', function (req, res) {
  res.render('register', { title: 'Register' });
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
    .then(function (err) {
      res.redirect('/auth/login');
    }).catch(function (err) {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;