import { Heart, Award, Download, Share2, Sparkles } from 'lucide-react';
import { Pledge } from '../lib/supabase';
import { useState } from 'react';
import Confetti from './Confetti';

interface CertificateProps {
  pledge: Pledge;
  onClose: () => void;
}

export default function Certificate({ pledge, onClose }: CertificateProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useState(() => {
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setShowConfetti(false), 4000);
  });
  const handleDownload = () => {
    const certificate = document.getElementById('certificate-content');
    if (!certificate) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1200;
    canvas.height = 800;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#10b981');
    gradient.addColorStop(1, '#059669');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, 40);
    ctx.fillRect(0, 760, canvas.width, 40);

    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Climate Action Pledge Certificate', 600, 120);

    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#059669';
    ctx.fillText(pledge.name, 600, 220);

    ctx.font = '24px Arial';
    ctx.fillStyle = '#4b5563';
    ctx.fillText('is officially recognized as', 600, 280);

    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#10b981';
    ctx.fillText('Cool Enough to Care!', 600, 340);

    ctx.font = '20px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(`For committing to ${pledge.commitment_count} climate-positive actions`, 600, 400);

    const hearts = '❤️'.repeat(pledge.hearts_rating);
    ctx.font = '48px Arial';
    ctx.fillText(`Love for Planet: ${hearts}`, 600, 480);

    ctx.font = '18px Arial';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText(`Pledge #${pledge.pledge_number}`, 600, 560);
    ctx.fillText(`Issued: ${new Date(pledge.created_at).toLocaleDateString()}`, 600, 600);

    const link = document.createElement('a');
    link.download = `climate-pledge-${pledge.pledge_number}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-scale-in">
        <div className={`bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transition-all duration-500 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div
          id="certificate-content"
          className="relative p-12 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-600 to-emerald-600"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-600 to-emerald-600"></div>

          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mb-6 animate-bounce-gentle shadow-lg">
              <Award className="w-10 h-10 text-white" />
            </div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Climate Action Pledge Certificate
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto"></div>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-lg mb-8">
            <p className="text-xl text-gray-700 text-center mb-6">
              This is to certify that
            </p>

            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 text-center mb-6">
              {pledge.name}
            </h3>

            <p className="text-xl text-gray-700 text-center mb-4">
              is officially recognized as
            </p>

            <div className="text-center mb-8">
              <span className="inline-block text-3xl font-bold text-green-600 px-8 py-3 bg-green-50 rounded-full border-2 border-green-600">
                Cool Enough to Care!
              </span>
            </div>

            <p className="text-lg text-gray-600 text-center mb-8">
              For committing to <span className="font-bold text-green-600">{pledge.commitment_count}</span> climate-positive actions
              and joining the global movement for environmental sustainability
            </p>

            <div className="flex items-center justify-center gap-2 mb-8">
              <Heart className="w-6 h-6 text-red-500 animate-bounce-gentle" fill="currentColor" />
              <span className="text-2xl font-bold text-gray-900">Love for Planet:</span>
              <div className="flex gap-1">
                {Array.from({ length: pledge.hearts_rating }).map((_, i) => (
                  <Heart key={i} className="w-8 h-8 text-red-500 animate-bounce-gentle" fill="currentColor" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 flex justify-between items-center text-sm text-gray-600">
              <span>Pledge #{pledge.pledge_number}</span>
              <span>Issued: {new Date(pledge.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</span>
            </div>
          </div>

          <p className="text-center text-gray-600 italic">
            "Individual actions create collective impact. Together, we build a sustainable future."
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-b-3xl flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <Download className="w-5 h-5" />
            Download Certificate
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Climate Action Pledge',
                  text: `I just took the Climate Action Pledge! Join me in making a difference. #ClimateAction #CoolEnoughToCare`,
                  url: window.location.href,
                });
              }
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
          <button
            onClick={onClose}
            className="px-8 py-3 rounded-xl font-semibold bg-white text-gray-700 border-2 border-gray-300 hover:border-green-500 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
