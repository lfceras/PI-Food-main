const { Router } = require('express')
const router = Router()
const { getAllUsers, deleteUser, updateUser } = require('../controllers/users')
const {isAuthenticated, isAdmin} = require("../middlewares")

router.get('/users', [isAuthenticated, isAdmin],getAllUsers)

router.delete('/users/:id', deleteUser)

router.put('/users/:id', updateUser)

module.exports = router

// 