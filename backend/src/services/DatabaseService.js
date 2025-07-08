const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

/**
 * DatabaseService - Handles all database connections and operations
 * Uses Singleton pattern to ensure only one database connection
 * 
 * Why Singleton? 
 * - Prevents multiple database connections
 * - Provides single point of access to database
 * - More efficient resource management
 */
class DatabaseService {
    constructor() {
        if (DatabaseService.instance) {
            return DatabaseService.instance;
        }

        // Initialize Supabase client
        this.supabase = createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
        );

        // Store the instance
        DatabaseService.instance = this;
    }

    /**
     * Get the Supabase client instance
     * @returns {SupabaseClient} The Supabase client
     */
    getClient() {
        return this.supabase;
    }

    /**
     * Test database connection
     * @returns {Promise<boolean>} True if connection successful
     */
    async testConnection() {
        try {
            const { data, error } = await this.supabase
                .from('users') // Try to access users table
                .select('count', { count: 'exact' })
                .limit(1);

            if (error) {
                console.error('Database connection test failed:', error);
                return false;
            }

            console.log('✅ Database connection successful');
            return true;
        } catch (error) {
            console.error('Database connection error:', error);
            return false;
        }
    }

    /**
     * Execute a query with error handling
     * @param {string} table - Table name
     * @param {string} operation - Operation type (select, insert, update, delete)
     * @param {object} options - Query options
     * @returns {Promise<object>} Query result
     */
    async executeQuery(table, operation, options = {}) {
        try {
            let query = this.supabase.from(table);

            switch (operation) {
                case 'select':
                    query = query.select(options.select || '*');
                    if (options.where) query = query.match(options.where);
                    if (options.order) query = query.order(options.order.column, { ascending: options.order.ascending });
                    if (options.limit) query = query.limit(options.limit);
                    break;

                case 'insert':
                    query = query.insert(options.data).select();
                    break;

                case 'update':
                    query = query.update(options.data);
                    if (options.where) query = query.match(options.where);
                    query = query.select();
                    break;

                case 'delete':
                    query = query.delete();
                    if (options.where) query = query.match(options.where);
                    break;

                default:
                    throw new Error(`Unsupported operation: ${operation}`);
            }

            const { data, error } = await query;

            if (error) {
                throw new Error(`Database ${operation} error: ${error.message}`);
            }

            return { success: true, data, error: null };
        } catch (error) {
            console.error(`Database operation failed:`, error);
            return { success: false, data: null, error: error.message };
        }
    }
}

module.exports = DatabaseService;