
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../storage';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');

  const handleForgot = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const users = storage.getUsers();
    const user = users.find(u => u.email === email);

    if (user) {
      const generatedToken = Math.random().toString(36).substring(7).toUpperCase();
      localStorage.setItem('reset_token', generatedToken);
      localStorage.setItem('reset_email', email);
      setToken(generatedToken);
    } else {
      setError('Email not found.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Forgot Password?</h2>
        <p className="text-slate-500 mb-6">Enter your email and we'll help you reset it.</p>
        
        {!token ? (
          <form onSubmit={handleForgot} className="space-y-4">
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
              <input 
                type="email" 
                required
                className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="john@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
              Verify Email
            </button>
          </form>
        ) : (
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 text-center">
            <p className="text-blue-800 mb-4">Simulation: Reset token generated!</p>
            <div className="text-3xl font-mono font-bold tracking-widest text-blue-600 mb-6">{token}</div>
            <Link to="/reset-password" title="Proceed" className="block w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
              Proceed to Reset
            </Link>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Link to="/login" className="text-sm text-slate-500 hover:text-blue-600 font-medium">
            <i className="fas fa-arrow-left mr-2"></i> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
