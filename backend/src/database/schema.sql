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