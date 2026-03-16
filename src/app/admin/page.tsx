
'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Search, Clock, BrainCircuit, Loader2, CalendarCheck, Filter, User, ShieldAlert, Calendar as CalendarIcon } from 'lucide-react';
import { REASONS, COLLEGES, VisitorLog } from '@/lib/data';
import { subDays, subWeeks, subMonths, isAfter, isBefore, isToday, format, startOfDay, endOfDay } from 'date-fns';
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { adminLibraryInsights, AdminLibraryInsightsOutput } from '@/ai/flows/admin-library-insights';
import { useToast } from '@/hooks/use-toast';
import { collection, query, orderBy } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('attendance');
  const [timeFilter, setTimeFilter] = useState('day');
  const [startDate, setStartDate] = useState<Date | undefined>(subDays(new Date(), 7));
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [reasonFilter, setReasonFilter] = useState('all');
  const [collegeFilter, setCollegeFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<AdminLibraryInsightsOutput | null>(null);
  const { toast } = useToast();
  const firestore = useFirestore();

  const visitorLogsQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'visitor_logs'), orderBy('timestamp', 'desc'));
  }, [firestore]);

  const { data: logs, loading } = useCollection<VisitorLog>(visitorLogsQuery);

  const filteredLogs = useMemo(() => {
    return (logs || []).filter(log => {
      const matchesSearch = log.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           log.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const logDate = new Date(log.timestamp);
      let matchesTime = true;

      if (timeFilter === 'day') {
        matchesTime = isAfter(logDate, startOfDay(new Date()));
      } else if (timeFilter === 'week') {
        matchesTime = isAfter(logDate, subWeeks(new Date(), 1));
      } else if (timeFilter === 'month') {
        matchesTime = isAfter(logDate, subMonths(new Date(), 1));
      } else if (timeFilter === 'range' && startDate && endDate) {
        matchesTime = isAfter(logDate, startOfDay(startDate)) && isBefore(logDate, endOfDay(endDate));
      }
      
      const matchesReason = reasonFilter === 'all' || log.reason === reasonFilter;
      const matchesCollege = collegeFilter === 'all' || log.college === collegeFilter;
      const matchesType = typeFilter === 'all' || 
                         (typeFilter === 'employee' && log.isEmployee) || 
                         (typeFilter === 'student' && !log.isEmployee);

      return matchesSearch && matchesTime && matchesReason && matchesCollege && matchesType;
    });
  }, [logs, searchQuery, timeFilter, startDate, endDate, reasonFilter, collegeFilter, typeFilter]);

  const stats = useMemo(() => {
    const today = (logs || []).filter(l => isToday(new Date(l.timestamp))).length;
    const employees = filteredLogs.filter(l => l.isEmployee).length;
    const students = filteredLogs.filter(l => !l.isEmployee).length;
    
    const hours: Record<number, number> = {};
    filteredLogs.forEach(log => {
      const h = new Date(log.timestamp).getHours();
      hours[h] = (hours[h] || 0) + 1;
    });
    const entries = Object.entries(hours);
    let peakStr = "N/A";
    if (entries.length > 0) {
      const topHour = parseInt(entries.sort((a, b) => b[1] - a[1])[0][0]);
      peakStr = `${topHour % 12 || 12} ${topHour >= 12 ? 'PM' : 'AM'}`;
    }

    return { today, employees, students, peakStr };
  }, [logs, filteredLogs]);

  const collegeChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredLogs.forEach(log => {
      counts[log.college] = (counts[log.college] || 0) + 1;
    });
    return Object.entries(counts).map(([name, count]) => ({ name, count }));
  }, [filteredLogs]);

  const handleRunAI = async () => {
    if (!logs || logs.length === 0) return;
    setIsAnalyzing(true);
    try {
      const result = await adminLibraryInsights({ visitorData: logs.slice(0, 50) });
      setAiInsights(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "AI Analysis Failed",
        description: "Could not generate insights at this time.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
        <p className="text-muted-foreground font-medium">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive library visitor analytics and management.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/5 gap-2"
            onClick={handleRunAI}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
            AI Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Total" value={stats.today} icon={<CalendarCheck className="w-5 h-5" />} description="Total check-ins today" />
        <StatCard title="Peak Hour" value={stats.peakStr} icon={<Clock className="w-5 h-5" />} description="Busiest period for selected filters" />
        <StatCard title="Students" value={stats.students} icon={<User className="w-5 h-5" />} description="Student visitors in selection" />
        <StatCard title="Employees" value={stats.employees} icon={<ShieldAlert className="w-5 h-5" />} description="Faculty/Staff in selection" />
      </div>

      <Card className="border-slate-200 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 border-b">
          <div className="flex items-center gap-2 text-primary">
            <Filter className="w-4 h-4" />
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Analytics Filters</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">Time Period</Label>
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                  <SelectItem value="range">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {timeFilter === 'range' && (
              <div className="lg:col-span-2 grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase">From</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase">To</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">College</Label>
              <Select value={collegeFilter} onValueChange={setCollegeFilter}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colleges</SelectItem>
                  {COLLEGES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">Reason</Label>
              <Select value={reasonFilter} onValueChange={setReasonFilter}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reasons</SelectItem>
                  {REASONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase">Visitor Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white border p-1 h-auto space-x-1 shadow-sm">
          <TabsTrigger value="attendance" className="data-[state=active]:bg-primary data-[state=active]:text-white">Attendance Log</TabsTrigger>
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-white">Data Visualization</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg">Detailed Logs</CardTitle>
                <CardDescription>{filteredLogs.length} matching records found</CardDescription>
              </div>
              <div className="relative w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search name or email..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50">
                    <TableHead>Visitor Name</TableHead>
                    <TableHead>Affiliation</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Check-in Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <div className="font-semibold">{log.name}</div>
                        <div className="text-xs text-muted-foreground">{log.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal">{log.college}</Badge>
                      </TableCell>
                      <TableCell>{log.reason}</TableCell>
                      <TableCell>
                        {log.isEmployee ? (
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">Staff</Badge>
                        ) : (
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">Student</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {format(new Date(log.timestamp), "MMM d, yyyy h:mm a")}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredLogs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">No records match the current filters.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Distribution by College</CardTitle>
                <CardDescription>Number of visits per college for the selected period</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={collegeChartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">AI Smart Insights</CardTitle>
                <CardDescription>Generated patterns from recent traffic</CardDescription>
              </CardHeader>
              <CardContent>
                {aiInsights ? (
                  <div className="space-y-4 text-sm">
                    <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                      <p className="font-semibold text-primary mb-1">Summary</p>
                      <p className="text-slate-600 leading-relaxed">{aiInsights.overallSummary}</p>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => setAiInsights(null)}>Clear Report</Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[280px] text-center p-6 border-2 border-dashed rounded-xl bg-slate-50">
                    <BrainCircuit className="w-12 h-12 text-slate-300 mb-4" />
                    <p className="text-slate-500 mb-6 text-sm font-medium">Generate AI trends and resource recommendations from latest logs.</p>
                    <Button onClick={handleRunAI} disabled={isAnalyzing}>
                      {isAnalyzing ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
                      ) : "Generate AI Insights"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ title, value, icon, description }: { title: string; value: string | number; icon: React.ReactNode; description: string }) {
  return (
    <Card className="shadow-sm border-slate-200 hover:border-primary/30 transition-all">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</p>
          <div className="p-2 bg-primary/5 rounded-lg text-primary">{icon}</div>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-headline font-bold text-slate-900">{value}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
