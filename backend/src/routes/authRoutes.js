const express = require('express');
const AuthController = require('../controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * Authentication Routes
 * Defines all authentication-related API endpoints
 * 
 * Routes:
 * POST /api/users/register - User registration
 * POST /api/users/login - User login
 * GET /api/users/me - Get current user profile
 * POST /api/auth/refresh - Refresh JWT token
 */

const router = express.Router();
const authController = new AuthController();

// Bind controller methods to preserve 'this' context
const register = authController.register.bind(authController);
const login = authController.login.bind(authController);
const getCurrentUser = authController.getCurrentUser.bind(authController);
const refreshToken = authController.refreshToken.bind(authController);

// Public routes (no authentication required)
router.post('/users/register', register);
router.post('/users/login', login);

// Protected routes (authentication required)
router.get('/users/me', authMiddleware, getCurrentUser);
router.post('/auth/refresh', authMiddleware, refreshToken);

// Export router for use in main app
module.exports = router;