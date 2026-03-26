export type UserRole = "artisan" | "client";

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  location: string;
  bio: string;
  skills: string[];
  createdAt: string;
};

export type PublicUser = Omit<User, "passwordHash">;

export type Job = {
  id: string;
  title: string;
  category: string;
  location: string;
  budget: string;
  budgetType: "fixed" | "monthly";
  summary: string;
  description: string;
  skills: string[];
  status: "open" | "closed";
  clientId: string;
  createdAt: string;
  applicantIds: string[];
};

export type Application = {
  id: string;
  jobId: string;
  artisanId: string;
  coverNote: string;
  status: "new" | "shortlisted" | "declined";
  createdAt: string;
};

export type Session = {
  token: string;
  userId: string;
  expiresAt: string;
};

export type Database = {
  users: User[];
  jobs: Job[];
  applications: Application[];
  sessions: Session[];
};
