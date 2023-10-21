const { Recipe, Diet } = require('../../db.js')
const { response } = require('../../../utils/index.js')
const { validateRecipe } = require('../../validations/newRecipeValidation .js')

module.exports = async (req, res) => {
  // const { name, image, summary, healthScore, steps, diets, cuisines, dishTypes } = req.body;
  const result = validateRecipe(req.body)
  try {
    if (result.error) return response(res, 400, result.error)

    const { name, diets } = result.data
    const existingRecipe = await Recipe.findOne({
      where: {
        name: name
      }
    })

    if (existingRecipe) {
      return response(res, 400, { msg: 'La receta ya existe en la DB' })
    }

    const recipeCreated = await Recipe.create({
      ...result.data
    })
    const diet = await Diet.findAll({
      where: { name: diets }
    })

    await recipeCreated.addDiet(diet)

    return response(res, 200, {
      msg: `Recipe ${recipeCreated.name} has been created succesfully`
    })
  } catch (error) {
    console.error(error)
    return response(res, 500, { msg: 'Error during creation of recipe' })
  }
}
