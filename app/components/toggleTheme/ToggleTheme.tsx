// 'use client'
// import { useEffect, useState } from "react"

// const ToggleTheme = () => {
//     const [theme, setTheme] = useState('')
//     const body = document.documentElement

//     useEffect(() => {
//         setTheme('light')
//     }, [])

//     body?.classList.add(theme)

//     const toggleTheme = () => {
//         if(theme === 'light'){
//             setTheme('dark')
//         }else{
//            setTheme('light')
//         }
//     }
//   return (
//     <div className="flex gap-3">
//         <button onClick={toggleTheme} className="group flex items-center justify-center gap-2 px-4 py-2  bg-[#7152F3CC] text-white text-[1.1rem] rounded-[.6rem] border-[1px] border-transparent hover:bg-white hover:text-black hover:border-[#7152F3CC] cursor-pointer transition duration-300">
//             <svg className="fill-white group-hover:fill-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g><g stroke="currentColor" strokeMiterlimit="10" strokeWidth="1.5" clipPath="url(#siSunDuotone0)"><path d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z"/><path strokeLinecap="round" d="M3 12H1m22 0h-2m-9 9v2m0-22v2M5.636 18.364l-1.414 1.414M19.778 4.222l-1.414 1.414m-12.728 0L4.222 4.222m15.556 15.556l-1.414-1.414M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0Z"/></g><defs><clipPath id="siSunDuotone0"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs></g></svg>
//             Light 
//         </button>
//         <button onClick={toggleTheme} className="group flex items-center justify-center gap-2 px-4 py-2  bg-white text-[1.1rem] rounded-[.6rem] border-[1px] border-transparent hover:bg-[#7152F3CC] hover:text-black hover:border-white cursor-pointer transition duration-300">
//             <svg className="fill-white group-hover:fill-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9 9 0 0 0 8.997-9.252a7 7 0 0 1-10.371-8.643A9 9 0 0 0 12 21"/></svg>
//             Dark 
//         </button>
//     </div>
//   )
// }

// export default ToggleTheme
