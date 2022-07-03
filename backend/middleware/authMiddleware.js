const jwt = require('jsonwebtoken')
const asyncHandler=require('express-async-handler')
const User =require('../models/userModel')

// for the protect route 
const protect =asyncHandler(async (req,res,next)=>{ 
let token 
if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
try {
    //Get token from header 
    token =req.headers.authorization.split(' ')[1]
//verify the token 
const decoded =jwt.verify(token,process.env.JWT_SECRET)

//Get user from the token 
req.user =await User.findById(decoded.id).select('-password')
next()
} catch (error) {
    console.log(error)
    res.status(401)
    throw new Error('Not autrhorized ')
}
}

if (!token){
    res.status(401)
    throw new Error('not authaurized , no token ')
}
})
module.exports= {protect}