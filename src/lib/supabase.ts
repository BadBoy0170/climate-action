import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Pledge {
  id: string;
  pledge_number: number;
  name: string;
  email: string;
  mobile: string;
  state: string;
  profile_type: 'Student' | 'Working Professional' | 'Other';
  commitments: string[];
  commitment_count: number;
  hearts_rating: number;
  created_at: string;
}

export interface PublicPledge {
  pledge_number: number;
  name: string;
  state: string;
  profile_type: string;
  hearts_rating: number;
  created_at: string;
}

export interface PledgeStats {
  total: number;
  students: number;
  professionals: number;
  workshops: number;
}
