"use client";

import { useState } from "react";
import { AttendanceStatus } from "./attendance-status";
import { StatusIndicator } from "./status-indicator";
import { getCurrentDate } from "~/lib/date-helper";
import { UserHeader } from "./user-header";
import { asUrl } from "@spike/config/paths.config";
import sharedEnv from "@spike/env/env.shared";
import { redirect } from "next/navigation";
import { logAction } from "~/_actions/server-actions";
import { ViewAdminDashboard } from "./view-admin-dashboard";

export default function AttendanceTracker({
  session,
  isCheckedIn: initialCheckedIn,
  checkInTime: initialCheckInTime,
}: {
  session?: any;
  isCheckedIn: boolean;
  checkInTime?: Date;
}) {
  const [isCheckedIn, setIsCheckedIn] = useState(initialCheckedIn);
  const [checkInTime, setCheckInTime] = useState<Date | undefined>(
    initialCheckInTime,
  );
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!session) {
    redirect(
      asUrl("auth", "login") + "?redirectUrl=" + sharedEnv.ATTENDANCE_BASE_URL,
    );
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const checkInOutHandler = async (status: string) => {
    if (!session) return;
    setLoading(true);
    await logAction(status, session.user.id);
    if (status === "check-in") {
      setIsCheckedIn(true);
      setCheckInTime(new Date());
      setCheckOutTime(null);
    } else {
      setIsCheckedIn(false);
      setCheckOutTime(formatTime(new Date()));
      setCheckInTime(undefined);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <UserHeader
          userName={session.user.name}
          currentDate={getCurrentDate()}
        />

        <AttendanceStatus
          isCheckedIn={isCheckedIn}
          checkInTime={checkInTime ? formatTime(checkInTime) : null}
          checkOutTime={checkOutTime}
          onCheckInOut={checkInOutHandler}
          loading={loading}
        />

        <StatusIndicator isCheckedIn={isCheckedIn} />

        <ViewAdminDashboard hasAccess={session.user.role === "admin"} />
      </div>
    </div>
  );
}
