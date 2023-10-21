const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('step', {
    number: {
      type: DataTypes.INTEGER
    },
    step: {
      type: DataTypes.TEXT
    }
  })
}
