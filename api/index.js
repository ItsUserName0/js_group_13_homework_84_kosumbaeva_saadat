const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const users = require('./app/users');
const tasks = require('./app/tasks');
const app = express();

const port = 8000;

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use('/users', users);
app.use('/tasks', tasks);

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch(e => console.error(e));

