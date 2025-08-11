"use client";

import { useState } from "react";
import { AttendanceStatus } from "./attendance-status";
import { StatusIndicator } from "./status-indicator";
import { getCurrentDate } from "@/lib/date-helper";
import { UserHeader } from "./user-header";
import { ViewAdminDashboard } from "@/app/_components/view-admin-dashboard";
import { logAction } from "@/app/_actions/server-actions";
import { asUrl } from "@spike/config/paths.config";
import sharedEnv from "@spike/env/env.shared";
import { redirect } from "next/navigation";

export default function AttendanceTracker({
  session,
  isCheckedIn: initialCheckedIn,
  checkInTime: initialCheckInTime,
}: {
  session?: any;
  isCheckedIn: boolean;
  checkInTime?: Date;
}) {
  if (!session) {
    return redirect(
      asUrl("auth", "login") + "?redirectUrl=" + sharedEnv.ATTENDANCE_BASE_URL,
    );
  }

  const [isCheckedIn, setIsCheckedIn] = useState(initialCheckedIn);
  const [checkInTime, setCheckInTime] = useState<Date | undefined>(
    initialCheckInTime,
  );
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const checkInOutHandler = async (status: string) => {
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
