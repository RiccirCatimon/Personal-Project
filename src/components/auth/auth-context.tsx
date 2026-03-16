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
import { toast } from '@/hooks/use-toast';

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
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Strict domain check for @neu.edu.ph
        if (!user.email?.toLowerCase().endsWith('@neu.edu.ph')) {
          await signOut(auth);
          setFirebaseUser(null);
          setUserAccount(null);
          setIsLoading(false);
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "Only @neu.edu.ph accounts are allowed to access LibFlow.",
          });
          return;
        }

        const isAdm = isPrimaryAdmin(user.email);
        const account: UserAccount = {
          email: user.email || '',
          name: user.displayName || 'User',
          role: isAdm ? 'admin' : 'user',
          isBlocked: false,
          college: 'General Education'
        };
        setUserAccount(account);
        setActiveRole(isAdm ? 'admin' : 'user');
        setFirebaseUser(user);
      } else {
        setUserAccount(null);
        setFirebaseUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    const { auth } = initializeFirebase();
    const provider = new GoogleAuthProvider();
    // Prompt for account selection to ensure user can choose their NEU account
    provider.setCustomParameters({ prompt: 'select_account' });
    
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user && !result.user.email?.toLowerCase().endsWith('@neu.edu.ph')) {
        await signOut(auth);
        throw new Error("Domain Restricted: Please use your @neu.edu.ph account.");
      }
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
