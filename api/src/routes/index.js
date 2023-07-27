const { Router } = require("express");
const controllers = require('../../controllers/recipes')
const controllersDiets = require('../../controllers/diets')

const router = Router();

// Ruta para las recetas

router.get('/recipes', controllers.getAllRecipes)
router.get('/recipes/:id', controllers.getRecipesById)
router.put('/recipes/:id', controllers.updateRecipe)
router.delete('/recipes/:id', controllers.deleteRecipe)
router.post('/recipes', controllers.createRecipe)

////////////////////////////////////////////

// Ruta para los tipos de dietas 

router.get('/diets', controllersDiets.getAllDiets)

module.exports = router;
