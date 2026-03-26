'use client'

import Searchbar from '@/app/dashboard/components/search/searchbar';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { Icon } from '@iconify/react';

const Navbar = () => {
    const state = useSelector((state: RootState) => state.auth.currentUser)

    const hour = new Date().getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

    return(
        <>
            <nav className="mb-8 flex w-full flex-col gap-4 rounded-[32px] border border-white/70 bg-white/75 p-5 shadow-[0_18px_45px_rgba(15,23,42,0.06)] backdrop-blur lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">HR Command Center</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">Hello {state?.name ?? "Arthur"}</p>
                    <p className="text-sm text-slate-500">{greeting}. Here is the latest people and operations overview.</p>
                </div>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <Searchbar/>
                    <div className="flex items-center gap-3">
                        <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-violet-200 hover:text-violet-600">
                            <Icon icon="solar:bell-bing-bold-duotone" width={20} height={20} />
                        </button>
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-sm font-semibold text-violet-700">
                                AC
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900">{state?.name ?? "Arthur Chukwuka"}</p>
                                <p className="text-sm text-slate-500">HR Director</p>
                            </div>
                            <Icon icon="solar:alt-arrow-down-linear" width={16} height={16} className="text-slate-400" />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
