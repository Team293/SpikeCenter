"use server";

import { auth } from "@spike/auth";
import { attendance, db } from "@spike/db";
import { eq, and, isNull } from "drizzle-orm";
import { headers } from "next/headers";

export async function logAction(action: string, userId: string) {
  const today = new Date().toISOString().split("T")[0];

  if (action === "check-in") {
    // Always create a new record on check-in
    await db.insert(attendance).values({
      userId,
      date: today,
      status: "present",
      checkInTime: new Date(),
    } as any);
    return;
  }

  if (action === "check-out") {
    // Find the latest (open) record for today without a check-out time
    const openRecord = await db
      .select()
      .from(attendance)
      .where(
        and(
          eq(attendance.userId, userId),
          eq(attendance.date, today),
          isNull(attendance.checkOutTime),
        ),
      )
      .limit(1);

    if (openRecord.length > 0) {
      await db
        .update(attendance)
        .set({
          checkOutTime: new Date(),
          updatedAt: new Date(),
        } as any)
        .where(eq(attendance.id, openRecord[0].id));
    }

    return;
  }
}

export async function getStatus(
  userId: string,
): Promise<"checked-in" | "checked-out"> {
  const today = new Date().toISOString().split("T")[0];

  // Any open (no checkOutTime) record today means user is currently checked in
  const openRecord = await db
    .select()
    .from(attendance)
    .where(
      and(
        eq(attendance.userId, userId),
        eq(attendance.date, today),
        isNull(attendance.checkOutTime),
      ),
    )
    .limit(1);

  if (openRecord.length > 0) {
    return "checked-in";
  }

  return "checked-out";
}

export async function getCheckedInTime(userId: string): Promise<Date | null> {
  const today = new Date().toISOString().split("T")[0];

  // Get the current open session (no checkOutTime) for today
  const openRecord = await db
    .select()
    .from(attendance)
    .where(
      and(
        eq(attendance.userId, userId),
        eq(attendance.date, today),
        isNull(attendance.checkOutTime),
      ),
    )
    .limit(1);

  if (openRecord.length === 0 || !openRecord[0].checkInTime) {
    return null;
  }

  return openRecord[0].checkInTime;
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
}
