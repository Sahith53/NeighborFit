const AuthController = require('../controllers/AuthController');

/**
 * Authentication Middleware
 * Protects routes by verifying JWT tokens
 * 
 * Usage: Apply to any route that requires authentication
 * Example: router.get('/protected', authMiddleware, controllerMethod);
 */

const authController = new AuthController();

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Access token required',
                timestamp: new Date().toISOString()
            });
        }

        // Extract token (format: "Bearer <token>")
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Invalid token format. Use: Bearer <token>',
                timestamp: new Date().toISOString()
            });
        }

        // Verify token
        const decoded = authController.verifyToken(token);

        // Add user ID to request object for use in controllers
        req.userId = decoded.userId;
        req.tokenType = decoded.type;

        // Continue to next middleware/controller
        next();

    } catch (error) {
        console.error('Auth middleware error:', error);

        // Token verification failed
        if (error.message === 'Invalid token') {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
                timestamp: new Date().toISOString()
            });
        }

        // Generic error
        res.status(500).json({
            success: false,
            message: 'Authentication failed',
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = authMiddleware;