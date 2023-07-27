const {catchedAsync} = require('../../utils')

module.exports = {
  getAllDiets: catchedAsync(require('./getAllDiets'))
}