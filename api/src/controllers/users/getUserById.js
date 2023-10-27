const { User } = require('../../db.js')
const { response } = require('../../../utils')
const { v4: uuidv4, validate: validateUUID } = require('uuid')

module.exports = async (req, res) => {
  const { id } = req.params

  if (!validateUUID(id)) {
    return response(res, 400, { msg: 'ID de usuario no válido' })
  }

  const userId = await User.findByPk(id)

  userId
    ? response(res, 200, {
      id: userId.id,
      name: userId.name,
      username: userId.username,
      email:userId.email
    })
    : response(res, 404, { msg: 'Usuario no encontrado' })
}
