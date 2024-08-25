'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert Courses
    const courses = await queryInterface.bulkInsert('Courses', [
      { name: 'Intro to CS', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Discrete Structures', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Analysis & Design 1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Architecture 1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Analysis & Design 2', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Architecture 2', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Computer Theory', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Analysis & Design 3', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Operating Systems', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Capstone Project', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Precalculus', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Calculus 1', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Calculus 2', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Statistics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Matrix Algebra', createdAt: new Date(), updatedAt: new Date() }
    ], { returning: true });

    const courseMap = {};
    courses.forEach(course => {
      courseMap[course.name] = course.id;
    });

    // Insert Prerequisites
    return queryInterface.bulkInsert('Prerequisites', [
      { courseId: courseMap['Analysis & Design 1'], prerequisiteId: courseMap['Intro to CS'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Architecture 1'], prerequisiteId: courseMap['Intro to CS'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Architecture 1'], prerequisiteId: courseMap['Discrete Structures'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Analysis & Design 2'], prerequisiteId: courseMap['Analysis & Design 1'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Analysis & Design 2'], prerequisiteId: courseMap['Discrete Structures'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Architecture 2'], prerequisiteId: courseMap['Analysis & Design 1'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Architecture 2'], prerequisiteId: courseMap['Architecture 1'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Computer Theory'], prerequisiteId: courseMap['Architecture 1'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Analysis & Design 3'], prerequisiteId: courseMap['Analysis & Design 2'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Operating Systems'], prerequisiteId: courseMap['Analysis & Design 2'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Operating Systems'], prerequisiteId: courseMap['Architecture 2'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Capstone Project'], prerequisiteId: courseMap['Analysis & Design 3'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Capstone Project'], prerequisiteId: courseMap['Operating Systems'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Capstone Project'], prerequisiteId: courseMap['Computer Theory'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Calculus 1'], prerequisiteId: courseMap['Precalculus'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Calculus 2'], prerequisiteId: courseMap['Calculus 1'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Statistics'], prerequisiteId: courseMap['Precalculus'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Matrix Algebra'], prerequisiteId: courseMap['Precalculus'], createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Prerequisites', null, {});
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
