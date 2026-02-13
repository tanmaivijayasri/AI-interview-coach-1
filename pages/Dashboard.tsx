
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

interface DashboardProps {
  user: User;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800 flex items-center space-x-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <i className="fas fa-robot text-lg"></i>
          </div>
          <span className="font-bold text-xl">AI Coach</span>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg bg-blue-600 text-white font-medium">
            <i className="fas fa-home w-5 text-center"></i>
            <span>Dashboard</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-3 p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition">
            <i className="fas fa-user w-5 text-center"></i>
            <span>Profile</span>
          </Link>
          <Link to="/resume" className="flex items-center space-x-3 p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition">
            <i className="fas fa-file-upload w-5 text-center"></i>
            <span>Upload Resume</span>
          </Link>
          <Link to="/sessions" className="flex items-center space-x-3 p-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition">
            <i className="fas fa-history w-5 text-center"></i>
            <span>Past Sessions</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={onLogout} className="flex items-center space-x-3 p-3 w-full rounded-lg text-red-400 hover:bg-red-900/20 transition">
            <i className="fas fa-sign-out-alt w-5 text-center"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow overflow-y-auto">
        <header className="bg-white border-b px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-xl font-bold text-slate-800">Welcome, {user.username}!</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-900 leading-none">{user.username}</p>
              <p className="text-xs text-slate-500 mt-1">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 border border-slate-300">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Top Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <i className="fas fa-check-circle text-xl"></i>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Practice Count</p>
                <h3 className="text-2xl font-bold">{user.practiceCount}</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <i className="fas fa-star text-xl"></i>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Performance Score</p>
                <h3 className="text-2xl font-bold">{user.performanceScore}%</h3>
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                <i className="fas fa-clock text-xl"></i>
              </div>
              <div>
                <p className="text-slate-500 text-sm font-medium">Last Session</p>
                <h3 className="text-2xl font-bold">{user.sessions.length > 0 ? user.sessions[0].date : 'N/A'}</h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resume Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="font-bold text-lg">Active Resume & Configuration</h3>
                  <Link to="/resume" className="text-blue-600 font-medium text-sm hover:underline">Change</Link>
                </div>
                <div className="p-8">
                  {user.resume.fileName ? (
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200">
                          <i className="fas fa-file-pdf text-3xl text-red-500"></i>
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{user.resume.fileName}</p>
                          <p className="text-sm text-slate-500">Uploaded on system</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-bold border border-blue-100 flex items-center">
                          <i className="fas fa-code mr-2"></i> {user.resume.language}
                        </div>
                        <div className="bg-orange-50 text-orange-700 px-4 py-2 rounded-lg text-sm font-bold border border-orange-100 flex items-center">
                          <i className="fas fa-tachometer-alt mr-2"></i> {user.resume.difficulty}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <div className="mb-4 text-slate-300"><i className="fas fa-file-upload text-5xl"></i></div>
                      <p className="text-slate-500 mb-4">No resume uploaded yet. To start coaching, please upload your resume first.</p>
                      <Link to="/resume" className="inline-block bg-blue-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        Upload Now
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button 
                  disabled 
                  className="p-6 bg-slate-900 text-white rounded-2xl shadow-lg shadow-slate-200 flex flex-col items-center justify-center text-center opacity-75 cursor-not-allowed group transition"
                >
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <i className="fas fa-play text-blue-400"></i>
                  </div>
                  <h4 className="font-bold">Start Interview</h4>
                  <p className="text-xs text-slate-400 mt-2">Coming in Milestone 2</p>
                </button>
                <Link to="/profile" className="p-6 bg-white text-slate-900 border border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-slate-50 transition group">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition">
                    <i className="fas fa-id-card text-slate-600"></i>
                  </div>
                  <h4 className="font-bold">Edit Profile</h4>
                  <p className="text-xs text-slate-500 mt-2">Update your personal details</p>
                </Link>
              </div>
            </div>

            {/* Side Sessions Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-fit">
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-lg">Recent Sessions</h3>
                <Link to="/sessions" className="text-blue-600 font-medium text-sm hover:underline">View All</Link>
              </div>
              <div className="p-0">
                {user.sessions.length > 0 ? (
                  <div className="divide-y divide-slate-50">
                    {user.sessions.slice(0, 4).map(session => (
                      <div key={session.id} className="p-4 hover:bg-slate-50 flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold text-slate-900">{session.language} Interview</p>
                          <p className="text-xs text-slate-500">{session.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-blue-600">{session.score}%</p>
                          <p className="text-[10px] text-slate-400 uppercase tracking-widest">{session.difficulty}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center text-slate-400 text-sm">
                    No sessions recorded yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
