"use server";

import { db, shop_days } from "@spike/db";
import { eq } from "drizzle-orm";

export async function updateShopDays(days: string[]) {
  // get current shop days
  const currentDays = await db.select().from(shop_days);
  const currentDayNames = currentDays.map((d) => d.day);

  // delete days that are no longer selected
  for (const day of currentDayNames) {
    if (!days.includes(day)) {
      await db.delete(shop_days).where(eq(shop_days.day, day));
    }
  }

  // insert new days
  for (const day of days) {
    if (!currentDayNames.includes(day)) {
      await db.insert(shop_days).values({ day });
    }
  }
}

export async function getShopDays() {
  const days = await db.select().from(shop_days);
  return days.map((d) => d.day);
}
