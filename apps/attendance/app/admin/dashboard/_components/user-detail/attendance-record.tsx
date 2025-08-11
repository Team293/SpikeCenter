import React from "react";
import { Badge } from "@spike/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { formatDate, formatTime, getAttendanceStatus } from "./utils";
import type { AttendanceRecord as AttendanceRecordType } from "./types";

interface AttendanceRecordProps {
  record: AttendanceRecordType;
}

export function AttendanceRecord({ record }: AttendanceRecordProps) {
  const status = getAttendanceStatus(record.checkInTime, record.checkOutTime);

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

  return (
    <div className="ml-7 p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {getStatusIcon(status)}
          <span className="font-medium text-gray-900 text-sm">
            {formatDate(record.date)}
          </span>
        </div>
        {getStatusBadge(status)}
      </div>

      <div className="grid grid-cols-2 gap-4 ml-6">
        <div className="space-y-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Check In
          </p>
          <p className="font-mono text-sm font-medium text-gray-900">
            {formatTime(record.checkInTime)}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Check Out
          </p>
          <p className="font-mono text-sm font-medium text-gray-900">
            {formatTime(record.checkOutTime)}
          </p>
        </div>
      </div>
    </div>
  );
}
