'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require("bcrypt")
module.exports = {
  async up (queryInterface, Sequelize) {
    let hash = await bcrypt.hash('12345678', 10)
    await queryInterface.bulkInsert('users', 
      [{
        name: 'Admin',
        email: 'admin@email.com',
        password: hash,
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP')
      }]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
