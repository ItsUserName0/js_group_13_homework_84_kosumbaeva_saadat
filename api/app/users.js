const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.find();
    return res.send(users);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.username) {
      return res.status(400).send({error: 'Username is required!'});
    }
    const userData = {
      username: req.body.username,
    };
    const user = new User(userData);
    await user.save();

    return res.send({message: 'Created user', id: user._id});
  } catch (e) {
    next(e);
  }
});

module.exports = router;