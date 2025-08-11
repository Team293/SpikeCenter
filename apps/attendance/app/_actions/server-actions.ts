"use server";

import { auth } from "@spike/auth";
import { attendance, db } from "@spike/db";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";

export async function logAction(action: string, userId: string) {
  const today = new Date().toISOString().split("T")[0];

  // Check if there's already an attendance record for today
  const existingRecord = await db
    .select()
    .from(attendance)
    .where(and(eq(attendance.userId, userId), eq(attendance.date, today)))
    .limit(1);

  if (existingRecord.length > 0) {
    // Update existing record
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (action === "check-in") {
      updateData.checkInTime = new Date();
    } else if (action === "check-out") {
      updateData.checkOutTime = new Date();
    }

    await db
      .update(attendance)
      .set(updateData)
      .where(eq(attendance.id, existingRecord[0].id));
  } else {
    // Create new record
    const recordData: any = {
      userId: userId,
      date: today,
      status: "present",
    };

    if (action === "check-in") {
      recordData.checkInTime = new Date();
    } else if (action === "check-out") {
      recordData.checkOutTime = new Date();
    }

    await db.insert(attendance).values(recordData);
  }
}

export async function getStatus(
  userId: string,
): Promise<"checked-in" | "checked-out"> {
  const today = new Date().toISOString().split("T")[0];

  // Get today's attendance record
  const todayRecord = await db
    .select()
    .from(attendance)
    .where(and(eq(attendance.userId, userId), eq(attendance.date, today)))
    .limit(1);

  if (todayRecord.length === 0) {
    return "checked-out";
  }

  const record = todayRecord[0];

  // If user has checked in but not checked out, they're checked in
  if (record.checkInTime && !record.checkOutTime) {
    return "checked-in";
  }

  // Otherwise they're checked out
  return "checked-out";
}

export async function getCheckedInTime(userId: string): Promise<Date | null> {
  const today = new Date().toISOString().split("T")[0];

  // Get today's attendance record
  const todayRecord = await db
    .select()
    .from(attendance)
    .where(and(eq(attendance.userId, userId), eq(attendance.date, today)))
    .limit(1);

  if (todayRecord.length === 0 || !todayRecord[0].checkInTime) {
    return null;
  }

  return todayRecord[0].checkInTime;
}

export async function signOut() {
  await auth.api.signOut({
    headers: await headers(),
  });
}
