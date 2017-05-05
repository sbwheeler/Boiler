const express = require('express');
const User = require('../db/models/User');

const router = express.Router();

// fetch logged-in user on our session, request made by client when they refresh
router.get('/me', (req, res, next) => {
  req.json(req.user);
});

// POST to login a user
router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((foundUser) => {
      // no user or incorrect password entered
      if (!foundUser) res.status(401).send('User not found.');
      else if (!foundUser.correctPassword(req.body.password)) res.status(401).send('Incorrect password.');

      // correct password, use passport's login method attached to the req object
      else {
        req.login((foundUser, err) => {
          if (err) next(err);
          else res.json(foundUser);
        });
      }
    });
});

// POST to sign a user up
router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then((createdUser) => {
      req.login((createdUser, err) => {
        if (err) next(err);
        else res.json(createdUser);
      });
    })
    .catch(next);
});

router.post('/logout', (req, res, next) => {
  // using passport's logout method attached to the req object
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
