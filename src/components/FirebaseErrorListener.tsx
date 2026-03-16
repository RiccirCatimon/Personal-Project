'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      // In development, Next.js will show a big red error overlay for uncaught errors
      // throwing it here ensures the developer sees the context.
      if (process.env.NODE_ENV === 'development') {
        throw error;
      } else {
        toast({
          variant: 'destructive',
          title: 'Permission Denied',
          description: 'You do not have access to this resource.',
        });
      }
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}