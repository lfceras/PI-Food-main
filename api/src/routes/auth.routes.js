const { Router } = require("express");
const router = Router();
const {User} = require('../../src/db')

const {login, newUser} = require('../../controllers/auth')

router.get('/users', async (req, res)=>{
  const AllUsers = await User.findAll()
  res.status(200).json({AllUsers})
})

router.post('/newuser', newUser)
router.post('/login', login)


module.exports = router;