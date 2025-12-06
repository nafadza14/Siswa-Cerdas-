export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  SCHOOL_ADMIN = 'SCHOOL_ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  PARENT = 'PARENT',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar: string;
  email: string;
}

export interface Student extends User {
  role: UserRole.STUDENT;
  classId: string;
  nisn: string;
  parentPhone: string; // For WhatsApp notifications
}

export interface ClassGroup {
  id: string;
  name: string; // e.g., "10 IPA 1"
  gradeLevel: number;
}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  LATE = 'LATE',
  ABSENT = 'ABSENT',
  SICK = 'SICK',
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
  timestamp: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  durationMinutes: number;
  questions: ExamQuestion[];
}

export interface ExamQuestion {
  id: string;
  text: string;
  options: string[];
  correctOptionIndex: number;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'urgent' | 'info' | 'event';
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
  category: string;
}