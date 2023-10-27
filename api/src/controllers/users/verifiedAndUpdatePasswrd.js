const { User } = require('../../db.js')
const { response } = require('../../../utils/index.js')
const { v4: uuidv4, validate: validateUUID } = require('uuid')
const bcrypt = require('bcryptjs')

module.exports = async (req, res) => {
  const { id } = req.params
  const { password, newPassword } = req.body

  if (!validateUUID(id)) {
    return response(res, 400, { msg: 'ID de usuario no válido' })
  }

  const userId = await User.findByPk(id)

  if (!userId) {
    return response(res, 404, { msg: 'Usuario no encontrado' })
  }

  const isPasswordMatch = await bcrypt.compare(password, userId.password)

  if (!isPasswordMatch) {
    return response(res, 400, { msg: 'La contraseña actual no coincide' })
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)

  await User.update({ password: hashedPassword }, { where: { id: id } })

  return res.status(200).json({ msg: 'ok' })
}
