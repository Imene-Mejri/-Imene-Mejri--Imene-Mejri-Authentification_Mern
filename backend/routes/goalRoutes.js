const express = require('express');
const router = express.Router();
const {
  getGoals,
  putGoals,
  postGoals,
  deleteGoals,
} = require('../controlers/goalControler');

const {protect} =require('../middleware/authMiddleware')

//get and post request
router.route('/').get(protect, getGoals).post(protect,postGoals);

//update and delete  request
router.route('/:id').put(protect,putGoals).delete(protect,deleteGoals);

module.exports = router;
