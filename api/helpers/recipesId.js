const {Recipe, Diet} = require('../src/db')

const findByPk = async (id)=>{
  if(id.length > 15){
    return await Recipe.findByPk(id,{
      includes: {
        model: Diet,
        attributes: ['name'],
        through: {
          attributes:[]
      }
      }
    })
  }
}

module.exports = findByPk