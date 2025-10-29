import { Globe, Heart, Sprout, Users, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function WhyClimateAction() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([false, false, false, false]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards([true, true, true, true]);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const reasons = [
    {
      icon: Globe,
      title: 'Global Crisis, Local Action',
      description: 'Climate change affects us all, but change starts with individual commitment. Your actions ripple outward, inspiring communities and driving systemic change.',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
    },
    {
      icon: Users,
      title: 'Collective Power',
      description: 'When millions of individuals commit to sustainable habits, we create unstoppable momentum. Together, we are the movement that will define our planet\'s future.',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
    },
    {
      icon: Sprout,
      title: 'Tangible Impact',
      description: 'Small daily choices compound into massive environmental impact. Reducing waste, conserving energy, and mindful consumption create measurable change.',
      color: 'from-teal-500 to-green-500',
      bgColor: 'from-teal-50 to-green-50',
    },
    {
      icon: Heart,
      title: 'For Future Generations',
      description: 'Every pledge is an investment in the world we leave behind. Be part of the generation that chose action over apathy, progress over paralysis.',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'from-rose-50 to-pink-50',
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-5 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold">Our Mission</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Why Take Climate Action?
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Climate change is the defining challenge of our time. While governments and corporations
            must lead systemic change, individual actions matter profoundly. Every sustainable choice
            you make sends a signal, builds momentum, and proves that a better future is possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br ${reason.bgColor} rounded-3xl p-8 shadow-xl hover-lift border-2 border-white/50 transition-all duration-500 ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${reason.color} mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <reason.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-700 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{reason.description}</p>
              </div>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-20 transition-opacity duration-300">
                <reason.icon className="w-32 h-32 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 md:p-12 text-center text-white shadow-2xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse-slow"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 mb-6">
                <Heart className="w-8 h-8 text-white animate-bounce-gentle" fill="white" />
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Individual Responsibility. Global Movement.
              </h3>
              <p className="text-lg md:text-xl leading-relaxed opacity-95">
                Your pledge isn't just a promise—it's a declaration that you refuse to be a bystander
                in the greatest challenge humanity has ever faced. Join the movement of conscious
                changemakers building a sustainable, equitable, and thriving planet.
              </p>
              <div className="mt-8 flex items-center justify-center gap-8 text-white/90">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span className="font-semibold">Global Impact</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="font-semibold">United Action</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sprout className="w-5 h-5" />
                  <span className="font-semibold">Lasting Change</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
