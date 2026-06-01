import React from 'react';
import { User, Settings, LogOut, Award, Target, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PageTransition } from '../components/PageTransition';
export const Profile: React.FC = () => {
  const { user, logout, workouts, dashboardStats } = useStore();
  return (
    <PageTransition className="p-6 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button className="p-2 text-gray-400 hover:text-white bg-dark-200 rounded-full border border-dark-300">
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-dark-200 rounded-full flex items-center justify-center border-2 border-accent shadow-glow mb-4 relative">
          <User className="w-10 h-10 text-gray-400" />
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-accent rounded-full border-2 border-dark flex items-center justify-center">
            <Award className="w-3 h-3 text-white" />
          </div>
        </div>
        <h2 className="text-xl font-bold">{user?.name ?? 'Athlete'}</h2>
        <p className="text-sm text-gray-400">{user?.email}</p>
        <span className="mt-1 text-xs bg-accent/20 text-accent px-3 py-0.5 rounded-full capitalize">{user?.role ?? 'user'}</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-dark-200 border border-dark-300 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold">{dashboardStats?.totalWorkouts ?? workouts.length}</div>
            <div className="text-xs text-gray-400">Total Workouts</div>
          </div>
        </div>

        <div className="bg-dark-200 border border-dark-300 rounded-2xl p-4 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center text-warning">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-bold text-sm leading-tight">
              {dashboardStats?.favoriteExercise ?? '—'}
            </div>
            <div className="text-xs text-gray-400">Top Exercise</div>
          </div>
        </div>
      </div>


      {/* Menu Items */}
      <div className="space-y-2 mb-8">
        {[
        'Account Settings',
        'Notifications',
        'Subscription',
        'Help & Support'].
        map((item) =>
        <button
          key={item}
          className="w-full flex items-center justify-between p-4 bg-dark-200 border border-dark-300 rounded-xl hover:bg-dark-300 transition-colors">
          
            <span className="font-medium">{item}</span>
            <span className="text-gray-500">→</span>
          </button>
        )}
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="w-full py-4 flex items-center justify-center gap-2 text-red-500 font-medium bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-colors">
        
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>
    </PageTransition>);

};