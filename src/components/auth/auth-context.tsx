
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, isPrimaryAdmin } from '@/lib/data';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { initializeFirebase } from '@/firebase';

interface AuthContextType {
  user: UserAccount | null;
  firebaseUser: User | null;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  activeRole: 'admin' | 'user';
  toggleRole: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userAccount, setUserAccount] = useState<UserAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeRole, setActiveRole] = useState<'admin' | 'user'>('user');

  useEffect(() => {
    const { auth } = initializeFirebase();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user) {
        const isAdm = isPrimaryAdmin(user.email);
        const account: UserAccount = {
          email: user.email || '',
          name: user.displayName || 'User',
          role: isAdm ? 'admin' : 'user',
          isBlocked: false,
          college: 'General Education'
        };
        setUserAccount(account);
        // Default primary admin to admin view, others to user view
        setActiveRole(isAdm ? 'admin' : 'user');
      } else {
        setUserAccount(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const { auth } = initializeFirebase();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const logout = async () => {
    const { auth } = initializeFirebase();
    await signOut(auth);
  };

  const toggleRole = () => {
    if (isPrimaryAdmin(firebaseUser?.email)) {
      setActiveRole(prev => prev === 'admin' ? 'user' : 'admin');
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user: userAccount, 
      firebaseUser,
      loginWithGoogle, 
      logout, 
      isLoading,
      activeRole,
      toggleRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      firebaseUser: null,
      loginWithGoogle: async () => {},
      logout: () => {},
      isLoading: false,
      activeRole: 'user' as const,
      toggleRole: () => {}
    };
  }
  return context;
}
