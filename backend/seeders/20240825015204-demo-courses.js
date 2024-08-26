'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert Core Courses
    const courses = await queryInterface.bulkInsert('Courses', [
      { name: 'Introduction to Computer Science', code: 'CS 127', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Discrete Structures', code: 'CS 150', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Software Analysis & Design I', code: 'CS 135', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Computer Architecture I', code: 'CS 160', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Software Analysis & Design II', code: 'CS 235', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Computer Architecture II', code: 'CS 260', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Computer Theory I', code: 'CS 265', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Software Analysis & Design III', code: 'CS 335', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Operating Systems', code: 'CS 340', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Advanced Applications: A Capstone for Majors', code: 'CS 499', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Precalculus', code: 'MATH 125', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Calculus I', code: 'MATH 150', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Calculus II', code: 'MATH 155', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Matrix Algebra', code: 'MATH 160', isElective: false, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Introduction to Applied Statistics', code: 'STAT 213', isElective: false, createdAt: new Date(), updatedAt: new Date() }
    ], { returning: true });

    const courseMap = {};
    courses.forEach(course => {
      courseMap[course.name] = course.id;
    });

    // Insert Prerequisites for Core Courses
    await queryInterface.bulkInsert('Prerequisites', [
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

    // Insert Elective Courses without Prerequisites
    await queryInterface.bulkInsert('Courses', [
      { name: 'Microprocessing & Embedded Systems', code: 'CS 267', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Symbolic Logic', code: 'CS 275', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Artificial Intelligence', code: 'CS 350', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Machine Learning', code: 'CS 353', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Computer Architecture III', code: 'CS 360', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Computer Theory II', code: 'CS 365', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Logic and Computers (Formal Methods)', code: 'CS 372', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Intro to Robotics', code: 'CS 39502', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'UI/UX Design', code: 'CS 39535', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Intro to APIs', code: 'CS 39537', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Flutter App Dev', code: 'CS 39540', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Basics of Game Engines', code: 'CS 39541', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Intro to Data Science', code: 'CS 39542', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Intro to Data Mining', code: 'CS 39543', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Digital Product Development', code: 'CS 39544', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'VR, AR, Mixed Reality', code: 'CS 39545', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'The Ethic Challenges of Information Technology', code: 'CS 39546', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Practical Web Development', code: 'CS 39548', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Agile Software Development', code: 'CS 39549', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Networking', code: 'CS 39554', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Advanced Discrete Structures', code: 'CS 39562', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Graph Theory', code: 'CS 39575', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Data Visualization', code: 'CS 39579', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Computer Forensics', code: 'CS 39582', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cloud Computing', code: 'CS 39583', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Android Application Development', code: 'CS 39585', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Open Source Software Development', code: 'CS 39586', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Advanced Visual Tools', code: 'CS 39594', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Advanced Networks and Cloud', code: 'CS 39596', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'iOS Development', code: 'CS 39597', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Intro to Cyber Risk', code: 'CS 39598', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Intro to Cryptography', code: 'CS 39539', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Software Engineering', code: 'CS 405', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Data Communications and Networking', code: 'CS 415', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Data Base Management', code: 'CS 435', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Advanced Programming Languages', code: 'CS 460', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Functional Programming in OCaml', code: 'CS 49201', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Algorithm Design and Analysis', code: 'CS 49355', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Language Technology', code: 'CS 49362', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Parallel Computing', code: 'CS 49365', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Unix Tools', code: 'CS 49366', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Computer Vision', code: 'CS 49369', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Seminar: Big Data', code: 'CS 49371', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Network Security', code: 'CS 49375', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Big Data Technology', code: 'CS 49376', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Deep Learning', code: 'CS 49377', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Distributed Systems & Cloud', code: 'CS 49378', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Intro to Blockchain', code: 'CS 49379', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Intro to Reactive Programming', code: 'CS 49380', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Intro of Computer Security', code: 'CS 49381', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Programming Languages and Their Implementation', code: 'CS 71010', isElective: true, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Computer Modeling and Simulation', code: 'CS 740', isElective: true, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Prerequisites', null, {});
    await queryInterface.bulkDelete('Courses', null, {});
  }
};
