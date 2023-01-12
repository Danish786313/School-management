'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class school extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.student, { foreignKey : 'school_id'})
      this.hasMany(models.teacher, { foreignKey : 'school_id'})
      this.hasMany(models.classes, { foreignKey : 'school_id'})
    } 
  }
  school.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'school',
  });
  return school;
};