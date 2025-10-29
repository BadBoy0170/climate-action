import { useEffect, useState } from 'react';
import { Heart, Users, Sparkles, TrendingUp } from 'lucide-react';
import { getPublicPledges, PublicPledge } from '../services/pledgeService';

export default function PledgeWall() {
  const [pledges, setPledges] = useState<PublicPledge[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPledges, setNewPledges] = useState<number[]>([]);

  useEffect(() => {
    loadPledges();
    const interval = setInterval(loadPledges, 10000);
    return () => clearInterval(interval);
  }, []);

  async function loadPledges() {
    try {
      const data = await getPublicPledges(50);

      if (pledges.length > 0 && data.length > pledges.length) {
        const newPledgeNumbers = data
          .slice(0, data.length - pledges.length)
          .map(p => p.pledge_number);
        setNewPledges(newPledgeNumbers);
        setTimeout(() => setNewPledges([]), 3000);
      }

      setPledges(data);
    } catch (error) {
      console.error('Error loading pledges:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-400 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 glass-effect px-6 py-3 rounded-full shadow-lg mb-6 animate-bounce-gentle">
            <Users className="w-6 h-6 text-green-600" />
            <span className="font-bold gradient-text">
              {pledges.length} Recent Pledges
            </span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Public Pledge Wall
          </h2>
          <p className="text-xl text-gray-600">
            Join these amazing changemakers who are committed to climate action
          </p>
        </div>

        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-green-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Pledge ID</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">State</th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Profile</th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wide">Love for Planet</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-gray-500 font-medium">Loading pledges...</span>
                      </div>
                    </td>
                  </tr>
                ) : pledges.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg font-medium">Be the first to take the pledge!</p>
                    </td>
                  </tr>
                ) : (
                  pledges.map((pledge, index) => {
                    const isNew = newPledges.includes(pledge.pledge_number);
                    return (
                      <tr
                        key={pledge.pledge_number}
                        className={`smooth-transition hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        } ${isNew ? 'animate-slide-in-left bg-green-100' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <div className="relative">
                            <span className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white font-bold rounded-full text-sm shadow-lg hover:scale-110 transition-transform">
                              #{pledge.pledge_number}
                            </span>
                            {isNew && (
                              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 text-lg">{pledge.name}</span>
                            {isNew && (
                              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                                NEW
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">
                          {new Date(pledge.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{pledge.state}</td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block px-4 py-2 rounded-full text-xs font-bold shadow-md ${
                              pledge.profile_type === 'Student'
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                                : pledge.profile_type === 'Working Professional'
                                ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white'
                                : 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                            }`}
                          >
                            {pledge.profile_type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-1">
                            {Array.from({ length: pledge.hearts_rating }).map((_, i) => (
                              <Heart
                                key={i}
                                className="w-6 h-6 text-red-500 hover:scale-125 transition-transform cursor-pointer"
                                fill="currentColor"
                              />
                            ))}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {pledges.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 text-center border-t-2 border-green-200">
              <p className="text-gray-700 font-semibold flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-green-600" />
                Showing {pledges.length} most recent pledges. Join them in making a difference!
                <Sparkles className="w-5 h-5 text-green-600" />
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
