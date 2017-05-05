const express = require('express');

const router = express.Router();

// router.use('/modelName', require('./modelName'))

// send back 404s if they hit unknown api routes

router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
