'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { REASONS, COLLEGES } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Loader2, Sparkles, LogOut, ArrowRight, Library } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function CheckInPage() {
  const { user, firebaseUser, isLoading, logout } = useAuth();
  const { toast } = useToast();
  const firestore = useFirestore();
  const [reason, setReason] = useState<string>('');
  const [college, setCollege] = useState<string>(user?.college || '');
  const [isEmployee, setIsEmployee] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCheckedIn, setHasCheckedIn] = useState(false);

  useEffect(() => {
    if (user?.college) setCollege(user.college);
  }, [user]);

  const handleCheckIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firestore) {
      toast({ variant: "destructive", title: "Connection Error", description: "Database is not ready. Please refresh." });
      return;
    }

    if (!reason || !college) {
      toast({ 
        variant: "destructive", 
        title: "Missing Fields", 
        description: "Please select both a college and a reason for your visit." 
      });
      return;
    }

    setIsSubmitting(true);
    console.log("Starting check-in submission...");

    const data = {
      email: firebaseUser?.email || user?.email || 'anonymous',
      name: firebaseUser?.displayName || user?.name || 'Anonymous User',
      reason,
      college,
      isEmployee,
      timestamp: new Date().toISOString(),
    };

    try {
      const logsRef = collection(firestore, 'visitor_logs');
      await addDoc(logsRef, {
        ...data,
        serverTimestamp: serverTimestamp(),
      });
      
      console.log("Check-in saved successfully.");
      setHasCheckedIn(true);
      toast({ 
        title: "Check-in Successful", 
        description: "Welcome to the NEU Library!" 
      });
    } catch (error: any) {
      console.error("Check-in submission failed:", error);
      
      const isPermissionError = error.code === 'permission-denied' || error.message?.includes('permission');
      
      toast({ 
        variant: "destructive", 
        title: "Check-in Failed", 
        description: isPermissionError 
          ? "Permission Denied: Your account is restricted from logging entries." 
          : "An error occurred while saving your visit. Please check your connection." 
      });

      if (isPermissionError) {
        const err = new FirestorePermissionError({ 
          path: 'visitor_logs', 
          operation: 'create', 
          requestResourceData: data 
        });
        errorEmitter.emit('permission-error', err);
      }
    } finally {
      // Ensure the button always resets even if an error occurs
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {hasCheckedIn ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-10 animate-in fade-in zoom-in duration-700">
          <div className="relative">
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
            <div className="relative bg-white p-8 rounded-full shadow-2xl border-4 border-primary/20">
              <CheckCircle2 className="w-24 h-24 text-primary" />
            </div>
          </div>
          
          <div className="text-center space-y-6 max-w-2xl">
            <h1 className="text-6xl font-headline font-black text-slate-900 tracking-tighter">
              Welcome to <span className="text-primary">NEU Library!</span>
            </h1>
            <div className="space-y-2">
              <p className="text-2xl text-slate-600 font-medium">
                Hello, <span className="font-bold text-slate-900">{firebaseUser?.displayName || user?.name}</span>
              </p>
              <p className="text-lg text-muted-foreground italic">
                "Your gateway to knowledge and spiritual growth."
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md pt-6">
            <Button 
              size="lg" 
              variant="outline" 
              className="flex-1 h-14 text-lg border-2 font-bold" 
              onClick={() => {
                setHasCheckedIn(false);
                setReason('');
              }}
            >
              New Entry
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              className="flex-1 h-14 text-lg text-destructive hover:bg-destructive/5 font-bold" 
              onClick={logout}
            >
              <LogOut className="w-5 h-5 mr-2" /> Sign Out
            </Button>
          </div>
          
          <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-widest text-[10px] pt-12">
            <Library className="w-4 h-4" />
            <span>Official Library Log System</span>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-10 space-y-3">
            <h1 className="text-5xl font-headline font-bold text-slate-900 tracking-tight">Library Check-in</h1>
            <p className="text-xl text-muted-foreground">
              Welcome back, <span className="text-primary font-bold">{firebaseUser?.displayName || user?.name}</span>.
            </p>
          </div>

          <Card className="border-none shadow-[0_20px_50px_rgba(34,62,170,0.1)] overflow-hidden ring-1 ring-slate-200">
            <CardHeader className="bg-primary/5 border-b py-8">
              <div className="flex items-center gap-3 text-primary font-black text-xl">
                <Sparkles className="w-7 h-7" /> Visitor Entry Form
              </div>
            </CardHeader>
            <CardContent className="pt-10 px-10">
              <form onSubmit={handleCheckIn} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <Label className="font-bold text-slate-700 text-base">Affiliated College</Label>
                    <Select value={college} onValueChange={setCollege}>
                      <SelectTrigger className="h-14 text-lg border-2 focus:ring-primary/20"><SelectValue placeholder="Select college" /></SelectTrigger>
                      <SelectContent>
                        {COLLEGES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="font-bold text-slate-700 text-base">Purpose of Visit</Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger className="h-14 text-lg border-2 focus:ring-primary/20"><SelectValue placeholder="Reason for visit" /></SelectTrigger>
                      <SelectContent>
                        {REASONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 transition-all hover:bg-slate-100 hover:border-primary/30">
                  <Checkbox 
                    id="employee" 
                    className="w-6 h-6 rounded-md border-2 border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    checked={isEmployee} 
                    onCheckedChange={c => setIsEmployee(!!c)} 
                  />
                  <label htmlFor="employee" className="text-base font-bold text-slate-600 cursor-pointer select-none">
                    I am an NEU Employee (Faculty / Staff)
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-16 text-xl font-black shadow-2xl shadow-primary/20 transition-all active:scale-[0.98]" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin" /> Verifying...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      Complete Check-in <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="bg-slate-50/80 py-6 border-t text-xs text-center justify-center text-muted-foreground font-bold uppercase tracking-widest">
              Securely Authenticated via @neu.edu.ph
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
