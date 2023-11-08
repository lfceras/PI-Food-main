require('dotenv').config()
const jwt = require('jsonwebtoken')
const { User } = require('../../src/db')
const { response } = require('../../utils')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']

    if (!token) return response(res, 401, { msg: 'No token provided' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id

    const user = await User.findByPk(req.userId)

    if (!user) return response(res, 401, { msg: 'User not found' })

    next()
  } catch (error) {
    console.error(error)
    return response(res, 403, { msg: error.msg })
  }
}
