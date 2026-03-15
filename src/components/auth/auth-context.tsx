
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

    const normalizedEmail = email.toLowerCase().trim();
    const adminEmail = 'riccir.catimon@neu.edu.ph';

    // Verify institutional email domain
    if (!normalizedEmail.endsWith('@neu.edu.ph')) {
      return { 
        success: false, 
        message: "Access denied. Please use your official @neu.edu.ph institutional email." 
      };
    }

    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === normalizedEmail);
    
    if (foundUser?.isBlocked) {
      return { success: false, message: "Your account has been blocked. Please contact the library administration." };
    }

    if (foundUser) {
      setUser(foundUser);
      return { success: true, message: `Welcome back, ${foundUser.name}!` };
    } else {
      // Create a temporary session for valid NEU emails not in the mock list
      const newUser: UserAccount = {
        email: normalizedEmail,
        name: normalizedEmail.split('@')[0].split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' '),
        role: normalizedEmail === adminEmail ? 'admin' : 'user',
        isBlocked: false,
        college: 'General Education'
      };
      setUser(newUser);
      return { success: true, message: `Welcome to LibFlow, ${newUser.name}!` };
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
