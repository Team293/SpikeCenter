"use client";

import React from "react";
import { Settings } from "lucide-react";
import { Button } from "@spike/ui/button";

function FloatingSettings() {
  const handleSettingsClick = () => {
    window.location.href = "/admin/settings";
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
      <Button
        onClick={handleSettingsClick}
        size="lg"
        className="
                    rounded-full
                    p-0
                    w-12 h-12
                    md:w-14 md:h-14
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-200
                    hover:scale-105
                    flex
                    items-center
                    justify-center
                    bg-primary
                    hover:bg-primary/90
                    active:scale-95
                "
        variant="default"
        aria-label="Open settings"
      >
        <Settings
          className={`
                        w-5 h-5
                        md:w-6 md:h-6
                        transition-transform
                        duration-200
                    `}
        />
      </Button>
    </div>
  );
}

export default FloatingSettings;
