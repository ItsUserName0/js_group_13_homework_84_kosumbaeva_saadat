const mongoose = require('mongoose');
const config =  require('./config');
const Task = require('./models/Task');
const User = require('./models/User');

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [John, Jane, Isaac] = await User.create(
    {username: 'John'},
    {username: 'Jane'},
    {username: 'Isaac'},
  );

  await Task.create(
    {
      user: null,
      title: 'Create a list of tasks',
      status: 'new',
    },
    {
      user: Jane,
      title: 'Buy groceries',
      status: 'in_progress',
    },
    {
      user: John,
      title: 'Go to car repairs',
      status: 'completed',
    },
    {
      user: Isaac,
      title: 'Do homework',
      status: 'completed',
    }
  )

  await mongoose.connection.close();
}

run().catch(e => console.error(e));