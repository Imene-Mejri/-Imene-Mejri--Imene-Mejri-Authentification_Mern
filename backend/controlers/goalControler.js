const asyncHandler = require('express-async-handler')
const Goal=require('../models/goalModel')

//@desc Get goals
//@route GET/api/goals
//@access Private

const getGoals = asyncHandler(async(req, res) => {
  const goals =await Goal.find()
    res.status(200).json(goals);
  }) 
//@desc post goals
//@route POST/api/goals
//@access Private
const postGoals = asyncHandler ( async(req, res) => {
    if (!req.body.text){
        res.status(400)
        throw new Error('Please add a tex field ')
    }
    const goal = await  Goal.create({
      text:req.body.text
    })
  res.status(200).json(goal);
})

//@desc updategoals
//@route PUT/api/goals/:id
//@access Private
const putGoals =   asyncHandler( async(req, res) => {
  //check if the goal is exist on the database or note
  const goal =await Goal.findById(req.params.id)
  if(!goal){
    res.status(400)
    throw new  Error('goal not found ')
  }
  const updatedGoal =await Goal.findByIdAndUpdate(req.params.id, req.body,{
    new:true
  })
    res.status(200).json(updatedGoal);
  })
//@desc DELETE goals
//@route GET/api/goals/:id
//@access Private
const deleteGoals = asyncHandler( async (req, res) => {
  //check if the goal is exist on the database or note
  const goal =await Goal.findById(req.params.id)
  if(!goal){
    res.status(400)
    throw new  Error('goal not found ')
  }
   await Goal.remove()
    res.status(200).json({msg:'the goal dleted is',id:req.params.id});
  })
    
 
module.exports = {
  getGoals,
  putGoals,
  postGoals,
  deleteGoals
};
