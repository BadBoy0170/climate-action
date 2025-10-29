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
    <section className="overflow-hidden relative pt-20 pb-32 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <ParticlesBackground />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-10 top-20 w-72 h-72 bg-green-400 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute right-10 bottom-20 w-96 h-96 bg-emerald-400 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-400 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="absolute left-20 top-40 animate-float">
        <Leaf className="w-12 h-12 text-green-400/30" />
      </div>
      <div className="absolute right-32 top-60 animate-float-delayed">
        <Sparkles className="w-10 h-10 text-emerald-400/30" />
      </div>
      <div className="absolute bottom-40 left-1/4 animate-float" style={{ animationDelay: '1s' }}>
        <Award className="w-14 h-14 text-teal-400/30" />
      </div>

      <div className="container relative z-10 px-6 pt-16 mx-auto">
        <div className="mx-auto max-w-4xl text-center">
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
              className="inline-flex overflow-hidden relative gap-3 items-center px-10 py-5 text-lg font-semibold text-white bg-green-600 rounded-full shadow-xl transition-all duration-300 transform group hover:shadow-2xl hover:scale-105"
            >
              <span className="relative z-20">Take the Pledge Now</span>
              <Leaf className="w-6 h-6 group-hover:rotate-[360deg] transition-transform duration-500 relative z-20" />
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </button>
          </div>

          <div className={`mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex gap-2 items-center px-4 py-2 rounded-lg backdrop-blur-sm bg-white/60 hover-lift">
              <Award className="w-5 h-5 text-green-600" />
              <span>Free Digital Certificate</span>
            </div>
            <div className="flex gap-2 items-center px-4 py-2 rounded-lg backdrop-blur-sm bg-white/60 hover-lift">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Public Recognition</span>
            </div>
            <div className="flex gap-2 items-center px-4 py-2 rounded-lg backdrop-blur-sm bg-white/60 hover-lift">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <span>Real Impact</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
