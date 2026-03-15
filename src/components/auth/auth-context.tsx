
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

    const targetEmail = 'riccir.catimon@neu.edu.ph';
    const normalizedEmail = email.toLowerCase().trim();

    // Strict access restriction
    if (normalizedEmail !== targetEmail) {
      return { 
        success: false, 
        message: "Access restricted. Only the project owner (riccir.catimon@neu.edu.ph) is authorized to log in." 
      };
    }

    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === normalizedEmail);
    
    if (foundUser?.isBlocked) {
      return { success: false, message: "Your account has been blocked. Please contact system support." };
    }

    if (foundUser) {
      setUser(foundUser);
      return { success: true, message: `Welcome back, Admin Riccir!` };
    } else {
      // Fallback in case user is valid but not in initial mock list
      const newUser: UserAccount = {
        email: normalizedEmail,
        name: 'Riccir Catimon',
        role: 'admin',
        isBlocked: false,
        college: 'Engineering'
      };
      setUser(newUser);
      return { success: true, message: `Welcome back, Admin Riccir!` };
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
