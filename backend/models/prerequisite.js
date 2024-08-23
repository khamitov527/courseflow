'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prerequisite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Prerequisite.init({
    classId: DataTypes.INTEGER,
    prerequisiteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prerequisite',
  });
  return Prerequisite;
};