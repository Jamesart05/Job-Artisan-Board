import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/app/lib/server/auth";
import { readDb, toPublicUser } from "@/app/lib/server/db";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  const db = await readDb();

  if (currentUser.role === "client") {
    const jobs = db.jobs.filter((job) => job.clientId === currentUser.id);
    const applications = db.applications.filter((application) =>
      jobs.some((job) => job.id === application.jobId),
    );

    return (
      <div className="grid gap-6">
        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[28px] bg-slate-950 p-5 text-white">
            <p className="text-sm text-slate-300">Jobs posted</p>
            <p className="mt-3 text-4xl font-semibold">{jobs.length}</p>
          </div>
          <div className="rounded-[28px] bg-emerald-50 p-5 text-emerald-950">
            <p className="text-sm text-emerald-700">Applications received</p>
            <p className="mt-3 text-4xl font-semibold">{applications.length}</p>
          </div>
          <div className="rounded-[28px] bg-amber-50 p-5 text-amber-950">
            <p className="text-sm text-amber-700">Open roles</p>
            <p className="mt-3 text-4xl font-semibold">{jobs.filter((job) => job.status === "open").length}</p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Your jobs</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">Manage listings</h2>
              </div>
              <Link href="/dashboard/new-job" className="text-sm font-semibold text-slate-950">
                New job
              </Link>
            </div>
            <div className="mt-5 grid gap-4">
              {jobs.map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{job.category}</p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-950">{job.title}</h3>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                      {job.applicantIds.length} applicants
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{job.summary}</p>
                </Link>
              ))}
              {!jobs.length ? (
                <div className="rounded-3xl border border-dashed border-slate-200 p-6 text-sm text-slate-500">
                  No jobs posted yet.
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Recent applicants</p>
            <div className="mt-5 grid gap-4">
              {applications.slice(0, 5).map((application) => {
                const applicant = db.users.find((user) => user.id === application.artisanId);
                const job = db.jobs.find((item) => item.id === application.jobId);

                if (!applicant || !job) {
                  return null;
                }

                const publicApplicant = toPublicUser(applicant);

                return (
                  <div key={application.id} className="rounded-3xl bg-slate-50 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{job.title}</p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950">{publicApplicant.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{publicApplicant.location}</p>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{application.coverNote}</p>
                  </div>
                );
              })}
              {!applications.length ? <p className="text-sm text-slate-500">No applications yet.</p> : null}
            </div>
          </div>
        </section>
      </div>
    );
  }

  const applications = db.applications.filter((application) => application.artisanId === currentUser.id);
  const matchingJobs = db.jobs.filter((job) =>
    job.status === "open" &&
    (job.skills.some((skill) => currentUser.skills.includes(skill)) ||
      job.category.toLowerCase().includes(currentUser.skills[0]?.toLowerCase() ?? "")),
  );

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[28px] bg-slate-950 p-5 text-white">
          <p className="text-sm text-slate-300">Applications sent</p>
          <p className="mt-3 text-4xl font-semibold">{applications.length}</p>
        </div>
        <div className="rounded-[28px] bg-emerald-50 p-5 text-emerald-950">
          <p className="text-sm text-emerald-700">Skill tags</p>
          <p className="mt-3 text-4xl font-semibold">{currentUser.skills.length}</p>
        </div>
        <div className="rounded-[28px] bg-amber-50 p-5 text-amber-950">
          <p className="text-sm text-amber-700">Suggested jobs</p>
          <p className="mt-3 text-4xl font-semibold">{matchingJobs.length}</p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Your profile</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-950">{currentUser.name}</h2>
          <p className="mt-2 text-sm text-slate-500">{currentUser.location}</p>
          <p className="mt-4 text-sm leading-6 text-slate-600">{currentUser.bio || "No bio added yet."}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {currentUser.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Recommended jobs</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">Work that matches your trade</h2>
            </div>
            <Link href="/jobs" className="text-sm font-semibold text-slate-950">
              Browse all
            </Link>
          </div>

          <div className="mt-5 grid gap-4">
            {matchingJobs.slice(0, 5).map((job) => (
              <Link key={job.id} href={`/jobs/${job.id}`} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{job.category}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">{job.title}</h3>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">{job.budget}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{job.summary}</p>
              </Link>
            ))}
            {!matchingJobs.length ? <p className="text-sm text-slate-500">No recommended jobs yet.</p> : null}
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Application history</p>
        <div className="mt-5 grid gap-4">
          {applications.map((application) => {
            const job = db.jobs.find((item) => item.id === application.jobId);
            if (!job) {
              return null;
            }

            return (
              <Link key={application.id} href={`/jobs/${job.id}`} className="rounded-3xl bg-slate-50 p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">{job.category}</p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-950">{job.title}</h3>
                  </div>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold capitalize text-slate-600">
                    {application.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{application.coverNote}</p>
              </Link>
            );
          })}
          {!applications.length ? <p className="text-sm text-slate-500">You have not applied for any jobs yet.</p> : null}
        </div>
      </section>
    </div>
  );
}
