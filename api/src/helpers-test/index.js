const recipe = {
  name: 'Milanea a la napolitana'
}

const newRecipe = {
  name: `Milanesa${Date.now()}`,
  image: 'https://spoonacular.com/recipeImages/794538-312x231.jpg',
  summary:
    'Almond Joy Protein Shake might be a good recipe to expand your beverage recipe box.',
  healthScore: 70,
  steps: [
    'Place mushroom caps hollow side up on baking sheet. Fill each cap with 1 tsp.'
  ],
  cuisines: ['Mediterranean'],
  dishTypes: ['side dish'],
  diets: ['gluten free']
}

const updateRecipe = {
  name: 'Milanesa de cerdo',
  image: 'https://spoonacular.com/recipeImages/794538-312x231.jpg',
  summary:
    'Almond Joy Protein Shake might be a good recipe to expand your beverage recipe box.',
  healthScore: 70,
  steps: [
    'Place mushroom caps hollow side up on baking sheet. Fill each cap with 1 tsp.'
  ],
  cuisines: ['Mediterranean'],
  dishTypes: ['side dish'],
  diets: ['gluten free']
}

const incompleteRecipe = {
  name: `Milanesa${Date.now()}`,
  image: 'https://spoonacular.com/recipeImages/794538-312x231.jpg',
  healthScore: 70,
  steps: [
    'Place mushroom caps hollow side up on baking sheet. Fill each cap with 1 tsp.'
  ],
  cuisines: ['Mediterranean'],
  dishTypes: ['side dish'],
  diets: ['gluten free']
}

module.exports =  {
  recipe,
  newRecipe,
  updateRecipe,
  incompleteRecipe
}