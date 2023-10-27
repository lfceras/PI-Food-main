const { Router } = require('express')
const router = Router()
const {
  getAllUsers,
  deleteUser,
  getRoles,
  getUserById,
  verifiedAndUpdatePasswrd,
  updateUser
} = require('../controllers/users')
const { isAuthenticated, isAdmin } = require('../middlewares')

router.get('/users', [isAuthenticated, isAdmin], getAllUsers)
router.get('/users/:id', getUserById)
router.get('/roles', getRoles)

router.delete('/users/:id', deleteUser)
router.put('/users/updateuser/:id', updateUser)
router.patch('/users/updatepassword/:id', verifiedAndUpdatePasswrd)

module.exports = router

//
