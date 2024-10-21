const express = require ('express');
const {registerUser,loginUser} = require('authController');
const router = express.Router();

//configure routes


//user registration
router.post('./register', registerUser);


//user login
router.post('./login', loginUser);

module.exports = router;