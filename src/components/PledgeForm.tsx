import { useState, FormEvent } from 'react';
import { Shield, Loader2 } from 'lucide-react';
import { createPledge, PledgeFormData } from '../services/pledgeService';
import { Pledge } from '../lib/supabase';

interface PledgeFormProps {
  onPledgeComplete: (pledge: Pledge) => void;
}

const COMMITMENT_THEMES = [
  {
    theme: 'Sustainable Transport',
    commitments: [
      'Use public transport or carpool at least 3 times a week',
      'Switch to cycling or walking for short distances',
      'Support electric vehicle adoption',
    ],
  },
  {
    theme: 'Energy & Resources',
    commitments: [
      'Reduce electricity usage by 20% through conscious habits',
      'Switch to renewable energy sources when possible',
      'Minimize water waste in daily activities',
    ],
  },
  {
    theme: 'Consumption & Waste',
    commitments: [
      'Say no to single-use plastics',
      'Choose sustainable and locally-sourced products',
      'Compost organic waste and recycle regularly',
    ],
  },
];

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
];

export default function PledgeForm({ onPledgeComplete }: PledgeFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    state: '',
    profile_type: '' as '' | 'Student' | 'Working Professional' | 'Other',
  });

  const [selectedCommitments, setSelectedCommitments] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleCommitmentToggle = (commitment: string) => {
    setSelectedCommitments((prev) =>
      prev.includes(commitment)
        ? prev.filter((c) => c !== commitment)
        : [...prev, commitment]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (selectedCommitments.length === 0) {
      setError('Please select at least one commitment');
      return;
    }

    if (!formData.profile_type) {
      setError('Please select your profile type');
      return;
    }

    setIsSubmitting(true);

    try {
      const pledgeData: PledgeFormData = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        state: formData.state,
        profile_type: formData.profile_type,
        commitments: selectedCommitments,
      };

      const pledge = await createPledge(pledgeData);
      onPledgeComplete(pledge);
    } catch (err) {
      setError('Failed to submit pledge. Please try again.');
      console.error('Pledge submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pledge-form" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Make Your Pledge
            </h2>
            <p className="text-xl text-gray-600">
              Choose your commitments and join the movement
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  State *
                </label>
                <select
                  required
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="">Select your state</option>
                  {INDIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Profile Type *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['Student', 'Working Professional', 'Other'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, profile_type: type })}
                    className={`px-6 py-4 rounded-xl border-2 font-semibold transition-all ${
                      formData.profile_type === type
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-green-300 text-gray-700'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Select Your Commitments
              </h3>

              <div className="space-y-8">
                {COMMITMENT_THEMES.map((theme, themeIndex) => (
                  <div key={themeIndex} className="bg-white rounded-2xl p-6 shadow-md">
                    <h4 className="text-lg font-bold text-green-700 mb-4">{theme.theme}</h4>
                    <div className="space-y-3">
                      {theme.commitments.map((commitment, commitmentIndex) => (
                        <label
                          key={commitmentIndex}
                          className="flex items-start gap-3 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCommitments.includes(commitment)}
                            onChange={() => handleCommitmentToggle(commitment)}
                            className="mt-1 w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-gray-700 group-hover:text-gray-900 transition-colors">
                            {commitment}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {selectedCommitments.length > 0 && (
                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                  <p className="text-green-800 font-semibold">
                    {selectedCommitments.length} commitment{selectedCommitments.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
              )}
            </div>

            <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200 flex gap-4">
              <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-blue-900 mb-2">Privacy Notice</h4>
                <p className="text-sm text-blue-800 leading-relaxed">
                  Your mobile number and email address are required for validation purposes only.
                  They will never be displayed publicly or shared with third parties. Only your
                  name, state, and commitment count will be visible on the public pledge wall.
                </p>
              </div>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 rounded-xl border border-red-200">
                <p className="text-red-700 font-semibold">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Submitting Your Pledge...
                </>
              ) : (
                'Submit My Climate Pledge'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
