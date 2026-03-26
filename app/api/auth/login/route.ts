import { NextRequest, NextResponse } from "next/server";
import { createSession, validateCredentials } from "@/app/lib/server/auth";
import { readDb, toPublicUser } from "@/app/lib/server/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const db = await readDb();
  const user = db.users.find((item) => item.email.toLowerCase() === email.toLowerCase().trim());

  if (!user || !validateCredentials(user, password)) {
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  }

  const response = NextResponse.json({ user: toPublicUser(user) });
  await createSession(user.id, response);
  return response;
}
