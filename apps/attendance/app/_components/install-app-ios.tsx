"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@spike/ui/card";

export default function IOSInstallPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isIos = /iphone|ipad|ipod/.test(
      window.navigator.userAgent.toLowerCase(),
    );
    const isStandalone =
      "standalone" in window.navigator && (window.navigator as any).standalone;
    if (isIos && !isStandalone) {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <Card className="bg-yellow-100 text-black w-80">
        <CardContent className="p-4">
          <p className="text-sm font-medium">
            To install this app: tap <strong>Share</strong> →{" "}
            <strong>Add to Home Screen</strong>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
