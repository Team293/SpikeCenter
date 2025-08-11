"use client";

import React, { useState } from "react";
import { Button } from "@spike/ui/button";
import { Badge } from "@spike/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@spike/ui/card";
import { cn } from "@spike/ui/utils";

interface DaySelectorProps {
  onSelectionChange: (selectedDays: string[]) => void;
  initialSelection?: string[];
  className?: string;
}

const DaySelector: React.FC<DaySelectorProps> = ({
  onSelectionChange,
  initialSelection = [],
  className = "",
}) => {
  const daysOfWeek = [
    { full: "Sunday", short: "Sun" },
    { full: "Monday", short: "Mon" },
    { full: "Tuesday", short: "Tue" },
    { full: "Wednesday", short: "Wed" },
    { full: "Thursday", short: "Thu" },
    { full: "Friday", short: "Fri" },
    { full: "Saturday", short: "Sat" },
  ];

  const [selectedDays, setSelectedDays] = useState<string[]>(initialSelection);

  const toggleDay = (day: string) => {
    const updatedSelection = selectedDays.includes(day)
      ? selectedDays.filter((d) => d !== day)
      : [...selectedDays, day];

    setSelectedDays(updatedSelection);
    onSelectionChange(updatedSelection);
  };

  const clearAll = () => {
    setSelectedDays([]);
    onSelectionChange([]);
  };

  const selectAll = () => {
    const allDays = daysOfWeek.map((day) => day.full);
    setSelectedDays(allDays);
    onSelectionChange(allDays);
  };

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">
          Select Shop Days
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-7 gap-2">
          {daysOfWeek.map((day) => (
            <Button
              key={day.full}
              variant={selectedDays.includes(day.full) ? "default" : "outline"}
              size="sm"
              onClick={() => toggleDay(day.full)}
              className={cn(
                "h-12 text-xs font-medium transition-all",
                selectedDays.includes(day.full)
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "hover:bg-muted",
              )}
            >
              {day.short}
            </Button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={selectAll}
            className="flex-1 text-xs"
          >
            Select All
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={clearAll}
            className="flex-1 text-xs"
            disabled={selectedDays.length === 0}
          >
            Clear All
          </Button>
        </div>

        {/* Selected Days Display */}
        {selectedDays.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Selected Days ({selectedDays.length}):
            </p>
            <div className="flex flex-wrap gap-1">
              {selectedDays.map((day) => (
                <Badge
                  key={day}
                  variant="secondary"
                  className="text-xs cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
                  onClick={() => toggleDay(day)}
                >
                  {day}
                  <span className="ml-1">×</span>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {selectedDays.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-2">
            No days selected
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DaySelector;
