var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');


//create MongoDB connection
const { MongoClient } = require("mongodb");
const { Console } = require('console');
const url = 'mongodb+srv://dbUser:Licenta2.0@cluster0.kdgnf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName = 'myFirstDatabase'
const client = new MongoClient(url);

// ------ GET OPERATION ------
router.get('/', async function (req, res) {
  let result = await client.connect();
  db = result.db(dbName);
  collection = db.collection('users');
  let users = await collection.find({}).toArray();
  res.send(users);
});

// ----- GET USER BY ID -----
router.get('/:_id', async function (req, res) {
  let result = await client.connect();
  db = result.db(dbName);
  collection = db.collection('users');
  let users = await collection.find({}).toArray();

  let user = users.find((i) => i._id == req.params._id);
  if (!user) {
    res.send("No such user");
  }
  else {
    res.send(user);
  }
});

// ----- DELETE FROM DB -----
router.delete('/:_id', async function (req, res) {

  let result = await client.connect();
  db = result.db(dbName);
  collection = db.collection('users');
  let users = await collection.find({}).toArray();
  let userToDelete = users.filter(i => i._id == req.params._id);

  if (!userToDelete) {
    res.status(400).send("User not found!");
  }
  else {
    await collection.deleteOne(userToDelete[0], function (err, res) {
      if (err) throw err;
      console.log("User has been deleted");
    });
    res.status(200).send("Success! User has been deleted!")
  }
});


module.exports = router;