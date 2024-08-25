'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const courses = await queryInterface.bulkInsert('Courses', [
      { name: 'Introduction to Computer Science', code: 'CS 127', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Discrete Structures', code: 'CS 150', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Software Analysis & Design I', code: 'CS 135', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Computer Architecture I', code: 'CS 160', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Software Analysis & Design II', code: 'CS 235', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Computer Architecture II', code: 'CS 260', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Computer Theory I', code: 'CS 265', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Software Analysis & Design III', code: 'CS 335', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Operating Systems', code: 'CS 340', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Advanced Applications: A Capstone for Majors', code: 'CS 499', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Precalculus', code: 'MATH 125', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Calculus I', code: 'MATH 150', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Calculus II', code: 'MATH 155', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Matrix Algebra', code: 'MATH 160', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Introduction to Applied Statistics', code: 'STAT 213', createdAt: new Date(), updatedAt: new Date() }
    ], { returning: true });

    const courseMap = {};
    courses.forEach(course => {
      courseMap[course.name] = course.id;
    });

    return queryInterface.bulkInsert('Prerequisites', [
      { courseId: courseMap['Software Analysis & Design I'], prerequisiteId: courseMap['Introduction to Computer Science'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Computer Architecture I'], prerequisiteId: courseMap['Introduction to Computer Science'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Computer Architecture I'], prerequisiteId: courseMap['Discrete Structures'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Software Analysis & Design II'], prerequisiteId: courseMap['Software Analysis & Design I'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Software Analysis & Design II'], prerequisiteId: courseMap['Discrete Structures'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Computer Architecture II'], prerequisiteId: courseMap['Software Analysis & Design I'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Computer Architecture II'], prerequisiteId: courseMap['Computer Architecture I'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Computer Theory I'], prerequisiteId: courseMap['Computer Architecture I'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Software Analysis & Design III'], prerequisiteId: courseMap['Software Analysis & Design II'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Operating Systems'], prerequisiteId: courseMap['Software Analysis & Design II'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Operating Systems'], prerequisiteId: courseMap['Computer Architecture II'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Advanced Applications: A Capstone for Majors'], prerequisiteId: courseMap['Software Analysis & Design III'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Advanced Applications: A Capstone for Majors'], prerequisiteId: courseMap['Operating Systems'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Advanced Applications: A Capstone for Majors'], prerequisiteId: courseMap['Computer Theory I'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Calculus I'], prerequisiteId: courseMap['Precalculus'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Calculus II'], prerequisiteId: courseMap['Calculus I'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Introduction to Applied Statistics'], prerequisiteId: courseMap['Precalculus'], createdAt: new Date(), updatedAt: new Date() },
      { courseId: courseMap['Matrix Algebra'], prerequisiteId: courseMap['Precalculus'], createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Prerequisites', null, {});
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
