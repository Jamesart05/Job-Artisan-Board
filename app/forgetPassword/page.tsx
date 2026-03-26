"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Icon } from '@iconify/react';

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleClick = (): void => {
    router.push('/login');
  };

  const handleSendOTP = async () => {
    const res = await fetch('/api/send-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    setMessage(data.message);
    router.push('/enter-otp');
  };

  return(
    <main className='flex min-h-screen items-center justify-center px-4 py-10'>
      <div className='w-full max-w-xl rounded-[36px] border border-white/70 bg-white/80 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-10'>
        <div className='flex cursor-pointer items-center gap-2 text-slate-500 transition hover:text-violet-600' onClick={handleClick}>
          <Icon width={24} height={24} icon={'formkit:left'} />
          <h1 className='text-sm font-medium'>Back to login</h1>
        </div>

        <div className='mx-auto mt-8 max-w-lg'>
          <p className='text-sm font-semibold uppercase tracking-[0.28em] text-violet-500'>Recovery</p>
          <h2 className='mt-3 text-4xl font-semibold text-slate-900'>Forgot password</h2>
          <p className='mt-3 text-base text-slate-500'>Enter your registered email address and we will send a one-time code for password recovery.</p>
          <form className='mt-8 flex flex-col gap-4' action="">
            <input
              className='w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 outline-none transition focus:border-violet-300'
              placeholder='Enter your email address'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {message ? <p className='rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700'>{message}</p> : null}
            <button
              onClick={(event) => {
                event.preventDefault();
                void handleSendOTP();
              }}
              className='mt-2 w-full rounded-2xl bg-[var(--brand)] py-4 text-base font-semibold text-white transition hover:bg-[var(--brand-strong)]'
              type='submit'
            >
              Send OTP
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ForgetPassword;
