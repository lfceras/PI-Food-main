const { Recipe } = require('../../db')
const { response } = require('../../../utils')
const { v4: uuidv4, validate: validateUUID } = require('uuid')
const httpStatus = require('http-status-codes')

module.exports = async (req, res) => {
  const { id } = req.params

  if (!validateUUID(id)) {
    return response(res, httpStatus.StatusCodes.BAD_REQUEST, { msg: 'ID de receta no valido' })
  }
  
  const recipeId = await Recipe.findByPk(id)

  if (!recipeId) {
    return response(res, httpStatus.StatusCodes.NOT_FOUND, { msg: 'Recipe not found' })
  }

  await Recipe.destroy({
    where: {
      id: id
    }
  })
  return response(res, httpStatus.StatusCodes.OK, { msg: 'Receta eliminada' })
}
