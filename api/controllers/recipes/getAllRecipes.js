const mergeDB = require("../../helpers/recipes");
const { response } = require("../../utils");

module.exports = async (req, res) => {
  const { name, healthScore } = req.query;
  const test2 = await mergeDB();
  let filterTest = test2;
  // console.log("Query Parameters: ", { name, healthScore });
  // console.log("Data from mergeDB(): ", test2);

  if (name) {
    filterTest = test2.filter((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );

    return filterTest.length
      ? response(res, 200, filterTest)
      : response(res, 404, { msg: "Not found" });
  }

  response(res, 200, test2);
};
