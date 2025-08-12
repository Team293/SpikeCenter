"use client";

import { Button } from "@spike/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@spike/ui/card";
import { Undo2 } from "lucide-react";

interface UserHeaderProps {
  userName: string;
  backUrl: string;
}

export function AdminHeader({ userName, backUrl }: UserHeaderProps) {
  const back = async () => {
    window.location.href = backUrl;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl">Welcome, {userName}</CardTitle>
            <CardDescription className="text-sm">
              You are in the Admin Dashboard
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={back}
            className="text-gray-500 hover:text-gray-700"
          >
            <Undo2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
