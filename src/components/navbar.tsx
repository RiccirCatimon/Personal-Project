
'use client';

import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { LogOut, BookOpen, LayoutDashboard, UserCheck } from 'lucide-react';
import Link from 'next/link';

export function Navbar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <header className="border-b bg-white sticky top-0 z-40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">LibFlow</span>
        </Link>

        <nav className="flex items-center gap-6">
          {user.role === 'admin' ? (
            <Link href="/admin" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          ) : (
            <Link href="/check-in" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
              <UserCheck className="w-4 h-4" />
              Check-in
            </Link>
          )}
          
          <div className="flex items-center gap-3 ml-4 pl-4 border-l">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold leading-none">{user.name}</p>
              <p className="text-xs text-muted-foreground leading-none mt-1">{user.role === 'admin' ? 'Administrator' : user.college}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={logout} title="Logout">
              <LogOut className="w-5 h-5 text-muted-foreground hover:text-destructive transition-colors" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
