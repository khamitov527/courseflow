'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sectionNumber: {
        type: Sequelize.STRING
      },
      professor: {
        type: Sequelize.STRING
      },
      university: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      schedule: {
        type: Sequelize.STRING
      },
      seats: {
        type: Sequelize.INTEGER
      },
      waitlist: {
        type: Sequelize.INTEGER
      },
      instructionMode: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Sections');
  }
};