'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.classes, { foreignKey : 'classes_id'})
      this.belongsTo(models.school, { foreignKey : 'school_id'})
      this.belongsTo(models.subject, { foreignKey : 'subject_id'})
    }
  }
  student.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    number: DataTypes.INTEGER,
    classes_id: DataTypes.INTEGER,
    school_id: DataTypes.INTEGER,
    subject_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'student',
  });
  return student;
};