const {response} = require('../../utils')
const { User, Role } = require('../db.js')

module.exports = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: Role
    })

    const isAdmin = user.roles.some((role) => role.name === 'admin')

    if (isAdmin) {
      next()
    }else{
      return response(res, 403, {msg: 'Requires admin role'})
    }
  } catch (error) {
    console.error(error)
  }
}
