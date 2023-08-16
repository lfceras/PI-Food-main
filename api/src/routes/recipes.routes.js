const { Router } = require("express");
const controllers = require('../../controllers/recipes')
const authControllers = require('../../controllers/auth')

const router = Router();

// Ruta para las recetas

router.get('/',controllers.getAllRecipes)
router.get('/:id', controllers.getRecipesById)
router.put('/:id', controllers.updateRecipe)
router.delete('/:id', controllers.deleteRecipe)
router.post('/', controllers.createRecipe)

module.exports = router;
