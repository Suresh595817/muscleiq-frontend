import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { WorkoutHistory } from './pages/WorkoutHistory';
import { AddWorkout } from './pages/AddWorkout';
import { MuscleMap } from './pages/MuscleMap';
import { Profile } from './pages/Profile';
import { SplashScreen } from './components/SplashScreen';
import { useStore } from './store/useStore';

export function App() {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const checkAuth = useStore((state) => state.checkAuth);
  const [showSplash, setShowSplash] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);

  // On app launch, check if a JWT token exists and restore session
  useEffect(() => {
    checkAuth().finally(() => setAuthChecked(true));
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && authChecked &&
        <BrowserRouter>
          <Layout>
            <Routes>
              {!isLoggedIn ? (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/history" element={<WorkoutHistory />} />
                  <Route path="/add" element={<AddWorkout />} />
                  <Route path="/muscles" element={<MuscleMap />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              )}
            </Routes>
          </Layout>
        </BrowserRouter>
      }
    </>
  );
}