const fs = require('fs');
const path = require('path');
const axios = require('axios');
var express = require('express');
const { log } = require('console');
const { SERVFAIL } = require('dns');
var router = express.Router();

let recipes = [];
ingredients = [];
let sortPosibilities = ['Cooking Time - asc', 'Cooking Time - desc', 'Difficulty - asc', 'Difficulty - desc'];
let skillsLevels = ['Easy', 'Medium', 'Hard'];
let intolerances = ['Lactose', 'Gluten'];
let difficultyScores = { "easy": 1, "medium": 2, "hard": 3 }

axios.get('http://localhost:3001/recipes')
  .then(function (response) {
    recipes = response.data;
    for (let recipe of recipes) {
      for (let ingred of recipe.ingredients) {
        ingredients.push(ingred.ingr_name);
      }
    }
    //remove duplicates from ingredients array
    ingredients = [...new Set(ingredients)]
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });

//checks if 2 strings differ w/ 2 or more chars
function compareStrings(str1, str2) {
  let count = 0;
  for (let i = 0; i < str2.length; i++) {
    if (str1[i].toLowerCase() !== str2[i].toLowerCase()) {
      count++;
    }
    if (count == 2) {
      return false;
    }
  }
  return true;
}

let filterRecipes = recipes;
/* GET home page. */
router.get('/', function (req, res, next) {
  searchRecipe = recipes
    .filter(prod => {
      if (req.query.recipe) {
        return compareStrings(prod.name, req.query.recipe);
      }
      return true;
    })
  filterRecipes = searchRecipe
    .filter(prod => {
      if (req.query.skillsLevels) {
        return (req.query.skillsLevels.toLowerCase() == (prod.skills_lvl));
      }
      return true;
    })
    .filter(prod => {
      if (req.query.intolerances) {
        if (prod.into_lact === 'yes' && req.query.intolerances.includes('Lactose'))
          return false;
        if (prod.into_gluten === 'yes' && req.query.intolerances.includes('Gluten'))
          return false;
      }
      return true;
    })
    .filter(prod => {
      if (req.query.ingredients) {
        let arr = [];
        for (let i of prod.ingredients) {
          if (req.query.ingredients.includes(i.ingr_name)) {
            arr.push(i.ingr_name)
          }
        }
        if (arr.length == 0) {
          return false
        }
      }
      return true;
    })
    .sort((a, b) => {
      if (req.query.sorting) {
        if (req.query.sorting === 'Cooking Time - asc') {
          return parseFloat(a.cooking_time) - parseFloat(b.cooking_time);
        }
        if (req.query.sorting === 'Cooking Time - desc') {
          return parseFloat(b.cooking_time) - parseFloat(a.cooking_time);
        }
        if (req.query.sorting === 'Difficulty - asc') {
          return parseFloat(difficultyScores[a.skills_lvl]) - parseFloat(difficultyScores[b.skills_lvl]);
        }
        if (req.query.sorting === 'Difficulty - desc') {
          return parseFloat(difficultyScores[b.skills_lvl]) - parseFloat(difficultyScores[a.skills_lvl]);
        }
        return true;
      }
    });
  let logged = false;
  if (req.cookies.user_email && req.cookies.admin) {
    logged = true;
  }

  res.locals.user = req.cookies.user_email;

  res.render('recipes', {
    title: 'Recipes',
    recipes: filterRecipes,
    ingredients: ingredients.sort((a, b) => { return a.localeCompare(b) }),
    skillsLevels: skillsLevels,
    intolerances: intolerances,
    sortPosibilities: sortPosibilities,
    logged: logged,
    user_name: req.cookies.user_email
  })

});

module.exports = router;

