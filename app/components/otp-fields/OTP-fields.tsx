"use client"
import { useRef, useState } from 'react';

export default function OTPInput() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // Allow only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if not last
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {otp.map((digit, i) => (
        <input
            key={i}
            ref={(el) => {
                inputRefs.current[i] = el!;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className="h-14 w-12 rounded-2xl border border-slate-200 bg-white text-center text-lg font-semibold outline-none transition focus:border-violet-300"
        />
      ))}
    </div>
  );
}
