'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      teacher.belongsTo(models.classes, { foreignKey : 'classes_id'})
      teacher.belongsTo(models.school, { foreignKey : 'school_id'})
      teacher.belongsTo(models.subject, { foreignKey : 'subject_id'})
    }
  }
  teacher.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    classes_id: DataTypes.INTEGER,
    school_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'teacher',
  });
  return teacher;
};