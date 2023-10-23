const { User, Role } = require('../../db.js')
const { response } = require('../../../utils')

module.exports = async (req, res) => {
  const { name } = req.query
  const AllUsers = await User.findAll({
    include: {
      model: Role,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })

  if (name) {
    let filterUser = AllUsers.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    )

    return filterUser.length
      ? response(res, 200, filterUser)
      : response(res, 404, { msg: 'User not found' })
  }

 return response(res, 200, AllUsers)
}
