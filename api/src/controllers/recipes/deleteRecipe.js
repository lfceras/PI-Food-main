const { Recipe } = require('../../db')
const { response } = require('../../../utils')

module.exports = async (req, res) => {
  const { id } = req.params

  await Recipe.destroy({
    where: {
      id: id
    }
  })
  return response(res, 200, { msg: 'Receta eliminada' })
}
