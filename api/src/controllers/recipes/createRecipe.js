const { Recipe, Diet } = require('../../db.js')
const { response } = require('../../../utils/index.js')
const { validateRecipe } = require('../../validations/newRecipeValidation .js')
const httpStatus = require('http-status-codes')

module.exports = async (req, res) => {
  const result = validateRecipe(req.body)
  try {
    if (result.error) return response(res,httpStatus.StatusCodes.BAD_REQUEST, result.error)

    const { name, diets } = result.data
    const existingRecipe = await Recipe.findOne({
      where: {
        name: name
      }
    })

    if (existingRecipe) {
      return response(res, httpStatus.StatusCodes.BAD_REQUEST, { msg: 'La receta ya existe en la DB' })
    }

    const recipeCreated = await Recipe.create({
      ...result.data
    })
    const diet = await Diet.findAll({
      where: { name: diets }
    })

    await recipeCreated.addDiet(diet)

    return response(res, httpStatus.StatusCodes.CREATED, {
      msg: `Recipe ${recipeCreated.name} has been created succesfully`,
      recipeCreated
    })
  } catch (error) {
    console.error(error)
    return response(res,  httpStatus.StatusCodes.INTERNAL_SERVER_ERROR, { msg: 'Error during creation of recipe' })
  }
}
