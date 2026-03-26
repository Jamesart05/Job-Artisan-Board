const Searchbar = () => {
    return(
        <>
            <div className="relative group">
                <input className="w-full min-w-[16rem] rounded-2xl border border-slate-200 bg-white px-11 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 lg:w-[22rem]" type="text" placeholder="Search people, departments, payroll"/>
                <svg className="absolute left-3 top-3 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08"/></svg>
            </div>
        </>
    )
}

export default Searchbar
