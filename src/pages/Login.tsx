import React, { useState } from 'react';
import { Activity, ArrowRight, Mail, Lock, User, AlertCircle, Loader } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PageTransition } from '../components/PageTransition';

export const Login: React.FC = () => {
  const { login, register, authLoading, authError, clearAuthError } = useStore((s) => ({
    login: s.login,
    register: s.register,
    authLoading: s.authLoading,
    authError: s.authError,
    clearAuthError: s.clearAuthError,
  }));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const error = localError || authError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearAuthError();

    try {
      if (isSignUp) {
        if (!name.trim()) {
          setLocalError('Please enter your full name.');
          return;
        }
        await register(name.trim(), email.trim(), password);
      } else {
        await login(email.trim(), password);
      }
      // On success, App.tsx will auto-redirect via isLoggedIn state
    } catch (err: any) {
      // Error is already set in the store by the action
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setLocalError(null);
    clearAuthError();
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <PageTransition className="flex flex-col h-full bg-dark">
      <div className="flex-1 flex flex-col justify-center px-8 relative z-10">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent/20 rounded-full blur-[100px] -z-10" />

        <div className="mb-8 text-center">
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

        {/* Error Alert */}
        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl p-3.5 text-sm mb-6">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="font-medium text-left">{error}</span>
          </div>
        )}

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
                  disabled={authLoading}
                  className="w-full bg-dark-200 border border-dark-300 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
                  required
                />
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
                disabled={authLoading}
                className="w-full bg-dark-200 border border-dark-300 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
                required
              />
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
                disabled={authLoading}
                className="w-full bg-dark-200 border border-dark-300 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
                required
                minLength={6}
              />
            </div>
          </div>

          {!isSignUp && (
            <div className="flex justify-end pt-1">
              <button type="button" className="text-sm text-accent hover:text-accent-hover transition-colors">
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl py-3.5 mt-4 flex items-center justify-center gap-2 transition-all shadow-glow active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed">
            {authLoading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                {isSignUp ? 'Creating Account…' : 'Signing In…'}
              </>
            ) : (
              <>
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type="button"
            onClick={toggleMode}
            disabled={authLoading}
            className="text-accent font-medium hover:text-accent-hover transition-colors disabled:opacity-50">
            {isSignUp ? 'Sign in' : 'Sign up'}
          </button>
        </div>
      </div>
    </PageTransition>
  );
};