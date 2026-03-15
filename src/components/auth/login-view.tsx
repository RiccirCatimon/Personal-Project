'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from './auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BookOpen, Loader2, Mail, ShieldCheck, Wifi, ArrowRight, Fingerprint, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LoginView() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const { login } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const result = await login(email);
    setLoading(false);

    if (result.success) {
      toast({
        title: "Login Successful",
        description: result.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: result.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#F0F1F5] relative overflow-hidden font-body">
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      {/* Hero Header */}
      <div className="text-center mb-8 space-y-1 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="mx-auto bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl mb-4">
          <BookOpen className="text-white w-8 h-8" />
        </div>
        <h1 className="text-5xl font-headline font-black italic tracking-tighter text-slate-900 uppercase">
          NEULIBRARY <span className="text-primary">LOG</span>
        </h1>
        <p className="text-sm font-bold tracking-[0.3em] text-slate-400 uppercase">
          Visitor Authorization Terminal
        </p>
      </div>

      <Card className="w-full max-w-xl shadow-2xl border-none overflow-hidden rounded-[2.5rem] animate-in zoom-in-95 duration-500">
        {/* Terminal Status Bar */}
        <div className="bg-slate-900 text-white px-8 py-3 flex items-center justify-between text-[10px] font-bold tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Fingerprint className="w-3 h-3 text-primary" />
            <span>Terminal ID: L-01</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>Online</span>
            </div>
            <span>{currentTime}</span>
          </div>
        </div>

        <CardContent className="p-12 text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-headline font-extrabold text-slate-900 uppercase tracking-tight">
              Security Checkpoint
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Scan Institutional ID or Input Credentials
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <Input 
                type="email" 
                placeholder="Institutional Email" 
                className="h-20 text-center text-xl font-bold bg-white border-4 border-slate-100 rounded-2xl focus:border-primary focus:ring-0 transition-all placeholder:text-slate-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-16 font-black text-lg uppercase tracking-widest bg-slate-900 hover:bg-slate-800 transition-all shadow-xl rounded-2xl gap-3 group" 
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  Validate Identity
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Footer Status Icons */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-50">
            <div className="flex flex-col items-center gap-1">
              <Wifi className="w-4 h-4 text-slate-300" />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">RFID Active</span>
            </div>
            <div className="flex flex-col items-center gap-1 border-x border-slate-50">
              <Mail className="w-4 h-4 text-slate-300" />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Google Auth</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Lock className="w-4 h-4 text-slate-300" />
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Encrypted</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
        © 2024 New Era University Library
      </div>
    </div>
  );
}
