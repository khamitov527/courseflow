'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Classes', [
      {
        name: 'MATH 100',
        fullName: 'Calculus I',
        semester: 'Fall',
        year: 2024,
        startDate: new Date('2024-08-28'),
        endDate: new Date('2024-12-21'),
        description: 'Introduction to calculus including limits, derivatives, and integrals.',
        requirements: 'None',
        credits: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'MATH 200',
        fullName: 'Calculus II',
        semester: 'Spring',
        year: 2025,
        startDate: new Date('2025-01-15'),
        endDate: new Date('2025-05-10'),
        description: 'Continuation of Calculus I, including techniques of integration and series.',
        requirements: 'MATH 100',
        credits: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'PHYS 101',
        fullName: 'General Physics I',
        semester: 'Fall',
        year: 2024,
        startDate: new Date('2024-08-28'),
        endDate: new Date('2024-12-21'),
        description: 'Introduction to classical mechanics, including kinematics and dynamics.',
        requirements: 'None',
        credits: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Classes', null, {});
  }
};
