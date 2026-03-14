
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, MOCK_USERS } from '@/lib/data';

interface AuthContextType {
  user: UserAccount | null;
  login: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);

  const login = async (email: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const institutionalRegex = /^[a-zA-Z0-9._%+-]+@neu\.edu\.ph$/;
    if (!institutionalRegex.test(email)) {
      return { success: false, message: "Please use your institutional NEU email." };
    }

    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser?.isBlocked) {
      return { success: false, message: "Your account has been blocked. Please contact the administrator." };
    }

    if (foundUser) {
      setUser(foundUser);
      return { success: true, message: `Welcome, to NEU Library!` };
    } else {
      // Auto-register as standard user if not found but valid email
      const newUser: UserAccount = {
        email,
        name: email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
        role: 'user',
        isBlocked: false,
        college: 'Education' // Default
      };
      setUser(newUser);
      return { success: true, message: `Welcome, to NEU Library!` };
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
