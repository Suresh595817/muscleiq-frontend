import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { ArrowLeft, MessageSquare, Mail, LifeBuoy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HelpSupport: React.FC = () => {
  const navigate = useNavigate();

  const faqs = [
    { q: 'How is muscle imbalance calculated?', a: 'We compare the total volume (sets × reps × weight) of opposing muscle groups over your workout history.' },
    { q: 'Can I add custom exercises?', a: 'Yes! When logging a workout, simply type your custom exercise name and select the primary muscle.' },
    { q: 'How do I reset my password?', a: 'Go to Account Settings to update your security credentials.' },
  ];

  return (
    <PageTransition className="p-6 pb-24">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 mr-4 text-gray-400 hover:text-white bg-dark-200 rounded-full border border-dark-300">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Help & Support</h1>
      </div>

      <div className="bg-dark-200 border border-dark-300 rounded-2xl p-6 mb-8 text-center">
        <LifeBuoy className="w-12 h-12 text-accent mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">How can we help?</h2>
        <p className="text-gray-400 mb-6 text-sm">We typically reply within 24 hours.</p>
        
        <div className="flex gap-4">
          <button className="flex-1 py-3 bg-dark-300 hover:bg-dark-400 border border-dark-400 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors">
            <MessageSquare className="w-5 h-5 text-gray-300" />
            <span className="text-sm font-medium">Live Chat</span>
          </button>
          <button className="flex-1 py-3 bg-dark-300 hover:bg-dark-400 border border-dark-400 rounded-xl flex flex-col items-center justify-center gap-2 transition-colors">
            <Mail className="w-5 h-5 text-gray-300" />
            <span className="text-sm font-medium">Email Us</span>
          </button>
        </div>
      </div>

      <h3 className="text-lg font-bold mb-4">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-dark-200 border border-dark-300 p-5 rounded-2xl">
            <h4 className="font-bold text-white mb-2">{faq.q}</h4>
            <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </PageTransition>
  );
};
