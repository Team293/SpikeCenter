"use client";

import React from 'react';
import DaySelector from "@/app/admin/settings/_components/day-selector";
import {updateShopDays} from "@/app/admin/settings/_actions/server-actions";

function DaySelectionHandler({ selectedDays }: { selectedDays: string[] }) {
    const handleDaySelection = (days: string[]) => {
        updateShopDays(days).catch((error) => {
            console.error("Failed to update shop days:", error);
        });
    };

    return (
        <div>
            <DaySelector onSelectionChange={handleDaySelection}  initialSelection={selectedDays} />
        </div>
    );
}

export default DaySelectionHandler;