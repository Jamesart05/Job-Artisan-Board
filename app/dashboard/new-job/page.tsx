import { redirect } from "next/navigation";
import { JobForm } from "@/app/components/marketplace/job-form";
import { getCurrentUser } from "@/app/lib/server/auth";

export const dynamic = "force-dynamic";

export default async function NewJobPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/login");
  }

  if (currentUser.role !== "client") {
    redirect("/dashboard");
  }

  return (
    <section className="mx-auto max-w-3xl rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_25px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-400">Create listing</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-950">Post a new artisan job</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Add the trade, scope, location, and budget so artisans can evaluate the project properly.
      </p>
      <div className="mt-8">
        <JobForm />
      </div>
    </section>
  );
}
