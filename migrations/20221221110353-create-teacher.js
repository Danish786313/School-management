'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teachers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.INTEGER
      },
      school_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model : {
            tableName : 'schools'
          },
          key: 'id'
        }
      },
      classes_id : {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'classes'
          },
          key: 'id'
        }
      },
      subject_id : {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'subjects'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('teachers');
  }
};