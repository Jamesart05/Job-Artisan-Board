import { NextRequest, NextResponse } from "next/server";
import { createSession, hashPassword } from "@/app/lib/server/auth";
import { createId, readDb, toPublicUser, writeDb } from "@/app/lib/server/db";
import { UserRole } from "@/app/lib/types";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, password, role, location, bio, skills } = body as {
    name?: string;
    email?: string;
    password?: string;
    role?: UserRole;
    location?: string;
    bio?: string;
    skills?: string[];
  };

  if (!name || !email || !password || !role || !location) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const db = await readDb();
  const normalizedEmail = email.toLowerCase().trim();

  if (db.users.some((user) => user.email.toLowerCase() === normalizedEmail)) {
    return NextResponse.json({ error: "An account already exists for this email." }, { status: 409 });
  }

  const user = {
    id: createId(role),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    role,
    location: location.trim(),
    bio: (bio ?? "").trim(),
    skills: role === "artisan" ? (skills ?? []).filter(Boolean) : [],
    createdAt: new Date().toISOString(),
  };

  db.users.push(user);
  await writeDb(db);

  const response = NextResponse.json({ user: toPublicUser(user) }, { status: 201 });
  await createSession(user.id, response);
  return response;
}
