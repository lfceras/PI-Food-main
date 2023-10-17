const { response } = require('../../utils')
const { User } = require('../db.js')

module.exports = async (req, res, next) => {
  const { username, email } = req.body

  const userExists = await User.findOne({
    where: {
      username: username
    }
  })

  if (userExists) {
    return response(res, 400, { msg: `The user : ${username} already exists` })
  }

  const emailExists = await User.findOne({
    where: {
      email: email
    }
  })

  if (emailExists) {
    return response(res, 400, { msg: `The email : ${email} already exists` })
  }

  next()
}
