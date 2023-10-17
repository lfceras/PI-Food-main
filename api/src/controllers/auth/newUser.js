const { User, Role } = require('../../db.js')
const encryptPassword = require('../../helpers/encryptPassword.js')
const { response } = require('../../../utils')
const jwt = require('jsonwebtoken')

module.exports = async (req, res) => {
  try {
    const { name, username, email, password, roles } = req.body

    if (!name || !username || !email || !password) {
      return response(res, 404, 'Debes llenar todos los campos')
    }

    const encryptedPassword = await encryptPassword(password)

    const userCreated = await User.create({
      name,
      username,
      email,
      password: encryptedPassword
    })

    if(roles){
      const foundRoles = await Role.findAll({where: {name: roles}})
      await userCreated.setRoles(foundRoles)
    }else{
      const role = await Role.findOne({where: {name: "user"}})
      await userCreated.setRoles([role])
    }

    const token = jwt.sign({ id: userCreated.id }, process.env.JWT_SECRET, {
      expiresIn: 86400
    })
    response(res, 200, {
      msg: 'User created successfully',
      token
    })
  } catch (error) {
    console.log(error)
    response(res, 400, error)
  }
}
