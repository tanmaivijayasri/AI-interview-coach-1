
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../storage';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ token: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const savedToken = localStorage.getItem('reset_token');
    const resetEmail = localStorage.getItem('reset_email');

    if (formData.token !== savedToken) {
      setError('Invalid reset token.');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (resetEmail) {
      storage.updateUser(resetEmail, { password: formData.password });
      localStorage.removeItem('reset_token');
      localStorage.removeItem('reset_email');
      alert('Password updated successfully!');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden p-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Reset Password</h2>
        <p className="text-slate-500 mb-6">Create a new secure password for your account.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-600 text-sm">{error}</div>}
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Reset Token</label>
            <input 
              type="text" 
              required
              className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-center tracking-widest" 
              placeholder="PASTE TOKEN HERE"
              value={formData.token}
              onChange={e => setFormData({...formData, token: e.target.value.toUpperCase()})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">New Password</label>
            <input 
              type="password" 
              required
              className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm New Password</label>
            <input 
              type="password" 
              required
              className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
