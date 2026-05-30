import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Activity, ChevronRight, Play } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { useStore } from '../store/useStore';
import { PageTransition } from '../components/PageTransition';
import { MuscleHeatmapSVG } from '../components/MuscleHeatmapSVG';
const weeklyData = [
{
  day: 'Mon',
  volume: 12000
},
{
  day: 'Tue',
  volume: 15000
},
{
  day: 'Wed',
  volume: 0
},
{
  day: 'Thu',
  volume: 18000
},
{
  day: 'Fri',
  volume: 14000
},
{
  day: 'Sat',
  volume: 0
},
{
  day: 'Sun',
  volume: 8000
}];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, workouts } = useStore();
  const recentWorkouts = workouts.slice(0, 3);
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });
  return (
    <PageTransition className="p-6 pb-24 space-y-8">
      {/* Greeting */}
      <div>
        <p className="text-gray-400 text-sm mb-1">{today}</p>
        <h1 className="text-2xl font-bold">Ready to crush it, {user?.name}?</h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-200 border border-dark-300 rounded-2xl p-4 flex flex-col">
          <div className="flex items-center gap-2 text-warning mb-2">
            <Flame className="w-5 h-5" />
            <span className="font-medium text-sm">Streak</span>
          </div>
          <span className="text-2xl font-bold">4 Days</span>
          <span className="text-xs text-gray-400 mt-1">Personal best: 12</span>
        </div>

        <div className="bg-dark-200 border border-dark-300 rounded-2xl p-4 flex flex-col relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Activity className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-2 text-accent mb-2">
            <Activity className="w-5 h-5" />
            <span className="font-medium text-sm">Balance</span>
          </div>
          <span className="text-2xl font-bold">78%</span>
          <span className="text-xs text-gray-400 mt-1">Good overall</span>
        </div>
      </div>

      {/* Mini Heatmap Card */}
      <div
        onClick={() => navigate('/muscles')}
        className="bg-dark-200 border border-dark-300 rounded-2xl p-5 flex items-center gap-6 cursor-pointer hover:bg-dark-300 transition-colors">
        
        <div className="w-20 h-32 flex-shrink-0">
          <MuscleHeatmapSVG view="front" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">Muscle Insights</h3>
          <p className="text-sm text-gray-400 mb-3">
            Your hamstrings and calves need more attention.
          </p>
          <div className="flex items-center text-accent text-sm font-medium">
            View full map <ChevronRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      {/* Start Workout CTA */}
      <button
        onClick={() => navigate('/add')}
        className="w-full bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl py-4 flex items-center justify-center gap-2 transition-all shadow-glow active:scale-[0.98]">
        
        <Play className="w-5 h-5 fill-current" />
        Start Empty Workout
      </button>

      {/* Activity Chart */}
      <div>
        <h3 className="font-semibold mb-4">Weekly Volume</h3>
        <div className="h-40 w-full bg-dark-200 border border-dark-300 rounded-2xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 10,
                  fill: '#9ca3af'
                }} />
              
              <Tooltip
                cursor={{
                  fill: '#2a2a35'
                }}
                contentStyle={{
                  backgroundColor: '#1c1c26',
                  border: '1px solid #2a2a35',
                  borderRadius: '8px'
                }}
                itemStyle={{
                  color: '#3b82f6'
                }} />
              
              <Bar dataKey="volume" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Workouts */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Recent Workouts</h3>
          <button
            onClick={() => navigate('/history')}
            className="text-sm text-gray-400 hover:text-white">
            
            View all
          </button>
        </div>
        <div className="space-y-3">
          {recentWorkouts.map((workout) =>
          <div
            key={workout.id}
            className="bg-dark-200 border border-dark-300 rounded-xl p-4 flex justify-between items-center">
            
              <div>
                <h4 className="font-medium">{workout.name}</h4>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(workout.date).toLocaleDateString()} •{' '}
                  {workout.duration} min • {workout.exercises.length} exercises
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500" />
            </div>
          )}
        </div>
      </div>
    </PageTransition>);

};