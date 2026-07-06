import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { ArrowLeft, Bell, Zap, Trophy, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Notifications: React.FC = () => {
  const navigate = useNavigate();

  const notifications = [
    { id: 1, title: 'Workout Complete!', desc: 'You crushed your Leg Day workout.', time: '2 hours ago', icon: <Zap className="text-accent w-5 h-5" />, bg: 'bg-accent/20' },
    { id: 2, title: 'New Achievement', desc: 'Consistency is key! 3 workouts this week.', time: '1 day ago', icon: <Trophy className="text-warning w-5 h-5" />, bg: 'bg-warning/20' },
    { id: 3, title: 'Imbalance Alert', desc: 'Your chest volume is 40% higher than your back. Time for some rows!', time: '2 days ago', icon: <HeartPulse className="text-red-500 w-5 h-5" />, bg: 'bg-red-500/20' },
  ];

  return (
    <PageTransition className="p-6 pb-24">
      <div className="flex items-center mb-8">
        <button onClick={() => navigate(-1)} className="p-2 mr-4 text-gray-400 hover:text-white bg-dark-200 rounded-full border border-dark-300">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Notifications</h1>
      </div>

      <div className="space-y-4">
        {notifications.length > 0 ? (
          notifications.map(n => (
            <div key={n.id} className="bg-dark-200 border border-dark-300 rounded-2xl p-4 flex gap-4 items-start">
              <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${n.bg}`}>
                {n.icon}
              </div>
              <div>
                <h3 className="font-bold text-white">{n.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{n.desc}</p>
                <span className="text-xs text-gray-500 mt-2 block">{n.time}</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 mt-20">
            <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>You have no new notifications.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
};
