
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../storage';
import { AuthState } from '../types';

interface LoginProps {
  onLogin: (session: AuthState) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = storage.getUsers();
    const user = users.find(u => u.username === formData.username && u.password === formData.password);

    if (user) {
      const sessionToken = Math.random().toString(36).substring(2) + Date.now().toString(36);
      const sessionData: AuthState = { currentUser: user, sessionToken };
      
      storage.setSession(sessionData);
      onLogin(sessionData);
      navigate('/dashboard');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 p-8 text-white text-center">
          <i className="fas fa-lock text-4xl mb-4"></i>
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-blue-100 mt-2">Please login to access your dashboard</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">{error}</div>}
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <i className="fas fa-user"></i>
              </span>
              <input 
                type="text" 
                className="w-full border border-slate-200 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                placeholder="Enter username"
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="block text-sm font-semibold text-slate-700">Password</label>
              {/* Fix: Removed invalid 'size' prop from Link component which caused a TS error */}
              <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">Forgot?</Link>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                <i className="fas fa-key"></i>
              </span>
              <input 
                type="password" 
                className="w-full border border-slate-200 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                placeholder="Enter password"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-100">
            Sign In
          </button>

          <p className="text-center text-slate-500 text-sm mt-4">
            Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Create one</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
