const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * AuthController - Handles authentication-related API endpoints
 * Follows OOP principles and provides secure user registration/login
 * 
 * Key Features:
 * - User registration with validation
 * - User login with JWT token generation  
 * - Password security and error handling
 * - Input validation and sanitization
 */
class AuthController {
    constructor() {
        this.userModel = new User();
    }

    /**
     * Register a new user
     * POST /api/users/register
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async register(req, res) {
        try {
            const { email, password, firstName, lastName, age, bio } = req.body;

            // Validate required fields
            if (!email || !password || !firstName || !lastName) {
                return res.status(400).json({
                    success: false,
                    message: 'Email, password, first name, and last name are required',
                    timestamp: new Date().toISOString()
                });
            }

            // Create user using User model
            const userData = {
                email,
                password,
                firstName,
                lastName,
                age: age || null,
                bio: bio || null
            };

            const newUser = await this.userModel.createUser(userData);

            // Generate JWT token for immediate login
            const token = this.generateToken(newUser.id);

            // Success response
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    user: newUser,
                    token,
                    expiresIn: '7d'
                },
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Registration error:', error);

            // Handle specific error types
            if (error.message.includes('Email already registered')) {
                return res.status(409).json({
                    success: false,
                    message: 'Email already registered',
                    timestamp: new Date().toISOString()
                });
            }

            if (error.message.includes('validation')) {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                    timestamp: new Date().toISOString()
                });
            }

            // Generic server error
            res.status(500).json({
                success: false,
                message: 'Registration failed. Please try again.',
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Login user
     * POST /api/users/login
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validate required fields
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Email and password are required',
                    timestamp: new Date().toISOString()
                });
            }

            // Authenticate user
            const user = await this.userModel.authenticate(email, password);

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid email or password',
                    timestamp: new Date().toISOString()
                });
            }

            // Check if user account is active
            if (!user.is_active) {
                return res.status(403).json({
                    success: false,
                    message: 'Account is deactivated. Please contact support.',
                    timestamp: new Date().toISOString()
                });
            }

            // Generate JWT token
            const token = this.generateToken(user.id);

            // Success response
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    user,
                    token,
                    expiresIn: '7d'
                },
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Login error:', error);

            res.status(500).json({
                success: false,
                message: 'Login failed. Please try again.',
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Get current user profile (requires authentication)
     * GET /api/users/me
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async getCurrentUser(req, res) {
        try {
            // User ID comes from JWT middleware (req.userId)
            const user = await this.userModel.findById(req.userId);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    timestamp: new Date().toISOString()
                });
            }

            // Remove password from response (extra security)
            const safeUser = this.userModel.sanitizeUser(user);

            res.status(200).json({
                success: true,
                data: { user: safeUser },
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Get current user error:', error);

            res.status(500).json({
                success: false,
                message: 'Failed to retrieve user profile',
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Refresh JWT token
     * POST /api/auth/refresh
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async refreshToken(req, res) {
        try {
            // User ID comes from JWT middleware
            const userId = req.userId;

            // Verify user still exists and is active
            const user = await this.userModel.findById(userId);

            if (!user || !user.is_active) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token or user not found',
                    timestamp: new Date().toISOString()
                });
            }

            // Generate new token
            const newToken = this.generateToken(userId);

            res.status(200).json({
                success: true,
                message: 'Token refreshed successfully',
                data: {
                    token: newToken,
                    expiresIn: '7d'
                },
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Token refresh error:', error);

            res.status(500).json({
                success: false,
                message: 'Failed to refresh token',
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Generate JWT token
     * @param {string} userId - User ID
     * @returns {string} JWT token
     */
    generateToken(userId) {
        return jwt.sign(
            { 
                userId: userId,
                type: 'access'
            },
            process.env.JWT_SECRET,
            { 
                expiresIn: process.env.JWT_EXPIRE || '7d',
                issuer: 'neighborfit-api',
                audience: 'neighborfit-app'
            }
        );
    }

    /**
     * Verify JWT token (used by middleware)
     * @param {string} token - JWT token
     * @returns {object} Decoded token payload
     */
    verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET, {
                issuer: 'neighborfit-api',
                audience: 'neighborfit-app'
            });
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}

module.exports = AuthController;