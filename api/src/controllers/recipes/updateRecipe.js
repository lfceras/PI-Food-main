const { Recipe, Diet } = require('../../db.js')
const { response } = require('../../../utils')
const {
  validatePartialRecipe
} = require('../../validations/newRecipeValidation ')

module.exports = async (req, res) => {
  const result = validatePartialRecipe(req.body)

  if (result.error) return response(res, 400, result.error)

  const { id } = req.params

  await Recipe.update(
    { ...result.data },
    {
      where: {
        id: id
      }
    }
  )
  return response(res, 200, { msg: 'Recipe updated successfully' })
}
