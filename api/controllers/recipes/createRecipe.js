const { Recipe, Diet } = require("../../src/db");
const { response } = require("../../utils");

module.exports = async (req, res) => {
  const { name, image, summary, healthScore, steps, diets, cuisines, dishTypes } = req.body;
  try {
    const checkRecipeExist = async (name) => {
      const existingRecipe = await Recipe.findOne({
        where: {
          name: name,
        },
      });
      return existingRecipe !== null;
    };

    const recipeExists = await checkRecipeExist(name);
    if (recipeExists) {
      return response(res, 400, { msg: "La receta ya existe en la DB" });
    }

    if (!name || !image || !summary || !healthScore) {
      response(res, 400, { msg: "Te falta llenar algunos campos" });
    }
    const recipeCreated = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      steps,
      cuisines,
      dishTypes
    });
    const diet = await Diet.findAll({
      where: { name: diets },
    });

    await recipeCreated.addDiet(diet);

    response(res, 200,  recipeCreated );
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
