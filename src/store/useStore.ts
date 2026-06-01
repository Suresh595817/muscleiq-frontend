import { create } from 'zustand';
import {
  authApi,
  workoutApi,
  analyticsApi,
  exerciseApi,
  clearToken,
  getToken,
  ApiUser,
  ApiWorkout,
  ApiExercise,
  ApiImbalanceReport,
  ApiDashboardStats,
} from '../services/api';

// ─── Types ────────────────────────────────────────────────────────────────────
export type MuscleGroup =
  | 'Chest'
  | 'Upper Back'
  | 'Lats'
  | 'Front Delts'
  | 'Side Delts'
  | 'Rear Delts'
  | 'Biceps'
  | 'Triceps'
  | 'Forearms'
  | 'Abs'
  | 'Obliques'
  | 'Quads'
  | 'Hamstrings'
  | 'Glutes'
  | 'Calves';

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
  duration: number;
  exercises: WorkoutExercise[];
}

// ─── App State ────────────────────────────────────────────────────────────────
interface AppState {
  // Auth
  isLoggedIn: boolean;
  user: ApiUser | null;
  authLoading: boolean;
  authError: string | null;

  // Workouts
  workouts: Workout[];
  workoutsLoading: boolean;
  workoutsError: string | null;

  // Exercises
  exercises: Exercise[];
  exercisesLoading: boolean;

  // Analytics
  imbalanceReport: ApiImbalanceReport | null;
  dashboardStats: ApiDashboardStats | null;
  analyticsLoading: boolean;
  analyticsError: string | null;

  // Actions - Auth
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;

  // Actions - Workouts
  loadWorkouts: () => Promise<void>;
  addWorkout: (payload: {
    name: string;
    duration: number;
    notes?: string;
    exercises: Array<{
      exerciseName: string;
      primaryMuscle: string;
      sets: Array<{ reps: number; weight: number }>;
    }>;
  }) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;

  // Actions - Exercises
  loadExercises: () => Promise<void>;

  // Actions - Analytics
  loadAnalytics: () => Promise<void>;

  // Helpers
  getMuscleScore: (muscle: MuscleGroup) => {
    score: number;
    status: 'balanced' | 'undertrained' | 'neglected' | 'overtrained';
  };
  clearAuthError: () => void;
}

// ─── Helper: Map ApiWorkout to local Workout ──────────────────────────────────
function mapApiWorkout(w: ApiWorkout): Workout {
  return {
    id: w.id,
    date: w.date,
    name: w.name,
    duration: w.duration,
    exercises: (w.workout_exercises || []).map((we) => ({
      exerciseId: we.exercise_id,
      sets: (we.workout_sets || []).map((s) => ({ reps: s.reps, weight: s.weight })),
    })),
  };
}

// ─── Helper: Map ApiExercise to local Exercise ────────────────────────────────
function mapApiExercise(e: ApiExercise): Exercise {
  return {
    id: e.id,
    name: e.name,
    primaryMuscles: [e.primary_muscle as MuscleGroup].filter(Boolean),
    secondaryMuscles: (e.secondary_muscles || []) as MuscleGroup[],
  };
}

// ─── Store ────────────────────────────────────────────────────────────────────
export const useStore = create<AppState>((set, get) => ({
  // ── Initial State ────────────────────────────────────────────────────────────
  isLoggedIn: false,
  user: null,
  authLoading: false,
  authError: null,

  workouts: [],
  workoutsLoading: false,
  workoutsError: null,

  exercises: [],
  exercisesLoading: false,

  imbalanceReport: null,
  dashboardStats: null,
  analyticsLoading: false,
  analyticsError: null,

  // ── Auth Actions ─────────────────────────────────────────────────────────────
  register: async (name, email, password) => {
    set({ authLoading: true, authError: null });
    try {
      const user = await authApi.register(name, email, password);
      set({ isLoggedIn: true, user, authLoading: false });
      // Load data after successful auth
      get().loadWorkouts();
      get().loadExercises();
      get().loadAnalytics();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || 'Registration failed. Try again.';
      set({ authLoading: false, authError: msg });
      throw new Error(msg);
    }
  },

  login: async (email, password) => {
    set({ authLoading: true, authError: null });
    try {
      const user = await authApi.login(email, password);
      set({ isLoggedIn: true, user, authLoading: false });
      get().loadWorkouts();
      get().loadExercises();
      get().loadAnalytics();
    } catch (err: any) {
      const msg =
        err?.response?.data?.message || err?.message || 'Login failed. Check your credentials.';
      set({ authLoading: false, authError: msg });
      throw new Error(msg);
    }
  },

  logout: () => {
    clearToken();
    set({
      isLoggedIn: false,
      user: null,
      workouts: [],
      imbalanceReport: null,
      dashboardStats: null,
      authError: null,
    });
  },

  checkAuth: async () => {
    if (!getToken()) return;
    try {
      const user = await authApi.getMe();
      if (user) {
        set({ isLoggedIn: true, user });
        get().loadWorkouts();
        get().loadExercises();
        get().loadAnalytics();
      } else {
        clearToken();
      }
    } catch {
      clearToken();
    }
  },

  clearAuthError: () => set({ authError: null }),

  // ── Workout Actions ───────────────────────────────────────────────────────────
  loadWorkouts: async () => {
    set({ workoutsLoading: true, workoutsError: null });
    try {
      const data = await workoutApi.getWorkouts();
      set({ workouts: data.map(mapApiWorkout), workoutsLoading: false });
    } catch (err: any) {
      set({
        workoutsLoading: false,
        workoutsError: err?.response?.data?.message || 'Failed to load workouts.',
      });
    }
  },

  addWorkout: async (payload) => {
    set({ workoutsLoading: true, workoutsError: null });
    try {
      await workoutApi.addWorkout(payload);
      // Reload workouts and analytics after adding
      get().loadWorkouts();
      get().loadAnalytics();
      set({ workoutsLoading: false });
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Failed to log workout.';
      set({ workoutsLoading: false, workoutsError: msg });
      throw new Error(msg);
    }
  },

  deleteWorkout: async (id) => {
    try {
      await workoutApi.deleteWorkout(id);
      set((state) => ({ workouts: state.workouts.filter((w) => w.id !== id) }));
      get().loadAnalytics();
    } catch (err: any) {
      set({ workoutsError: err?.response?.data?.message || 'Failed to delete workout.' });
    }
  },

  // ── Exercise Actions ─────────────────────────────────────────────────────────
  loadExercises: async () => {
    set({ exercisesLoading: true });
    try {
      const data = await exerciseApi.getExercises();
      set({ exercises: data.map(mapApiExercise), exercisesLoading: false });
    } catch {
      set({ exercisesLoading: false });
    }
  },

  // ── Analytics Actions ─────────────────────────────────────────────────────────
  loadAnalytics: async () => {
    set({ analyticsLoading: true, analyticsError: null });
    try {
      const [imbalanceReport, dashboardStats] = await Promise.all([
        analyticsApi.getImbalance(),
        analyticsApi.getDashboard(),
      ]);
      set({ imbalanceReport, dashboardStats, analyticsLoading: false });
    } catch (err: any) {
      set({
        analyticsLoading: false,
        analyticsError: err?.response?.data?.message || 'Failed to load analytics.',
      });
    }
  },

  // ── Helper ────────────────────────────────────────────────────────────────────
  getMuscleScore: (muscle) => {
    const { imbalanceReport } = get();
    const heatmap = imbalanceReport?.muscleHeatmap || {};
    const score = heatmap[muscle] ?? 50;

    let status: 'balanced' | 'undertrained' | 'neglected' | 'overtrained' = 'balanced';
    if (score >= 70) status = 'balanced';
    else if (score >= 45) status = 'undertrained';
    else status = 'neglected';
    if (score > 95) status = 'overtrained';

    return { score, status };
  },
}));