const mergeDB = require('../../helpers/recipes')
const { response } = require('../../../utils')
const httpStatus = require('http-status-codes')

module.exports = async (req, res) => {
  try {
    const { search } = req.query

    const test2 = await mergeDB()
    let filterTest = test2

    if (search) {
      filterTest = test2.filter((el) =>
        el.name.toLowerCase().includes(search.toLowerCase())
      )

      return filterTest.length
        ? response(res, httpStatus.StatusCodes.OK, filterTest)
        : response(res, httpStatus.StatusCodes.NOT_FOUND, { msg: 'Recipe not Found' })
    }

    return response(res, httpStatus.StatusCodes.OK, test2)
  } catch (error) {
    console.error(error)
  }
}
