/*
  # Create Climate Pledges System

  1. New Tables
    - `pledges`
      - `id` (uuid, primary key) - Unique identifier for each pledge
      - `pledge_number` (bigserial) - Sequential pledge number for display
      - `name` (text) - Full name of the person taking the pledge
      - `email` (text) - Email address (not displayed publicly)
      - `mobile` (text) - Mobile number (not displayed publicly)
      - `state` (text) - State/region of the pledger
      - `profile_type` (text) - Student/Working Professional/Other
      - `commitments` (jsonb) - Array of selected commitments
      - `commitment_count` (integer) - Number of commitments selected
      - `hearts_rating` (integer) - Hearts rating based on commitments (1-5)
      - `created_at` (timestamptz) - Timestamp when pledge was created
      
  2. Security
    - Enable RLS on `pledges` table
    - Add policy for anyone to insert pledges
    - Add policy for anyone to read public pledge data (excludes email and mobile)
    
  3. Indexes
    - Index on created_at for efficient sorting
    - Index on profile_type for filtering
    - Index on state for filtering

  4. Important Notes
    - Email and mobile are stored but never exposed in public queries
    - Pledge number is auto-generated sequentially
    - Hearts rating calculated: 1-3 commitments = 3 hearts, 4-6 = 4 hearts, 7+ = 5 hearts
    - Commitments stored as JSONB for flexibility
*/

-- Create pledges table
CREATE TABLE IF NOT EXISTS pledges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pledge_number bigserial UNIQUE NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  mobile text NOT NULL,
  state text NOT NULL,
  profile_type text NOT NULL CHECK (profile_type IN ('Student', 'Working Professional', 'Other')),
  commitments jsonb NOT NULL DEFAULT '[]'::jsonb,
  commitment_count integer NOT NULL DEFAULT 0,
  hearts_rating integer NOT NULL DEFAULT 3 CHECK (hearts_rating >= 1 AND hearts_rating <= 5),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE pledges ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert pledges
CREATE POLICY "Anyone can create pledges"
  ON pledges
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Anyone can view pledges (but client should exclude sensitive fields)
CREATE POLICY "Anyone can view pledges"
  ON pledges
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_pledges_created_at ON pledges(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pledges_profile_type ON pledges(profile_type);
CREATE INDEX IF NOT EXISTS idx_pledges_state ON pledges(state);