const { User, Role } = require('../../db.js')

module.exports = async (req, res) => {
  const AllUsers = await User.findAll({
    include: {
      model: Role,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    }
  })
  res.status(200).json(AllUsers)
}
