
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, MOCK_USERS } from '@/lib/data';

interface AuthContextType {
  user: UserAccount | null;
  login: (email: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking session or loading initial state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const normalizedEmail = email.toLowerCase().trim();
    const adminEmail = 'riccir.catimon@neu.edu.ph';

    if (!normalizedEmail.endsWith('@neu.edu.ph')) {
      setIsLoading(false);
      return { 
        success: false, 
        message: "Access denied. Please use your official @neu.edu.ph institutional email." 
      };
    }

    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === normalizedEmail);
    
    if (foundUser?.isBlocked) {
      setIsLoading(false);
      return { success: false, message: "Your account has been blocked. Please contact the library administration." };
    }

    if (foundUser) {
      setUser(foundUser);
      setIsLoading(false);
      return { success: true, message: `Welcome back, ${foundUser.name}!` };
    } else {
      const newUser: UserAccount = {
        email: normalizedEmail,
        name: normalizedEmail.split('@')[0].split('.').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' '),
        role: normalizedEmail === adminEmail ? 'admin' : 'user',
        isBlocked: false,
        college: 'General Education'
      };
      setUser(newUser);
      setIsLoading(false);
      return { success: true, message: `Welcome to LibFlow, ${newUser.name}!` };
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  // During build/prerender, context might be undefined. 
  // We return a safe default instead of throwing to prevent build failures.
  if (!context) {
    return {
      user: null,
      login: async () => ({ success: false, message: "Context not found" }),
      logout: () => {},
      isLoading: false
    };
  }
  return context;
}
