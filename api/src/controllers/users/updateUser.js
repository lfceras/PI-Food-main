const { User } = require('../../db.js')
const { response } = require('../../../utils/index.js')
const { v4: uuidv4, validate: validateUUID } = require('uuid')

module.exports = async (req, res) => {
  try {
    const { id } = req.params
    const { name, username, email } = req.body
    // console.log(req.body)
    if (!validateUUID(id)) {
      return response(res, 400, { msg: 'ID de usuario no válido' })
    }

    const userId = await User.findByPk(id)

    if (!userId) {
      return response(res, 404, { msg: 'Usuario no encontrado' })
    }

    const datos = await User.update(
      {
        name,
        username,
        email
      },
      {
        where: {
          id: id
        }
      }
    )

    // if (datos[0] === 0) {
    //   return response(res, 404, {
    //     msg: 'No se encontró el usuario o no se realizó ninguna actualización'
    //   })
    // }

    return response(res, 200, datos)
  } catch (error) {
    console.error(error)
  }
}
