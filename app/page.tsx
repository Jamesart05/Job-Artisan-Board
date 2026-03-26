import Link from "next/link";
import { getCurrentUser } from "@/app/lib/server/auth";
import { readDb } from "@/app/lib/server/db";

export const dynamic = "force-dynamic";

const highlights = [
  "Verified artisan profiles with trade-specific skills",
  "Role-based dashboards for job posters and artisans",
  "Fast job posting, discovery, and application flows",
];

export default async function HomePage() {
  const [db, currentUser] = await Promise.all([readDb(), getCurrentUser()]);
  const featuredJobs = db.jobs.slice(0, 3);
  const artisanCount = db.users.filter((user) => user.role === "artisan").length;
  const clientCount = db.users.filter((user) => user.role === "client").length;

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <section className="overflow-hidden rounded-[36px] border border-white/70 bg-white/80 shadow-[0_30px_80px_rgba(15,23,42,0.1)] backdrop-blur">
          <div className="grid gap-10 px-6 py-8 sm:px-10 sm:py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-14 lg:py-16">
            <div className="space-y-8">
              <div className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
                Workboard for skilled trades
              </div>
              <div className="space-y-5">
                <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-slate-950 sm:text-6xl">
                  Hire trusted artisans or land your next paid trade job without the back-and-forth.
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-600">
                  Craftwork is a modern job board for electricians, plumbers, tailors, welders, carpenters, and service clients who need reliable help fast.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={currentUser ? "/dashboard" : "/signup"}
                  className="rounded-2xl bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {currentUser ? "Open dashboard" : "Create account"}
                </Link>
                <Link
                  href="/jobs"
                  className="rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Browse jobs
                </Link>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl bg-slate-950 p-5 text-white">
                  <p className="text-3xl font-semibold">{artisanCount}+</p>
                  <p className="mt-2 text-sm text-slate-300">Artisans available</p>
                </div>
                <div className="rounded-3xl bg-emerald-50 p-5 text-emerald-950">
                  <p className="text-3xl font-semibold">{db.jobs.length}</p>
                  <p className="mt-2 text-sm text-emerald-800">Live projects</p>
                </div>
                <div className="rounded-3xl bg-amber-50 p-5 text-amber-950">
                  <p className="text-3xl font-semibold">{clientCount}</p>
                  <p className="mt-2 text-sm text-amber-800">Hiring clients</p>
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[32px] bg-slate-950 p-6 text-white">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.24),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_30%)]" />
              <div className="relative space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-amber-300">Why teams use Craftwork</p>
                  <h2 className="mt-3 text-3xl font-semibold">Built for local service work, not generic resumes.</h2>
                </div>
                <div className="space-y-4">
                  {highlights.map((item) => (
                    <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
                      {item}
                    </div>
                  ))}
                </div>
                <div className="rounded-[28px] border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-300">Active categories</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm">
                    {["Electrical", "Plumbing", "Carpentry", "Tailoring", "Painting", "Welding"].map((trade) => (
                      <span key={trade} className="rounded-full bg-white/10 px-3 py-2">
                        {trade}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">How it works</p>
            <div className="mt-6 space-y-5">
              {[
                ["1", "Clients post a brief", "Add location, budget, timeline, and the trade needed."],
                ["2", "Artisans apply quickly", "Send a short pitch and show relevant skill coverage."],
                ["3", "Match and hire", "Track applications inside a role-specific dashboard."],
              ].map(([step, title, body]) => (
                <div key={title} className="flex gap-4 rounded-3xl bg-slate-50 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                    {step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Featured jobs</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-950">Recent openings</h2>
              </div>
              <Link href="/jobs" className="text-sm font-semibold text-slate-600 transition hover:text-slate-950">
                View all
              </Link>
            </div>

            <div className="mt-6 grid gap-4">
              {featuredJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{job.category}</p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-950">{job.title}</h3>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                      {job.budget}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{job.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
                    <span className="rounded-full bg-white px-3 py-1">{job.location}</span>
                    <span className="rounded-full bg-white px-3 py-1">{job.applicantIds.length} applicants</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
