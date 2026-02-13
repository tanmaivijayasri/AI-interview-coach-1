
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { storage } from '../storage';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const validatePassword = (pwd: string) => {
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const isLongEnough = pwd.length >= 8;
    return hasUpper && hasLower && hasNumber && isLongEnough;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (!formData.username || !formData.email || !formData.phone || !formData.password) {
      setError('All fields are mandatory.');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 8 chars, with 1 uppercase, 1 lowercase, and 1 number.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const users = storage.getUsers();
    if (users.some(u => u.email === formData.email)) {
      setError('Email already exists.');
      return;
    }
    if (users.some(u => u.username === formData.username)) {
      setError('Username is already taken.');
      return;
    }

    // Success - Create user
    const newUser = {
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      profile: {},
      resume: {},
      sessions: [],
      performanceScore: 0,
      practiceCount: 0
    };

    users.push(newUser);
    storage.saveUsers(users);
    
    alert('Registration successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="bg-blue-600 p-8 text-white text-center">
          <i className="fas fa-user-plus text-4xl mb-4"></i>
          <h2 className="text-2xl font-bold">Create Account</h2>
          <p className="text-blue-100 mt-2">Join the AI coaching platform today</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">{error}</div>}
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
            <input 
              type="text" 
              className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
              placeholder="johndoe123"
              value={formData.username}
              onChange={e => setFormData({...formData, username: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                placeholder="john@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Phone</label>
              <input 
                type="tel" 
                className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                placeholder="1234567890"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Confirm Password</label>
            <input 
              type="password" 
              className="w-full border border-slate-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-100 mt-2">
            Register Now
          </button>

          <p className="text-center text-slate-500 text-sm mt-4">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
