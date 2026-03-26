import { NextRequest, NextResponse } from "next/server";
import { requireCurrentUser } from "@/app/lib/server/auth";
import { createId, readDb, writeDb } from "@/app/lib/server/db";

export async function POST(request: NextRequest) {
  const currentUser = await requireCurrentUser().catch(() => null);

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  if (currentUser.role !== "client") {
    return NextResponse.json({ error: "Only clients can post jobs." }, { status: 403 });
  }

  const body = await request.json();
  const { title, category, location, budget, budgetType, summary, description, skills } = body as {
    title?: string;
    category?: string;
    location?: string;
    budget?: string;
    budgetType?: "fixed" | "monthly";
    summary?: string;
    description?: string;
    skills?: string[];
  };

  if (!title || !category || !location || !budget || !summary || !description) {
    return NextResponse.json({ error: "Please complete the required job fields." }, { status: 400 });
  }

  const db = await readDb();
  const job = {
    id: createId("job"),
    title: title.trim(),
    category: category.trim(),
    location: location.trim(),
    budget: budget.trim(),
    budgetType: budgetType ?? "fixed",
    summary: summary.trim(),
    description: description.trim(),
    skills: (skills ?? []).filter(Boolean),
    status: "open" as const,
    clientId: currentUser.id,
    createdAt: new Date().toISOString(),
    applicantIds: [],
  };

  db.jobs.unshift(job);
  await writeDb(db);

  return NextResponse.json({ job }, { status: 201 });
}
