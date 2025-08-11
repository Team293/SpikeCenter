"use server";

import { desc, eq } from "drizzle-orm";
import { UserDetail } from "@/app/admin/dashboard/_components/user-detail/types";
import { attendance, db } from "@spike/db";

export async function calculateHours(userId: string): Promise<number> {
  const records = await db
    .select()
    .from(attendance)
    .where(eq(attendance.userId, userId));

  let totalMilliseconds = 0;

  for (const record of records) {
    if (record.checkInTime && record.checkOutTime) {
      totalMilliseconds +=
        record.checkOutTime.getTime() - record.checkInTime.getTime();
    }
  }

  return totalMilliseconds / (1000 * 60 * 60);
}

export async function getUserDetail(userId: string): Promise<UserDetail> {
  const dbUser = await db
    .select()
    .from(user)
    .where(eq(user.id, userId))
    .execute();

  if (dbUser.length === 0) {
    throw new Error("User not found");
  }

  const hoursInShop = await calculateHours(userId);
  const attendanceRecordsRaw = await db
    .select()
    .from(attendance)
    .where(eq(attendance.userId, userId))
    .orderBy(desc(attendance.date))
    .execute();

  const attendanceRecords = attendanceRecordsRaw.map((record) => ({
    id: record.id,
    date: record.date,
    checkInTime: record.checkInTime
      ? record.checkInTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : null,
    checkOutTime: record.checkOutTime
      ? record.checkOutTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : null,
  }));

  return {
    id: dbUser[0].id,
    userName: dbUser[0].name,
    email: dbUser[0].email,
    // @ts-ignore
    role: dbUser[0].role,
    hoursInShop,
    attendanceRecords,
  };
}

// CRUD operations for attendance editing
export async function updateAttendanceRecord(
  recordId: number,
  data: {
    date: string;
    checkInTime?: Date | null;
    checkOutTime?: Date | null;
    status: string;
  },
) {
  console.log("updateAttendanceRecord called with:", { recordId, data });
  try {
    const result = await db
      .update(attendance)
      .set({
        date: data.date,
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        status: data.status,
        updatedAt: new Date(),
      })
      .where(eq(attendance.id, recordId));

    console.log("Update result:", result);
    return { success: true };
  } catch (error) {
    console.error("Error updating attendance record:", error);
    return { success: false, error: "Failed to update attendance record" };
  }
}

export async function createAttendanceRecord(data: {
  userId: string;
  date: string;
  checkInTime?: Date | null;
  checkOutTime?: Date | null;
  status: string;
}) {
  console.log("createAttendanceRecord called with:", data);
  try {
    const result = await db
      .insert(attendance)
      .values({
        userId: data.userId,
        date: data.date,
        checkInTime: data.checkInTime,
        checkOutTime: data.checkOutTime,
        status: data.status,
      })
      .returning();

    console.log("Create result:", result);
    return { success: true, record: result[0] };
  } catch (error) {
    console.error("Error creating attendance record:", error);
    return { success: false, error: "Failed to create attendance record" };
  }
}

export async function deleteAttendanceRecord(recordId: number) {
  console.log("deleteAttendanceRecord called with recordId:", recordId);
  try {
    const result = await db
      .delete(attendance)
      .where(eq(attendance.id, recordId));

    console.log("Delete result:", result);
    return { success: true };
  } catch (error) {
    console.error("Error deleting attendance record:", error);
    return { success: false, error: "Failed to delete attendance record" };
  }
}
