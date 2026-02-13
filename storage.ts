
import { User, AuthState } from './types';

const USERS_KEY = 'interview_coach_users';
const SESSION_KEY = 'interview_coach_session';

export const storage = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUsers: (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getSession: (): AuthState => {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : { currentUser: null, sessionToken: null };
  },

  setSession: (session: AuthState) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  },

  clearSession: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  updateUser: (email: string, updates: Partial<User>) => {
    const users = storage.getUsers();
    const index = users.findIndex(u => u.email === email);
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      storage.saveUsers(users);
      
      // Update active session if it's the current user
      const session = storage.getSession();
      if (session.currentUser?.email === email) {
        storage.setSession({
          ...session,
          currentUser: { ...session.currentUser, ...updates }
        });
      }
      return users[index];
    }
    return null;
  }
};
