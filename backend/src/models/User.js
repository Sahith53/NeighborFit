const BaseModel = require('./BaseModel');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/**
 * User Model - Handles all user-related database operations
 * Extends BaseModel to inherit common CRUD operations
 * 
 * Additional features:
 * - Password hashing for security
 * - Email validation
 * - User-specific query methods
 */
class User extends BaseModel {
    constructor() {
        super('users'); // Tell parent class which table to use
    }

    /**
     * Create a new user with hashed password
     * @param {object} userData - User registration data
     * @returns {Promise<object>} Created user (without password)
     */
    async createUser(userData) {
        // Validate required fields
        this.validateUserData(userData);

        // Check if email already exists
        const existingUser = await this.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email already registered');
        }

        // Hash password for security
        const hashedPassword = await this.hashPassword(userData.password);

        // Prepare user data
        const userToCreate = {
            id: uuidv4(), // Generate unique ID
            email: userData.email.toLowerCase(),
            password: hashedPassword,
            first_name: userData.firstName,
            last_name: userData.lastName,
            age: userData.age || null,
            bio: userData.bio || null,
            profile_image: userData.profileImage || null,
            is_active: true,
            email_verified: false
        };

        // Create user using parent class method
        const createdUser = await this.create(userToCreate);

        // Return user without password for security
        return this.sanitizeUser(createdUser);
    }

    /**
     * Find user by email
     * @param {string} email - User email
     * @returns {Promise<object|null>} User record or null
     */
    async findByEmail(email) {
        const users = await this.findWhere({ email: email.toLowerCase() });
        return users.length > 0 ? users[0] : null;
    }

    /**
     * Authenticate user login
     * @param {string} email - User email
     * @param {string} password - Plain text password
     * @returns {Promise<object|null>} User record (without password) or null
     */
    async authenticate(email, password) {
        const user = await this.findByEmail(email);
        
        if (!user) {
            return null; // User not found
        }

        // Compare password with hashed version
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return null; // Invalid password
        }

        // Return user without password
        return this.sanitizeUser(user);
    }

    /**
     * Update user profile
     * @param {string} userId - User ID
     * @param {object} updateData - Data to update
     * @returns {Promise<object>} Updated user record
     */
    async updateProfile(userId, updateData) {
        // Remove sensitive fields that shouldn't be updated this way
        const { password, email, id, created_at, ...safeData } = updateData;

        const updatedUser = await this.update(userId, safeData);
        return this.sanitizeUser(updatedUser);
    }

    /**
     * Change user password
     * @param {string} userId - User ID
     * @param {string} currentPassword - Current password
     * @param {string} newPassword - New password
     * @returns {Promise<boolean>} Success status
     */
    async changePassword(userId, currentPassword, newPassword) {
        const user = await this.findById(userId);
        
        if (!user) {
            throw new Error('User not found');
        }

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isValidPassword) {
            throw new Error('Current password is incorrect');
        }

        // Hash new password
        const hashedNewPassword = await this.hashPassword(newPassword);

        // Update password
        await this.update(userId, { password: hashedNewPassword });
        return true;
    }

    /**
     * Hash password using bcrypt
     * @param {string} password - Plain text password
     * @returns {Promise<string>} Hashed password
     */
    async hashPassword(password) {
        const saltRounds = 12; // Higher number = more secure but slower
        return await bcrypt.hash(password, saltRounds);
    }

    /**
     * Remove sensitive data from user object
     * @param {object} user - User record
     * @returns {object} User record without sensitive data
     */
    sanitizeUser(user) {
        if (!user) return null;
        
        const { password, ...sanitizedUser } = user;
        return sanitizedUser;
    }

    /**
     * Validate user registration data
     * @param {object} userData - User data to validate
     * @throws {Error} If validation fails
     */
    validateUserData(userData) {
        if (!userData.email) {
            throw new Error('Email is required');
        }

        if (!userData.password) {
            throw new Error('Password is required');
        }

        if (userData.password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }

        if (!userData.firstName || !userData.lastName) {
            throw new Error('First name and last name are required');
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userData.email)) {
            throw new Error('Invalid email format');
        }
    }

    /**
     * Prepare user data for database storage
     * @param {object} data - Raw user data
     * @returns {object} Prepared data
     */
    prepareForSave(data) {
        // Call parent method to add timestamps
        const prepared = super.prepareForSave(data);
        
        // Ensure email is lowercase
        if (prepared.email) {
            prepared.email = prepared.email.toLowerCase();
        }
        
        return prepared;
    }
}

module.exports = User;