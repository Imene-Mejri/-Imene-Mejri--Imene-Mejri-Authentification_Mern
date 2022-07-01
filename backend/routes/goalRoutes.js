const express = require('express');
const router = express.Router();
const {
  getGoals,
  putGoals,
  postGoals,
  deleteGoals,
} = require('../controlers/goalControler');

//get and post request
router.route('/').get(getGoals).post(postGoals);

//update and delete  request
router.route('/:id').put(putGoals).delete(deleteGoals);

module.exports = router;
