import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Activity, ChevronRight, Play, Loader } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';
import { useStore } from '../store/useStore';
import { PageTransition } from '../components/PageTransition';
import { MuscleHeatmapSVG } from '../components/MuscleHeatmapSVG';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, workouts, dashboardStats, imbalanceReport, analyticsLoading, workoutsLoading } = useStore();
  const recentWorkouts = workouts.slice(0, 3);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  // Build chart data from last 7 days of workouts
  const weeklyData = (() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const result = days.map((day) => ({ day, volume: 0 }));
    workouts.forEach((w) => {
      const d = new Date(w.date);
      const dayIdx = d.getDay();
      const totalSets = w.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
      result[dayIdx].volume += totalSets * 10; // approximate volume
    });
    // Rotate so today is last
    const todayIdx = new Date().getDay();
    return [...result.slice(todayIdx + 1), ...result.slice(0, todayIdx + 1)];
  })();

  const balanceScore = imbalanceReport?.imbalanceScore ?? dashboardStats?.totalWorkouts ? 78 : null;
  const undertrainedNote = imbalanceReport?.undertrainedMuscles?.length
    ? `Your ${imbalanceReport.undertrainedMuscles.slice(0, 2).join(' and ')} need more attention.`
    : 'Keep training consistently for imbalance insights.';

  return (
    <PageTransition className="p-6 pb-24 space-y-8">
      {/* Greeting */}
      <div>
        <p className="text-gray-400 text-sm mb-1">{today}</p>
        <h1 className="text-2xl font-bold">Ready to crush it, {user?.name ?? 'Athlete'}?</h1>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-dark-200 border border-dark-300 rounded-2xl p-4 flex flex-col">
          <div className="flex items-center gap-2 text-warning mb-2">
            <Flame className="w-5 h-5" />
            <span className="font-medium text-sm">Workouts</span>
          </div>
          {workoutsLoading ? (
            <Loader className="w-5 h-5 animate-spin text-gray-500" />
          ) : (
            <>
              <span className="text-2xl font-bold">{dashboardStats?.totalWorkouts ?? workouts.length}</span>
              <span className="text-xs text-gray-400 mt-1">Last 30 days</span>
            </>
          )}
        </div>

        <div className="bg-dark-200 border border-dark-300 rounded-2xl p-4 flex flex-col relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Activity className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-2 text-accent mb-2">
            <Activity className="w-5 h-5" />
            <span className="font-medium text-sm">Balance</span>
          </div>
          {analyticsLoading ? (
            <Loader className="w-5 h-5 animate-spin text-gray-500" />
          ) : (
            <>
              <span className="text-2xl font-bold">
                {balanceScore !== null ? `${balanceScore}%` : '—'}
              </span>
              <span className="text-xs text-gray-400 mt-1">
                {balanceScore !== null
                  ? balanceScore >= 80
                    ? 'Excellent'
                    : balanceScore >= 60
                    ? 'Good overall'
                    : 'Needs work'
                  : 'Log workouts first'}
              </span>
            </>
          )}
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
          <p className="text-sm text-gray-400 mb-3">{undertrainedNote}</p>
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
        Start New Workout
      </button>

      {/* Activity Chart */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Weekly Volume</h3>
          {dashboardStats && (
            <span className="text-xs text-gray-400">
              {dashboardStats.totalDurationMinutes} min total
            </span>
          )}
        </div>
        <div className="h-40 w-full bg-dark-200 border border-dark-300 rounded-2xl p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#9ca3af' }}
              />
              <Tooltip
                cursor={{ fill: '#2a2a35' }}
                contentStyle={{
                  backgroundColor: '#1c1c26',
                  border: '1px solid #2a2a35',
                  borderRadius: '8px',
                }}
                itemStyle={{ color: '#3b82f6' }}
              />
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
          {workoutsLoading ? (
            <div className="flex justify-center py-8">
              <Loader className="w-6 h-6 animate-spin text-accent" />
            </div>
          ) : recentWorkouts.length === 0 ? (
            <div className="bg-dark-200 border border-dark-300 rounded-xl p-6 text-center text-gray-400 text-sm">
              No workouts yet. Log your first session!
            </div>
          ) : (
            recentWorkouts.map((workout) => (
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
            ))
          )}
        </div>
      </div>
    </PageTransition>
  );
};