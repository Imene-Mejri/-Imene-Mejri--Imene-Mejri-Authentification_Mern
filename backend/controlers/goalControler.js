const asyncHandler = require('express-async-handler')
const Goal=require('../models/goalModel')
const User =require('../models/userModel')

//@desc Get goals
//@route GET/api/goals
//@access Private

const getGoals = asyncHandler(async(req, res) => {
  // for find the users goals
  const goals =await Goal.find({user:req.user.id})
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
      text:req.body.text,
      user:req.user.id
    })
  res.status(200).json(goal);
})


//@desc updategoals
//@route PUT/api/goals/:id
//@access Private

const putGoals =   asyncHandler( async(req, res) => {
  //check if the goal is exist on the database or note
  const goal = await Goal.findById(req.params.id)
  if(!goal){
    res.status(400)
    throw new  Error('goal not found ')
  }
  //check th user find
const user = await User.findById(req.user.id)
if (!user){
  res.status(401)
  throw new Error('User not found ')
}
// make sure th logged in user matches the goal user 
if(goal.user.toString()!== user.id){
res.status(401)
throw new Error('user not autharized')
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


  //check for the user 
const user = await User.findById(req.user.id);
if (!user){
  res.status(401)
  throw new Error('User not found ')
}
// make sure th logged in user matches the goal user 
if (goal.user.toString()!== user.id){
res.status(401)
throw new Error('user not autharized')
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
