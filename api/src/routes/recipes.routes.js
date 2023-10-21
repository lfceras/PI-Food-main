const { Router } = require('express')
const {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipesById,
  updateRecipe
} = require('../../src/controllers/recipes')
const { isAuthenticated, isAdmin, isModerator } = require('../../src/middlewares')

const router = Router()

// Ruta para las recetas

router.get('/', getAllRecipes)
router.get('/:id', getRecipesById)
router.patch('/:id', [isAuthenticated], updateRecipe)
router.delete('/:id', [isAuthenticated], deleteRecipe)
router.post('/',[isAuthenticated], createRecipe)

module.exports = router
