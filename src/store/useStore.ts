import { create } from 'zustand';

export type MuscleGroup =
'Chest' |
'Upper Back' |
'Lats' |
'Front Delts' |
'Side Delts' |
'Rear Delts' |
'Biceps' |
'Triceps' |
'Forearms' |
'Abs' |
'Obliques' |
'Quads' |
'Hamstrings' |
'Glutes' |
'Calves';

export interface Exercise {
  id: string;
  name: string;
  primaryMuscles: MuscleGroup[];
  secondaryMuscles: MuscleGroup[];
}

export interface WorkoutSet {
  reps: number;
  weight: number;
}

export interface WorkoutExercise {
  exerciseId: string;
  sets: WorkoutSet[];
}

export interface Workout {
  id: string;
  date: string;
  name: string;
  duration: number; // minutes
  exercises: WorkoutExercise[];
}

interface AppState {
  isLoggedIn: boolean;
  user: {name: string;memberSince: string;} | null;
  exercises: Exercise[];
  workouts: Workout[];
  login: (email: string) => void;
  logout: () => void;
  addWorkout: (workout: Omit<Workout, 'id'>) => void;
  getMuscleScore: (
  muscle: MuscleGroup)
  => {
    score: number;
    status: 'balanced' | 'undertrained' | 'neglected' | 'overtrained';
  };
}

const MOCK_EXERCISES: Exercise[] = [
{
  id: 'e1',
  name: 'Bench Press',
  primaryMuscles: ['Chest', 'Front Delts'],
  secondaryMuscles: ['Triceps']
},
{
  id: 'e2',
  name: 'Pull-ups',
  primaryMuscles: ['Lats', 'Upper Back'],
  secondaryMuscles: ['Biceps', 'Forearms']
},
{
  id: 'e3',
  name: 'Squats',
  primaryMuscles: ['Quads', 'Glutes'],
  secondaryMuscles: ['Hamstrings', 'Abs']
},
{
  id: 'e4',
  name: 'Deadlifts',
  primaryMuscles: ['Hamstrings', 'Glutes', 'Upper Back'],
  secondaryMuscles: ['Lats', 'Forearms', 'Abs']
},
{
  id: 'e5',
  name: 'Overhead Press',
  primaryMuscles: ['Front Delts', 'Side Delts'],
  secondaryMuscles: ['Triceps', 'Upper Back']
},
{
  id: 'e6',
  name: 'Barbell Curls',
  primaryMuscles: ['Biceps'],
  secondaryMuscles: ['Forearms']
},
{
  id: 'e7',
  name: 'Tricep Extensions',
  primaryMuscles: ['Triceps'],
  secondaryMuscles: []
},
{
  id: 'e8',
  name: 'Calf Raises',
  primaryMuscles: ['Calves'],
  secondaryMuscles: []
},
{
  id: 'e9',
  name: 'Crunches',
  primaryMuscles: ['Abs'],
  secondaryMuscles: ['Obliques']
},
{
  id: 'e10',
  name: 'Lateral Raises',
  primaryMuscles: ['Side Delts'],
  secondaryMuscles: []
},
{
  id: 'e11',
  name: 'Face Pulls',
  primaryMuscles: ['Rear Delts', 'Upper Back'],
  secondaryMuscles: []
}];


const MOCK_WORKOUTS: Workout[] = [
{
  id: 'w1',
  date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // 1 day ago
  name: 'Push Day',
  duration: 55,
  exercises: [
  {
    exerciseId: 'e1',
    sets: [
    { reps: 8, weight: 135 },
    { reps: 8, weight: 135 },
    { reps: 6, weight: 145 }]

  },
  {
    exerciseId: 'e5',
    sets: [
    { reps: 10, weight: 95 },
    { reps: 10, weight: 95 }]

  },
  {
    exerciseId: 'e7',
    sets: [
    { reps: 12, weight: 40 },
    { reps: 12, weight: 40 }]

  }]

},
{
  id: 'w2',
  date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  name: 'Pull Day',
  duration: 60,
  exercises: [
  {
    exerciseId: 'e2',
    sets: [
    { reps: 10, weight: 0 },
    { reps: 8, weight: 0 }]

  },
  {
    exerciseId: 'e6',
    sets: [
    { reps: 12, weight: 60 },
    { reps: 12, weight: 60 }]

  }]

},
{
  id: 'w3',
  date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
  name: 'Leg Day',
  duration: 45,
  exercises: [
  {
    exerciseId: 'e3',
    sets: [
    { reps: 8, weight: 225 },
    { reps: 8, weight: 225 }]

  },
  {
    exerciseId: 'e8',
    sets: [
    { reps: 15, weight: 100 },
    { reps: 15, weight: 100 }]

  }]

}];


export const useStore = create<AppState>((set, get) => ({
  isLoggedIn: false,
  user: null,
  exercises: MOCK_EXERCISES,
  workouts: MOCK_WORKOUTS,

  login: (email) =>
  set({
    isLoggedIn: true,
    user: { name: email.split('@')[0] || 'Athlete', memberSince: '2024' }
  }),

  logout: () => set({ isLoggedIn: false, user: null }),

  addWorkout: (workout) =>
  set((state) => ({
    workouts: [{ ...workout, id: `w${Date.now()}` }, ...state.workouts]
  })),

  getMuscleScore: (muscle) => {
    // Mock logic to calculate muscle score based on recent workouts
    // In a real app, this would be a complex algorithm based on volume, frequency, and recovery

    // Hardcoded mock scores for demonstration to show different colors
    const mockScores: Record<string, number> = {
      Chest: 85, // Balanced
      'Front Delts': 90, // Balanced
      Triceps: 75, // Balanced
      Lats: 45, // Undertrained
      'Upper Back': 50, // Undertrained
      Biceps: 60, // Undertrained
      Quads: 80, // Balanced
      Hamstrings: 30, // Neglected
      Glutes: 40, // Neglected
      Calves: 20, // Neglected
      Abs: 15, // Neglected
      'Side Delts': 65, // Undertrained
      'Rear Delts': 25, // Neglected
      Forearms: 55, // Undertrained
      Obliques: 10 // Neglected
    };

    const score = mockScores[muscle] || 50;

    let status: 'balanced' | 'undertrained' | 'neglected' | 'overtrained' =
    'balanced';
    if (score >= 70) status = 'balanced';else
    if (score >= 45) status = 'undertrained';else
    status = 'neglected';

    // Just for demo, let's make chest overtrained if score > 95
    if (score > 95) status = 'overtrained';

    return { score, status };
  }
}));