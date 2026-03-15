
'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { REASONS, COLLEGES } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/navbar';

export default function CheckInPage() {
  const { user, isLoading } = useAuth();
  const { toast } = useToast();
  const [reason, setReason] = useState<string>('');
  const [college, setCollege] = useState<string>(user?.college || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  // Update college when user data loads
  useEffect(() => {
    if (user?.college) {
      setCollege(user.college);
    }
  }, [user]);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || !college) {
      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description: "Please fill in all fields before checking in.",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setHasCheckedIn(true);
    
    toast({
      title: "Check-in Successful",
      description: "Welcome to NEU Library!",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-2xl mx-auto py-8">
          {hasCheckedIn ? (
            <div className="text-center space-y-6 py-12">
              <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 animate-in zoom-in duration-300">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl font-headline font-bold text-primary">Welcome to NEU Library!</h1>
                <p className="text-lg text-muted-foreground">Your entry has been recorded. Enjoy your visit.</p>
              </div>
              <Button variant="outline" onClick={() => setHasCheckedIn(false)}>Check-in another visit</Button>
            </div>
          ) : (
            <>
              <div className="mb-8 space-y-2">
                <h1 className="text-3xl font-headline font-bold text-slate-900">Library Check-in</h1>
                <p className="text-muted-foreground">Welcome back, <span className="text-primary font-semibold">{user?.name || 'Student'}</span>. Please provide your visit details.</p>
              </div>

              <Card className="border-none shadow-xl shadow-slate-200/50 overflow-hidden">
                <CardHeader className="bg-primary/5 border-b border-primary/10">
                  <div className="flex items-center gap-2 text-primary">
                    <Sparkles className="w-5 h-5" />
                    <CardTitle className="text-lg">Visitor Information</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <form onSubmit={handleCheckIn} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-semibold">Institutional Email</Label>
                      <div className="p-3 bg-slate-100 border rounded-md text-slate-600 text-sm font-medium">
                        {user?.email || 'Loading...'}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="college" className="text-sm font-semibold">College Affiliation</Label>
                        <Select value={college} onValueChange={setCollege}>
                          <SelectTrigger className="bg-white border-slate-200 h-11">
                            <SelectValue placeholder="Select your college" />
                          </SelectTrigger>
                          <SelectContent>
                            {COLLEGES.map(c => (
                              <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reason" className="text-sm font-semibold">Reason for Visit</Label>
                        <Select value={reason} onValueChange={setReason}>
                          <SelectTrigger className="bg-white border-slate-200 h-11">
                            <SelectValue placeholder="Why are you visiting?" />
                          </SelectTrigger>
                          <SelectContent>
                            {REASONS.map(r => (
                              <SelectItem key={r} value={r}>{r}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button type="submit" className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : "Complete Check-in"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="bg-slate-50/50 py-4 border-t">
                  <p className="text-xs text-center w-full text-muted-foreground">
                    By checking in, you agree to follow the library rules and regulations.
                  </p>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
