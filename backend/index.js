const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const courseRoutes = require('./routes/course');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/courses', courseRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
