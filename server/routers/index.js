const router = require("express").Router()
const UserController = require('../controllers/userController')
const imageRouter  = require("./imageRuoter")

router.post('/login', UserController.login)

router.use('/image', imageRouter)

module.exports = router