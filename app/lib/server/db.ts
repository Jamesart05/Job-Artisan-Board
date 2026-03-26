import { promises as fs } from "fs";
import path from "path";
import { Database, PublicUser, User } from "@/app/lib/types";

const dbPath = path.join(process.cwd(), "app", "data", "artisan-board.json");

export async function readDb(): Promise<Database> {
  const raw = await fs.readFile(dbPath, "utf8");
  return JSON.parse(raw) as Database;
}

export async function writeDb(data: Database) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export function toPublicUser(user: User): PublicUser {
  const { passwordHash, ...publicUser } = user;
  void passwordHash;
  return publicUser;
}

export function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}
