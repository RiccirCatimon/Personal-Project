
import { subDays, startOfToday } from 'date-fns';

export type UserRole = 'admin' | 'user';

export interface UserAccount {
  email: string;
  name: string;
  role: UserRole;
  isBlocked: boolean;
  college?: string;
  isEmployee?: boolean;
}

export interface VisitorLog {
  id: string;
  email: string;
  name: string;
  reason: string;
  college: string;
  isEmployee: boolean;
  timestamp: string;
}

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
  'General Education'
];

/**
 * Validates if the user is a primary administrator with the ability 
 * to switch roles and access the full analytics dashboard.
 */
export const isPrimaryAdmin = (email: string | null | undefined) => {
  const adminEmails = [
    'jcesperanza@neu.edu.ph',
    'riccir.catimon@neu.edu.ph'
  ];
  return !!email && adminEmails.includes(email);
};
