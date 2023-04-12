const dta = require("../../Food.json");
const {Recipe, Diet} = require('../db')

const allRecipes = () => {
  const test = dta.results.map((el) => {
    return {
      id: el.id,
      name: el.title,
      image: el.image,
      summary: el.summary.replace(/(<([^>]+)>)/gi, ""),
      healthScore: el.healthScore,
      steps: el.analyzedInstructions[0]?.steps.map((el) =>
        {  return {
            number: el.number,
            step: el.step,
          };}
      ),
      diets: el.diets
    };
  });
  return test;
};

const getRecipes = async ()=>{
  let recipes = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ['name'],
      through: {
        attributes:[]
    }
    }
  })
  return recipes
}

const mergeDB = async ()=>{
  const db1 = allRecipes()
  const db2 = await getRecipes()
  const mergeds = db1.concat(db2)
  return mergeds
}

module.exports = mergeDB;
