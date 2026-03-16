'use client';

import { useEffect, useState } from 'react';
import { Auth, onAuthStateChanged, User } from 'firebase/auth';

export function useUser(auth: Auth) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, [auth]);

  return { user, loading };
}