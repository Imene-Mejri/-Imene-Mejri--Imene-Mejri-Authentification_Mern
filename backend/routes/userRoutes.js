const express = require('express');
const router = express.Router();
const {registerUser,loginrUser,getME}= require('../controlers/userController')


const {protect} = require('../middleware/authMiddleware')
router.post('/',registerUser)
router.post('/login',loginrUser)
router.get('/me',protect,getME)

module.exports = router 