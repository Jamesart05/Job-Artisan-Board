import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { readDb, toPublicUser, writeDb } from "@/app/lib/server/db";
import { PublicUser, User } from "@/app/lib/types";

const SESSION_COOKIE = "craftwork_session";
const SESSION_LENGTH_MS = 1000 * 60 * 60 * 24 * 7;

export function hashPassword(password: string) {
  return createHash("sha256").update(password).digest("hex");
}

export async function createSession(userId: string, response: NextResponse) {
  const db = await readDb();
  const token = randomBytes(24).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_LENGTH_MS).toISOString();

  db.sessions = db.sessions
    .filter((session) => new Date(session.expiresAt).getTime() > Date.now())
    .concat({ token, userId, expiresAt });

  await writeDb(db);
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });
}

export async function clearSession(response: NextResponse) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    const db = await readDb();
    db.sessions = db.sessions.filter((session) => session.token !== token);
    await writeDb(db);
  }

  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  const db = await readDb();
  const session = db.sessions.find(
    (item) => item.token === token && new Date(item.expiresAt).getTime() > Date.now(),
  );

  if (!session) {
    return null;
  }

  const user = db.users.find((item) => item.id === session.userId);
  return user ? toPublicUser(user) : null;
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export function validateCredentials(user: User | undefined, password: string) {
  return !!user && user.passwordHash === hashPassword(password);
}

export { SESSION_COOKIE };
