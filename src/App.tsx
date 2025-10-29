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

      <nav className="fixed top-0 right-0 left-0 z-40 border-b border-green-100 shadow-lg glass-effect">
        <div className="container px-6 py-4 mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-3 items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="flex justify-center items-center w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full shadow-lg animate-bounce-gentle">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold gradient-text">Climate Action Pledge</span>
                <div className="flex gap-1 items-center text-xs text-gray-600">
                  <Sparkles className="w-3 h-3" />
                  <span>Make a difference today</span>
                </div>
              </div>
            </div>
            <button
              onClick={scrollToPledgeForm}
              className="flex gap-2 items-center px-8 py-3 font-bold text-white bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-full transition-all duration-300 transform hover:shadow-xl hover:scale-105"
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

      <footer className="overflow-hidden relative py-16 text-white bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container relative z-10 px-6 mx-auto">
          <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-3">
            <div>
              <div className="flex gap-3 items-center mb-4">
                <div className="flex justify-center items-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-lg">
                  <Leaf className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold">Climate Action Pledge</span>
              </div>
              <p className="leading-relaxed text-gray-300">
                Empowering individuals to take meaningful climate action, one pledge at a time.
              </p>
              <div className="flex gap-2 items-center mt-4 text-green-400">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-semibold">Building a sustainable future together</span>
              </div>
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-bold">
                <span>Quick Links</span>
                <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent"></div>
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <button onClick={scrollToPledgeForm} className="flex gap-2 items-center transition-colors hover:text-green-400 group">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Take the Pledge
                  </button>
                </li>
                <li>
                  <a href="#" className="flex gap-2 items-center transition-colors hover:text-green-400 group">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="flex gap-2 items-center transition-colors hover:text-green-400 group">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Impact Stories
                  </a>
                </li>
                <li>
                  <a href="#" className="flex gap-2 items-center transition-colors hover:text-green-400 group">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full group-hover:scale-150 transition-transform"></span>
                    Resources
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="flex gap-2 items-center mb-4 text-lg font-bold">
                <span>Privacy & Data</span>
                <div className="flex-1 h-px bg-gradient-to-r from-green-500 to-transparent"></div>
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                Your email and mobile number are used only for verification. They are never displayed publicly or shared with third parties. We are committed to protecting your privacy.
              </p>
            </div>
          </div>

          <div className="pt-8 text-center text-gray-400 border-t border-gray-700">
            <p className="text-lg">&copy; {new Date().getFullYear()} Climate Action Pledge. All rights reserved.</p>
            <p className="flex gap-2 justify-center items-center mt-2 text-sm">
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
