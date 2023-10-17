const dta = require("./Food.json");
const { Diet } = require("../db");

const getDiets = async () => {
  let data = dta.results.map((el) => {
    return {
      diets: el.diets,
    };
  });
  let otra = data.flatMap((el) => el.diets);
  let noRepitions = [...new Set(otra),"vegetarian"];
  noRepitions.forEach(el => {   
      if(Diet.length === 0){
      Diet.findOrCreate({
        where:{
          name: el
        }
      })
    }else{
      return{
        msg: 'Data no encontrada'
      }
    }
  })
  return noRepitions;
};

module.exports = getDiets;
