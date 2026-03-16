
'use client';

import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { LogOut, BookOpen, UserCheck, ShieldCheck, RefreshCcw } from 'lucide-react';
import { isPrimaryAdmin } from '@/lib/data';
import Link from 'next/link';

export function Navbar() {
  const { user, firebaseUser, logout, activeRole, toggleRole } = useAuth();

  if (!firebaseUser) return null;

  return (
    <header className="border-b bg-white sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg group-hover:scale-105 transition-transform">
            <BookOpen className="text-white w-6 h-6" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">LibFlow</span>
        </Link>

        <nav className="flex items-center gap-3">
          {isPrimaryAdmin(firebaseUser.email) && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleRole}
              className="hidden sm:flex gap-2 border-primary/20 hover:bg-primary/5"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              Switch to {activeRole === 'admin' ? 'User View' : 'Admin View'}
            </Button>
          )}

          {activeRole === 'admin' ? (
            <Link href="/admin">
              <Button variant="default" className="bg-primary hover:bg-primary/90 gap-2 h-9">
                <ShieldCheck className="w-4 h-4" />
                Admin
              </Button>
            </Link>
          ) : (
            <Link href="/check-in">
              <Button variant="ghost" className="hover:text-primary gap-2 h-9">
                <UserCheck className="w-4 h-4" />
                Check-in
              </Button>
            </Link>
          )}
          
          <div className="flex items-center gap-3 ml-2 pl-3 border-l">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold leading-none">{firebaseUser.displayName || user?.name}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mt-1">
                {activeRole === 'admin' ? 'Administrator' : 'University Visitor'}
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={logout} title="Logout" className="h-9 w-9 hover:bg-destructive/10 hover:text-destructive">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
