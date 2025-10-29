import { useEffect, useState } from 'react';
import { Target, Users, Briefcase, Award, TrendingUp, Zap } from 'lucide-react';
import { getPledgeStats, PledgeStats } from '../services/pledgeService';
import AnimatedCounter from './AnimatedCounter';

const TARGET_PLEDGES = 1000000;

export default function LiveKPIs() {
  const [stats, setStats] = useState<PledgeStats>({
    total: 0,
    students: 0,
    professionals: 0,
    workshops: 0,
  });
  const [loading, setLoading] = useState(true);
  const [prevStats, setPrevStats] = useState(stats);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 5000);
    return () => clearInterval(interval);
  }, []);

  async function loadStats() {
    try {
      const data = await getPledgeStats();
      if (data.total !== stats.total) {
        setPrevStats(stats);
        setIsUpdating(true);
        setTimeout(() => setIsUpdating(false), 1000);
      }
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  }

  const percentage = Math.min((stats.total / TARGET_PLEDGES) * 100, 100);

  const kpiCards = [
    {
      icon: Target,
      label: 'Target Pledges',
      value: TARGET_PLEDGES,
      staticValue: TARGET_PLEDGES.toLocaleString(),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      iconColor: 'text-blue-600',
      animated: false,
    },
    {
      icon: Award,
      label: 'Achieved Pledges',
      value: stats.total,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-green-100',
      iconColor: 'text-green-600',
      highlight: true,
      animated: true,
    },
    {
      icon: Users,
      label: 'Students',
      value: stats.students,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-gradient-to-br from-orange-50 to-orange-100',
      iconColor: 'text-orange-600',
      animated: true,
    },
    {
      icon: Briefcase,
      label: 'Working Professionals',
      value: stats.professionals,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-gradient-to-br from-teal-50 to-teal-100',
      iconColor: 'text-teal-600',
      animated: true,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-green-400 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4 animate-bounce-gentle">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-semibold">Live Updates</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Live Impact Dashboard</h2>
          <p className="text-xl text-gray-600">Watch our community grow in real-time</p>
        </div>

        <div className="max-w-6xl mx-auto mb-16">
          <div className="relative">
            <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-full h-8 overflow-hidden shadow-inner border-2 border-gray-200">
              <div
                className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transition-all duration-1000 ease-out flex items-center justify-end pr-4 relative overflow-hidden"
                style={{ width: `${Math.max(percentage, 2)}%` }}
              >
                <div className="absolute inset-0 animate-shimmer"></div>
                {percentage > 8 && (
                  <span className="text-sm font-bold text-white relative z-10 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {percentage.toFixed(2)}%
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-3 text-sm text-gray-600 font-medium">
              <span>0</span>
              <span className="gradient-text font-bold">Target: 1M Pledges</span>
              <span>1,000,000</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {kpiCards.map((kpi, index) => (
            <div
              key={index}
              className={`${kpi.bgColor} rounded-2xl p-8 shadow-xl hover-lift border-2 border-white/50 relative overflow-hidden group ${
                kpi.highlight ? 'ring-4 ring-green-300 ring-offset-2' : ''
              } ${isUpdating && kpi.animated ? 'animate-scale-in' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {kpi.highlight && (
                <div className="absolute top-0 right-0">
                  <div className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    LIVE
                  </div>
                </div>
              )}

              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${kpi.color} mb-4 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                  <kpi.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className={`text-4xl font-bold text-gray-900 mb-2 ${kpi.iconColor}`}>
                  {loading ? (
                    <span className="inline-block animate-pulse">...</span>
                  ) : kpi.animated ? (
                    <AnimatedCounter end={kpi.value} />
                  ) : (
                    kpi.staticValue
                  )}
                </h3>

                <p className="text-gray-700 font-semibold">{kpi.label}</p>

                {kpi.highlight && !loading && (
                  <div className="mt-4 flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-bold">Growing</span>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
