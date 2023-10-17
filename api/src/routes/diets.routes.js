const { Router } = require("express");
const router = Router();
const controllersDiets = require('../../src/controllers/diets')

router.get('/', controllersDiets.getAllDiets)


module.exports = router;