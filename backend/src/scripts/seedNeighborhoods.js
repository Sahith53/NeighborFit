/**
 * Script to seed the database with sample neighborhood data
 * Run this to populate your database for testing
 */

const Neighborhood = require('../models/Neighborhood');
const sampleNeighborhoods = require('../data/sampleNeighborhoods');

async function seedNeighborhoods() {
    console.log('🌱 Starting neighborhood data seeding...');
    
    try {
        const neighborhood = new Neighborhood();
        let successCount = 0;
        let errorCount = 0;

        for (const neighborhoodData of sampleNeighborhoods) {
            try {
                const created = await neighborhood.createNeighborhood(neighborhoodData);
                console.log(`✅ Created: ${created.name}, ${created.city}, ${created.state}`);
                successCount++;
            } catch (error) {
                console.error(`❌ Failed to create ${neighborhoodData.name}: ${error.message}`);
                errorCount++;
            }
        }

        console.log('\n📊 Seeding Results:');
        console.log(`✅ Successfully created: ${successCount} neighborhoods`);
        console.log(`❌ Errors: ${errorCount}`);
        
        if (successCount > 0) {
            console.log('\n🎉 Sample neighborhoods are ready for matching algorithm testing!');
        }
        
    } catch (error) {
        console.error('💥 Seeding failed:', error);
    }
}

// Run the seeding if this file is executed directly
if (require.main === module) {
    seedNeighborhoods();
}

module.exports = seedNeighborhoods;