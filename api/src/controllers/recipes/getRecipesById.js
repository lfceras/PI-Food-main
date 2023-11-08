const mergeDB = require('../../helpers/recipes')
const { response } = require('../../../utils')
const { Recipe, Diet } = require('../../db.js')
const httpStatus = require('http-status-codes')

module.exports = async (req, res) => {
  const { id } = req.params
  const dbFoods = await mergeDB()
  let validate = id.includes('-')

  let result = null

  if (validate) {
    result = await Recipe.findByPk(id, {
      include: {
        model: Diet,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    })
  } else if (!id || isNaN(Number(id))) {
    return response(res, httpStatus.StatusCodes.BAD_REQUEST, { msg: 'Invalid Id' })
  } else {
    result = dbFoods.find((el) => el.id === parseInt(id))
  }

  return result
    ? response(res, httpStatus.StatusCodes.OK, result)
    : response(res, httpStatus.StatusCodes.NOT_FOUND, { msg: 'Not found' })
}
