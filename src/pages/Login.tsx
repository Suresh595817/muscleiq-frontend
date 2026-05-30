import React, { useState } from 'react';
import { Activity, ArrowRight, Mail, Lock, User } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PageTransition } from '../components/PageTransition';

export const Login: React.FC = () => {
  const login = useStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) login(email);
  };

  return (
    <PageTransition className="flex flex-col h-full bg-dark">
      <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
        {/* Background glow effect */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -z-10" />

        <div className="mb-12 text-center">
          <div className="w-16 h-16 bg-dark-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow border border-dark-300">
            <Activity className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {isSignUp ? 'Join ' : 'Welcome to '}Muscle<span className="text-accent">IQ</span>
          </h1>
          <p className="text-gray-400">
            {isSignUp
              ? 'Create your account to get started.'
              : 'AI-powered muscle imbalance detection.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-1">
              <label className="text-sm text-gray-400 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-dark-200 border border-dark-300 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                  required />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm text-gray-400 ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@example.com"
                className="w-full bg-dark-200 border border-dark-300 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                required />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-gray-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-dark-200 border border-dark-300 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                required />
            </div>
          </div>

          {!isSignUp && (
            <div className="flex justify-end pt-1">
              <button
                type="button"
                className="text-sm text-accent hover:text-accent-hover transition-colors">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl py-3.5 mt-4 flex items-center justify-center gap-2 transition-all shadow-glow active:scale-[0.98]">
            {isSignUp ? 'Create Account' : 'Sign In'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-accent font-medium hover:text-accent-hover transition-colors">
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </div>
    </PageTransition>);
};