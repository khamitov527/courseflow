module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    sectionNumber: DataTypes.STRING,
    professor: DataTypes.STRING,
    university: DataTypes.STRING,
    location: DataTypes.STRING,
    schedule: DataTypes.STRING,
    seats: DataTypes.INTEGER,
    waitlist: DataTypes.INTEGER,
    instructionMode: DataTypes.STRING,
    notes: DataTypes.TEXT,
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Classes',
        key: 'id',
      },
    },
  });

  Section.associate = function(models) {
    Section.belongsTo(models.Class, { foreignKey: 'classId' });
  };

  return Section;
};
