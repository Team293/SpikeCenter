import React from "react";
import { Badge } from "@spike/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@spike/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { AttendanceRecord } from "./attendance-record";
import type { WeeklyAttendance } from "./types";

interface WeeklyAttendanceItemProps {
  week: WeeklyAttendance;
  isExpanded: boolean;
  onToggle: () => void;
}

export function WeeklyAttendanceItem({
  week,
  isExpanded,
  onToggle,
}: WeeklyAttendanceItemProps) {
  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <CollapsibleTrigger className="w-full">
        <div className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
              <div className="text-left">
                <p className="font-medium text-gray-900">{week.weekLabel}</p>
                <p className="text-sm text-gray-500">
                  {week.summary.present} present, {week.summary.absent} absent
                </p>
              </div>
            </div>
            <div className="flex gap-1">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                {week.summary.present}
              </Badge>
              <Badge
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200"
              >
                {week.summary.absent}
              </Badge>
            </div>
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 space-y-3">
          {week.records.map((record, recordIndex) => (
            <AttendanceRecord key={recordIndex} record={record} />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
