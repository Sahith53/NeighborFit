const express = require('express');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * User Routes
 * Defines all user profile management API endpoints
 * All routes require authentication
 * 
 * Routes:
 * GET /api/users/:id - Get user profile by ID
 * PUT /api/users/:id - Update user profile
 * DELETE /api/users/:id - Delete user account (soft delete)
 * PUT /api/users/:id/password - Change user password
 */

const router = express.Router();
const userController = new UserController();

// Bind controller methods to preserve 'this' context
const getUserById = userController.getUserById.bind(userController);
const updateUser = userController.updateUser.bind(userController);
const deleteUser = userController.deleteUser.bind(userController);
const changePassword = userController.changePassword.bind(userController);

// All user routes require authentication
router.use(authMiddleware);

// User profile CRUD routes
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Password management
router.put('/users/:id/password', changePassword);

module.exports = router;