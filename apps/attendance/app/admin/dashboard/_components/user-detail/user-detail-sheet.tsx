import React, { useEffect, useState } from "react";
import { Sheet, SheetContent } from "@spike/ui/sheet";
import { Button } from "@spike/ui/button";
import { Plus } from "lucide-react";
import { LoadingState } from "./loading-state";
import { UserHeader } from "./user-header";
import { UserInfoCard } from "./user-info-card";
import { AttendanceOverviewCard } from "./attendance-overview-card";
import { WeeklyAttendanceCard } from "./weekly-attendance-card";
import { EditableAttendanceRecord } from "./editable-attendance-record";
import { groupAttendanceByWeek, getAttendanceStatus } from "./utils";
import type {
  UserDetail,
  UserDetailSheetProps,
  AttendanceRecord,
} from "./types";
import {
  createAttendanceRecord,
  getUserDetail,
} from "../../_actions/server-actions";

function UserDetailSheet({ userId, open, onOpenChange }: UserDetailSheetProps) {
  const [expandedWeeks, setExpandedWeeks] = useState<Set<string>>(new Set());
  const [user, setUser] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (userId && open) {
      setLoading(true);
      getUserDetail(userId)
        .then(setUser)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [userId, open]);

  // Reset edit mode when sheet closes
  useEffect(() => {
    if (!open) {
      setIsEditMode(false);
    }
  }, [open]);

  const toggleWeek = (weekKey: string) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(weekKey)) {
      newExpanded.delete(weekKey);
    } else {
      newExpanded.add(weekKey);
    }
    setExpandedWeeks(newExpanded);
  };

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleRoleUpdated = () => {
    // Refresh user data to get updated role
    if (userId) {
      setLoading(true);
      getUserDetail(userId)
        .then(setUser)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  };

  const handleUpdateRecord = (updatedRecord: AttendanceRecord) => {
    if (!user) return;

    setUser({
      ...user,
      attendanceRecords: user.attendanceRecords.map((record) =>
        record.id === updatedRecord.id ? updatedRecord : record,
      ),
    });
  };

  const handleDeleteRecord = (recordId: number) => {
    if (!user) return;

    setUser({
      ...user,
      attendanceRecords: user.attendanceRecords.filter(
        (record) => record.id !== recordId,
      ),
    });
  };

  const handleAddNewRecord = async () => {
    if (!user) return;

    const today = new Date().toISOString().split("T")[0];
    const now = new Date();
    const currentTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    try {
      const result = await createAttendanceRecord({
        userId: user.id,
        date: today,
        checkInTime: now,
        status: "present",
      });

      if (result.success && result.record) {
        const newRecord: AttendanceRecord = {
          id: result.record.id,
          date: today,
          checkInTime: currentTime,
          checkOutTime: null,
        };

        setUser({
          ...user,
          attendanceRecords: [newRecord, ...user.attendanceRecords],
        });
      } else {
        console.error("Failed to create record:", result.error);
        alert(
          "Failed to create new record: " + (result.error || "Unknown error"),
        );
      }
    } catch (error) {
      console.error("Error adding new record:", error);
      alert("Failed to create new record. Please try again.");
    }
  };

  if (loading || !user) {
    return <LoadingState open={open} onOpenChange={onOpenChange} />;
  }

  const weeklyData = groupAttendanceByWeek(user);
  const totalStats = user.attendanceRecords.reduce(
    (acc, record) => {
      const status = getAttendanceStatus(
        record.checkInTime,
        record.checkOutTime,
      );
      acc.total++;
      if (status === "complete") acc.present++;
      else acc.absent++;
      return acc;
    },
    { present: 0, absent: 0, total: 0 },
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[90vh] p-0 overflow-hidden"
        style={{
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <UserHeader
          userName={user.userName}
          userId={user.id}
          userRole={user.role}
          isEditMode={isEditMode}
          onToggleEditMode={handleToggleEditMode}
          onRoleUpdated={handleRoleUpdated}
        />

        <div
          className="flex-1 overflow-y-auto overflow-x-hidden"
          style={{
            WebkitOverflowScrolling: "touch",
            height: "calc(90vh - 120px)",
            overscrollBehavior: "contain",
          }}
        >
          <div className="px-6 py-4 space-y-6">
            <UserInfoCard email={user.email} hoursInShop={user.hoursInShop} />

            <AttendanceOverviewCard stats={totalStats} />

            {isEditMode && (
              <div className="flex justify-between items-center p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <h3 className="font-semibold text-blue-900">
                    Edit Mode Active
                  </h3>
                  <p className="text-sm text-blue-700">
                    Click on attendance records to edit or delete them
                  </p>
                </div>
                <Button
                  onClick={handleAddNewRecord}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Record
                </Button>
              </div>
            )}

            {isEditMode ? (
              // Edit mode: show individual records with edit capabilities
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  All Attendance Records
                </h3>
                {user.attendanceRecords.map((record) => (
                  <EditableAttendanceRecord
                    key={record.id}
                    record={record}
                    userId={user.id}
                    onUpdateAction={handleUpdateRecord}
                    onDeleteAction={handleDeleteRecord}
                    isEditMode={isEditMode}
                  />
                ))}
              </div>
            ) : (
              // View mode: show weekly grouped records
              <WeeklyAttendanceCard
                weeklyData={weeklyData}
                expandedWeeks={expandedWeeks}
                onToggleWeek={toggleWeek}
              />
            )}

            <div className="h-20"></div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default UserDetailSheet;
