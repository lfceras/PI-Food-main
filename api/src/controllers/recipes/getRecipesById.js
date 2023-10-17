const mergeDB = require("../../helpers/recipes");
const {response} = require('../../../utils')

module.exports = async (req, res)=>{
    const { id } = req.params;
    const dbFoods = await mergeDB();
    if (id) {
      let idFilter = dbFoods.filter((el) => el.id == id);
      return idFilter.length > 0 && idFilter
        ? response(res,200, idFilter)
        : response(res, 404, { msg: "Not found" });
    }
}