
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ResumeData } from '../types';
import { storage } from '../storage';

interface ResumeProps {
  user: User;
  onUpdate: () => void;
}

const ResumeUpload: React.FC<ResumeProps> = ({ user, onUpdate }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [resumeData, setResumeData] = useState<ResumeData>(user.resume || {});
  const [fileSelected, setFileSelected] = useState(!!user.resume.fileName);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeData({ ...resumeData, fileName: e.target.files[0].name });
      setFileSelected(true);
    }
  };

  const handleFinalSubmit = () => {
    if (!resumeData.fileName || !resumeData.difficulty || !resumeData.language) {
      alert('Please complete all selection steps.');
      return;
    }
    
    storage.updateUser(user.email, { resume: resumeData });
    onUpdate();
    alert('Resume configuration saved successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <nav className="bg-slate-900 text-white p-4 flex justify-between items-center shadow-md">
        <Link to="/dashboard" className="flex items-center space-x-2 text-slate-300 hover:text-white transition">
          <i className="fas fa-arrow-left"></i>
          <span className="font-medium">Back to Dashboard</span>
        </Link>
        <span className="font-bold text-lg">Resume Configuration</span>
        <div className="w-10"></div>
      </nav>

      <main className="flex-grow p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-slate-200 p-10">
          
          {/* Progress Indicator */}
          <div className="flex justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 -translate-y-1/2 -z-0"></div>
            {[1, 2, 3].map(s => (
              <div key={s} className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                {s}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 text-center">Step 1: Upload Resume</h3>
              <p className="text-slate-500 text-center mb-8">Choose your latest PDF or Word resume to help the AI learn about you.</p>
              
              <div className="border-4 border-dashed border-slate-100 rounded-3xl p-12 text-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer relative">
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleFileUpload} />
                <div className="space-y-4">
                  <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                    <i className="fas fa-cloud-upload-alt text-3xl"></i>
                  </div>
                  {fileSelected ? (
                    <div>
                      <p className="text-blue-600 font-bold">{resumeData.fileName}</p>
                      <p className="text-sm text-slate-400">File selected successfully</p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-bold text-slate-700 text-lg">Click or Drag to Upload</p>
                      <p className="text-sm text-slate-400">Supports PDF, DOC, DOCX up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>
              <button 
                onClick={() => setStep(2)}
                disabled={!fileSelected}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition disabled:opacity-50 mt-4"
              >
                Next Step
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 text-center">Step 2: Difficulty Level</h3>
              <p className="text-slate-500 text-center mb-8">How challenging should the interview questions be?</p>
              
              <div className="grid grid-cols-1 gap-4">
                {['Easy', 'Medium', 'Hard'].map(diff => (
                  <button 
                    key={diff}
                    onClick={() => setResumeData({...resumeData, difficulty: diff as any})}
                    className={`p-5 rounded-2xl border-2 text-left flex items-center justify-between transition ${resumeData.difficulty === diff ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-slate-300'}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${diff === 'Easy' ? 'bg-green-100 text-green-600' : diff === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'}`}>
                        <i className={`fas ${diff === 'Easy' ? 'fa-leaf' : diff === 'Medium' ? 'fa-mountain' : 'fa-fire'}`}></i>
                      </div>
                      <span className="font-bold text-lg">{diff}</span>
                    </div>
                    {resumeData.difficulty === diff && <i className="fas fa-check-circle text-blue-600 text-xl"></i>}
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-4 mt-6">
                <button onClick={() => setStep(1)} className="flex-grow bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200">Back</button>
                <button 
                  onClick={() => setStep(3)}
                  disabled={!resumeData.difficulty}
                  className="flex-[2] bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 disabled:opacity-50"
                >
                  Next Step
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900 text-center">Step 3: Programming Language</h3>
              <p className="text-slate-500 text-center mb-8">Which language will your technical round focus on?</p>
              
              <div className="grid grid-cols-2 gap-4">
                {['C', 'C++', 'Java', 'Python', 'JavaScript'].map(lang => (
                  <button 
                    key={lang}
                    onClick={() => setResumeData({...resumeData, language: lang as any})}
                    className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center space-y-3 transition ${resumeData.language === lang ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-slate-300'}`}
                  >
                    <i className={`fab ${lang === 'Java' ? 'fa-java' : lang === 'Python' ? 'fa-python' : lang === 'JavaScript' ? 'fa-js' : 'fa-code'} text-3xl ${resumeData.language === lang ? 'text-blue-600' : 'text-slate-400'}`}></i>
                    <span className="font-bold">{lang}</span>
                  </button>
                ))}
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button onClick={() => setStep(2)} className="flex-grow bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200">Back</button>
                <button 
                  onClick={handleFinalSubmit}
                  disabled={!resumeData.language}
                  className="flex-[2] bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 disabled:opacity-50 shadow-lg shadow-blue-100"
                >
                  Finish Configuration
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ResumeUpload;
