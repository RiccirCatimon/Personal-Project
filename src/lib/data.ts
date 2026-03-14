
import { subDays, startOfToday, format, subWeeks, subMonths } from 'date-fns';

export type UserRole = 'admin' | 'user';

export interface UserAccount {
  email: string;
  name: string;
  role: UserRole;
  isBlocked: boolean;
  college?: string;
}

export interface VisitorLog {
  id: string;
  email: string;
  name: string;
  reason: string;
  college: string;
  timestamp: string;
}

// Simulated data
export const MOCK_USERS: UserAccount[] = [
  { email: 'admin@neu.edu.ph', name: 'Super Admin', role: 'admin', isBlocked: false },
  { email: 'john.doe@neu.edu.ph', name: 'John Doe', role: 'user', isBlocked: false, college: 'Engineering' },
  { email: 'jane.smith@neu.edu.ph', name: 'Jane Smith', role: 'user', isBlocked: false, college: 'Business' },
  { email: 'mark.lee@neu.edu.ph', name: 'Mark Lee', role: 'user', isBlocked: true, college: 'Arts and Sciences' },
];

export const REASONS = [
  'Study',
  'Research',
  'Group Work',
  'Borrowing/Returning Books',
  'Facility Usage',
  'Meeting',
];

export const COLLEGES = [
  'Engineering',
  'Business',
  'Arts and Sciences',
  'Computer Studies',
  'Education',
  'Nursing',
  'Law',
];

// Generate some mock visitor logs for the last 30 days
const generateLogs = (): VisitorLog[] => {
  const logs: VisitorLog[] = [];
  const baseDate = startOfToday();

  for (let i = 0; i < 200; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const hour = 8 + Math.floor(Math.random() * 12); // 8 AM to 8 PM
    const minute = Math.floor(Math.random() * 60);
    const date = subDays(baseDate, daysAgo);
    date.setHours(hour, minute);

    const user = MOCK_USERS[1 + Math.floor(Math.random() * (MOCK_USERS.length - 1))];
    
    logs.push({
      id: `log-${i}`,
      email: user.email,
      name: user.name,
      reason: REASONS[Math.floor(Math.random() * REASONS.length)],
      college: user.college || COLLEGES[Math.floor(Math.random() * COLLEGES.length)],
      timestamp: date.toISOString(),
    });
  }
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const MOCK_LOGS = generateLogs();
