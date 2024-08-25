const { sequelize } = require('./models');

async function clearTables() {
  try {
    await sequelize.query('TRUNCATE TABLE "Prerequisites" CASCADE');
    await sequelize.query('TRUNCATE TABLE "Courses" CASCADE');
    console.log('Tables cleared successfully');
  } catch (err) {
    console.error('Error clearing tables:', err);
  } finally {
    await sequelize.close();
  }
}

clearTables();
