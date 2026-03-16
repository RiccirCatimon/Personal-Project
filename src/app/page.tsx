
'use client';

import { useAuth } from '@/components/auth/auth-context';
import { LoginView } from '@/components/auth/login-view';
import { Navbar } from '@/components/navbar';
import AdminDashboard from '@/app/admin/page';
import CheckInPage from '@/app/check-in/page';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const { firebaseUser, isLoading, activeRole } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto" />
          <p className="text-slate-500 font-medium animate-pulse">Initializing LibFlow...</p>
        </div>
      </div>
    );
  }

  if (!firebaseUser) {
    return <LoginView />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {activeRole === 'admin' ? <AdminDashboard /> : <CheckInPage />}
      </main>
    </div>
  );
}

export default function Home() {
  return <AppContent />;
}
