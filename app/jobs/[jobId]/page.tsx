import Link from "next/link";
import { notFound } from "next/navigation";
import { ApplyPanel } from "@/app/components/marketplace/apply-panel";
import { getCurrentUser } from "@/app/lib/server/auth";
import { readDb, toPublicUser } from "@/app/lib/server/db";

export const dynamic = "force-dynamic";

type JobDetailPageProps = {
  params: Promise<{ jobId: string }>;
};

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { jobId } = await params;
  const [db, currentUser] = await Promise.all([readDb(), getCurrentUser()]);
  const job = db.jobs.find((item) => item.id === jobId);

  if (!job) {
    notFound();
  }

  const client = db.users.find((item) => item.id === job.clientId);
  const applications = db.applications.filter((application) => application.jobId === job.id);
  const alreadyApplied = !!currentUser && applications.some((item) => item.artisanId === currentUser.id);
  const applicants = applications
    .map((application) => db.users.find((user) => user.id === application.artisanId))
    .filter(Boolean)
    .map((user) => toPublicUser(user!));

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap gap-3">
          <Link href="/jobs" className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700">
            Back to jobs
          </Link>
          <Link href={currentUser ? "/dashboard" : "/login"} className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
            {currentUser ? "Dashboard" : "Sign in"}
          </Link>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  <span>{job.category}</span>
                  <span>{job.location}</span>
                </div>
                <h1 className="mt-3 max-w-3xl text-4xl font-semibold text-slate-950">{job.title}</h1>
              </div>
              <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">{job.budget}</div>
            </div>

            <p className="mt-6 text-base leading-8 text-slate-600">{job.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {job.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                  {skill}
                </span>
              ))}
            </div>

            {client ? (
              <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Posted by</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950">{client.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{client.location}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{client.bio}</p>
              </div>
            ) : null}
          </section>

          <section className="space-y-6">
            <ApplyPanel
              jobId={job.id}
              currentUser={currentUser}
              alreadyApplied={alreadyApplied}
              isOwner={currentUser?.id === job.clientId}
            />

            <div className="rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Applicants</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{applications.length}</p>
              <div className="mt-5 grid gap-3">
                {applicants.slice(0, 3).map((applicant) => (
                  <div key={applicant.id} className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">{applicant.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{applicant.location}</p>
                    {applicant.skills.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {applicant.skills.map((skill) => (
                          <span key={skill} className="rounded-full bg-white px-3 py-1 text-xs text-slate-600">
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
                {!applications.length ? <p className="text-sm text-slate-500">No applications yet.</p> : null}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
