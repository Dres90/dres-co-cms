'use strict';

const recipe = require('./recipe');
const recipeJob = require('./recipe-job');
const recipeCategory = require('./recipe-category');

module.exports = {
  recipe,
  "recipe-job": recipeJob,
  "recipe-category": recipeCategory
};
