"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const categories = ["Electrical", "Plumbing", "Carpentry", "Tailoring", "Painting", "Welding"];

export function JobForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      title: String(formData.get("title") ?? ""),
      category: String(formData.get("category") ?? ""),
      location: String(formData.get("location") ?? ""),
      budget: String(formData.get("budget") ?? ""),
      budgetType: String(formData.get("budgetType") ?? "fixed"),
      summary: String(formData.get("summary") ?? ""),
      description: String(formData.get("description") ?? ""),
      skills: String(formData.get("skills") ?? "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(result.error ?? "Unable to post job.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Job title</span>
        <input name="title" required className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Category</span>
          <select name="category" required className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400">
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Budget type</span>
          <select name="budgetType" className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400">
            <option value="fixed">Fixed project</option>
            <option value="monthly">Monthly contract</option>
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Location</span>
          <input name="location" required className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Budget</span>
          <input name="budget" required placeholder="NGN 350,000" className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Short summary</span>
        <textarea name="summary" rows={3} required className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Full description</span>
        <textarea name="description" rows={6} required className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-700">Required skills</span>
        <input name="skills" placeholder="Cabinetry, finishing, site measurement" className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" />
      </label>

      {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Posting..." : "Publish job"}
      </button>
    </form>
  );
}
