import Link from "next/link";
import { getCurrentUser } from "@/app/lib/server/auth";
import { readDb } from "@/app/lib/server/db";

export const dynamic = "force-dynamic";

type JobsPageProps = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const params = await searchParams;
  const query = params.q?.toLowerCase().trim() ?? "";
  const category = params.category?.trim() ?? "";
  const [db, currentUser] = await Promise.all([readDb(), getCurrentUser()]);
  const categories = Array.from(new Set(db.jobs.map((job) => job.category)));

  const jobs = db.jobs.filter((job) => {
    const matchesQuery =
      !query ||
      [job.title, job.summary, job.location, ...job.skills].some((value) =>
        value.toLowerCase().includes(query),
      );
    const matchesCategory = !category || job.category === category;
    return matchesQuery && matchesCategory && job.status === "open";
  });

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Job board</p>
              <h1 className="mt-3 text-4xl font-semibold text-slate-950">Browse artisan opportunities</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Filter by trade, location, or project keywords. Sign in as an artisan to apply or as a client to post openings.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700">
                Home
              </Link>
              <Link
                href={currentUser ? "/dashboard" : "/login"}
                className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white"
              >
                {currentUser ? "Dashboard" : "Sign in"}
              </Link>
            </div>
          </div>

          <form className="mt-8 grid gap-4 lg:grid-cols-[1fr_220px_160px]">
            <input
              name="q"
              defaultValue={params.q ?? ""}
              placeholder="Search jobs, skills, or location"
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-slate-400"
            />
            <select
              name="category"
              defaultValue={category}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 outline-none transition focus:border-slate-400"
            >
              <option value="">All categories</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <button type="submit" className="rounded-2xl bg-amber-400 px-4 py-3.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-300">
              Apply filters
            </button>
          </form>
        </section>

        <section className="mt-6 grid gap-4">
          {jobs.map((job) => (
            <Link
              key={job.id}
              href={`/jobs/${job.id}`}
              className="rounded-[28px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.05)] transition hover:border-slate-300 hover:bg-white"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                    <span>{job.category}</span>
                    <span>{job.location}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-slate-950">{job.title}</h2>
                </div>
                <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">{job.budget}</div>
              </div>
              <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600">{job.summary}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {skill}
                  </span>
                ))}
              </div>
            </Link>
          ))}
          {!jobs.length ? (
            <div className="rounded-[28px] border border-slate-200 bg-white/85 p-8 text-center text-sm text-slate-600">
              No jobs matched the current filters.
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
