'use client'

import OTPInput from "../components/otp-fields/OTP-fields";
import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation';
import { useState } from "react";

const EnterOTP = () => {
  const [view, setView] = useState(false);
  const router = useRouter();

  const handleClick = (): void => {
    router.push('/forgetPassword');
  };
  
  const verify = () => {
    setView(true);
  };

  return (
    <div className="relative">
      <div className={`${view ? "flex" : "hidden"} fixed inset-0 items-center justify-center bg-slate-950/35 px-4 backdrop-blur-sm`}>
        <div className="w-full max-w-sm rounded-[32px] bg-white p-8 text-center shadow-[0_30px_80px_rgba(15,23,42,0.2)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <Icon icon="solar:shield-check-bold-duotone" width={28} height={28} />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-slate-900">Password updated successfully</h2>
          <p className="mt-3 text-sm text-slate-500">Your credentials have been reset. Continue to login to access the dashboard.</p>
          <button className="mt-6 w-full rounded-2xl bg-[var(--brand)] py-3 font-semibold text-white transition hover:bg-[var(--brand-strong)]" onClick={() => router.push('/login')}>
            Back to login
          </button>
        </div>
      </div>
      <main className='flex min-h-screen items-center justify-center px-4 py-10'>
        <div className='w-full max-w-xl rounded-[36px] border border-white/70 bg-white/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-10'>
          <div className='flex cursor-pointer items-center gap-2 text-slate-500 transition hover:text-violet-600' onClick={handleClick}>
            <Icon width={24} height={24} icon={'formkit:left'} />
            <h1 className='text-sm font-medium'>Back</h1>
          </div>
          <div className='mx-auto mt-8 max-w-lg'>
            <p className='text-sm font-semibold uppercase tracking-[0.28em] text-violet-500'>Verification</p>
            <h2 className='mt-3 text-4xl font-semibold text-slate-900'>Enter OTP</h2>
            <p className='mt-3 text-base text-slate-500'>We have sent a 6-digit verification code to your registered email address.</p>
            <div className='mt-8 flex flex-col gap-6'>
              <div className="flex items-center justify-center rounded-[28px] border border-slate-100 bg-slate-50 px-4 py-6">
                <OTPInput/>
              </div>
              <button onClick={verify} className='rounded-2xl bg-[var(--brand)] py-4 text-base font-semibold text-white transition hover:bg-[var(--brand-strong)]' type='button'>
                Verify
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default EnterOTP;
