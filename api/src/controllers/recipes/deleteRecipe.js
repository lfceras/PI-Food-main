const { Recipe } = require('../../db')
const { response } = require('../../../utils')

module.exports = async (req, res) => {
  const { id } = req.params

  const recipeId = await Recipe.findByPk(id)

  if(!recipeId) {
    return response(res, 404, { msg: 'Recipe not found' });
  }

  await Recipe.destroy({
    where: {
      id: id
    }
  })
  return response(res, 200, { msg: 'Receta eliminada' })
}
