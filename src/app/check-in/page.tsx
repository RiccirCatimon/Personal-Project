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
import { CheckCircle2, Loader2, Sparkles, LogOut } from 'lucide-react';
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
    if (!reason || !college) {
      toast({ 
        variant: "destructive", 
        title: "Missing Fields", 
        description: "Please select both a college and a reason for your visit." 
      });
      return;
    }

    setIsSubmitting(true);
    const data = {
      email: firebaseUser?.email || user?.email,
      name: firebaseUser?.displayName || user?.name,
      reason,
      college,
      isEmployee,
      timestamp: new Date().toISOString(),
    };

    addDoc(collection(firestore, 'visitor_logs'), {
      ...data,
      serverTimestamp: serverTimestamp(),
    })
      .then(() => {
        setHasCheckedIn(true);
        toast({ title: "Success", description: "Entry recorded successfully." });
      })
      .catch(async () => {
        const err = new FirestorePermissionError({ 
          path: 'visitor_logs', 
          operation: 'create', 
          requestResourceData: data 
        });
        errorEmitter.emit('permission-error', err);
      })
      .finally(() => setIsSubmitting(false));
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary w-8 h-8" /></div>;

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      {hasCheckedIn ? (
        <div className="text-center space-y-8 py-12 animate-in fade-in zoom-in duration-700">
          <div className="mx-auto w-32 h-32 bg-green-50 rounded-full flex items-center justify-center text-green-600 border-4 border-white shadow-xl">
            <CheckCircle2 className="w-16 h-16" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-headline font-bold text-slate-900 tracking-tight">
              Welcome to <span className="text-primary">NEU Library!</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto">
              Hello, {firebaseUser?.displayName}! Your entry has been securely recorded. Have a productive stay!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button variant="outline" size="lg" onClick={() => setHasCheckedIn(false)}>
              Log another entry
            </Button>
            <Button variant="ghost" size="lg" onClick={logout} className="text-destructive hover:bg-destructive/10">
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-10 space-y-3">
            <h1 className="text-4xl font-headline font-bold text-slate-900 tracking-tight">Library Check-in</h1>
            <p className="text-lg text-muted-foreground">
              Hello, <span className="text-primary font-bold">{firebaseUser?.displayName}</span>! Please complete the form below.
            </p>
          </div>

          <Card className="border-none shadow-2xl overflow-hidden ring-1 ring-slate-200">
            <CardHeader className="bg-primary/5 border-b py-6">
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <Sparkles className="w-6 h-6" /> Visitor Details
              </div>
            </CardHeader>
            <CardContent className="pt-8 px-8">
              <form onSubmit={handleCheckIn} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="font-bold text-slate-700">Your College</Label>
                    <Select value={college} onValueChange={setCollege}>
                      <SelectTrigger className="h-12"><SelectValue placeholder="Select college" /></SelectTrigger>
                      <SelectContent>
                        {COLLEGES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="font-bold text-slate-700">Reason for Visit</Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger className="h-12"><SelectValue placeholder="Reason for visit" /></SelectTrigger>
                      <SelectContent>
                        {REASONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-5 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 transition-colors hover:bg-slate-100">
                  <Checkbox 
                    id="employee" 
                    className="w-5 h-5"
                    checked={isEmployee} 
                    onCheckedChange={c => setIsEmployee(!!c)} 
                  />
                  <label htmlFor="employee" className="text-sm font-bold text-slate-600 cursor-pointer select-none">
                    I am an employee (Faculty, Teacher, or Staff)
                  </label>
                </div>

                <Button type="submit" className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" /> Recording...
                    </div>
                  ) : "Complete Check-in"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="bg-slate-50/50 py-5 border-t text-xs text-center text-muted-foreground font-medium">
              By checking in, you agree to comply with all New Era University Library policies.
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
