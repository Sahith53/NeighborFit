const User = require('../models/User');

/**
 * UserController - Handles user profile management operations
 * Provides CRUD operations for user profiles with proper authorization
 * 
 * Key Features:
 * - Get user profile by ID
 * - Update user profile with validation
 * - Delete user account with safety checks
 * - Authorization checks (users can only modify their own profiles)
 */
class UserController {
    constructor() {
        this.userModel = new User();
    }

    /**
     * Get user profile by ID
     * GET /api/users/:id
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const requestingUserId = req.userId; // From auth middleware

            // Find the user
            const user = await this.userModel.findById(id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    timestamp: new Date().toISOString()
                });
            }

            // Check if user is active
            if (!user.is_active) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    timestamp: new Date().toISOString()
                });
            }

            // Authorization: Users can view their own profile or any public profile
            // For now, we'll allow viewing any active user profile
            const sanitizedUser = this.userModel.sanitizeUser(user);

            res.status(200).json({
                success: true,
                data: { user: sanitizedUser },
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Get user by ID error:', error);

            res.status(500).json({
                success: false,
                message: 'Failed to retrieve user profile',
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Update user profile
     * PUT /api/users/:id
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */

    async updateUser(req, res) {
        try {
            console.log('=== UPDATE USER DEBUG ===');
            console.log('User ID from params:', req.params.id);
            console.log('User ID from auth:', req.userId);
            console.log('Request body:', req.body);
            
            const { id } = req.params;
            const requestingUserId = req.userId;
            const updateData = req.body;
            
            // ... rest of method
        } catch (error) {
            console.error('=== UPDATE USER ERROR ===');
            console.error('Error details:', error);
            console.error('Error message:', error.message);
            console.error('Error stack:', error.stack);
            
            // ... rest of error handling
        }
    }           
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const requestingUserId = req.userId; // From auth middleware
            const updateData = req.body;

            // Authorization: Users can only update their own profiles
            if (id !== requestingUserId) {
                return res.status(403).json({
                    success: false,
                    message: 'You can only update your own profile',
                    timestamp: new Date().toISOString()
                });
            }

            // Check if user exists
            const existingUser = await this.userModel.findById(id);
            
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    timestamp: new Date().toISOString()
                });
            }

            // Validate and sanitize update data
            const allowedFields = ['first_name', 'last_name', 'age', 'bio', 'profile_image'];
            const sanitizedData = {};

            Object.keys(updateData).forEach(key => {
                if (allowedFields.includes(key) && updateData[key] !== undefined) {
                    sanitizedData[key] = updateData[key];
                }
            });

            // Validate age if provided
            if (sanitizedData.age !== undefined) {
                const age = parseInt(sanitizedData.age);
                if (isNaN(age) || age < 18 || age > 120) {
                    return res.status(400).json({
                        success: false,
                        message: 'Age must be a number between 18 and 120',
                        timestamp: new Date().toISOString()
                    });
                }
                sanitizedData.age = age;
            }

            // Validate name fields if provided
            if (sanitizedData.first_name && sanitizedData.first_name.trim().length < 1) {
                return res.status(400).json({
                    success: false,
                    message: 'First name cannot be empty',
                    timestamp: new Date().toISOString()
                });
            }

            if (sanitizedData.last_name && sanitizedData.last_name.trim().length < 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Last name cannot be empty',
                    timestamp: new Date().toISOString()
                });
            }

            // Update user profile
            const updatedUser = await this.userModel.updateProfile(id, sanitizedData);

            res.status(200).json({
                success: true,
                message: 'Profile updated successfully',
                data: { user: updatedUser },
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Update user error:', error);

            res.status(500).json({
                success: false,
                message: 'Failed to update user profile',
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Delete user account
     * DELETE /api/users/:id
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const requestingUserId = req.userId; // From auth middleware

            // Authorization: Users can only delete their own accounts
            if (id !== requestingUserId) {
                return res.status(403).json({
                    success: false,
                    message: 'You can only delete your own account',
                    timestamp: new Date().toISOString()
                });
            }

            // Check if user exists
            const existingUser = await this.userModel.findById(id);
            if (!existingUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    timestamp: new Date().toISOString()
                });
            }

            // Soft delete: Deactivate account instead of hard delete
            // This preserves data integrity and allows for account recovery
            const updatedUser = await this.userModel.update(id, { 
                is_active: false,
                email: `deleted_${Date.now()}_${existingUser.email}` // Prevent email conflicts
            });

            res.status(200).json({
                success: true,
                message: 'Account deleted successfully',
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Delete user error:', error);

            res.status(500).json({
                success: false,
                message: 'Failed to delete user account',
                timestamp: new Date().toISOString()
            });
        }
    }

    /**
     * Change user password
     * PUT /api/users/:id/password
     * @param {object} req - Express request object
     * @param {object} res - Express response object
     */
    async changePassword(req, res) {
        try {
            const { id } = req.params;
            const requestingUserId = req.userId; // From auth middleware
            const { currentPassword, newPassword } = req.body;

            // Authorization: Users can only change their own password
            if (id !== requestingUserId) {
                return res.status(403).json({
                    success: false,
                    message: 'You can only change your own password',
                    timestamp: new Date().toISOString()
                });
            }

            // Validate required fields
            if (!currentPassword || !newPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Current password and new password are required',
                    timestamp: new Date().toISOString()
                });
            }

            // Validate new password strength
            if (newPassword.length < 8) {
                return res.status(400).json({
                    success: false,
                    message: 'New password must be at least 8 characters long',
                    timestamp: new Date().toISOString()
                });
            }

            // Change password using User model method
            await this.userModel.changePassword(id, currentPassword, newPassword);

            res.status(200).json({
                success: true,
                message: 'Password changed successfully',
                timestamp: new Date().toISOString()
            });

        } catch (error) {
            console.error('Change password error:', error);

            // Handle specific error messages
            if (error.message.includes('Current password is incorrect')) {
                return res.status(400).json({
                    success: false,
                    message: 'Current password is incorrect',
                    timestamp: new Date().toISOString()
                });
            }

            if (error.message.includes('User not found')) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                    timestamp: new Date().toISOString()
                });
            }

            res.status(500).json({
                success: false,
                message: 'Failed to change password',
                timestamp: new Date().toISOString()
            });
        }
    }
}

module.exports = UserController;