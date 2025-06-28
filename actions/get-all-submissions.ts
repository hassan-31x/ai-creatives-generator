"use server"

import { db } from "@/lib/db";

export async function getAllSubmissions() {
  return db.submission.findMany({
    orderBy: { createdAt: "desc" },
  });
}
