const { Recipe } = require('../../db.js')
const { response } = require('../../../utils')
const {
  validatePartialRecipe
} = require('../../validations/newRecipeValidation ')
const { v4: uuidv4, validate: validateUUID } = require('uuid')
const httpStatus = require('http-status-codes')

module.exports = async (req, res) => {
  const { id } = req.params
  const result = validatePartialRecipe(req.body)

  if (result.error)
    return response(res, httpStatus.StatusCodes.BAD_REQUEST, result.error)

  try {
    if (!validateUUID(id)) {
      return response(res, httpStatus.StatusCodes.BAD_REQUEST, {
        msg: 'ID de receta no valido'
      })
    }

    const recipeId = await Recipe.findByPk(id)

    if (!recipeId) {
      return response(res, httpStatus.StatusCodes.NOT_FOUND, {
        msg: 'Receta no encontrada'
      })
    }

    if (Object.keys(result.data).length === 0) {
      return response(res, httpStatus.StatusCodes.BAD_REQUEST, {
        msg: 'La receta no puede ser un objeto vacío'
      })
    }

    await Recipe.update(
      { ...result.data },
      {
        where: {
          id: id
        }
      }
    )

    return response(res, httpStatus.StatusCodes.OK, {
      msg: 'Receta actualizada exitosamente'
    })
  } catch (error) {
    return response(res, httpStatus.StatusCodes.INTERNAL_SERVER_ERROR, {
      msg: 'Error en la operación de base de datos'
    })
  }
}
