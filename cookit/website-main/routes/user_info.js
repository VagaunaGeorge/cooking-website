var express = require('express');
var axios = require('axios');
var router = express.Router();


/* GET home page. */

router.get('/', function (req, res, next) {
    let logged = false;

    if (req.cookies.user_email) {
        logged = true;
    }
    axios.get('http://localhost:3001/users')
        .then(function (response) {
            users = response.data;

            console.log(users)
            let loggedUser = users.find(i => i.email === req.cookies.user_email);
            res.locals.user = req.cookies.user_email;
            res.render('user_info', {
                title: 'User Information', logged: logged,
                user_name: req.cookies.user_email,
                user: loggedUser
            });
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });


});

module.exports = router;
