
'use client';

import React, { useState } from 'react';
import { useAuth } from './auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { BookOpen, Loader2, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LoginView() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

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
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F0F1F5] relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <Card className="w-full max-w-md shadow-2xl border-none">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto bg-primary w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20">
            <BookOpen className="text-white w-8 h-8" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl font-headline font-bold text-primary">LibFlow</CardTitle>
            <CardDescription className="text-base">NEU Library Visitor Management System</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="email" 
                  placeholder="name@neu.edu.ph" 
                  className="pl-10 h-12 bg-slate-50 border-slate-200 focus:border-primary transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-12 font-semibold text-base bg-primary hover:bg-primary/90 transition-all shadow-md shadow-primary/10" 
              disabled={loading}
            >
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In with Google"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-xs text-muted-foreground">
          <p>Please use your institutional NEU email for logging in.</p>
          <p>© 2024 New Era University Library</p>
        </CardFooter>
      </Card>
    </div>
  );
}
