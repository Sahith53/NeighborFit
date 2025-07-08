/**
 * Sample Neighborhood Data for NeighborFit
 * This provides at least 10 neighborhoods with realistic lifestyle scores
 * for testing the matching algorithm
 */

const sampleNeighborhoods = [
    {
        name: "Downtown Tech District",
        city: "San Francisco",
        state: "California",
        zipCode: "94105",
        latitude: 37.7849,
        longitude: -122.4094,
        
        // Lifestyle scores (1-10 scale)
        safetyScore: 7,
        costOfLivingScore: 2, // Very expensive
        walkabilityScore: 9,
        publicTransportScore: 8,
        schoolQualityScore: 6,
        nightlifeScore: 8,
        familyFriendlyScore: 4,
        diversityScore: 9,
        greenSpaceScore: 5,
        
        population: 15000,
        medianAge: 28.5,
        medianIncome: 120000,
        averageRent: 4500,
        crimeRate: 8.2,
        
        description: "Vibrant tech hub with modern amenities, excellent public transport, and bustling nightlife. High cost of living but great for young professionals.",
        keyFeatures: ["Tech companies", "High-rise living", "Public transportation", "Restaurants"],
        popularAmenities: ["Coworking spaces", "Rooftop bars", "Food trucks", "Fitness centers"],
        dataSource: "sample_data"
    },
    
    {
        name: "Suburban Family Haven",
        city: "Plano",
        state: "Texas", 
        zipCode: "75023",
        latitude: 33.0198,
        longitude: -96.6989,
        
        safetyScore: 9,
        costOfLivingScore: 7, // Moderate cost
        walkabilityScore: 5,
        publicTransportScore: 4,
        schoolQualityScore: 10,
        nightlifeScore: 3,
        familyFriendlyScore: 10,
        diversityScore: 7,
        greenSpaceScore: 8,
        
        population: 45000,
        medianAge: 38.2,
        medianIncome: 85000,
        averageRent: 2200,
        crimeRate: 2.1,
        
        description: "Safe, family-oriented suburb with top-rated schools and plenty of parks. Perfect for families with children but limited nightlife and public transport.",
        keyFeatures: ["Top schools", "Family parks", "Safe streets", "Shopping centers"],
        popularAmenities: ["Playgrounds", "Community centers", "Youth sports", "Libraries"],
        dataSource: "sample_data"
    },
    
    {
        name: "Artsy Bohemian Quarter",
        city: "Portland",
        state: "Oregon",
        zipCode: "97202",
        latitude: 45.5051,
        longitude: -122.6750,
        
        safetyScore: 6,
        costOfLivingScore: 6,
        walkabilityScore: 8,
        publicTransportScore: 7,
        schoolQualityScore: 7,
        nightlifeScore: 7,
        familyFriendlyScore: 6,
        diversityScore: 8,
        greenSpaceScore: 9,
        
        population: 22000,
        medianAge: 32.1,
        medianIncome: 62000,
        averageRent: 1800,
        crimeRate: 6.5,
        
        description: "Creative neighborhood with galleries, indie cafes, and green spaces. Great for artists and young professionals who value culture and nature.",
        keyFeatures: ["Art galleries", "Independent shops", "Bike-friendly", "Food scene"],
        popularAmenities: ["Art studios", "Coffee shops", "Farmers markets", "Bike paths"],
        dataSource: "sample_data"
    },
    
    {
        name: "University District",
        city: "Madison",
        state: "Wisconsin",
        zipCode: "53706",
        latitude: 43.0731,
        longitude: -89.4012,
        
        safetyScore: 7,
        costOfLivingScore: 8, // Affordable
        walkabilityScore: 9,
        publicTransportScore: 6,
        schoolQualityScore: 8,
        nightlifeScore: 9,
        familyFriendlyScore: 5,
        diversityScore: 8,
        greenSpaceScore: 7,
        
        population: 18000,
        medianAge: 24.8,
        medianIncome: 35000,
        averageRent: 1200,
        crimeRate: 5.8,
        
        description: "Energetic college town with affordable living, great nightlife, and walkable streets. Perfect for students and young adults.",
        keyFeatures: ["University campus", "Student housing", "Sports venues", "Study cafes"],
        popularAmenities: ["Bars", "Pizza places", "Bookstores", "Recreation centers"],
        dataSource: "sample_data"
    },
    
    {
        name: "Historic Waterfront",
        city: "Charleston",
        state: "South Carolina",
        zipCode: "29401",
        latitude: 32.7767,
        longitude: -79.9311,
        
        safetyScore: 8,
        costOfLivingScore: 5,
        walkabilityScore: 7,
        publicTransportScore: 5,
        schoolQualityScore: 7,
        nightlifeScore: 6,
        familyFriendlyScore: 7,
        diversityScore: 6,
        greenSpaceScore: 8,
        
        population: 12000,
        medianAge: 35.5,
        medianIncome: 72000,
        averageRent: 2400,
        crimeRate: 4.2,
        
        description: "Charming historic district with cobblestone streets, waterfront views, and southern hospitality. Great for those who appreciate history and culture.",
        keyFeatures: ["Historic architecture", "Waterfront", "Carriage tours", "Fine dining"],
        popularAmenities: ["Museums", "Harbor walks", "Antique shops", "Jazz clubs"],
        dataSource: "sample_data"
    },
    
    {
        name: "Green Suburban Retreat",
        city: "Boulder",
        state: "Colorado",
        zipCode: "80302",
        latitude: 40.0150,
        longitude: -105.2705,
        
        safetyScore: 8,
        costOfLivingScore: 4,
        walkabilityScore: 6,
        publicTransportScore: 5,
        schoolQualityScore: 8,
        nightlifeScore: 5,
        familyFriendlyScore: 8,
        diversityScore: 7,
        greenSpaceScore: 10,
        
        population: 25000,
        medianAge: 34.2,
        medianIncome: 78000,
        averageRent: 2800,
        crimeRate: 3.1,
        
        description: "Outdoor enthusiast's paradise with mountain views, hiking trails, and eco-friendly living. Perfect for active families and nature lovers.",
        keyFeatures: ["Mountain access", "Hiking trails", "Bike paths", "Organic markets"],
        popularAmenities: ["Outdoor gear shops", "Yoga studios", "Health food stores", "Breweries"],
        dataSource: "sample_data"
    },
    
    {
        name: "Urban Professional Hub",
        city: "Chicago",
        state: "Illinois",
        zipCode: "60601",
        latitude: 41.8781,
        longitude: -87.6298,
        
        safetyScore: 6,
        costOfLivingScore: 6,
        walkabilityScore: 9,
        publicTransportScore: 9,
        schoolQualityScore: 7,
        nightlifeScore: 9,
        familyFriendlyScore: 5,
        diversityScore: 9,
        greenSpaceScore: 6,
        
        population: 35000,
        medianAge: 30.8,
        medianIncome: 95000,
        averageRent: 2600,
        crimeRate: 7.5,
        
        description: "Dynamic urban center with excellent public transit, diverse dining, and cultural attractions. Ideal for career-focused professionals.",
        keyFeatures: ["Business district", "Cultural venues", "Public transit", "High-rises"],
        popularAmenities: ["Museums", "Theaters", "Upscale dining", "Fitness clubs"],
        dataSource: "sample_data"
    },
    
    {
        name: "Coastal Retirement Community",
        city: "Sarasota",
        state: "Florida",
        zipCode: "34236",
        latitude: 27.2364,
        longitude: -82.5307,
        
        safetyScore: 9,
        costOfLivingScore: 6,
        walkabilityScore: 4,
        publicTransportScore: 3,
        schoolQualityScore: 6,
        nightlifeScore: 4,
        familyFriendlyScore: 7,
        diversityScore: 5,
        greenSpaceScore: 7,
        
        population: 8000,
        medianAge: 52.1,
        medianIncome: 68000,
        averageRent: 1900,
        crimeRate: 2.8,
        
        description: "Peaceful coastal community with beautiful beaches, golf courses, and retiree-friendly amenities. Perfect for those seeking a relaxed lifestyle.",
        keyFeatures: ["Beach access", "Golf courses", "Senior centers", "Medical facilities"],
        popularAmenities: ["Beach clubs", "Golf pro shops", "Art centers", "Restaurants"],
        dataSource: "sample_data"
    },
    
    {
        name: "Trendy Millennial District",
        city: "Austin",
        state: "Texas",
        zipCode: "78701",
        latitude: 30.2672,
        longitude: -97.7431,
        
        safetyScore: 7,
        costOfLivingScore: 5,
        walkabilityScore: 8,
        publicTransportScore: 6,
        schoolQualityScore: 7,
        nightlifeScore: 10,
        familyFriendlyScore: 4,
        diversityScore: 8,
        greenSpaceScore: 6,
        
        population: 28000,
        medianAge: 27.9,
        medianIncome: 65000,
        averageRent: 2100,
        crimeRate: 6.1,
        
        description: "Hip neighborhood known for live music, food trucks, and tech startups. Perfect for young professionals who love nightlife and innovation.",
        keyFeatures: ["Music venues", "Food trucks", "Tech companies", "Nightlife"],
        popularAmenities: ["Live music", "Craft breweries", "Food halls", "Coworking spaces"],
        dataSource: "sample_data"
    },
    
    {
        name: "Family Friendly Suburbs",
        city: "Naperville",
        state: "Illinois",
        zipCode: "60540",
        latitude: 41.7508,
        longitude: -88.1535,
        
        safetyScore: 10,
        costOfLivingScore: 5,
        walkabilityScore: 6,
        publicTransportScore: 6,
        schoolQualityScore: 10,
        nightlifeScore: 4,
        familyFriendlyScore: 10,
        diversityScore: 8,
        greenSpaceScore: 8,
        
        population: 48000,
        medianAge: 39.1,
        medianIncome: 88000,
        averageRent: 2300,
        crimeRate: 1.5,
        
        description: "Top-rated suburban community with excellent schools, family parks, and safe neighborhoods. Ideal for families with school-age children.",
        keyFeatures: ["Top schools", "Family parks", "Safe neighborhoods", "Community events"],
        popularAmenities: ["Recreation centers", "Youth programs", "Libraries", "Shopping"],
        dataSource: "sample_data"
    }
];

module.exports = sampleNeighborhoods;