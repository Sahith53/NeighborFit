const BaseModel = require('./BaseModel');
const { v4: uuidv4 } = require('uuid');

/**
 * Neighborhood Model - Handles all neighborhood-related database operations
 * Extends BaseModel to inherit common CRUD operations
 * 
 * Core Features:
 * - Lifestyle scoring system (foundation for matching algorithm)
 * - Geographic search capabilities
 * - Data validation for all lifestyle scores
 * - Search and filtering methods
 */
class Neighborhood extends BaseModel {
    constructor() {
        super('neighborhoods');
    }

    /**
     * Create a new neighborhood with validation
     * @param {object} neighborhoodData - Neighborhood data
     * @returns {Promise<object>} Created neighborhood
     */
    async createNeighborhood(neighborhoodData) {
        // Validate required fields and scores
        this.validateNeighborhoodData(neighborhoodData);

        // Prepare neighborhood data
        const neighborhoodToCreate = {
            id: uuidv4(),
            name: neighborhoodData.name,
            city: neighborhoodData.city,
            state: neighborhoodData.state,
            zip_code: neighborhoodData.zipCode || null,
            
            // Geographic data
            latitude: neighborhoodData.latitude || null,
            longitude: neighborhoodData.longitude || null,
            bounds_north: neighborhoodData.bounds?.north || null,
            bounds_south: neighborhoodData.bounds?.south || null,
            bounds_east: neighborhoodData.bounds?.east || null,
            bounds_west: neighborhoodData.bounds?.west || null,
            
            // Lifestyle scores (critical for matching algorithm)
            safety_score: neighborhoodData.safetyScore,
            cost_of_living_score: neighborhoodData.costOfLivingScore,
            walkability_score: neighborhoodData.walkabilityScore,
            public_transport_score: neighborhoodData.publicTransportScore,
            school_quality_score: neighborhoodData.schoolQualityScore,
            nightlife_score: neighborhoodData.nightlifeScore,
            family_friendly_score: neighborhoodData.familyFriendlyScore,
            diversity_score: neighborhoodData.diversityScore,
            green_space_score: neighborhoodData.greenSpaceScore,
            
            // Demographics
            population: neighborhoodData.population || null,
            median_age: neighborhoodData.medianAge || null,
            median_income: neighborhoodData.medianIncome || null,
            average_rent: neighborhoodData.averageRent || null,
            crime_rate: neighborhoodData.crimeRate || null,
            
            // Descriptive data
            description: neighborhoodData.description || null,
            key_features: neighborhoodData.keyFeatures || [],
            popular_amenities: neighborhoodData.popularAmenities || [],
            
            // Metadata
            data_source: neighborhoodData.dataSource || 'manual_entry',
            is_active: true
        };

        return await this.create(neighborhoodToCreate);
    }

    /**
     * Find neighborhoods by city and state
     * @param {string} city - City name
     * @param {string} state - State name
     * @param {object} options - Additional query options
     * @returns {Promise<Array>} Array of neighborhoods
     */
    async findByLocation(city, state, options = {}) {
        return await this.findWhere({
            city: city,
            state: state,
            is_active: true
        }, options);
    }

    /**
     * Search neighborhoods by text (name, description, features)
     * @param {string} searchTerm - Search term
     * @param {object} options - Additional options
     * @returns {Promise<Array>} Array of matching neighborhoods
     */
    async searchNeighborhoods(searchTerm, options = {}) {
        try {
            const { limit = 20, offset = 0 } = options;
            
            // Use PostgreSQL full-text search
            const result = await this.db.executeQuery('neighborhoods', 'select', {
                select: '*',
                where: `to_tsvector('english', name || ' ' || COALESCE(description, '')) @@ plainto_tsquery('english', '${searchTerm}')`,
                limit,
                offset
            });

            return result.data || [];
        } catch (error) {
            console.error('Search error:', error);
            // Fallback to simple text search
            return await this.findWhere({
                name: `%${searchTerm}%` // This would need to be implemented as ILIKE in the query
            }, options);
        }
    }

    /**
     * Find neighborhoods within geographic bounds
     * @param {object} bounds - Geographic boundaries
     * @param {object} options - Additional options
     * @returns {Promise<Array>} Array of neighborhoods in bounds
     */
    async findInBounds(bounds, options = {}) {
        const { north, south, east, west } = bounds;
        
        // This would require custom SQL for geographic queries
        // For now, we'll implement a simple bounding box filter
        try {
            const result = await this.db.getClient()
                .from('neighborhoods')
                .select('*')
                .gte('latitude', south)
                .lte('latitude', north)
                .gte('longitude', west)
                .lte('longitude', east)
                .eq('is_active', true)
                .limit(options.limit || 50);

            return result.data || [];
        } catch (error) {
            console.error('Geographic search error:', error);
            return [];
        }
    }

    /**
     * Filter neighborhoods by lifestyle criteria
     * This is a key method for the matching algorithm
     * @param {object} criteria - Filtering criteria
     * @returns {Promise<Array>} Array of filtered neighborhoods
     */
    async filterByLifestyle(criteria) {
        const {
            minSafety,
            maxCost,
            minWalkability,
            minTransport,
            minSchools,
            minNightlife,
            minFamilyFriendly,
            minDiversity,
            minGreenSpace,
            maxBudget,
            minPopulation,
            maxPopulation
        } = criteria;

        try {
            let query = this.db.getClient().from('neighborhoods').select('*');

            // Apply lifestyle score filters
            if (minSafety) query = query.gte('safety_score', minSafety);
            if (maxCost) query = query.lte('cost_of_living_score', maxCost);
            if (minWalkability) query = query.gte('walkability_score', minWalkability);
            if (minTransport) query = query.gte('public_transport_score', minTransport);
            if (minSchools) query = query.gte('school_quality_score', minSchools);
            if (minNightlife) query = query.gte('nightlife_score', minNightlife);
            if (minFamilyFriendly) query = query.gte('family_friendly_score', minFamilyFriendly);
            if (minDiversity) query = query.gte('diversity_score', minDiversity);
            if (minGreenSpace) query = query.gte('green_space_score', minGreenSpace);

            // Apply demographic filters
            if (maxBudget) query = query.lte('average_rent', maxBudget);
            if (minPopulation) query = query.gte('population', minPopulation);
            if (maxPopulation) query = query.lte('population', maxPopulation);

            // Only active neighborhoods
            query = query.eq('is_active', true);

            const { data, error } = await query;

            if (error) {
                throw new Error(`Filter error: ${error.message}`);
            }

            return data || [];
        } catch (error) {
            console.error('Lifestyle filtering error:', error);
            return [];
        }
    }

    /**
     * Get neighborhoods sorted by a specific lifestyle score
     * Useful for understanding data distribution
     * @param {string} scoreType - Type of score to sort by
     * @param {string} order - 'asc' or 'desc'
     * @param {number} limit - Number of results
     * @returns {Promise<Array>} Sorted neighborhoods
     */
    async getTopByScore(scoreType, order = 'desc', limit = 10) {
        const scoreColumn = this.getScoreColumn(scoreType);
        
        return await this.findAll({
            order: { column: scoreColumn, ascending: order === 'asc' },
            limit,
            where: { is_active: true }
        });
    }

    /**
     * Get statistics about neighborhood scores
     * Useful for algorithm calibration
     * @returns {Promise<object>} Score statistics
     */
    async getScoreStatistics() {
        try {
            const neighborhoods = await this.findAll({ where: { is_active: true } });
            
            if (neighborhoods.length === 0) {
                return null;
            }

            const scoreTypes = [
                'safety_score', 'cost_of_living_score', 'walkability_score',
                'public_transport_score', 'school_quality_score', 'nightlife_score',
                'family_friendly_score', 'diversity_score', 'green_space_score'
            ];

            const stats = {};

            scoreTypes.forEach(scoreType => {
                const scores = neighborhoods
                    .map(n => n[scoreType])
                    .filter(score => score !== null);

                if (scores.length > 0) {
                    stats[scoreType] = {
                        min: Math.min(...scores),
                        max: Math.max(...scores),
                        avg: scores.reduce((a, b) => a + b, 0) / scores.length,
                        count: scores.length
                    };
                }
            });

            return stats;
        } catch (error) {
            console.error('Statistics calculation error:', error);
            return null;
        }
    }

    /**
     * Update neighborhood lifestyle scores
     * @param {string} id - Neighborhood ID
     * @param {object} scores - New scores
     * @returns {Promise<object>} Updated neighborhood
     */
    async updateScores(id, scores) {
        const updateData = {};
        
        // Map camelCase to snake_case for database
        if (scores.safetyScore !== undefined) updateData.safety_score = scores.safetyScore;
        if (scores.costOfLivingScore !== undefined) updateData.cost_of_living_score = scores.costOfLivingScore;
        if (scores.walkabilityScore !== undefined) updateData.walkability_score = scores.walkabilityScore;
        if (scores.publicTransportScore !== undefined) updateData.public_transport_score = scores.publicTransportScore;
        if (scores.schoolQualityScore !== undefined) updateData.school_quality_score = scores.schoolQualityScore;
        if (scores.nightlifeScore !== undefined) updateData.nightlife_score = scores.nightlifeScore;
        if (scores.familyFriendlyScore !== undefined) updateData.family_friendly_score = scores.familyFriendlyScore;
        if (scores.diversityScore !== undefined) updateData.diversity_score = scores.diversityScore;
        if (scores.greenSpaceScore !== undefined) updateData.green_space_score = scores.greenSpaceScore;

        // Validate scores before updating
        this.validateScores(updateData);

        return await this.update(id, updateData);
    }

    /**
     * Validate neighborhood data
     * @param {object} data - Neighborhood data to validate
     * @throws {Error} If validation fails
     */
    validateNeighborhoodData(data) {
        if (!data.name) {
            throw new Error('Neighborhood name is required');
        }

        if (!data.city || !data.state) {
            throw new Error('City and state are required');
        }

        // Validate all lifestyle scores
        const requiredScores = [
            'safetyScore', 'costOfLivingScore', 'walkabilityScore',
            'publicTransportScore', 'schoolQualityScore', 'nightlifeScore',
            'familyFriendlyScore', 'diversityScore', 'greenSpaceScore'
        ];

        requiredScores.forEach(scoreKey => {
            const score = data[scoreKey];
            if (score === undefined || score === null) {
                throw new Error(`${scoreKey} is required`);
            }
            if (!Number.isInteger(score) || score < 1 || score > 10) {
                throw new Error(`${scoreKey} must be an integer between 1 and 10`);
            }
        });
    }

    /**
     * Validate individual scores
     * @param {object} scores - Score object to validate
     */
    validateScores(scores) {
        Object.entries(scores).forEach(([key, value]) => {
            if (key.endsWith('_score') && value !== null) {
                if (!Number.isInteger(value) || value < 1 || value > 10) {
                    throw new Error(`${key} must be an integer between 1 and 10`);
                }
            }
        });
    }

    /**
     * Get database column name for score type
     * @param {string} scoreType - Score type in camelCase
     * @returns {string} Database column name
     */
    getScoreColumn(scoreType) {
        const scoreMap = {
            'safety': 'safety_score',
            'cost': 'cost_of_living_score',
            'walkability': 'walkability_score',
            'transport': 'public_transport_score',
            'schools': 'school_quality_score',
            'nightlife': 'nightlife_score',
            'family': 'family_friendly_score',
            'diversity': 'diversity_score',
            'greenSpace': 'green_space_score'
        };

        return scoreMap[scoreType] || `${scoreType}_score`;
    }

    /**
     * Prepare neighborhood data for database storage
     * @param {object} data - Raw neighborhood data
     * @returns {object} Prepared data
     */
    prepareForSave(data) {
        const prepared = super.prepareForSave(data);
        
        // Ensure arrays are properly formatted for PostgreSQL
        if (prepared.key_features && !Array.isArray(prepared.key_features)) {
            prepared.key_features = [];
        }
        if (prepared.popular_amenities && !Array.isArray(prepared.popular_amenities)) {
            prepared.popular_amenities = [];
        }
        
        return prepared;
    }
}

module.exports = Neighborhood;