import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { ArrowLeft, Star, CheckCircle2, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Subscription: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageTransition className="p-6 pb-24">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 mr-4 text-gray-400 hover:text-white bg-dark-200 rounded-full border border-dark-300">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Subscription</h1>
      </div>

      <div className="bg-gradient-to-br from-accent/20 to-dark-200 border border-accent/50 rounded-3xl p-6 mb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Star className="w-32 h-32" />
        </div>
        <div className="relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-dark mb-4 shadow-glow">
            <Zap className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black mb-2 text-white">MuscleIQ <span className="text-accent">PRO</span></h2>
          <p className="text-gray-300 mb-6">You are currently on the free tier. Upgrade to unlock advanced AI analytics!</p>
          
          <button className="w-full py-4 font-bold bg-white text-dark rounded-xl hover:bg-gray-200 transition-colors">
            Upgrade to Pro — $9.99/mo
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-4">Pro Features</h3>
      <div className="space-y-3">
        {[
          'Advanced Muscle Heatmaps',
          'Unlimited Workout History',
          'AI-Powered Routine Suggestions',
          'Export Data to CSV',
          'Priority Support'
        ].map((feature, i) => (
          <div key={i} className="flex items-center gap-3 bg-dark-200 p-4 rounded-xl border border-dark-300">
            <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
            <span className="text-gray-200">{feature}</span>
          </div>
        ))}
      </div>
    </PageTransition>
  );
};
