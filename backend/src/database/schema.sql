-- NeighborFit Database Schema
-- Run this in your Supabase SQL editor

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    age INTEGER CHECK (age >= 18 AND age <= 120),
    bio TEXT,
    profile_image TEXT,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Enable Row Level Security (RLS) for better security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to see their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

-- Create policy to allow users to update their own data
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);



    -- Add this to your existing schema.sql file (after the users table)

-- Neighborhoods table - Core data for matching algorithm
CREATE TABLE IF NOT EXISTS neighborhoods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(10),
    
    -- Geographic data
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    bounds_north DECIMAL(10, 8),
    bounds_south DECIMAL(10, 8),
    bounds_east DECIMAL(11, 8),
    bounds_west DECIMAL(11, 8),
    
    -- Lifestyle scores (1-10 scale) - CRITICAL FOR MATCHING ALGORITHM
    safety_score INTEGER CHECK (safety_score >= 1 AND safety_score <= 10),
    cost_of_living_score INTEGER CHECK (cost_of_living_score >= 1 AND cost_of_living_score <= 10),
    walkability_score INTEGER CHECK (walkability_score >= 1 AND walkability_score <= 10),
    public_transport_score INTEGER CHECK (public_transport_score >= 1 AND public_transport_score <= 10),
    school_quality_score INTEGER CHECK (school_quality_score >= 1 AND school_quality_score <= 10),
    nightlife_score INTEGER CHECK (nightlife_score >= 1 AND nightlife_score <= 10),
    family_friendly_score INTEGER CHECK (family_friendly_score >= 1 AND family_friendly_score <= 10),
    diversity_score INTEGER CHECK (diversity_score >= 1 AND diversity_score <= 10),
    green_space_score INTEGER CHECK (green_space_score >= 1 AND green_space_score <= 10),
    
    -- Demographics and stats
    population INTEGER,
    median_age DECIMAL(4, 1),
    median_income INTEGER,
    average_rent INTEGER,
    crime_rate DECIMAL(5, 2), -- crimes per 1000 residents
    
    -- Descriptive data
    description TEXT,
    key_features TEXT[], -- Array of key features
    popular_amenities TEXT[], -- Array of popular amenities
    
    -- Metadata
    data_source VARCHAR(100), -- Where this data came from
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance (especially important for matching algorithm)
CREATE INDEX IF NOT EXISTS idx_neighborhoods_city_state ON neighborhoods(city, state);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_location ON neighborhoods(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_safety ON neighborhoods(safety_score);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_cost ON neighborhoods(cost_of_living_score);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_walkability ON neighborhoods(walkability_score);
CREATE INDEX IF NOT EXISTS idx_neighborhoods_active ON neighborhoods(is_active);

-- Full-text search index for neighborhood names and descriptions
CREATE INDEX IF NOT EXISTS idx_neighborhoods_search ON neighborhoods 
USING GIN (to_tsvector('english', name || ' ' || description));

-- User preferences table (for storing user lifestyle preferences)
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Preference weights (1-10 scale) - How important each factor is to the user
    safety_weight INTEGER DEFAULT 5 CHECK (safety_weight >= 1 AND safety_weight <= 10),
    cost_weight INTEGER DEFAULT 5 CHECK (cost_weight >= 1 AND cost_weight <= 10),
    walkability_weight INTEGER DEFAULT 5 CHECK (walkability_weight >= 1 AND walkability_weight <= 10),
    public_transport_weight INTEGER DEFAULT 5 CHECK (public_transport_weight >= 1 AND public_transport_weight <= 10),
    school_quality_weight INTEGER DEFAULT 5 CHECK (school_quality_weight >= 1 AND school_quality_weight <= 10),
    nightlife_weight INTEGER DEFAULT 5 CHECK (nightlife_weight >= 1 AND nightlife_weight <= 10),
    family_friendly_weight INTEGER DEFAULT 5 CHECK (family_friendly_weight >= 1 AND family_friendly_weight <= 10),
    diversity_weight INTEGER DEFAULT 5 CHECK (diversity_weight >= 1 AND diversity_weight <= 10),
    green_space_weight INTEGER DEFAULT 5 CHECK (green_space_weight >= 1 AND green_space_weight <= 10),
    
    -- User's ideal values (1-10 scale) - What score they want for each factor
    preferred_safety_score INTEGER DEFAULT 8 CHECK (preferred_safety_score >= 1 AND preferred_safety_score <= 10),
    preferred_cost_score INTEGER DEFAULT 5 CHECK (preferred_cost_score >= 1 AND preferred_cost_score <= 10),
    preferred_walkability_score INTEGER DEFAULT 7 CHECK (preferred_walkability_score >= 1 AND preferred_walkability_score <= 10),
    preferred_transport_score INTEGER DEFAULT 6 CHECK (preferred_transport_score >= 1 AND preferred_transport_score <= 10),
    preferred_school_score INTEGER DEFAULT 8 CHECK (preferred_school_score >= 1 AND preferred_school_score <= 10),
    preferred_nightlife_score INTEGER DEFAULT 5 CHECK (preferred_nightlife_score >= 1 AND preferred_nightlife_score <= 10),
    preferred_family_score INTEGER DEFAULT 7 CHECK (preferred_family_score >= 1 AND preferred_family_score <= 10),
    preferred_diversity_score INTEGER DEFAULT 6 CHECK (preferred_diversity_score >= 1 AND preferred_diversity_score <= 10),
    preferred_green_space_score INTEGER DEFAULT 7 CHECK (preferred_green_space_score >= 1 AND preferred_green_space_score <= 10),
    
    -- Additional constraints
    max_budget INTEGER, -- Maximum monthly rent/mortgage
    min_population INTEGER,
    max_population INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one preference record per user
    UNIQUE(user_id)
);

-- Index for user preferences
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);