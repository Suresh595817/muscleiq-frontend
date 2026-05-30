import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, Search, X } from 'lucide-react';
import {
  useStore,
  Exercise,
  WorkoutExercise,
  WorkoutSet } from
'../store/useStore';
import { PageTransition } from '../components/PageTransition';
export const AddWorkout: React.FC = () => {
  const navigate = useNavigate();
  const { exercises, addWorkout } = useStore();
  const [workoutName, setWorkoutName] = useState('Custom Workout');
  const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    []
  );
  const [isSelecting, setIsSelecting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredExercises = exercises.filter(
    (e) =>
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.primaryMuscles.some((m) =>
    m.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  const handleAddExercise = (exerciseId: string) => {
    setWorkoutExercises([
    ...workoutExercises,
    {
      exerciseId,
      sets: [
      {
        reps: 0,
        weight: 0
      }]

    }]
    );
    setIsSelecting(false);
    setSearchQuery('');
  };
  const handleAddSet = (exerciseIndex: number) => {
    const newExercises = [...workoutExercises];
    const lastSet =
    newExercises[exerciseIndex].sets[
    newExercises[exerciseIndex].sets.length - 1];

    newExercises[exerciseIndex].sets.push({
      reps: lastSet ? lastSet.reps : 0,
      weight: lastSet ? lastSet.weight : 0
    });
    setWorkoutExercises(newExercises);
  };
  const handleUpdateSet = (
  exerciseIndex: number,
  setIndex: number,
  field: keyof WorkoutSet,
  value: number) =>
  {
    const newExercises = [...workoutExercises];
    newExercises[exerciseIndex].sets[setIndex][field] = value;
    setWorkoutExercises(newExercises);
  };
  const handleRemoveSet = (exerciseIndex: number, setIndex: number) => {
    const newExercises = [...workoutExercises];
    newExercises[exerciseIndex].sets.splice(setIndex, 1);
    if (newExercises[exerciseIndex].sets.length === 0) {
      newExercises.splice(exerciseIndex, 1);
    }
    setWorkoutExercises(newExercises);
  };
  const handleSave = () => {
    if (workoutExercises.length === 0) return;
    addWorkout({
      name: workoutName,
      date: new Date().toISOString(),
      duration: 45,
      exercises: workoutExercises
    });
    navigate('/history');
  };
  if (isSelecting) {
    return (
      <PageTransition className="flex flex-col h-full bg-dark z-50 absolute inset-0">
        <div className="p-4 border-b border-dark-300 flex items-center gap-3 glass">
          <button
            onClick={() => setIsSelecting(false)}
            className="p-2 -ml-2 text-gray-400 hover:text-white">
            
            <X className="w-6 h-6" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              autoFocus
              placeholder="Search exercises or muscles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-dark-200 border border-dark-300 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-accent" />
            
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredExercises.map((ex) =>
          <div
            key={ex.id}
            onClick={() => handleAddExercise(ex.id)}
            className="bg-dark-200 border border-dark-300 rounded-xl p-4 cursor-pointer hover:border-accent transition-colors">
            
              <h4 className="font-medium mb-2">{ex.name}</h4>
              <div className="flex flex-wrap gap-1">
                {ex.primaryMuscles.map((m) =>
              <span
                key={m}
                className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                
                    {m}
                  </span>
              )}
                {ex.secondaryMuscles.map((m) =>
              <span
                key={m}
                className="text-[10px] bg-dark-300 text-gray-400 px-2 py-0.5 rounded-full">
                
                    {m}
                  </span>
              )}
              </div>
            </div>
          )}
        </div>
      </PageTransition>);

  }
  return (
    <PageTransition className="flex flex-col h-full">
      <div className="p-6 flex-1 overflow-y-auto pb-24">
        <input
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="text-2xl font-bold bg-transparent border-none focus:outline-none w-full mb-6 placeholder-gray-600"
          placeholder="Workout Name" />
        

        <div className="space-y-6">
          {workoutExercises.map((we, eIdx) => {
            const exercise = exercises.find((e) => e.id === we.exerciseId);
            if (!exercise) return null;
            return (
              <div
                key={eIdx}
                className="bg-dark-200 border border-dark-300 rounded-2xl p-4">
                
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-accent">{exercise.name}</h3>
                </div>

                <div className="space-y-2">
                  <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-3 px-2 text-xs text-gray-500 font-medium mb-2">
                    <div className="w-6 text-center">Set</div>
                    <div className="text-center">lbs</div>
                    <div className="text-center">Reps</div>
                    <div className="w-6"></div>
                  </div>

                  {we.sets.map((set, sIdx) =>
                  <div
                    key={sIdx}
                    className="grid grid-cols-[auto_1fr_1fr_auto] gap-3 items-center">
                    
                      <div className="w-6 text-center text-sm font-medium text-gray-400 bg-dark-300 rounded py-1.5">
                        {sIdx + 1}
                      </div>
                      <input
                      type="number"
                      value={set.weight || ''}
                      onChange={(e) =>
                      handleUpdateSet(
                        eIdx,
                        sIdx,
                        'weight',
                        Number(e.target.value)
                      )
                      }
                      className="bg-dark-300 border border-dark-300 rounded-lg py-1.5 text-center text-sm focus:outline-none focus:border-accent"
                      placeholder="0" />
                    
                      <input
                      type="number"
                      value={set.reps || ''}
                      onChange={(e) =>
                      handleUpdateSet(
                        eIdx,
                        sIdx,
                        'reps',
                        Number(e.target.value)
                      )
                      }
                      className="bg-dark-300 border border-dark-300 rounded-lg py-1.5 text-center text-sm focus:outline-none focus:border-accent"
                      placeholder="0" />
                    
                      <button
                      onClick={() => handleRemoveSet(eIdx, sIdx)}
                      className="w-6 flex justify-center text-gray-500 hover:text-red-500">
                      
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleAddSet(eIdx)}
                  className="w-full mt-4 py-2 text-sm text-accent font-medium bg-accent/10 rounded-lg hover:bg-accent/20 transition-colors">
                  
                  + Add Set
                </button>
              </div>);

          })}
        </div>

        <button
          onClick={() => setIsSelecting(true)}
          className="w-full mt-6 py-4 border-2 border-dashed border-dark-300 rounded-2xl text-gray-400 font-medium hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-2">
          
          <Plus className="w-5 h-5" />
          Add Exercise
        </button>
      </div>

      {/* Sticky Save Button */}
      {workoutExercises.length > 0 &&
      <div className="absolute bottom-20 left-0 right-0 p-4 bg-gradient-to-t from-dark via-dark to-transparent pt-12">
          <button
          onClick={handleSave}
          className="w-full bg-accent hover:bg-accent-hover text-white font-semibold rounded-xl py-4 flex items-center justify-center gap-2 shadow-glow">
          
            <Save className="w-5 h-5" />
            Finish Workout
          </button>
        </div>
      }
    </PageTransition>);

};