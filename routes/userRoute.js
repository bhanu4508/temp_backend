const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// POST /users/signup - User sign-up
router.post('/signup', userController.signup);

// // POST /users/login - User login
router.post('/login', userController.login);

// // GET /users/logout - User logout
// router.get('/users/logout', userController.logout);

// // GET /users/profile - Get user profile
// router.get('/users/profile', userController.getUserProfile);

// // PUT /users/profile - Update user profile
// router.put('/users/profile', userController.updateUserProfile);

// // DELETE /users/:id - Delete a user
// router.delete('/users/:id', userController.deleteUser);

module.exports = router;
