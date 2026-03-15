
'use client';

import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { LogOut, BookOpen, LayoutDashboard, UserCheck, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:scale-105 transition-transform">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">LibFlow</span>
        </Link>

        <nav className="flex items-center gap-4">
          {user.role === 'admin' && (
            <Link href="/admin">
              <Button variant="default" className="bg-primary hover:bg-primary/90 gap-2 h-9 shadow-md shadow-primary/10">
                <ShieldCheck className="w-4 h-4" />
                Admin Dashboard
              </Button>
            </Link>
          )}
          
          {user.role !== 'admin' && (
            <Link href="/check-in">
              <Button variant="ghost" className="hover:text-primary gap-2">
                <UserCheck className="w-4 h-4" />
                Check-in
              </Button>
            </Link>
          )}
          
          <div className="flex items-center gap-3 ml-4 pl-4 border-l">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold leading-none">{user.name}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">
                {user.role === 'admin' ? 'System Administrator' : user.college}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={logout} title="Logout" className="hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
