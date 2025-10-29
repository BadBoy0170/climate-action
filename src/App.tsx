import { useState, useRef } from 'react';
import { Leaf, Sparkles } from 'lucide-react';
import Hero from './components/Hero';
import LiveKPIs from './components/LiveKPIs';
import WhyClimateAction from './components/WhyClimateAction';
import PledgeForm from './components/PledgeForm';
import Certificate from './components/Certificate';
import PledgeWall from './components/PledgeWall';
import Toast from './components/Toast';
import { Pledge } from './lib/supabase';

interface ToastData {
  message: string;
  type: 'success' | 'error' | 'info';
}

function App() {
  const [completedPledge, setCompletedPledge] = useState<Pledge | null>(null);
  const [toast, setToast] = useState<ToastData | null>(null);
  const pledgeFormRef = useRef<HTMLDivElement>(null);

  const scrollToPledgeForm = () => {
    pledgeFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePledgeComplete = (pledge: Pledge) => {
    setCompletedPledge(pledge);
    setToast({
      message: 'Congratulations! Your pledge has been recorded successfully!',
      type: 'success',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCloseCertificate = () => {
    setCompletedPledge(null);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-white">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <nav className="fixed top-0 left-0 right-0 glass-effect shadow-lg z-40 border-b border-green-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-bounce-gentle">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">Climate Action Pledge</span>
                <div className="flex items-center gap-1 text-xs text-gray-600">
                  <Sparkles className="w-3 h-3" />
                  <span>Make a difference today</span>
                </div>
              </div>
            </div>
            <button
              onClick={scrollToPledgeForm}
              className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <span>Take Pledge</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <main>
        <Hero onTakePledge={scrollToPledgeForm} />
        <LiveKPIs />
        <WhyClimateAction />
        <div ref={pledgeFormRef}>
          <PledgeForm onPledgeComplete={handlePledgeComplete} />
        </div>
        <PledgeWall />
      </main>

      <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold">Climate Action Pledge</span>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Empowering individuals to take meaningful climate action, one pledge at a time.
              </p>
              <div className="mt-4 flex items-center gap-2 text-green-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Building a sustainable future together</span>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>Quick Links</span>
                <div className="h-px flex-1 bg-gradient-to-r from-green-500 to-transparent"></div>
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <button onClick={scrollToPledgeForm} className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Take the Pledge
                  </button>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Impact Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-green-400 transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Resources
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span>Privacy & Data</span>
                <div className="h-px flex-1 bg-gradient-to-r from-green-500 to-transparent"></div>
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your email and mobile number are used only for verification. They are never displayed publicly or shared with third parties. We are committed to protecting your privacy.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p className="text-lg">&copy; {new Date().getFullYear()} Climate Action Pledge. All rights reserved.</p>
            <p className="mt-2 text-sm flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-green-500" />
              <span>Together, we build a sustainable future.</span>
              <Sparkles className="w-4 h-4 text-green-500" />
            </p>
          </div>
        </div>
      </footer>

      {completedPledge && (
        <Certificate pledge={completedPledge} onClose={handleCloseCertificate} />
      )}
    </div>
  );
}

export default App;
