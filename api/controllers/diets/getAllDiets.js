const { Recipe, Diet } = require("../../src/db");
const getDiets = require("../../helpers/getAllDiets");
const {response} = require('../../utils')

module.exports = async(req, res)=>{
  try {
    const dbFoods = await getDiets();
    const recipesDb = await Diet.findAll({
      include: {
        model: Recipe,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return dbFoods.length
      ? response(res, 200, dbFoods)
      : response(res, 404, recipesDb)
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
}