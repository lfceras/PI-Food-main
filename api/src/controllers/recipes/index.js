const {catchedAsync} = require('../../../utils')

module.exports = {
  getAllRecipes: catchedAsync(require('./getAllRecipes')),
  getRecipesById : catchedAsync(require('./getRecipesById')),
  createRecipe: catchedAsync(require('./createRecipe')),
  deleteRecipe: catchedAsync(require('./deleteRecipe')),
  updateRecipe: catchedAsync(require('./updateRecipe'))
}