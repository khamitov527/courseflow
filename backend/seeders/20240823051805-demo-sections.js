'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Sections', [
      {
        sectionNumber: 'A',
        professor: 'Dr. John Doe',
        university: 'Main Campus',
        location: 'Room 101',
        schedule: 'MWF 9:00-10:00 AM',
        seats: 30,
        waitlist: 5,
        instructionMode: 'In-Person',
        notes: 'Please bring a calculator to class.',
        classId: 1, // Assuming MATH 100 has an ID of 1
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectionNumber: 'B',
        professor: 'Dr. Jane Smith',
        university: 'Main Campus',
        location: 'Room 102',
        schedule: 'TTh 1:00-2:30 PM',
        seats: 30,
        waitlist: 3,
        instructionMode: 'In-Person',
        notes: 'Homework is due every Friday.',
        classId: 2, // Assuming MATH 200 has an ID of 2
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sectionNumber: 'C',
        professor: 'Dr. Emily Davis',
        university: 'Main Campus',
        location: 'Room 103',
        schedule: 'MWF 11:00-12:00 PM',
        seats: 40,
        waitlist: 10,
        instructionMode: 'Online',
        notes: 'Online section, please check the university LMS for updates.',
        classId: 3, // Assuming PHYS 101 has an ID of 3
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Sections', null, {});
  }
};
