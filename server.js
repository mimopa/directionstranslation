const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const directions = require('./routes/api/directions');
const translation = require('./routes/api/translation');
const speach = require('./routes/api/speach');

const app = express();

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.get('/', (req, res) => res.send('Hello World'));

// User Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/directions', directions);
app.use('/api/translation', translation);
app.use('/api/speach', speach);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
