import {attendance, db, shop_days, user} from "@/index";
import { and, eq, isNull, isNotNull } from 'drizzle-orm';
import { DateTime } from 'luxon';

const SECURITY_KEY = process.env.CRON_SECURITY_KEY || 'default_secret_key';

export async function POST(request: Request) {
    const headerKey = request.headers.get('x-cron-key');

    if (headerKey !== SECURITY_KEY) {
        console.log("[Cron] Unauthorized access attempt");
        return new Response("Unauthorized", { status: 401 });
    }

    console.log("[Cron] Job started");

    const estNow = DateTime.now().setZone('America/New_York');
    const today = estNow.toFormat('yyyy-MM-dd'); // Format as YYYY-MM-DD string

    const checkoutTime = estNow
        .set({ hour: 17, minute: 0, second: 0, millisecond: 0 }) // 5:00 PM EST
        .toUTC()                                                  // convert to UTC
        .toJSDate();                                              // convert to JS Date object

    if (await isShopDay(new Date())) {
        console.log("[Cron] Today is a shop day");

        const users = await db.select().from(user).execute();
        console.log(`[Cron] Found ${users.length} users`);

        for (const u of users) {
            // Check if user has any attendance record for today
            const todayAttendance = await db
                .select()
                .from(attendance)
                .where(
                    and(
                        eq(attendance.userId, u.id),
                        eq(attendance.date, today)
                    )
                )
                .limit(1)
                .execute();

            if (todayAttendance.length === 0) {
                // User has no attendance record for today - mark as absent
                console.log(`[Cron] User ${u.id} did not check in. Marking absent.`);
                await db.insert(attendance).values({
                    userId: u.id,
                    date: today,
                    checkInTime: null,
                    checkOutTime: null,
                    status: 'absent',
                });
            }
        }
    } else {
        console.log("[Cron] Today is not a shop day");
    }

    console.log("[Cron] Checking for users who checked in but not out");

    // Find users who have checked in today but haven't checked out
    const checkedInNotOutUsers = await db
        .select()
        .from(attendance)
        .where(
            and(
                eq(attendance.date, today),
                isNotNull(attendance.checkInTime),  // Has checked in
                isNull(attendance.checkOutTime)     // But hasn't checked out
            )
        )
        .execute();

    console.log(`[Cron] Found ${checkedInNotOutUsers.length} users to auto check-out`);

    for (const record of checkedInNotOutUsers) {
        console.log(`[Cron] Auto check-out for user ${record.userId}`);

        // Update the existing record to add check-out time
        await db
            .update(attendance)
            .set({
                checkOutTime: checkoutTime,
                updatedAt: new Date(),
            })
            .where(eq(attendance.id, record.id));
    }

    console.log("[Cron] Job completed successfully");
    return new Response("OK", { status: 200 });
}

async function isShopDay(date: Date): Promise<boolean> {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    const shopDay = await db
        .select()
        .from(shop_days)
        .where(eq(shop_days.day, dayName))
        .limit(1)
        .execute();

    return shopDay.length > 0;
}