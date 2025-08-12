"use client";

import React from "react";
import DaySelector from "./day-selector";
import { updateShopDays } from "../_actions/server-actions";

function DaySelectionHandler({ selectedDays }: { selectedDays: string[] }) {
  const handleDaySelection = (days: string[]) => {
    updateShopDays(days).catch((error) => {
      console.error("Failed to update shop days:", error);
    });
  };

  return (
    <div>
      <DaySelector
        onSelectionChange={handleDaySelection}
        initialSelection={selectedDays}
      />
    </div>
  );
}

export default DaySelectionHandler;
