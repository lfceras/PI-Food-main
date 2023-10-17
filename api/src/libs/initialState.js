const { Role } = require('../db.js')

const createRoles = async () => {
  try {
    const count = await Role.count() 
    if (count > 0) return

    await Promise.all([
      await Role.create({name: 'user' }),
      await Role.create({name: 'moderator' }),
      await Role.create({name: 'admin' })
    ])
    // console.log(values)
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  createRoles  
}
