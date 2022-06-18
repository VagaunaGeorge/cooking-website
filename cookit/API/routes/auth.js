var express = require('express');
var router = express.Router();
const axios = require('axios').default;
var fs = require('fs');
var path = require('path');

//create MongoDB connection
const { MongoClient } = require("mongodb");
const url = 'mongodb+srv://dbUser:Licenta2.0@cluster0.kdgnf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName = 'myFirstDatabase'
const client = new MongoClient(url);

let emailRegExp = /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
let passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function checkName(name) {
  if (name.length <= 3) {
    return false;
  }
  return true;
}

function checkEmailRegExp(regExp, myStr) {
  if (regExp.test(myStr) === false) {
    return false;
  }
  return true;
}

function checkPassRegExp(regExp, myStr) {
  if (regExp.test(myStr) === false) {
    return false;
  }
  return true;
}

function checkPassMatch(pass, repass) {
  if (pass !== repass) {
    return false;
  }
  return true;
}

router.post('/login', async function (req, res) {

  let result = await client.connect();
  db = result.db(dbName);
  collection = db.collection('users');
  let users = await collection.find({}).toArray();
  logUser = users.filter(i => i.email === req.body.email && i.password === req.body.password);

  if (logUser.length === 0) {
    res.status(404).json("Incorrect username or password.");
  } else {
    res.status(200).json(logUser);
  }
})

// POST NEW REGISTERED USER
router.post('/register', async function (req, res) {

  let result = await client.connect();
  db = result.db(dbName);
  collection = db.collection('users');
  let users = await collection.find({}).toArray();
  existingUser = users.filter(i => i.email === req.body.email);

  // if (checkName(req.body.first_name) == false) {
  //   res.status(500).send("First name should have at least 3 characters!")
  // }

  // if (checkName(req.body.last_name) == false) {
  //   res.status(500).send("Last name should have at least 3 characters!")
  // }

  // if (checkEmailRegExp(emailRegExp, req.body.email) == false) {
  //   res.status(500).send("Email should include @ and a domain");
  // }

  // if (checkPassRegExp(passRegExp, req.body.password) == false) {
  //   res.status(500).send("Password should contain: an uppercase alphabetical character, a lowercase alphabetical character, a special character and must be at least 8 characters long.");
  // }

  // if (checkPassMatch(req.body.password, req.body.repassword)) {
  //   res.status(500).send("Passwords doesn`t match!");
  // }

  let newUser = {
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "email": req.body.email,
    "password": req.body.password
  }

  if (existingUser.length !== 0) {
    res.status(409).json("Conflict! There are already an account having this email!");
  }
  else {
    collection.insertOne(newUser, function (err, res) {
      if (err) throw err;
      console.log("1 document inserted");
    });
    res.status(200).json(newUser)
  }

});


module.exports = router;