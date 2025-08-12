import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@spike/ui/card";
import { Badge } from "@spike/ui/badge";
import { Calendar } from "lucide-react";
import { WeeklyAttendanceItem } from "./weekly-attendance-item";
import type { WeeklyAttendance } from "./types";

interface WeeklyAttendanceCardProps {
  weeklyData: WeeklyAttendance[];
  expandedWeeks: Set<string>;
  onToggleWeek: (weekKey: string) => void;
}

export function WeeklyAttendanceCard({
  weeklyData,
  expandedWeeks,
  onToggleWeek,
}: WeeklyAttendanceCardProps) {
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          Weekly Attendance
          <Badge variant="outline" className="ml-auto">
            {weeklyData.length} weeks
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {weeklyData.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No attendance records found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {weeklyData.map((week) => {
              const weekKey = week.weekStart.toISOString().split("T")[0];
              const isExpanded = expandedWeeks.has(weekKey);

              return (
                <WeeklyAttendanceItem
                  key={weekKey}
                  week={week}
                  isExpanded={isExpanded}
                  onToggle={() => onToggleWeek(weekKey)}
                />
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
