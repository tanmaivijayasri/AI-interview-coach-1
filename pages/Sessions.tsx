
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

interface SessionsProps {
  user: User;
}

const Sessions: React.FC<SessionsProps> = ({ user }) => {
  const sessions = user.sessions || [];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
        <Link to="/dashboard" className="flex items-center space-x-2 text-slate-300 hover:text-white transition">
          <i className="fas fa-arrow-left"></i>
          <span className="font-medium">Back to Dashboard</span>
        </Link>
        <span className="font-bold text-lg">Past Interview Sessions</span>
        <div className="w-10"></div>
      </nav>

      <main className="flex-grow p-6 md:p-10">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Session History</h2>
              <p className="text-slate-500">Track your progress over time and review past performance.</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button className="px-6 py-2 bg-white text-slate-900 font-bold rounded-lg shadow-sm">All Sessions</button>
              <button className="px-6 py-2 text-slate-500 font-medium">Favorites</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {sessions.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Date</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Language</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Difficulty</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Score</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {sessions.map(session => (
                    <tr key={session.id} className="hover:bg-slate-50 transition group">
                      <td className="px-8 py-6">
                        <div className="font-medium text-slate-900">{session.date}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                            <i className="fas fa-code text-xs"></i>
                          </div>
                          <span className="font-bold text-slate-700">{session.language}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          session.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          session.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {session.difficulty}
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-full bg-slate-100 rounded-full h-2 w-24 overflow-hidden">
                            <div className={`h-full ${session.score > 80 ? 'bg-green-500' : session.score > 60 ? 'bg-blue-500' : 'bg-red-500'}`} style={{ width: `${session.score}%` }}></div>
                          </div>
                          <span className="font-bold text-slate-900">{session.score}%</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-green-600 font-medium">
                        Completed
                      </td>
                      <td className="px-8 py-6">
                        <button className="text-blue-600 font-bold hover:text-blue-800 transition">Review <i className="fas fa-external-link-alt ml-1 text-xs"></i></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                  <i className="fas fa-history text-4xl"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">No Sessions Yet</h3>
                <p className="text-slate-500 max-w-sm mx-auto">You haven't completed any interview sessions. Once you start practicing, your history will appear here.</p>
                <Link to="/dashboard" className="inline-block mt-8 bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100">
                  Return to Dashboard
                </Link>
              </div>
            )}
          </div>
          
          <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              {sessions.length > 0 
                ? `Showing ${sessions.length} sessions. Start more mock interviews to improve your score!`
                : "Your academic journey starts here. Get ready for your dream career!"}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sessions;
