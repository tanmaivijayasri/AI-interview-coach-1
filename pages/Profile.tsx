
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserProfile } from '../types';
import { storage } from '../storage';

interface ProfileProps {
  user: User;
  onUpdate: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserProfile>(user.profile);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    storage.updateUser(user.email, {
      profile: formData,
      email,
      phone
    });
    setSuccess(true);
    onUpdate();
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
        <Link to="/dashboard" className="flex items-center space-x-2 text-slate-300 hover:text-white transition">
          <i className="fas fa-arrow-left"></i>
          <span className="font-medium">Back to Dashboard</span>
        </Link>
        <span className="font-bold text-lg">My Profile</span>
        <div className="w-10"></div> {/* Spacer */}
      </nav>

      <main className="flex-grow p-6 md:p-10 overflow-y-auto">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <div className="h-32 bg-blue-600 relative">
            <div className="absolute -bottom-12 left-8 w-24 h-24 bg-white rounded-2xl border-4 border-white shadow-lg flex items-center justify-center text-slate-300 text-4xl">
              <i className="fas fa-user-circle"></i>
            </div>
          </div>
          
          <div className="pt-16 pb-8 px-8">
            <h2 className="text-2xl font-bold text-slate-900">{user.username}</h2>
            <p className="text-slate-500">Student Account</p>
          </div>

          <form onSubmit={handleSave} className="p-8 space-y-10 border-t border-slate-100">
            {success && (
              <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 flex items-center">
                <i className="fas fa-check-circle mr-3"></i>
                Profile updated successfully!
              </div>
            )}

            {/* Personal Details Section */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                  <i className="fas fa-user-edit text-sm"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-800">Personal Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Gender</label>
                  <select 
                    className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    value={formData.gender || ''}
                    onChange={e => setFormData({...formData, gender: e.target.value})}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Date of Birth</label>
                  <input 
                    type="date" 
                    className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    value={formData.dob || ''}
                    onChange={e => setFormData({...formData, dob: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-600 mb-2">College Name</label>
                  <input 
                    type="text" 
                    className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="University of Science and Tech"
                    value={formData.collegeName || ''}
                    onChange={e => setFormData({...formData, collegeName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Branch</label>
                  <input 
                    type="text" 
                    className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="Computer Science"
                    value={formData.branch || ''}
                    onChange={e => setFormData({...formData, branch: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Graduation Year</label>
                  <select 
                    className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    value={formData.gradYear || ''}
                    onChange={e => setFormData({...formData, gradYear: e.target.value})}
                  >
                    <option value="">Select Year</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Professional Details Section */}
            <div className="pt-6 border-t border-slate-50">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                  <i className="fas fa-briefcase text-sm"></i>
                </div>
                <h3 className="text-lg font-bold text-slate-800">Professional Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Desired Job Role</label>
                  <select 
                    className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    value={formData.jobRole || ''}
                    onChange={e => setFormData({...formData, jobRole: e.target.value})}
                  >
                    <option value="">Select Role</option>
                    <option value="Frontend">Frontend Developer</option>
                    <option value="Backend">Backend Developer</option>
                    <option value="Full Stack">Full Stack Developer</option>
                    <option value="Data Science">Data Scientist</option>
                    <option value="DevOps">DevOps Engineer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Experience Level</label>
                  <select 
                    className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    value={formData.experienceLevel || ''}
                    onChange={e => setFormData({...formData, experienceLevel: e.target.value})}
                  >
                    <option value="">Select Level</option>
                    <option value="Fresher">Fresher (Student)</option>
                    <option value="1-2 years">1-2 years</option>
                    <option value="3+ years">3+ years</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-600 mb-2">Skills (Comma separated)</label>
                  <input 
                    type="text" 
                    className="w-full border border-slate-200 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
                    placeholder="React, Node.js, Python, AWS..."
                    value={formData.skills || ''}
                    onChange={e => setFormData({...formData, skills: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button type="submit" className="flex-grow bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition shadow-lg shadow-blue-100">
                Save Profile Changes
              </button>
              <Link to="/dashboard" className="bg-slate-100 text-slate-600 font-bold py-4 px-8 rounded-2xl hover:bg-slate-200 transition">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
