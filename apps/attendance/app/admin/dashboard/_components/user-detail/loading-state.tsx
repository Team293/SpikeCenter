import React from "react";
import { Sheet, SheetContent } from "@spike/ui/sheet";

interface LoadingStateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoadingState({ open, onOpenChange }: LoadingStateProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-6">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-500">Loading user details...</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
