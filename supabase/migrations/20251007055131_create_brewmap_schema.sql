/*
  # BrewMap Database Schema

  ## Overview
  This migration creates the core database structure for BrewMap, a cafe discovery application
  that helps users find, rate, and track their favorite coffee shops.

  ## New Tables

  ### 1. `profiles`
  User profiles for BrewMates (signed-up users)
  - `id` (uuid, primary key) - Links to auth.users
  - `email` (text) - User's email
  - `display_name` (text) - User's display name
  - `tier_level` (integer) - User's tier level (1-5)
  - `cafes_visited` (integer) - Count of unique cafes visited
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `cafes`
  Cafe information and details
  - `id` (uuid, primary key) - Unique cafe identifier
  - `google_place_id` (text, unique) - Google Places API identifier
  - `name` (text) - Cafe name
  - `address` (text) - Full address
  - `latitude` (decimal) - Geographic latitude
  - `longitude` (decimal) - Geographic longitude
  - `phone` (text) - Contact phone number
  - `website` (text) - Cafe website URL
  - `hours` (jsonb) - Opening hours data
  - `photos` (jsonb) - Array of photo URLs
  - `google_rating` (decimal) - Google Maps rating
  - `tags` (text[]) - Feature tags (Wi-Fi, Outlets, Pet Friendly, etc.)
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `favorites`
  User's saved/favorite cafes
  - `id` (uuid, primary key) - Unique favorite identifier
  - `user_id` (uuid, foreign key) - References profiles.id
  - `cafe_id` (uuid, foreign key) - References cafes.id
  - `visited` (boolean) - Whether user has visited this cafe
  - `notes` (text) - Personal notes about the cafe
  - `created_at` (timestamptz) - When cafe was favorited

  ### 4. `reviews`
  User reviews for cafes
  - `id` (uuid, primary key) - Unique review identifier
  - `user_id` (uuid, foreign key) - References profiles.id
  - `cafe_id` (uuid, foreign key) - References cafes.id
  - `rating` (integer) - User rating (1-5)
  - `comment` (text) - Review text
  - `created_at` (timestamptz) - Review creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 5. `feedback`
  User feedback and contact form submissions
  - `id` (uuid, primary key) - Unique feedback identifier
  - `name` (text) - Sender's name
  - `email` (text) - Sender's email
  - `message` (text) - Feedback message
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - RLS enabled on all tables
  - Profiles: Users can read any profile, but only update their own
  - Cafes: Public read access, no direct write access (managed by API)
  - Favorites: Users can only manage their own favorites
  - Reviews: Users can read all reviews, but only manage their own
  - Feedback: Users can submit feedback, admins can read all

  ## Notes
  - User tier levels are calculated based on cafes_visited count
  - Cafe tags enable filtering (Wi-Fi, Outlets, Pet Friendly, Study Spots, etc.)
  - Google Place ID ensures integration with Google Maps API
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  display_name text,
  tier_level integer DEFAULT 1,
  cafes_visited integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create cafes table
CREATE TABLE IF NOT EXISTS cafes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  google_place_id text UNIQUE,
  name text NOT NULL,
  address text NOT NULL,
  latitude decimal(10, 8) NOT NULL,
  longitude decimal(11, 8) NOT NULL,
  phone text,
  website text,
  hours jsonb,
  photos jsonb,
  google_rating decimal(2, 1),
  tags text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cafes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view cafes"
  ON cafes FOR SELECT
  TO authenticated, anon
  USING (true);

-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  cafe_id uuid NOT NULL REFERENCES cafes(id) ON DELETE CASCADE,
  visited boolean DEFAULT false,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, cafe_id)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own favorites"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own favorites"
  ON favorites FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  cafe_id uuid NOT NULL REFERENCES cafes(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, cafe_id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can insert own reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
  ON feedback FOR INSERT
  TO authenticated, anon
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_cafes_location ON cafes(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_cafes_google_place_id ON cafes(google_place_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_cafe_id ON favorites(cafe_id);
CREATE INDEX IF NOT EXISTS idx_reviews_cafe_id ON reviews(cafe_id);

-- Create function to update tier level based on cafes visited
CREATE OR REPLACE FUNCTION update_user_tier()
RETURNS TRIGGER AS $$
BEGIN
  NEW.tier_level := CASE
    WHEN NEW.cafes_visited >= 60 THEN 5
    WHEN NEW.cafes_visited >= 40 THEN 4
    WHEN NEW.cafes_visited >= 20 THEN 3
    WHEN NEW.cafes_visited >= 10 THEN 2
    ELSE 1
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tier_on_cafes_visited
  BEFORE UPDATE OF cafes_visited ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_user_tier();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_cafes_updated_at
  BEFORE UPDATE ON cafes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();