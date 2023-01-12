'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.student, { foreignKey : 'subject_id'})
      this.hasMany(models.teacher, { foreignKey : 'subject_id'}),
      this.belongsTo(models.classes, { foreignKey : 'classes_id'})
    }
  }
  subject.init({
    name: DataTypes.STRING,
    classes_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'subject',
  });
  return subject;
};