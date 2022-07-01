const asyncHandler = require('express-async-handler')


//@desc Get goals
//@route GET/api/goals
//@access Private

const getGoals = asyncHandler(async(req, res) => {
    res.status(200).json({ msg: 'Gettt goals' });
  }) 
//@desc post goals
//@route POST/api/goals
//@access Private
const postGoals = asyncHandler ( async(req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a tex field ')

    
    }
  res.status(200).json({ msg: 'posttt goals' });
})
//@desc Put goals
//@route PUT/api/goals/:id
//@access Private
const putGoals =   asyncHandler( async(req, res) => {
    res.status(200).json({ msg: 'Puttt  goals' });
  })
//@desc DELETE goals
//@route GET/api/goals/:id
//@access Private
const deleteGoals = asyncHandler( async (req, res) => {
    res.status(200).json({ msg: 'DELETE goals' });
  }) 
module.exports = {
  getGoals,
  putGoals,
  postGoals,
  deleteGoals
};
