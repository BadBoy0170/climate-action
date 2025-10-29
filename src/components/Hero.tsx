import { Leaf, Sparkles, TrendingUp, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import ParticlesBackground from './ParticlesBackground';

interface HeroProps {
  onTakePledge: () => void;
}

export default function Hero({ onTakePledge }: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-20 pb-32 overflow-hidden">
      <ParticlesBackground />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-400 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="absolute top-40 left-20 animate-float">
        <Leaf className="w-12 h-12 text-green-400/30" />
      </div>
      <div className="absolute top-60 right-32 animate-float-delayed">
        <Sparkles className="w-10 h-10 text-emerald-400/30" />
      </div>
      <div className="absolute bottom-40 left-1/4 animate-float" style={{ animationDelay: '1s' }}>
        <Award className="w-14 h-14 text-teal-400/30" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`inline-flex items-center gap-2 glass-effect px-6 py-3 rounded-full mb-8 shadow-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Leaf className="w-5 h-5 text-green-600 animate-bounce-gentle" />
            <span className="text-sm font-semibold text-green-800">Join the Global Movement</span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>

          <h1 className={`text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Take the
            <span className="gradient-text gradient-animate"> Climate Action </span>
            Pledge
          </h1>

          <p className={`text-xl md:text-2xl text-gray-700 mb-10 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Individual actions create collective impact. Join thousands of changemakers
            committed to building a sustainable future, one pledge at a time.
          </p>

          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <button
              onClick={onTakePledge}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white px-10 py-5 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden bg-[length:200%_100%] hover:bg-[position:100%_0] animate-shimmer"
            >
              <span className="relative z-10">Take the Pledge Now</span>
              <Leaf className="w-6 h-6 group-hover:rotate-[360deg] transition-transform duration-500 relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          <div className={`mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg hover-lift">
              <Award className="w-5 h-5 text-green-600" />
              <span>Free Digital Certificate</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg hover-lift">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Public Recognition</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-lg hover-lift">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <span>Real Impact</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
