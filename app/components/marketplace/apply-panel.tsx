"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PublicUser } from "@/app/lib/types";

type ApplyPanelProps = {
  jobId: string;
  currentUser: PublicUser | null;
  alreadyApplied: boolean;
  isOwner: boolean;
};

export function ApplyPanel({ jobId, currentUser, alreadyApplied, isOwner }: ApplyPanelProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const response = await fetch(`/api/jobs/${jobId}/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coverNote: String(formData.get("coverNote") ?? ""),
      }),
    });

    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(result.error ?? "Unable to submit application.");
      setLoading(false);
      return;
    }

    router.refresh();
  }

  if (!currentUser) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
        <p className="text-base font-semibold text-slate-900">Sign in to apply</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Artisan applications require an account so clients can view your profile and skills.
        </p>
      </div>
    );
  }

  if (isOwner) {
    return (
      <div className="rounded-[28px] border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        You posted this job. Applications will appear in your dashboard.
      </div>
    );
  }

  if (currentUser.role !== "artisan") {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
        Client accounts can post jobs but cannot apply to them.
      </div>
    );
  }

  if (alreadyApplied) {
    return (
      <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-900">
        Your application has already been submitted for this role.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
      <p className="text-base font-semibold text-slate-900">Apply for this job</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">
        Introduce your experience, trade strengths, and availability.
      </p>
      <textarea
        name="coverNote"
        rows={6}
        required
        className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400"
        placeholder="I’ve handled similar projects and can start next week..."
      />
      {error ? <p className="mt-3 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="mt-4 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
}
