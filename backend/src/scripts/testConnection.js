/**
 * Test script to verify database connection and table structure
 */

const DatabaseService = require('../services/DatabaseService');

async function testConnection() {
    console.log('🔍 Testing database connection...');
    
    try {
        const db = new DatabaseService();
        
        // Test basic connection
        console.log('1. Testing basic connection...');
        const connected = await db.testConnection();
        console.log(`Connection status: ${connected ? '✅ Connected' : '❌ Failed'}`);
        
        // Test if neighborhoods table exists
        console.log('\n2. Testing neighborhoods table...');
        const { data, error } = await db.getClient()
            .from('neighborhoods')
            .select('count', { count: 'exact' })
            .limit(1);
            
        if (error) {
            console.error('❌ Table access error:', error);
            console.log('\n💡 This usually means:');
            console.log('   - The neighborhoods table doesn\'t exist');
            console.log('   - You need to run the SQL schema in Supabase');
            console.log('   - There\'s a permissions issue');
        } else {
            console.log('✅ Neighborhoods table accessible');
            console.log(`   Current row count: ${data?.[0]?.count || 0}`);
        }
        
        // Test simple insert (with minimal data)
        console.log('\n3. Testing simple insert...');
        const testData = {
            name: 'Test Neighborhood',
            city: 'Test City',
            state: 'Test State',
            safety_score: 5,
            cost_of_living_score: 5,
            walkability_score: 5,
            public_transport_score: 5,
            school_quality_score: 5,
            nightlife_score: 5,
            family_friendly_score: 5,
            diversity_score: 5,
            green_space_score: 5,
            is_active: true
        };
        
        const insertResult = await db.getClient()
            .from('neighborhoods')
            .insert(testData)
            .select();
            
        if (insertResult.error) {
            console.error('❌ Insert test failed:', insertResult.error);
        } else {
            console.log('✅ Insert test successful');
            
            // Clean up test data
            if (insertResult.data && insertResult.data[0]) {
                await db.getClient()
                    .from('neighborhoods')
                    .delete()
                    .eq('id', insertResult.data[0].id);
                console.log('🧹 Test data cleaned up');
            }
        }
        
    } catch (error) {
        console.error('💥 Test failed:', error);
    }
}

// Run the test
testConnection();