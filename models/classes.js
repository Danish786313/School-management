'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class classes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.student, { foreignKey : 'classes_id'})
      this.hasMany(models.teacher, { foreignKey : 'classes_id'})
      this.belongsTo(models.school, { foreignKey : 'school_id'})
      this.hasMany(models.subject, { foreignKey : 'classes_id'})
    }
  } 
  classes.init({
    name: DataTypes.STRING,
    school_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'classes',
  });
  return classes;
};