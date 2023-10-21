const { Router } = require('express')
const router = Router()
const { getAllUsers, deleteUser, updateUser } = require('../controllers/users')

router.get('/users', getAllUsers)

router.delete('/users/:id', deleteUser)

router.put('/users/:id', updateUser)

module.exports = router
