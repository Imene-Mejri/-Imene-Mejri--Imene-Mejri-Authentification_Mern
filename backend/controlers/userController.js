const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

//@desc create user
//@route POST/api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields ');
  }
  //check if the user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User is exists try with onother email please');
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create a user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  //chech the user is created
  if (user) {
    res
      .status(201)
      .json({
        message: 'the user is created successfully',
        _id: user.id,
        name: user.name,
        email: user.email,
        token:generateToken(user._id)
       
      });
  } else {
    res.status(400);
    throw new Error('invalide user data ');
  }
});

//@desc Authentificate a  user
//@route POST/api/users/login
//@access Public
const loginrUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body
    const user =await User.findOne({email})

    //check for user email
    if(user && (await bcrypt.compare(password , user.password))){
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)

        })}
        else {
            res.status(400);
            throw new Error('invalid credentials ')
        }
    
 
})

//@desc get user data
//@route GET/api/users/me
//@access pRivate
const getME = asyncHandler(async (req, res) => {
  res.json({ message: 'user data display' });
});

// Generate JWT 
const generateToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'30d'})
}
module.exports = {
  registerUser,
  loginrUser,
  getME,
};
