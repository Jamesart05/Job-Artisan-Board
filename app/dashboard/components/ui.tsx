import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function SurfaceCard({ children, className = "" }: CardProps) {
  return (
    <section
      className={`rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur ${className}`}
    >
      {children}
    </section>
  );
}

type HeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, action }: HeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#6b7280]">
            {eyebrow}
          </p>
        ) : null}
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight text-[#111827]">{title}</h1>
          {description ? <p className="max-w-2xl text-sm text-[#6b7280]">{description}</p> : null}
        </div>
      </div>
      {action}
    </div>
  );
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "success" | "warning" | "danger" | "brand";
}) {
  const styles = {
    neutral: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-rose-100 text-rose-700",
    brand: "bg-violet-100 text-violet-700",
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${styles[tone]}`}>
      {children}
    </span>
  );
}
