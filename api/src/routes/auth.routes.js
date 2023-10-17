const { Router } = require('express')
const router = Router()
const { User } = require('../db.js')
const { login, newUser } = require('../controllers/auth')
const { checkUserExists, verifySignup } = require('../../src/middlewares')
  
router.get('/users', async (req, res) => {
  const AllUsers = await User.findAll()
  res.status(200).json({ AllUsers })
})
router.post('/newuser', [checkUserExists, verifySignup], newUser)
router.post('/login', login)

module.exports = router
