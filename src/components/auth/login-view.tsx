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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <div className="text-center mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
        <div className="mx-auto bg-primary w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <BookOpen className="text-white w-8 h-8" />
        </div>
        <h1 className="text-4xl font-headline font-bold text-slate-900 tracking-tight">
          LibFlow
        </h1>
        <p className="text-muted-foreground font-medium">
          NEU Library Visitor Management
        </p>
      </div>

      <Card className="w-full max-w-md shadow-xl border-slate-200 animate-in zoom-in-95 duration-500">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Enter your institutional email to access the library system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="email" 
                  placeholder="name@neu.edu.ph" 
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 font-semibold" 
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                "Continue with Email"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t bg-slate-50/50 p-6">
          <p className="text-xs text-center text-muted-foreground">
            Access is restricted to official New Era University institutional emails (@neu.edu.ph).
          </p>
        </CardFooter>
      </Card>

      <div className="mt-8 text-xs text-slate-400 font-medium">
        © 2024 New Era University Library | Secured Access
      </div>
    </div>
  );
}
