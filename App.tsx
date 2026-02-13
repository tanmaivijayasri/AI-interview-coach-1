
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { storage } from './storage';
import { AuthState } from './types';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ResumeUpload from './pages/ResumeUpload';
import Sessions from './pages/Sessions';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const session = storage.getSession();
  if (!session.sessionToken) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>(storage.getSession());

  const handleLogin = (session: AuthState) => {
    setAuthState(session);
  };

  const handleLogout = () => {
    storage.clearSession();
    setAuthState({ currentUser: null, sessionToken: null });
  };

  return (
    <HashRouter>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard user={authState.currentUser!} onLogout={handleLogout} />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile user={authState.currentUser!} onUpdate={() => setAuthState(storage.getSession())} />
            </ProtectedRoute>
          } />
          
          <Route path="/resume" element={
            <ProtectedRoute>
              <ResumeUpload user={authState.currentUser!} onUpdate={() => setAuthState(storage.getSession())} />
            </ProtectedRoute>
          } />
          
          <Route path="/sessions" element={
            <ProtectedRoute>
              <Sessions user={authState.currentUser!} />
            </ProtectedRoute>
          } />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
