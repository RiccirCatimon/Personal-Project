
'use client';

import { useAuth } from '@/components/auth/auth-context';
import { LoginView } from '@/components/auth/login-view';
import { Navbar } from '@/components/navbar';
import AdminDashboard from '@/app/admin/page';
import CheckInPage from '@/app/check-in/page';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <LoginView />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        {user.role === 'admin' ? <AdminDashboard /> : <CheckInPage />}
      </main>
    </div>
  );
}

export default function Home() {
  return <AppContent />;
}
