var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

//create MongoDB connection
const { MongoClient } = require("mongodb");
const url = 'mongodb+srv://dbUser:Licenta2.0@cluster0.kdgnf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName = 'myFirstDatabase'
const client = new MongoClient(url);

// ------ GET OPERATION ------
router.get('/', async function (req, res) {
  let result = await client.connect();
  db = result.db(dbName);
  collection = db.collection('recipes');
  let recipes = await collection.find({}).toArray();
  res.send(recipes);
});

// ------ GET A RECIPE BY ID ------
router.get('/:_id', async function (req, res) {
  let result = await client.connect();
  db = result.db(dbName);
  collection = db.collection('recipes');
  let recipe = await collection.find({ '_id': Number(req.params._id) }).toArray();

  if (recipe.length == 0) {
    res.send("No such recipe");
  }
  else {
    res.send(recipe);
  }
});


// ------ DELETE A RECIPE BY ITS ID ------
router.delete('/:_id', async function (req, res) {

  let result = await client.connect();
  db = result.db(dbName);
  collection = db.collection('recipes');
  let recipe = await collection.find({ '_id': req.params._id }).toArray();

  if (!recipe) {
    res.status(400).send("Recipe not found!");
  }
  else {
    await collection.deleteOne(recipe[0], function (err, res) {
      if (err) throw err;
      console.log("Recipe has been deleted");
    });
    res.status(200).send("Success! The recipe has been deleted!")
  }
});


module.exports = router;