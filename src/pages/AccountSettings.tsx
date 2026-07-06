import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { ArrowLeft, Save, User, Lock, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

export const AccountSettings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useStore();

  return (
    <PageTransition className="p-6 pb-24">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 mr-4 text-gray-400 hover:text-white bg-dark-200 rounded-full border border-dark-300">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Account Settings</h1>
      </div>

      <div className="space-y-6">
        <div className="bg-dark-200 border border-dark-300 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><User className="w-5 h-5 text-accent" /> Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input type="text" defaultValue={user?.name || ''} className="w-full bg-dark-300 border border-dark-400 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">Email Address <Mail className="w-4 h-4" /></label>
              <input type="email" defaultValue={user?.email || ''} className="w-full bg-dark-300 border border-dark-400 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" disabled />
            </div>
          </div>
        </div>

        <div className="bg-dark-200 border border-dark-300 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><Lock className="w-5 h-5 text-warning" /> Security</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full bg-dark-300 border border-dark-400 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
            </div>
          </div>
        </div>

        <button className="w-full py-4 flex items-center justify-center gap-2 text-dark font-bold bg-accent rounded-xl hover:bg-accent/90 transition-colors shadow-glow">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </PageTransition>
  );
};
