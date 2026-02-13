
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <i className="fas fa-robot text-white text-xl"></i>
          </div>
          <span className="font-bold text-xl tracking-tight">AI Coach</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium">Login</Link>
          <Link to="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 p-6">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
            Master Your Next Interview with <span className="text-blue-600">AI Intelligence</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            A personalized, interactive coaching experience designed for final-year students. Build confidence, refine your answers, and land your dream job.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/register" className="bg-blue-600 text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition transform hover:-translate-y-1">
              Start Practice Session
            </Link>
            <Link to="/login" className="bg-white text-slate-900 border-2 border-slate-200 text-lg px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition">
              View Your Progress
            </Link>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-file-alt text-blue-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Resume Analysis</h3>
            <p className="text-slate-500">Upload your CV and let our AI tailor interview questions based on your specific skills and experience.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-microphone text-green-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Mock Interviews</h3>
            <p className="text-slate-500">Real-time conversational practice across multiple programming languages and difficulty levels.</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-chart-line text-purple-600 text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold mb-3">Performance Tracking</h3>
            <p className="text-slate-500">Get detailed scores and feedback after every session to identify areas for improvement.</p>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-10 px-6 text-center border-t border-slate-800">
        <p>© 2024 AI Powered Interview Coach - Academic Project Milestone-1</p>
      </footer>
    </div>
  );
};

export default Home;
