import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@spike/ui/card";
import { Calendar, CheckCircle, XCircle } from "lucide-react";

interface AttendanceStats {
  present: number;
  absent: number;
  total: number;
}

interface AttendanceOverviewCardProps {
  stats: AttendanceStats;
}

export function AttendanceOverviewCard({ stats }: AttendanceOverviewCardProps) {
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Attendance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm font-medium text-green-700">
                Present
              </span>
            </div>
            <p className="text-xl font-bold text-green-800">{stats.present}</p>
            <p className="text-xs text-green-600">
              {stats.total > 0
                ? Math.round((stats.present / stats.total) * 100)
                : 0}
              %
            </p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="flex items-center justify-center mb-1">
              <XCircle className="h-4 w-4 text-red-600 mr-1" />
              <span className="text-sm font-medium text-red-700">Absent</span>
            </div>
            <p className="text-xl font-bold text-red-800">{stats.absent}</p>
            <p className="text-xs text-red-600">
              {stats.total > 0
                ? Math.round((stats.absent / stats.total) * 100)
                : 0}
              %
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
