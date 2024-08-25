'use strict';
module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  Course.associate = function(models) {
    Course.belongsToMany(models.Course, {
      as: 'Prerequisites',
      through: 'Prerequisite',
      foreignKey: 'courseId',
      otherKey: 'prerequisiteId'
    });
  };

  return Course;
};
