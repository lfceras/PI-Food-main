const { Router } = require('express')
const router = Router()
const { User } = require('../db.js')
const { login, newUser } = require('../controllers/auth')
const { checkUserExists, verifySignup, isAdmin } = require('../../src/middlewares')

router.post('/newuser', [checkUserExists, verifySignup], newUser)
router.post('/login',login)

module.exports = router
