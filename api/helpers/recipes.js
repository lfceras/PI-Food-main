const dta = require("./Food.json");
const { Recipe, Diet } = require("../src/db");

const allRecipes = () => {
  const test = dta.results.map((el) => {
    return {
      id: el.id,
      name: el.title,
      image: el.image,
      summary: el.summary.replace(/(<([^>]+)>)/gi, ""),
      healthScore: el.healthScore,
      steps: el.analyzedInstructions[0]?.steps.map((el) => {
        return {
          step: el.step,
        };
      }),
      cuisines: el?.cuisines,
      dishTypes: el?.dishTypes,
      diets: el?.diets,
    };
  });
  return test;
};

const getRecipes = async () => {
  let recipes = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return recipes;
};

const mergeDB = async () => {
  const db1 = allRecipes();
  const db2 = await getRecipes();
  const db2Transformed = db2.map((recipe) => {
    if (Array.isArray(recipe.diets)) {
      recipe.diets = recipe.diets.map((diet) => diet.name);
    }
    return recipe;
  });
  const mergeds = db1.concat(db2Transformed);
  return mergeds;
};

module.exports = mergeDB;
