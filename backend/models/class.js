// models/class.js
module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define('Class', {
    name: DataTypes.STRING,
    fullName: DataTypes.STRING,
    semester: DataTypes.STRING,
    year: DataTypes.INTEGER,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    description: DataTypes.TEXT,
    requirements: DataTypes.TEXT,
    credits: DataTypes.INTEGER,
  });

  Class.associate = function(models) {
    Class.hasMany(models.Section, { foreignKey: 'classId' });
    Class.belongsToMany(models.Class, {
      as: 'Prerequisites',
      through: 'Prerequisite',
      foreignKey: 'classId',
      otherKey: 'prerequisiteId',
    });
    Class.belongsToMany(models.Class, {
      as: 'Corequisites',
      through: 'Corequisite',
      foreignKey: 'classId',
      otherKey: 'corequisiteId',
    });
  };

  return Class;
};
