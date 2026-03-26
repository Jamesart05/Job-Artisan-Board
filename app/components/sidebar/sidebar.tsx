// 'use client'

// import Image from "next/image";
// import { useState, useEffect } from "react";
// // app/layout.tsx or inside Navbar

// const Sidebar = () => {
//     const [theme, setTheme] = useState<'light' | 'dark'>('light');

//     // On first load: read from localStorage or system preference
//     useEffect(() => {
//         const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
//         const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//         const initialTheme = stored || (prefersDark ? 'dark' : 'light');
//         setTheme(initialTheme);
//         document.documentElement.classList.toggle('dark', initialTheme === 'dark');
//     }, []);

//     const toggleTheme = (newTheme: 'light' | 'dark') => {
//         setTheme(newTheme);
//         localStorage.setItem('theme', newTheme);
//         if (newTheme === 'dark') {
//         document.documentElement.classList.add('dark');
//         } else {
//         document.documentElement.classList.remove('dark');
//         }
//   };


//     const [activeTab, setActiveTab] = useState(0);

//     const activeClass ="text-[rgba(113,82,243,0.8)] font-bold border-b-2 border-[rgba(113,82,243,0.9)]";

//     return(
//         <>
//             <aside className={theme === 'light' ? "fixed left-[1.5rem] w-1/5 h-[94vh] bg-[rgba(255, 255, 255, 0.3)] backdrop-blur-2xl rounded-2xl px-8 py-6 flex justify-between flex-col gap-4 bg-gray-100" : 'fixed left-[1.5rem] w-1/5 h-[94vh] bg-[rgba(255, 255, 255, 0.3)] backdrop-blur-2xl rounded-2xl px-8 py-6 flex justify-between flex-col gap-4 bg-gray-900'}>
//                 <div className="flex flex-col gap-4 ">
//                     <div className="flex items-center gap-4 cursor-pointer">
//                         <Image 
//                             width={50}
//                             height={50}
//                             aria-hidden
//                             src='/assets/logo.png' alt="logo"
//                         />
//                         <h2 className="text-3xl">HRMS</h2>
//                     </div>
//                     <div className="flex flex-col gap-2">
//                         <a  onClick={() => setActiveTab(1)} href="/dashboard" className={activeTab === 1 ? "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 transition-colors duration-400 bg-gray-200 border-[hsla(252,87%,64%,1)]" : "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 border-transparent transition-colors duration-400 hover:bg-gray-200 hover:border-[hsla(252,87%,64%,1)]"}>
//                             <div className="grid grid-cols-2 gap-1 p-0 m-0 max-w-6 ml-1">
//                                 <div className="w-2 h-2 bg-[#7152F3CC]"></div>
//                                 <div className="w-2 h-2 bg-[#7152F3CC] rounded"></div>
//                                 <div className="w-2 h-2 bg-[#7152F3CC] rounded"></div>
//                                 <div className="w-2 h-2 bg-[#7152F3CC]"></div>
//                             </div>
//                             <p>Dashboard</p>
//                         </a>
//                         <a onClick={() => setActiveTab(2)} href="/dashboard/employees" className={activeTab === 2 ? "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 transition-colors duration-400 bg-gray-200 border-[hsla(252,87%,64%,1)]" : "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 border-transparent transition-colors duration-400 hover:bg-gray-200 hover:border-[hsla(252,87%,64%,1)]"}>
//                             <Image 
//                                 width={24}
//                                 height={24} 
//                                 className="" 
//                                 src='/assets/employees.svg' 
//                                 alt="departments" />
//                             <p>All Employees</p>
//                         </a>
//                         <a onClick={() => setActiveTab(3)} href="/dashboard/departments" className={activeTab === 3 ? "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 transition-colors duration-400 bg-gray-200 border-[hsla(252,87%,64%,1)]" : "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 border-transparent transition-colors duration-400 hover:bg-gray-200 hover:border-[hsla(252,87%,64%,1)]"}>
//                             <Image 
//                                 width={24}
//                                 height={24} 
//                                 className="" 
//                                 src='/assets/department.svg' 
//                                 alt="departments" />
//                             <p>All Departments</p>
//                         </a>
//                         <a onClick={() => setActiveTab(4)} href="/dashboard/departments" className={activeTab === 4 ? "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 transition-colors duration-400 bg-gray-200 border-[hsla(252,87%,64%,1)]" : "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 border-transparent transition-colors duration-400 hover:bg-gray-200 hover:border-[hsla(252,87%,64%,1)]"}>
//                             <Image 
//                                 width={24}
//                                 height={24} 
//                                 className="" 
//                                 src='/assets/attendance.svg' 
//                                 alt="attendance" />
//                             <p> Attendance</p>
//                         </a>
//                         <a onClick={() => setActiveTab(5)} href="/dashboard/payroll" className={activeTab === 5 ? "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 transition-colors duration-400 bg-gray-200 border-[hsla(252,87%,64%,1)]" : "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 border-transparent transition-colors duration-400 hover:bg-gray-200 hover:border-[hsla(252,87%,64%,1)]"}>
//                             <Image 
//                                 width={24}
//                                 height={24} 
//                                 className="" 
//                                 src='/assets/payroll.svg' 
//                                 alt="payroll" />
//                             <p>payroll</p>
//                         </a>
//                         <a onClick={() => setActiveTab(6)} href="/dashboard/jobs" className={activeTab === 6 ? "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 transition-colors duration-400 bg-gray-200 border-[hsla(252,87%,64%,1)]" : "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 border-transparent transition-colors duration-400 hover:bg-gray-200 hover:border-[hsla(252,87%,64%,1)]"}>
//                             <Image 
//                                 width={24}
//                                 height={24} 
//                                 className="" 
//                                 src='/assets/jobs.svg' 
//                                 alt="jobs" />
//                             <p>Jobs</p>
//                         </a>
//                         <a onClick={() => setActiveTab(7)} href="/dashboard/candidates" className={activeTab === 7 ? "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 transition-colors duration-400 bg-gray-200 border-[hsla(252,87%,64%,1)]" : "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 border-transparent transition-colors duration-400 hover:bg-gray-200 hover:border-[hsla(252,87%,64%,1)]"}>
//                             <Image 
//                                 width={24}
//                                 height={24} 
//                                 className="" 
//                                 src='/assets/candidates.svg' 
//                                 alt="candidates" />
//                             <p>Candidates</p>
//                         </a>
//                         <a onClick={() => setActiveTab(8)} href="/dashboard/leaves" className={activeTab === 8 ? "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 transition-colors duration-400 bg-gray-200 border-[hsla(252,87%,64%,1)]" : "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 border-transparent transition-colors duration-400 hover:bg-gray-200 hover:border-[hsla(252,87%,64%,1)]"}>
//                             <Image 
//                                 width={24}
//                                 height={24} 
//                                 className="" 
//                                 src='/assets/leaves.svg' 
//                                 alt="leaves" />
//                             <p>Leaves</p>
//                         </a>
//                         <a onClick={() => setActiveTab(9)} href="/dashboard/holidays" className={activeTab === 9 ? "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 transition-colors duration-400 bg-gray-200 border-[hsla(252,87%,64%,1)]" : "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 border-transparent transition-colors duration-400 hover:bg-gray-200 hover:border-[hsla(252,87%,64%,1)]"}>
//                             <Image 
//                                 width={24}
//                                 height={24} 
//                                 className="" 
//                                 src='/assets/holidays.svg' 
//                                 alt="holidays" />
//                             <p>Holidays</p>
//                         </a>
//                         <a onClick={() => setActiveTab(10)} href="/dashboard/settings" className={activeTab === 10 ? "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 transition-colors duration-400 bg-gray-200 border-[hsla(252,87%,64%,1)]" : "flex justify-start items-center gap-4 px-6 py-3 rounded-tr-2xl rounded-br-2xl cursor-pointer border-l-4 border-transparent transition-colors duration-400 hover:bg-gray-200 hover:border-[hsla(252,87%,64%,1)]"}>
//                             <Image 
//                                 width={24}
//                                 height={24} 
//                                 className="" 
//                                 src='/assets/settings.svg' 
//                                 alt="settings" />
//                             <p>Settings</p>
//                         </a>
//                     </div>
//                 </div>
//                 <div className="flex gap-3">
//                     <button
//                         onClick={() => toggleTheme('light')}
//                         className="group flex items-center justify-center gap-2 px-4 py-2 bg-[#7152F3CC] text-white text-[1.1rem] rounded-[.6rem] border-[1px] border-transparent hover:bg-white hover:text-black hover:border-[#7152F3CC] cursor-pointer transition duration-300"
//                     >
//                         <svg
//                         className="fill-white group-hover:fill-black"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         >
//                         <g>
//                             <g
//                             stroke="currentColor"
//                             strokeMiterlimit="10"
//                             strokeWidth="1.5"
//                             clipPath="url(#siSunDuotone0)"
//                             >
//                             <path d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z" />
//                             <path strokeLinecap="round" d="M3 12H1m22 0h-2m-9 9v2m0-22v2M5.636 18.364l-1.414 1.414M19.778 4.222l-1.414 1.414m-12.728 0L4.222 4.222m15.556 15.556l-1.414-1.414M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0Z" />
//                             </g>
//                             <defs>
//                             <clipPath id="siSunDuotone0">
//                                 <path fill="#fff" d="M0 0h24v24H0z" />
//                             </clipPath>
//                             </defs>
//                         </g>
//                         </svg>
//                         Light
//                     </button>

//                     <button
//                         onClick={() => toggleTheme('dark')}
//                         className="group flex items-center justify-center gap-2 px-4 py-2 bg-white text-[1.1rem] rounded-[.6rem] border-[1px] border-transparent hover:bg-[#7152F3CC] hover:text-black hover:border-white cursor-pointer transition duration-300"
//                     >
//                         <svg
//                         className="fill-black group-hover:fill-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         width="24"
//                         height="24"
//                         viewBox="0 0 24 24"
//                         >
//                         <path
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="1.5"
//                             d="M12 21a9 9 0 0 0 8.997-9.252a7 7 0 0 1-10.371-8.643A9 9 0 0 0 12 21"
//                         />
//                         </svg>
//                         Dark
//                     </button>
//                 </div>
//             </aside>
//         </>
//     )
// }

// export default Sidebar


'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react";

const Sidebar = () => {
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Run after mount to sync theme with localStorage or system preference
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const links = [
    { href: "/dashboard", label: "Overview", icon: "solar:widget-5-bold-duotone" },
    { href: "/dashboard/employees", label: "Employees", icon: "solar:users-group-rounded-bold-duotone" },
    { href: "/dashboard/departments", label: "Departments", icon: "solar:buildings-3-bold-duotone" },
    { href: "/dashboard/attendance", label: "Attendance", icon: "solar:calendar-mark-bold-duotone" },
    { href: "/dashboard/payroll", label: "Payroll", icon: "solar:wallet-money-bold-duotone" },
    { href: "/dashboard/jobs", label: "Jobs", icon: "solar:case-round-minimalistic-bold-duotone" },
    { href: "/dashboard/candidates", label: "Candidates", icon: "solar:user-check-bold-duotone" },
    { href: "/dashboard/leaves", label: "Leaves", icon: "solar:notes-bold-duotone" },
    { href: "/dashboard/holidays", label: "Holidays", icon: "solar:calendar-date-bold-duotone" },
    { href: "/dashboard/settings", label: "Settings", icon: "solar:settings-bold-duotone" },
  ];

  const activeClass =
    "flex items-center gap-3 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-slate-900 shadow-sm";
  const inactiveClass =
    "flex items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-slate-500 transition hover:border-slate-200 hover:bg-white/70 hover:text-slate-900";

  const bgClass = mounted && theme === "dark"
    ? "border-white/10 bg-slate-950/70 text-white"
    : "border-white/70 bg-white/70 text-slate-900";

  return (
    <aside
      className={`sticky top-6 hidden h-[calc(100vh-3rem)] w-[290px] shrink-0 rounded-[32px] border p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur xl:flex xl:flex-col xl:justify-between ${bgClass}`}
    >
      <div className="flex flex-col gap-4">
        <Link href="/dashboard" className="flex items-center gap-4">
          <Image width={48} height={48} aria-hidden src="/assets/logo.png" alt="logo" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-violet-500">Workspace</p>
            <h2 className="text-2xl font-semibold">HRMS</h2>
          </div>
        </Link>

        <div className="rounded-3xl bg-[var(--brand-soft)] p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[var(--muted)]">Quarter progress</p>
          <p className="mt-2 text-3xl font-semibold">76%</p>
          <p className="mt-2 text-sm text-[var(--muted)]">Hiring and payroll objectives are ahead of plan.</p>
        </div>

        <div className="flex flex-col gap-1">
          {links.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={idx}
                href={link.href}
                className={isActive ? activeClass : inactiveClass}
              >
                <Icon icon={link.icon} width={20} height={20} className={isActive ? "text-violet-600" : ""} />
                <p className="font-medium">{link.label}</p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel)] p-4">
          <p className="text-sm font-semibold">People pulse</p>
          <p className="mt-2 text-sm text-[var(--muted)]">3 pending leave approvals and 2 interviews scheduled today.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => toggleTheme("light")}
          className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
            theme === "light"
              ? "bg-[var(--brand)] text-white"
              : "border border-[var(--line)] bg-white/60 text-slate-700"
          }`}
        >
          <Icon icon="solar:sun-2-bold-duotone" width={18} height={18} />
          Light
        </button>

        <button
          onClick={() => toggleTheme("dark")}
          className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
            theme === "dark"
              ? "bg-[var(--brand)] text-white"
              : "border border-[var(--line)] bg-white/60 text-slate-700"
          }`}
        >
          <Icon icon="solar:moon-stars-bold-duotone" width={18} height={18} />
          Dark
        </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
