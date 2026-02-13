
export interface UserProfile {
  gender?: string;
  dob?: string;
  collegeName?: string;
  branch?: string;
  gradYear?: string;
  jobRole?: string;
  experienceLevel?: string;
  skills?: string;
}

export interface ResumeData {
  fileName?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  language?: 'C' | 'C++' | 'Java' | 'Python' | 'JavaScript';
}

export interface InterviewSession {
  id: string;
  date: string;
  language: string;
  difficulty: string;
  score: number;
}

export interface User {
  username: string;
  email: string;
  phone: string;
  password?: string;
  profile: UserProfile;
  resume: ResumeData;
  sessions: InterviewSession[];
  performanceScore: number;
  practiceCount: number;
}

export interface AuthState {
  currentUser: User | null;
  sessionToken: string | null;
}
