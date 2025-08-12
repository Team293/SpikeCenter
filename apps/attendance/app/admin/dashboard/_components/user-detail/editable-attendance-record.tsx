"use client";

import React, { useState } from "react";
import { Badge } from "@spike/ui/badge";
import { Button } from "@spike/ui/button";
import { Input } from "@spike/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@spike/ui/select";
import { CheckCircle, XCircle, Save, X, Trash2, Edit } from "lucide-react";
import { formatDate, getAttendanceStatus } from "./utils";
import {
  updateAttendanceRecord,
  deleteAttendanceRecord,
} from "../../_actions/server-actions";
import type { AttendanceRecord as AttendanceRecordType } from "./types";

interface EditableAttendanceRecordProps {
  record: AttendanceRecordType;
  userId: string;
  onUpdateAction: (updatedRecord: AttendanceRecordType) => void;
  onDeleteAction: (recordId: number) => void;
  isEditMode: boolean;
}

export function EditableAttendanceRecord({
  record,
  userId,
  onUpdateAction,
  onDeleteAction,
  isEditMode,
}: EditableAttendanceRecordProps) {
  // Helper function to convert 12-hour time to 24-hour format for input fields
  const convertTo24Hour = (time12h: string): string => {
    if (!time12h) return "";

    // If it's already in 24-hour format (no AM/PM), return as is
    if (!time12h.includes("AM") && !time12h.includes("PM")) {
      return time12h;
    }

    const [time, modifier] = time12h.split(" ");
    let [hours, minutes] = time.split(":"); // eslint-disable-line prefer-const

    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = (parseInt(hours, 10) + 12).toString();
    }

    return `${hours.padStart(2, "0")}:${minutes}`;
  };

  // Helper function to convert 24-hour time to 12-hour format for display
  const convertTo12Hour = (time24h: string): string => {
    if (!time24h) return "";

    const [hours, minutes] = time24h.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;

    return `${displayHour}:${minutes} ${ampm}`;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    date: record.date,
    checkInTime: convertTo24Hour(record.checkInTime || ""),
    checkOutTime: convertTo24Hour(record.checkOutTime || ""),
    status:
      getAttendanceStatus(record.checkInTime, record.checkOutTime) ===
      "complete"
        ? "present"
        : "absent",
  });
  const [isLoading, setIsLoading] = useState(false);

  const status = getAttendanceStatus(record.checkInTime, record.checkOutTime);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Convert times to Date objects for database storage
      const checkInTime = editData.checkInTime
        ? new Date(`${editData.date}T${editData.checkInTime}:00`)
        : null;
      const checkOutTime = editData.checkOutTime
        ? new Date(`${editData.date}T${editData.checkOutTime}:00`)
        : null;

      const result = await updateAttendanceRecord(record.id, {
        date: editData.date,
        checkInTime,
        checkOutTime,
        status: editData.status,
      });

      if (!result.success) {
        alert("Failed to save: " + result.error);
        return;
      }

      // Update the local state with converted times for proper display
      onUpdateAction({
        id: record.id,
        date: editData.date,
        checkInTime: editData.checkInTime
          ? convertTo12Hour(editData.checkInTime)
          : null,
        checkOutTime: editData.checkOutTime
          ? convertTo12Hour(editData.checkOutTime)
          : null,
      });

      setIsEditing(false);
    } catch (error) {
      console.error("Error saving attendance record:", error);
      alert("Failed to save attendance record. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this attendance record?"))
      return;

    setIsLoading(true);
    try {
      const result = await deleteAttendanceRecord(record.id);

      if (result.success) {
        onDeleteAction(record.id);
      } else {
        alert("Failed to delete record: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting attendance record:", error);
      alert("Failed to delete record. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      date: record.date,
      checkInTime: convertTo24Hour(record.checkInTime || ""),
      checkOutTime: convertTo24Hour(record.checkOutTime || ""),
      status:
        getAttendanceStatus(record.checkInTime, record.checkOutTime) ===
        "complete"
          ? "present"
          : "absent",
    });
    setIsEditing(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "complete":
        return (
          <Badge
            variant="default"
            className="bg-green-100 text-green-800 border-green-200"
          >
            Complete
          </Badge>
        );
      case "absent":
        return (
          <Badge
            variant="destructive"
            className="bg-red-100 text-red-800 border-red-200"
          >
            Absent
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "absent":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  if (isEditMode && isEditing) {
    return (
      <div className="ml-7 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">
                Date
              </label>
              <Input
                type="date"
                value={editData.date}
                onChange={(e) =>
                  setEditData({ ...editData, date: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">
                Check In
              </label>
              <Input
                type="time"
                value={editData.checkInTime}
                onChange={(e) =>
                  setEditData({ ...editData, checkInTime: e.target.value })
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase tracking-wide">
                Check Out
              </label>
              <Input
                type="time"
                value={editData.checkOutTime}
                onChange={(e) =>
                  setEditData({ ...editData, checkOutTime: e.target.value })
                }
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wide">
              Status
            </label>
            <Select
              value={editData.status}
              onValueChange={(value) =>
                setEditData({ ...editData, status: value })
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleSave}
              size="sm"
              disabled={isLoading}
              className="bg-green-600 hover:bg-green-700 px-2"
            >
              <Save className="h-3 w-3 mr-1" />
              Save
            </Button>
            <Button
              onClick={handleCancel}
              variant="outline"
              size="sm"
              className="px-2"
              disabled={isLoading}
            >
              <X className="h-3 w-3 mr-1" />
              Cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-7 p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {getStatusIcon(status)}
          <span className="font-medium text-gray-900 text-sm">
            {formatDate(record.date)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(status)}
          {isEditMode && (
            <div className="flex gap-1">
              <Button
                onClick={() => setIsEditing(true)}
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
              >
                <Edit className="h-3 w-3" />
              </Button>
              <Button
                onClick={handleDelete}
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                disabled={isLoading}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 ml-6">
        <div className="space-y-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Check In
          </p>
          <p className="font-mono text-sm font-medium text-gray-900">
            {record.checkInTime || "--:--"}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Check Out
          </p>
          <p className="font-mono text-sm font-medium text-gray-900">
            {record.checkOutTime || "--:--"}
          </p>
        </div>
      </div>
    </div>
  );
}
