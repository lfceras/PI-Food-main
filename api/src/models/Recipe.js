const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true   
    },
    image: {
      type: DataTypes.STRING, 
    }, 
    summary: {
      type: DataTypes.STRING
    },
    healthScore: {
      type: DataTypes.INTEGER
     },
    steps: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    create: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
  {
    timestamps:false
 });
};
