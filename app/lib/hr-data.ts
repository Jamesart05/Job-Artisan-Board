export type DashboardMetric = {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  note: string;
};

export type AttendancePoint = {
  day: string;
  present: number;
  remote: number;
  leave: number;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: "Active" | "Remote" | "On Leave" | "Probation";
  location: string;
  joinDate: string;
  salary: string;
};

export type DepartmentStat = {
  name: string;
  lead: string;
  headcount: number;
  openRoles: number;
  budgetUsed: number;
};

export type Candidate = {
  id: number;
  name: string;
  role: string;
  stage: string;
  score: number;
  source: string;
  interviewDate: string;
};

export type LeaveRequest = {
  id: number;
  employee: string;
  type: string;
  duration: string;
  dates: string;
  status: "Pending" | "Approved" | "Rejected";
};

export type HolidayItem = {
  name: string;
  date: string;
  day: string;
  type: string;
};

export type PayrollItem = {
  employee: string;
  department: string;
  salary: string;
  bonus: string;
  netPay: string;
  status: "Processed" | "Pending";
};

export type JobOpening = {
  role: string;
  department: string;
  location: string;
  applicants: number;
  status: "Open" | "Interviewing" | "Closed";
};

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Total employees",
    value: "248",
    change: "+8.2%",
    trend: "up",
    note: "12 hires in the last 30 days",
  },
  {
    label: "Active applicants",
    value: "54",
    change: "+4.1%",
    trend: "up",
    note: "6 candidates moved to interview stage",
  },
  {
    label: "Attendance rate",
    value: "93.6%",
    change: "-1.3%",
    trend: "down",
    note: "3 teams below target this week",
  },
  {
    label: "Open positions",
    value: "17",
    change: "+2 roles",
    trend: "up",
    note: "Engineering and Operations are hiring",
  },
];

export const attendanceSeries: AttendancePoint[] = [
  { day: "Mon", present: 84, remote: 10, leave: 6 },
  { day: "Tue", present: 88, remote: 8, leave: 4 },
  { day: "Wed", present: 82, remote: 11, leave: 7 },
  { day: "Thu", present: 90, remote: 6, leave: 4 },
  { day: "Fri", present: 79, remote: 14, leave: 7 },
  { day: "Sat", present: 40, remote: 32, leave: 28 },
  { day: "Sun", present: 18, remote: 36, leave: 46 },
];

export const employees: TeamMember[] = [
  {
    id: 1,
    name: "Arthur Chukwuka",
    role: "HR Director",
    department: "People Ops",
    email: "arthur@hrms.io",
    phone: "+234 816 000 1201",
    status: "Active",
    location: "Lagos",
    joinDate: "2019-03-11",
    salary: "₦1,850,000",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Product Designer",
    department: "Design",
    email: "jane@hrms.io",
    phone: "+234 816 000 1202",
    status: "Remote",
    location: "Abuja",
    joinDate: "2021-07-09",
    salary: "₦980,000",
  },
  {
    id: 3,
    name: "John Doe",
    role: "Backend Engineer",
    department: "Engineering",
    email: "john@hrms.io",
    phone: "+234 816 000 1203",
    status: "Active",
    location: "Lagos",
    joinDate: "2022-01-14",
    salary: "₦1,200,000",
  },
  {
    id: 4,
    name: "Linda Okafor",
    role: "Finance Analyst",
    department: "Finance",
    email: "linda@hrms.io",
    phone: "+234 816 000 1204",
    status: "On Leave",
    location: "Port Harcourt",
    joinDate: "2020-05-02",
    salary: "₦870,000",
  },
  {
    id: 5,
    name: "Samuel Yusuf",
    role: "Operations Lead",
    department: "Operations",
    email: "samuel@hrms.io",
    phone: "+234 816 000 1205",
    status: "Active",
    location: "Lagos",
    joinDate: "2018-11-21",
    salary: "₦1,430,000",
  },
  {
    id: 6,
    name: "Mariam Bello",
    role: "QA Engineer",
    department: "Engineering",
    email: "mariam@hrms.io",
    phone: "+234 816 000 1206",
    status: "Probation",
    location: "Ibadan",
    joinDate: "2025-01-06",
    salary: "₦690,000",
  },
];

export const departments: DepartmentStat[] = [
  { name: "Engineering", lead: "Kelechi Obi", headcount: 64, openRoles: 6, budgetUsed: 74 },
  { name: "People Ops", lead: "Arthur Chukwuka", headcount: 18, openRoles: 2, budgetUsed: 61 },
  { name: "Design", lead: "Amina Hassan", headcount: 12, openRoles: 1, budgetUsed: 58 },
  { name: "Operations", lead: "Samuel Yusuf", headcount: 39, openRoles: 4, budgetUsed: 81 },
  { name: "Finance", lead: "Linda Okafor", headcount: 15, openRoles: 0, budgetUsed: 66 },
];

export const candidates: Candidate[] = [
  {
    id: 1,
    name: "Esther Martins",
    role: "Recruiter",
    stage: "Panel interview",
    score: 88,
    source: "LinkedIn",
    interviewDate: "Apr 02",
  },
  {
    id: 2,
    name: "Michael Dada",
    role: "DevOps Engineer",
    stage: "Technical review",
    score: 91,
    source: "Referral",
    interviewDate: "Apr 04",
  },
  {
    id: 3,
    name: "Tosin Alabi",
    role: "Product Manager",
    stage: "Offer prep",
    score: 95,
    source: "Direct",
    interviewDate: "Apr 06",
  },
  {
    id: 4,
    name: "Grace Ibekwe",
    role: "Customer Success Lead",
    stage: "Screening",
    score: 72,
    source: "Job board",
    interviewDate: "Apr 08",
  },
];

export const leaveRequests: LeaveRequest[] = [
  {
    id: 1,
    employee: "Linda Okafor",
    type: "Annual leave",
    duration: "5 days",
    dates: "Mar 29 - Apr 02",
    status: "Approved",
  },
  {
    id: 2,
    employee: "Mariam Bello",
    type: "Sick leave",
    duration: "2 days",
    dates: "Apr 10 - Apr 11",
    status: "Pending",
  },
  {
    id: 3,
    employee: "Samuel Yusuf",
    type: "Emergency leave",
    duration: "1 day",
    dates: "Apr 17",
    status: "Pending",
  },
];

export const holidays: HolidayItem[] = [
  { name: "Eid al-Fitr", date: "Mar 30, 2026", day: "Monday", type: "Public holiday" },
  { name: "Workers' Day", date: "May 01, 2026", day: "Friday", type: "Public holiday" },
  { name: "Democracy Day", date: "Jun 12, 2026", day: "Friday", type: "Public holiday" },
  { name: "Company Retreat", date: "Jul 24, 2026", day: "Friday", type: "Internal" },
];

export const payroll: PayrollItem[] = employees.map((employee, index) => ({
  employee: employee.name,
  department: employee.department,
  salary: employee.salary,
  bonus: index % 2 === 0 ? "₦120,000" : "₦40,000",
  netPay: index % 2 === 0 ? "₦1,970,000" : "₦1,020,000",
  status: index < 4 ? "Processed" : "Pending",
}));

export const jobs: JobOpening[] = [
  {
    role: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Lagos / Hybrid",
    applicants: 23,
    status: "Interviewing",
  },
  {
    role: "HR Business Partner",
    department: "People Ops",
    location: "Abuja / On-site",
    applicants: 11,
    status: "Open",
  },
  {
    role: "Finance Associate",
    department: "Finance",
    location: "Remote",
    applicants: 9,
    status: "Open",
  },
  {
    role: "Operations Analyst",
    department: "Operations",
    location: "Lagos / On-site",
    applicants: 17,
    status: "Closed",
  },
];

export const events = [
  { date: "Mar 27", title: "Payroll approval", time: "10:00 AM" },
  { date: "Mar 29", title: "Candidate panel interview", time: "01:30 PM" },
  { date: "Apr 01", title: "Quarterly all-hands", time: "11:00 AM" },
  { date: "Apr 03", title: "Performance calibration", time: "03:00 PM" },
];
