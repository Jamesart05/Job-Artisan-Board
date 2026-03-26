import Link from "next/link";
import { getCurrentUser } from "@/app/lib/server/auth";
import { LogoutButton } from "@/app/components/marketplace/logout-button";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[32px] border border-white/70 bg-white/85 p-5 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Craftwork dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-950">
                {user ? `${user.name} · ${user.role}` : "Dashboard"}
              </h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                Home
              </Link>
              <Link href="/jobs" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
                Jobs
              </Link>
              {user?.role === "client" ? (
                <Link href="/dashboard/new-job" className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
                  Post a job
                </Link>
              ) : null}
              <LogoutButton />
            </div>
          </div>
        </header>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
