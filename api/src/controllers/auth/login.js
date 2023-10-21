require('dotenv').config()
const { User, Role } = require('../../db')
const { response } = require('../../../utils')
const comparePassword = require('../../helpers/comparePassword')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  const { email, password } = req.body
  try {
    let finded = await User.findOne({
      where: {
        email: email
      },
      include: [Role]
    })

    if (!finded) return response(res, 400, { msg: 'User not found' })

    const comparedPassword = await comparePassword(password, finded.password)

    if (!comparedPassword)
      return response(res, 400, { msg: 'Invalid password' })

    const token = jwt.sign(
      { id: finded.id, roles: finded.roles[0].name },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES
      }
    )

    return response(res, 200, {
      success: true,
      msg: 'Login successful',
      token
    })
  } catch (error) {
    console.log(error)
    return response(res, 500, { msg: 'Error authenticating' })
  }
}
