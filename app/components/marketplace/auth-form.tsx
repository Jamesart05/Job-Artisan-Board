"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserRole } from "@/app/lib/types";

type AuthFormProps = {
  mode: "login" | "signup";
  nextPath?: string;
};

const roleOptions: UserRole[] = ["artisan", "client"];

export function AuthForm({ mode, nextPath = "/dashboard" }: AuthFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<UserRole>("artisan");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const skillsInput = String(formData.get("skills") ?? "");
    const payload =
      mode === "login"
        ? {
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
          }
        : {
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
            role,
            location: String(formData.get("location") ?? ""),
            bio: String(formData.get("bio") ?? ""),
            skills: skillsInput
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
          };

    const response = await fetch(mode === "login" ? "/api/auth/login" : "/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as { error?: string };

    if (!response.ok) {
      setError(result.error ?? "Something went wrong.");
      setLoading(false);
      return;
    }

    router.push(nextPath);
    router.refresh();
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
      <section className="hidden bg-slate-950 px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Craftwork</p>
          <h1 className="mt-6 max-w-lg text-5xl font-semibold leading-tight">
            {mode === "login"
              ? "Return to your pipeline and pick up where hiring stopped."
              : "Build a profile that actually reflects how trade work gets hired."}
          </h1>
          <p className="mt-5 max-w-md text-base leading-7 text-slate-300">
            Job posting, artisan discovery, and applications all run in one Next.js fullstack workspace.
          </p>
        </div>

        <div className="grid gap-4">
          {[
            "Demo password for seeded accounts: password123",
            "Clients can post jobs and review applicants",
            "Artisans can browse openings and apply with a pitch",
          ].map((item) => (
            <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section className="flex items-center px-5 py-8 sm:px-8 lg:px-14">
        <div className="mx-auto w-full max-w-xl rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.1)] backdrop-blur sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            {mode === "login" ? "Sign in" : "Create account"}
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-slate-950">
            {mode === "login" ? "Welcome back" : "Join the marketplace"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {mode === "login"
              ? "Use one of the seeded accounts or create a new profile."
              : "Choose whether you are hiring artisans or applying for jobs."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            {mode === "signup" ? (
              <>
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-700">I am joining as</span>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {roleOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setRole(option)}
                        className={`rounded-2xl border px-4 py-4 text-left transition ${
                          role === option
                            ? "border-slate-950 bg-slate-950 text-white"
                            : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <p className="font-semibold capitalize">{option}</p>
                        <p className={`mt-1 text-sm ${role === option ? "text-slate-200" : "text-slate-500"}`}>
                          {option === "artisan" ? "Find projects and submit applications." : "Post jobs and hire artisans."}
                        </p>
                      </button>
                    ))}
                  </div>
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-700">Full name</span>
                  <input name="name" required className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-700">Location</span>
                  <input name="location" required className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" />
                </label>
              </>
            ) : null}

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input name="email" type="email" required className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input name="password" type="password" required className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" />
            </label>

            {mode === "signup" ? (
              <>
                <label className="grid gap-2">
                  <span className="text-sm font-medium text-slate-700">Bio</span>
                  <textarea name="bio" rows={4} className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400" />
                </label>

                {role === "artisan" ? (
                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-slate-700">Skills</span>
                    <input
                      name="skills"
                      placeholder="Wiring, fault tracing, solar setup"
                      className="rounded-2xl border border-slate-200 bg-white px-4 py-3.5 outline-none transition focus:border-slate-400"
                    />
                  </label>
                ) : null}
              </>
            ) : null}

            {error ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-slate-500">
            {mode === "login" ? "Need an account? " : "Already have an account? "}
            <Link href={mode === "login" ? "/signup" : "/login"} className="font-semibold text-slate-950">
              {mode === "login" ? "Create one" : "Sign in"}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
