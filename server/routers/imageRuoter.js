const router = require('express').Router()
const ImageController = require('../controllers/imageController')
const authentication = require('../middlewares/authentication')


router.get("/", ImageController.findAll)
router.use(authentication)
router.post("/", ImageController.create)
router.put("/:id", ImageController.update)
router.delete("/:id", ImageController.delete)

module.exports = router