// 'use client';

// import { useEffect, useState } from 'react';

// type Theme = 'light' | 'dark';

// export default function ThemeToggle() {
//   const [theme, setTheme] = useState<Theme>('light');

//   useEffect(() => {
//     const saved = localStorage.getItem('theme') as Theme | null;
//     const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

//     const resolvedTheme: Theme =
//       saved === 'dark' || saved === 'light'
//         ? saved
//         : systemPrefersDark
//         ? 'dark'
//         : 'light';

//     setTheme(resolvedTheme);
//     if (resolvedTheme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);

//     if (newTheme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   };

//   return (
//     <button onClick={toggleTheme} className="p-2 rounded bg-gray-300 dark:bg-gray-800">
//       Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
//     </button>
//   );
// }
