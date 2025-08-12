import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@spike/auth";
import { AdminHeader } from "../dashboard/_components/admin-header";
import { getShopDays } from "./_actions/server-actions";
import DaySelectionHandler from "./_components/day-selection-handler";

async function SettingsPage(props: any) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/");
  }

  const selectedDays = await getShopDays();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <AdminHeader userName={session.user.name} backUrl="/admin/dashboard" />

        <DaySelectionHandler selectedDays={selectedDays} />
      </div>
    </div>
  );
}

export default SettingsPage;
