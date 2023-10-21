const mergeDB = require("../../helpers/recipes");
const { response } = require("../../../utils");

module.exports = async (req, res) => {
  try {
    const { search, healthScore, limit, offset } = req.query;
 
  const test2 = await mergeDB();
  let filterTest = test2;

  if (search) {
    filterTest = test2.filter((el) =>
      el.name.toLowerCase().includes(search.toLowerCase())
    );

    return filterTest.length
      ? response(res, 200, filterTest)
      : response(res, 404, { msg: "Recipe not Found" });
  }

  response(res, 200, test2);
  } catch (error) {
   console.error(error)
  }
  
};


