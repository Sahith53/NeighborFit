const DatabaseService = require('../services/DatabaseService');

/**
 * BaseModel - Parent class for all data models
 * Provides common database operations that all models need
 * 
 * Why inheritance?
 * - Avoids code duplication
 * - Ensures consistent behavior across all models
 * - Easy to add new features to all models at once
 */
class BaseModel {
    constructor(tableName) {
        this.tableName = tableName;
        this.db = new DatabaseService();
    }

    /**
     * Find all records in the table
     * @param {object} options - Query options (limit, order, where)
     * @returns {Promise<Array>} Array of records
     */
    async findAll(options = {}) {
        const result = await this.db.executeQuery(this.tableName, 'select', options);
        return result.data || [];
    }

    /**
     * Find a single record by ID
     * @param {string} id - Record ID
     * @returns {Promise<object|null>} Single record or null
     */
    async findById(id) {
        const result = await this.db.executeQuery(this.tableName, 'select', {
            where: { id },
            limit: 1
        });
        return result.data && result.data.length > 0 ? result.data[0] : null;
    }

    /**
     * Find records matching specific conditions
     * @param {object} conditions - Where conditions
     * @param {object} options - Additional query options
     * @returns {Promise<Array>} Array of matching records
     */
    async findWhere(conditions, options = {}) {
        const result = await this.db.executeQuery(this.tableName, 'select', {
            where: conditions,
            ...options
        });
        return result.data || [];
    }

    /**
     * Create a new record
     * @param {object} data - Record data
     * @returns {Promise<object>} Created record
     */
    async create(data) {
        const result = await this.db.executeQuery(this.tableName, 'insert', {
            data: this.prepareForSave(data)
        });
        
        if (!result.success) {
            throw new Error(`Failed to create ${this.tableName}: ${result.error}`);
        }
        
        return result.data[0];
    }

    /**
     * Update an existing record
     * @param {string} id - Record ID
     * @param {object} data - Updated data
     * @returns {Promise<object>} Updated record
     */
    async update(id, data) {
        const result = await this.db.executeQuery(this.tableName, 'update', {
            where: { id },
            data: this.prepareForSave(data)
        });
        
        if (!result.success) {
            throw new Error(`Failed to update ${this.tableName}: ${result.error}`);
        }
        
        return result.data[0];
    }

    /**
     * Delete a record
     * @param {string} id - Record ID
     * @returns {Promise<boolean>} Success status
     */
    async delete(id) {
        const result = await this.db.executeQuery(this.tableName, 'delete', {
            where: { id }
        });
        
        return result.success;
    }

    /**
     * Prepare data for saving (override in child classes)
     * @param {object} data - Raw data
     * @returns {object} Prepared data
     */
    prepareForSave(data) {
        // Add timestamps
        const now = new Date().toISOString();
        
        if (!data.created_at) {
            data.created_at = now;
        }
        data.updated_at = now;
        
        return data;
    }
}

module.exports = BaseModel;