import React from "react";
import { Card, CardContent } from "@spike/ui/card";
import { Button } from "@spike/ui/button";
import { Shield } from "lucide-react";
import { redirect } from "next/navigation";

export function ViewAdminDashboard({ hasAccess }: { hasAccess: boolean }) {
  if (!hasAccess) {
    return <div></div>;
  }

  const redirectToAdminDashboard = async () => {
    redirect("/admin/dashboard");
  };

  return (
    <div>
      <Card>
        <CardContent className="flex flex-col">
          <Button
            onClick={redirectToAdminDashboard}
            className="inline-flex items-center"
          >
            <Shield className="mr-2" />
            <span>Go to Admin Dashboard</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
