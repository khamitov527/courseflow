'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prerequisite = sequelize.define('Prerequisite', {
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prerequisiteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Prerequisite;
};
