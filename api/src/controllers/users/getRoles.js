const { response } = require("../../../utils")
const {Role, User} = require("../../db.js")

module.exports = async(req, res)=>{
  const role = await Role.findAll()
  if(!role) return response(res, 404, {msg: "Role not found"})

  return response(res, 200, role)
}
