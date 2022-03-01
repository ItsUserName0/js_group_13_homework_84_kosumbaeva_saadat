const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const tasks = await Task.find().populate('user');
    return res.send(tasks);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({error: 'Title is required!'});
    }
    const taskData = {
      user: null,
      title: req.body.title,
      status: 'new',
    };
    if (req.body.user) {
      taskData.user = req.body.user;
    }
    const task = new Task(taskData);
    await task.save();

    return res.send({message: 'Created task', id: task._id});
  } catch (e) {
    next(e);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    let taskData;
    if (req.body.user === null) {
      taskData = {
        user: req.body.user,
      };
    } else if (req.body.user) {
      taskData = {
        user: req.body.user,
      }
    } else if (req.body.status) {
      const statuses = ['new', 'in_progress', 'completed'];
      if (!statuses.find(s => s === req.body.status)) {
        return res.status(400).send({error: `Status can take one of the values 'new', 'in_progress', 'completed'!`});
      }
      taskData = {
        status: req.body.status,
      };
    } else {
      return res.status(400).send({error: 'You can edit only the user or the status of the task!'});
    }

    const task = await Task.findByIdAndUpdate(req.params.id, taskData).populate('user');
    return res.send(task);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    return res.send({message: `Deleted task with id = ${req.params.id}`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;