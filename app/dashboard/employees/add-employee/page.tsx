"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { PageHeader, SurfaceCard } from "../../components/ui";

const sections = [
  "Personal information",
  "Professional information",
  "Documents",
  "Employment details",
];

const AddEmployee = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Create"
        title="Add employee"
        description="Capture a complete employee record covering identity, role, and payroll details."
        action={
          <Link href="/dashboard/employees" className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-violet-200 hover:text-violet-700">
            <Icon icon="solar:alt-arrow-left-linear" width={18} height={18} />
            Back to employees
          </Link>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SurfaceCard>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">Workflow</p>
          <div className="mt-6 space-y-4">
            {sections.map((section, index) => (
              <div key={section} className={`rounded-3xl border px-4 py-4 ${index === 0 ? "border-violet-200 bg-violet-50" : "border-slate-100 bg-slate-50"}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Step {index + 1}</p>
                <p className="mt-2 font-medium text-slate-900">{section}</p>
              </div>
            ))}
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <form className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <input className="rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-violet-300" type="text" placeholder="First name" />
              <input className="rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-violet-300" type="text" placeholder="Last name" />
              <input className="rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-violet-300" type="email" placeholder="Work email" />
              <input className="rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-violet-300" type="tel" placeholder="Phone number" />
              <input className="rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-violet-300" type="text" placeholder="Job title" />
              <select className="rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-violet-300" defaultValue="">
                <option value="" disabled>Select department</option>
                <option>People Ops</option>
                <option>Engineering</option>
                <option>Design</option>
                <option>Finance</option>
                <option>Operations</option>
              </select>
              <input className="rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-violet-300" type="date" />
              <select className="rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-violet-300" defaultValue="">
                <option value="" disabled>Employment type</option>
                <option>Permanent</option>
                <option>Contract</option>
                <option>Intern</option>
              </select>
            </div>

            <textarea className="min-h-32 w-full rounded-2xl border border-slate-200 px-4 py-4 outline-none transition focus:border-violet-300" placeholder="Address, emergency contact, or onboarding notes" />

            <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
              <Icon icon="solar:cloud-upload-bold-duotone" width={32} height={32} className="mx-auto text-violet-500" />
              <p className="mt-3 font-medium text-slate-900">Upload employee documents</p>
              <p className="mt-1 text-sm text-slate-500">Offer letter, identity proof, tax forms, and contract files.</p>
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <button type="button" className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
                Save draft
              </button>
              <button type="submit" className="rounded-2xl bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)]">
                Create employee
              </button>
            </div>
          </form>
        </SurfaceCard>
      </div>
    </div>
  );
};

export default AddEmployee;
