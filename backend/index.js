const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const models = require('./models');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Define routes here
app.get('/', (req, res) => {
  res.send('Class Scheduler API');
});

// Routes for managing classes, sections, prerequisites, corequisites
app.get('/classes', async (req, res) => {
  const classes = await models.Class.findAll({
    include: ['Prerequisites', 'Corequisites', 'Sections'],
  });
  res.json(classes);
});

app.post('/classes', async (req, res) => {
  const newClass = await models.Class.create(req.body);
  res.json(newClass);
});

app.get('/classes/:id', async (req, res) => {
  const classDetails = await models.Class.findByPk(req.params.id, {
    include: ['Prerequisites', 'Corequisites', 'Sections'],
  });
  res.json(classDetails);
});

// Sections
app.post('/classes/:classId/sections', async (req, res) => {
  const classInstance = await models.Class.findByPk(req.params.classId);
  if (classInstance) {
    const newSection = await classInstance.createSection(req.body);
    res.json(newSection);
  } else {
    res.status(404).send('Class not found');
  }
});

// Start the server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
