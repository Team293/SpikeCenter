import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "../auth";

export const attendance = pgTable("spikeattendance_attendance", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    date: text("date").notNull(), // Store as YYYY-MM-DD string
    checkInTime: timestamp("check_in_time"), // Nullable - user might not have checked in yet
    checkOutTime: timestamp("check_out_time"), // Nullable - user might not have checked out yet
    status: text("status").notNull().default('present'), // 'present', 'absent'
    createdAt: timestamp("created_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const shop_days = pgTable("spikeattendance_session_day", {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    day: text("day").notNull(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
});
