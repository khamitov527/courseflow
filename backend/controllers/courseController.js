const { Course, Prerequisite } = require('../models');

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: {
        model: Course,
        as: 'Prerequisites',
        attributes: ['id', 'name', 'code']  
      },
      attributes: ['id', 'name', 'code', 'isElective'] 
    });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: {
        model: Course,
        as: 'Prerequisites',
        attributes: ['id', 'name', 'code']  
      },
      attributes: ['id', 'name', 'code', 'isElective']  
    });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
