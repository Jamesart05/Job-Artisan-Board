import { NextRequest, NextResponse } from "next/server";
import { requireCurrentUser } from "@/app/lib/server/auth";
import { createId, readDb, writeDb } from "@/app/lib/server/db";

type RouteContext = {
  params: Promise<{ jobId: string }>;
};

export async function POST(request: NextRequest, context: RouteContext) {
  const currentUser = await requireCurrentUser().catch(() => null);

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (currentUser.role !== "artisan") {
    return NextResponse.json({ error: "Only artisans can apply for jobs." }, { status: 403 });
  }

  const { jobId } = await context.params;
  const body = await request.json();
  const coverNote = String(body.coverNote ?? "").trim();

  if (!coverNote) {
    return NextResponse.json({ error: "Cover note is required." }, { status: 400 });
  }

  const db = await readDb();
  const job = db.jobs.find((item) => item.id === jobId && item.status === "open");

  if (!job) {
    return NextResponse.json({ error: "Job not found." }, { status: 404 });
  }

  const alreadyApplied = db.applications.some(
    (application) => application.jobId === jobId && application.artisanId === currentUser.id,
  );

  if (alreadyApplied) {
    return NextResponse.json({ error: "You have already applied for this job." }, { status: 409 });
  }

  const application = {
    id: createId("application"),
    jobId,
    artisanId: currentUser.id,
    coverNote,
    status: "new" as const,
    createdAt: new Date().toISOString(),
  };

  db.applications.unshift(application);
  job.applicantIds = Array.from(new Set([...job.applicantIds, currentUser.id]));
  await writeDb(db);

  return NextResponse.json({ application }, { status: 201 });
}
