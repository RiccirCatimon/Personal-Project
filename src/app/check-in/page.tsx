
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
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function CheckInPage() {
  const { user, firebaseUser, isLoading } = useAuth();
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
      toast({ variant: "destructive", title: "Missing Fields", description: "Please complete the form." });
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
        toast({ title: "Success", description: "Checked in successfully." });
      })
      .catch(async () => {
        const err = new FirestorePermissionError({ path: 'visitor_logs', operation: 'create', requestResourceData: data });
        errorEmitter.emit('permission-error', err);
      })
      .finally(() => setIsSubmitting(false));
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      {hasCheckedIn ? (
        <div className="text-center space-y-6 py-12 animate-in fade-in zoom-in duration-500">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-headline font-bold text-primary">Welcome to NEU Library!</h1>
            <p className="text-lg text-muted-foreground">Your entry has been recorded. Enjoy your visit.</p>
          </div>
          <Button variant="outline" onClick={() => setHasCheckedIn(false)}>Log another entry</Button>
        </div>
      ) : (
        <>
          <div className="mb-8 space-y-2">
            <h1 className="text-3xl font-headline font-bold text-slate-900">Library Check-in</h1>
            <p className="text-muted-foreground">Logged in as <span className="text-primary font-semibold">{firebaseUser?.displayName}</span></p>
          </div>

          <Card className="border-none shadow-xl">
            <CardHeader className="bg-primary/5 border-b">
              <div className="flex items-center gap-2 text-primary font-bold">
                <Sparkles className="w-5 h-5" /> Visitor Form
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleCheckIn} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="font-semibold">College</Label>
                    <Select value={college} onValueChange={setCollege}>
                      <SelectTrigger><SelectValue placeholder="Select college" /></SelectTrigger>
                      <SelectContent>
                        {COLLEGES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="font-semibold">Reason</Label>
                    <Select value={reason} onValueChange={setReason}>
                      <SelectTrigger><SelectValue placeholder="Reason for visit" /></SelectTrigger>
                      <SelectContent>
                        {REASONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-4 bg-slate-50 rounded-lg border">
                  <Checkbox id="employee" checked={isEmployee} onCheckedChange={c => setIsEmployee(!!c)} />
                  <label htmlFor="employee" className="text-sm font-medium cursor-pointer">
                    I am an employee (Teacher or Staff)
                  </label>
                </div>

                <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Complete Check-in"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="bg-slate-50/50 py-4 border-t text-xs text-center text-muted-foreground">
              Please follow all library rules during your stay.
            </CardFooter>
          </Card>
        </>
      )}
    </div>
  );
}
