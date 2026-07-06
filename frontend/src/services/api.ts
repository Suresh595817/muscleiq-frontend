import axios from 'axios';

// ─── Base URL ────────────────────────────────────────────────────────────────
// In dev, backend runs on localhost:5000. In production, set VITE_API_URL on Netlify.
const BASE_URL = import.meta.env.VITE_API_URL || 'https://muscleiq-backend.onrender.com/api/v1';

// ─── Token Management ─────────────────────────────────────────────────────────
export const saveToken = (token: string) => localStorage.setItem('muscleiq_token', token);
export const getToken = () => localStorage.getItem('muscleiq_token');
export const clearToken = () => localStorage.removeItem('muscleiq_token');

// ─── Axios Instance ───────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT to every outgoing request
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Types ────────────────────────────────────────────────────────────────────
export interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface ApiWorkout {
  id: string;
  name: string;
  date: string;
  duration: number;
  notes?: string;
  workout_exercises?: ApiWorkoutExercise[];
}

export interface ApiWorkoutExercise {
  id: string;
  exercise_id: string;
  order_index: number;
  workout_sets?: ApiWorkoutSet[];
  exercises?: { name: string; primary_muscle?: string };
}

export interface ApiWorkoutSet {
  id: string;
  set_number: number;
  reps: number;
  weight: number;
}

export interface ApiExercise {
  id: string;
  name: string;
  primary_muscle: string;
  secondary_muscles?: string[];
  is_custom: boolean;
}

export interface ApiImbalanceReport {
  imbalanceScore?: number;
  muscleHeatmap?: Record<string, number>;
  undertrainedMuscles?: string[];
  overtrainedMuscles?: string[];
  weeklyConsistency?: number;
  suggestions?: string[];
}

export interface ApiDashboardStats {
  totalWorkouts: number;
  totalDurationMinutes: number;
  totalSets: number;
  totalReps: number;
  totalVolumeKg: number;
  favoriteExercise?: string;
}

// ─── Auth Endpoints ───────────────────────────────────────────────────────────
export const authApi = {
  register: async (name: string, email: string, password: string) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    if (data.token) saveToken(data.token);
    return data.user as ApiUser;
  },

  login: async (email: string, password: string) => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.token) saveToken(data.token);
    return data.user as ApiUser;
  },

  getMe: async (): Promise<ApiUser | null> => {
    try {
      const { data } = await api.get('/auth/me');
      return data.data as ApiUser;
    } catch {
      return null;
    }
  },
};

// ─── Workout Endpoints ────────────────────────────────────────────────────────
export const workoutApi = {
  getWorkouts: async (): Promise<ApiWorkout[]> => {
    const { data } = await api.get('/workouts?limit=50');
    return data.data as ApiWorkout[];
  },

  addWorkout: async (payload: {
    name: string;
    duration: number;
    notes?: string;
    exercises: Array<{
      exerciseName: string;
      primaryMuscle: string;
      sets: Array<{ reps: number; weight: number }>;
    }>;
  }) => {
    const { data } = await api.post('/workouts', payload);
    return data.data as ApiWorkout;
  },

  deleteWorkout: async (id: string) => {
    await api.delete(`/workouts/${id}`);
  },
};

// ─── Analytics Endpoints ──────────────────────────────────────────────────────
export const analyticsApi = {
  getImbalance: async (): Promise<ApiImbalanceReport> => {
    const { data } = await api.get('/analytics/imbalance');
    return data.data as ApiImbalanceReport;
  },

  getDashboard: async (): Promise<ApiDashboardStats> => {
    const { data } = await api.get('/analytics/dashboard');
    return (data.data?.summary30Days || data.data) as ApiDashboardStats;
  },
};

// ─── Exercise/Muscle Endpoints ────────────────────────────────────────────────
export const exerciseApi = {
  getExercises: async (): Promise<ApiExercise[]> => {
    const { data } = await api.get('/muscles/exercises');
    return data.data as ApiExercise[];
  },
};

export default api;
