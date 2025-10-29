import { supabase, Pledge, PublicPledge, PledgeStats } from '../lib/supabase';

export interface PledgeFormData {
  name: string;
  email: string;
  mobile: string;
  state: string;
  profile_type: 'Student' | 'Working Professional' | 'Other';
  commitments: string[];
}

function calculateHeartsRating(commitmentCount: number): number {
  if (commitmentCount <= 3) return 3;
  if (commitmentCount <= 6) return 4;
  return 5;
}

export async function createPledge(data: PledgeFormData): Promise<Pledge> {
  const heartsRating = calculateHeartsRating(data.commitments.length);

  const { data: pledge, error } = await supabase
    .from('pledges')
    .insert({
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      state: data.state,
      profile_type: data.profile_type,
      commitments: data.commitments,
      commitment_count: data.commitments.length,
      hearts_rating: heartsRating,
    })
    .select()
    .single();

  if (error) throw error;
  return pledge;
}

export async function getPledgeStats(): Promise<PledgeStats> {
  const { data, error } = await supabase
    .from('pledges')
    .select('profile_type');

  if (error) throw error;

  const stats: PledgeStats = {
    total: data.length,
    students: data.filter(p => p.profile_type === 'Student').length,
    professionals: data.filter(p => p.profile_type === 'Working Professional').length,
    workshops: data.filter(p => p.profile_type === 'Other').length,
  };

  return stats;
}

export async function getPublicPledges(limit = 50): Promise<PublicPledge[]> {
  const { data, error } = await supabase
    .from('pledges')
    .select('pledge_number, name, state, profile_type, hearts_rating, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data as PublicPledge[];
}
