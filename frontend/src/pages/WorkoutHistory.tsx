import React, { useState } from 'react';
import { Calendar, Clock, Dumbbell, ChevronDown, Trash2, Loader } from 'lucide-react';
import { useStore } from '../store/useStore';
import { PageTransition } from '../components/PageTransition';

export const WorkoutHistory: React.FC = () => {
  const { workouts, exercises, deleteWorkout, workoutsLoading, dashboardStats } = useStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const getExerciseName = (id: string) =>
    exercises.find((e) => e.id === id)?.name || 'Unknown Exercise';

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setDeletingId(id);
    await deleteWorkout(id);
    setDeletingId(null);
  };

  return (
    <PageTransition className="p-6 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">History</h1>
        <p className="text-gray-400 text-sm">Review your past performances.</p>
      </div>

      {/* Stats summary bar */}
      {dashboardStats && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-dark-200 border border-dark-300 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-accent">{dashboardStats.totalWorkouts}</div>
            <div className="text-xs text-gray-400 mt-1">Workouts</div>
          </div>
          <div className="bg-dark-200 border border-dark-300 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-accent">{dashboardStats.totalDurationMinutes}</div>
            <div className="text-xs text-gray-400 mt-1">Minutes</div>
          </div>
          <div className="bg-dark-200 border border-dark-300 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-accent">{dashboardStats.totalVolumeKg ?? dashboardStats.totalSets}</div>
            <div className="text-xs text-gray-400 mt-1">{dashboardStats.totalVolumeKg !== undefined ? 'Vol (kg)' : 'Sets'}</div>
          </div>
        </div>
      )}

      {workoutsLoading ? (
        <div className="flex justify-center py-16">
          <Loader className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : workouts.length === 0 ? (
        <div className="bg-dark-200 border border-dark-300 rounded-2xl p-10 text-center">
          <Dumbbell className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">No workouts logged yet.<br />Start your first session!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {workouts.map((workout) => {
            const isExpanded = expandedId === workout.id;
            const date = new Date(workout.date);
            const isDeleting = deletingId === workout.id;

            return (
              <div
                key={workout.id}
                className="bg-dark-200 border border-dark-300 rounded-2xl overflow-hidden transition-all">
                <div
                  className="p-4 cursor-pointer hover:bg-dark-300 transition-colors flex items-center justify-between"
                  onClick={() => setExpandedId(isExpanded ? null : workout.id)}>
                  <div>
                    <h3 className="font-semibold text-lg">{workout.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {date.toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {workout.duration}m
                      </span>
                      <span className="flex items-center gap-1">
                        <Dumbbell className="w-3 h-3" />
                        {workout.exercises.length} ex
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleDelete(e, workout.id)}
                      disabled={isDeleting}
                      className="text-gray-500 hover:text-red-400 transition-colors p-1">
                      {isDeleting ? (
                        <Loader className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-dark-300 bg-dark-100">
                    <div className="space-y-3 mt-2">
                      {workout.exercises.map((ex, idx) => (
                        <div key={idx} className="text-sm">
                          <div className="font-medium text-gray-200 mb-1">
                            {getExerciseName(ex.exerciseId)}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {ex.sets.map((set, sIdx) => (
                              <div
                                key={sIdx}
                                className="bg-dark-300 rounded px-2 py-1 text-xs text-gray-400">
                                <span className="text-white">{set.weight}</span> kg ×{' '}
                                <span className="text-white">{set.reps}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </PageTransition>
  );
};