"use server"

import { db } from "@/lib/db";

export async function getSubmissionById(id: string) {
  return db.submission.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
}
