const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const getDiets = require("../utils/getAllDiets");
const mergeDB = require("../utils/recipes");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/recipes", async (req, res) => {
  try {
    const { name } = req.query;
    const test2 = await mergeDB();
    if (name) {
      let filterTest = test2.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      return filterTest.length
        ? res.status(200).json(filterTest)
        : res.status(404).json({ msg: "Not found" });
    }

    res.status(200).json(test2);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dbFoods = await mergeDB();
    if (id) {
      let idFilter = dbFoods.filter((el) => el.id == id);
      return idFilter.length > 0 && idFilter
        ? res.status(200).json(idFilter)
        : res.json({ msg: "Not found" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/diets", async (req, res) => {
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
      ? res.status(404).json(dbFoods)
      : res.status(404).json(recipesDb);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

router.post("/recipes", async (req, res) => {
  const { name, image, summary, healthScore, steps, diets } = req.body;
  try {
    if (!name || !image || !summary || !healthScore) {
      res.status(400).send("Te falta llenar algunos campos");
    }
    const recipeCreated = await Recipe.create({
      name,
      image,
      summary,
      healthScore,
      steps,
    });
    const diet = await Diet.findAll({
      where: { name: diets },
    });
    recipeCreated.addDiet(diet);

    res.status(200).json(recipeCreated);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
