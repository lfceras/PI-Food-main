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
      type: DataTypes.ARRAY(DataTypes.TEXT),
      get() {
        // Al leer desde la base de datos, convertir las cadenas JSON a objetos
        const steps = this.getDataValue('steps');
        return steps ? steps.map(step => JSON.parse(step)) : [];
      },
      set(value) {
        // Al guardar en la base de datos, convertir los objetos a cadenas JSON
        const steps = value ? value.map(step => JSON.stringify(step)) : [];
        this.setDataValue('steps', steps);
      }
    },
    cuisines: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    dishTypes: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    create: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
  {
    timestamps:false,
    attributeOrder: {
      steps: 2,
    }
 });
};
