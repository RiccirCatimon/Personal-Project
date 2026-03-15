'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, UserMinus, UserCheck, ShieldAlert, Users, Clock, BrainCircuit, Loader2, CalendarCheck } from 'lucide-react';
import { MOCK_LOGS, MOCK_USERS } from '@/lib/data';
import { subDays, subWeeks, subMonths, isAfter, isToday } from 'date-fns';
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from 'recharts';
import { adminLibraryInsights, AdminLibraryInsightsOutput } from '@/ai/flows/admin-library-insights';
import { useToast } from '@/hooks/use-toast';

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(MOCK_USERS);
  const [logs] = useState(MOCK_LOGS);
  const [activeTab, setActiveTab] = useState('attendance');
  const [timeFilter, setTimeFilter] = useState('day');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiInsights, setAiInsights] = useState<AdminLibraryInsightsOutput | null>(null);
  const { toast } = useToast();

  const todayLogs = useMemo(() => {
    return logs.filter(log => isToday(new Date(log.timestamp)));
  }, [logs]);

  const filteredLogs = useMemo(() => {
    let baseDate = new Date();
    if (timeFilter === 'day') baseDate = subDays(new Date(), 1);
    else if (timeFilter === 'week') baseDate = subWeeks(new Date(), 1);
    else if (timeFilter === 'month') baseDate = subMonths(new Date(), 1);

    return logs.filter(log => {
      const matchesSearch = log.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           log.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTime = isAfter(new Date(log.timestamp), baseDate);
      return matchesSearch && matchesTime;
    });
  }, [logs, searchQuery, timeFilter]);

  const collegeStats = useMemo(() => {
    const stats: Record<string, number> = {};
    filteredLogs.forEach(log => {
      stats[log.college] = (stats[log.college] || 0) + 1;
    });
    return Object.entries(stats).map(([name, count]) => ({ name, count }));
  }, [filteredLogs]);

  const peakHourDisplay = useMemo(() => {
    if (filteredLogs.length === 0) return "N/A";
    const hours: Record<number, number> = {};
    filteredLogs.forEach(log => {
      const h = new Date(log.timestamp).getHours();
      hours[h] = (hours[h] || 0) + 1;
    });
    const entries = Object.entries(hours);
    if (entries.length === 0) return "N/A";
    const topHour = parseInt(entries.sort((a, b) => b[1] - a[1])[0][0]);
    const ampm = topHour >= 12 ? 'PM' : 'AM';
    const displayHour = topHour % 12 || 12;
    const endHour = (topHour + 1) % 12 || 12;
    const endAmpm = (topHour + 1) >= 12 ? 'PM' : 'AM';
    return `${displayHour} ${ampm} - ${endHour} ${endAmpm}`;
  }, [filteredLogs]);

  const toggleBlockUser = (email: string) => {
    setUsers(prev => prev.map(u => 
      u.email === email ? { ...u, isBlocked: !u.isBlocked } : u
    ));
    const user = users.find(u => u.email === email);
    toast({
      title: user?.isBlocked ? "User Unblocked" : "User Blocked",
      description: `${user?.name} has been ${user?.isBlocked ? 'granted' : 'denied'} access.`,
    });
  };

  const handleRunAI = async () => {
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

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-headline font-bold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor library activity and manage facility access.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/5 gap-2"
            onClick={handleRunAI}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
            AI Insights
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Check-ins" value={todayLogs.length} icon={<CalendarCheck className="w-5 h-5" />} description="New visitors today" />
        <StatCard title="Peak Period" value={peakHourDisplay} icon={<Clock className="w-5 h-5" />} description="Busiest time slots" />
        <StatCard title="Active Users" value={users.filter(u => !u.isBlocked).length} icon={<UserCheck className="w-5 h-5" />} description="Non-blocked users" />
        <StatCard title="Blocked Users" value={users.filter(u => u.isBlocked).length} icon={<ShieldAlert className="w-5 h-5" />} description="Access denied" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between border-b pb-1">
          <TabsList className="bg-transparent h-auto p-0 space-x-6">
            <TabsTrigger value="attendance" className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none py-2 px-0 font-semibold text-base">Daily Attendance</TabsTrigger>
            <TabsTrigger value="overview" className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none py-2 px-0 font-semibold text-base">Statistics</TabsTrigger>
            <TabsTrigger value="visitors" className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none py-2 px-0 font-semibold text-base">Activity Log</TabsTrigger>
            <TabsTrigger value="users" className="bg-transparent border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none py-2 px-0 font-semibold text-base">User Management</TabsTrigger>
          </TabsList>
          
          {activeTab === 'visitors' && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Period:</span>
              <select 
                className="text-sm border-none bg-transparent font-semibold focus:ring-0 cursor-pointer"
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option value="day">Last 24 Hours</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
              </select>
            </div>
          )}
        </div>

        <TabsContent value="attendance" className="space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">Daily Attendance</CardTitle>
                <CardDescription>Students logged in today: {new Date().toLocaleDateString()}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Student Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Check-in Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {todayLogs.map((log) => (
                    <TableRow key={log.id} className="group transition-colors">
                      <TableCell className="font-semibold">{log.name}</TableCell>
                      <TableCell className="text-slate-500">{log.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal text-slate-600 bg-slate-50">{log.college}</Badge>
                      </TableCell>
                      <TableCell>{log.reason}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </TableCell>
                    </TableRow>
                  ))}
                  {todayLogs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">No students have checked in yet today.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Visitor Traffic by College</CardTitle>
                <CardDescription>Visualizing distribution of visits across programs</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={collegeStats}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                      cursor={{ fill: '#f1f5f9' }}
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">AI-Powered Insights</CardTitle>
                <CardDescription>Generative analysis of patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights ? (
                  <div className="space-y-4 text-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div>
                      <h4 className="font-bold text-primary mb-1">Peak Periods</h4>
                      <p className="text-muted-foreground">{aiInsights.peakUsageTimes.join(', ')}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Top Reasons</h4>
                      <p className="text-muted-foreground">{aiInsights.popularVisitReasons.slice(0, 3).join(', ')}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-1">Recommendation</h4>
                      <p className="text-muted-foreground">{aiInsights.actionableRecommendations[0]}</p>
                    </div>
                    <Button variant="link" size="sm" className="px-0 text-primary" onClick={() => setAiInsights(null)}>Reset Analysis</Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[240px] text-center border-2 border-dashed rounded-lg p-6 bg-slate-50/50">
                    <BrainCircuit className="w-10 h-10 text-slate-300 mb-4" />
                    <p className="text-slate-500 mb-4 text-sm">Run AI analysis to discover hidden usage trends and resource optimization tips.</p>
                    <Button 
                      onClick={handleRunAI} 
                      disabled={isAnalyzing}
                      className="bg-accent hover:bg-accent/90"
                    >
                      {isAnalyzing ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Run AI Analysis"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="visitors">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">Historical Activity Log</CardTitle>
                <CardDescription>Complete history of library entries</CardDescription>
              </div>
              <div className="relative w-72">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search by name or email..." 
                  className="pl-10" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Visitor</TableHead>
                    <TableHead>College</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id} className="group transition-colors">
                      <TableCell>
                        <div className="font-semibold">{log.name}</div>
                        <div className="text-xs text-muted-foreground">{log.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-normal text-slate-600 bg-slate-50">{log.college}</Badge>
                      </TableCell>
                      <TableCell>{log.reason}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {new Date(log.timestamp).toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredLogs.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">No records found matching your search.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg">System Users</CardTitle>
                <CardDescription>Manage user accounts and access rights</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead>Full Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell className="font-semibold">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <span className={`text-xs font-bold uppercase tracking-wider ${user.role === 'admin' ? 'text-primary' : 'text-slate-500'}`}>
                          {user.role}
                        </span>
                      </TableCell>
                      <TableCell>
                        {user.isBlocked ? (
                          <Badge variant="destructive" className="gap-1"><ShieldAlert className="w-3 h-3" /> Blocked</Badge>
                        ) : (
                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Active</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        {user.role !== 'admin' && (
                          <Button 
                            variant={user.isBlocked ? "outline" : "destructive"} 
                            size="sm"
                            onClick={() => toggleBlockUser(user.email)}
                            className="h-8 gap-1.5"
                          >
                            {user.isBlocked ? <UserCheck className="w-4 h-4" /> : <UserMinus className="w-4 h-4" />}
                            {user.isBlocked ? "Unblock" : "Block"}
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StatCard({ title, value, icon, description }: { title: string; value: string | number; icon: React.ReactNode; description: string }) {
  return (
    <Card className="shadow-sm border-slate-200 hover:border-primary/50 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
            {icon}
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-headline font-bold text-slate-900">{value}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
