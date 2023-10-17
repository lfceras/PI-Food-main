const { response } = require('../../utils')

const ROLES = ["user", "moderator", "admin"] 

module.exports = async (req, res, next) => {
  const roles = req.body.roles
  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        return response(res, 404, { msg: `Role  "${roles[i]}" does not exist` })
      }
    }
  }
  next()
}
