const { Router } = require("express");
const router = Router();
const controllersDiets = require('../../controllers/diets')

router.get('/', controllersDiets.getAllDiets)


module.exports = router;