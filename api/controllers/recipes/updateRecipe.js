const { Recipe, Diet } = require("../../src/db");
const { response } = require("../../utils");

module.exports = async (req, res)=>{
  const {name, image, summary, healthScore, steps} = req.body
  const {id} = req.params

  let updateRecipe = await Recipe.update(
    {name, image, summary, healthScore, steps},
    {
      where: {
        id: id
      }
    })
    return response(res, 200, updateRecipe)
}