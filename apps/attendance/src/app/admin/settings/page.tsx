import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/app/admin/dashboard/_components/admin-header";
import DaySelectionHandler from "@/app/admin/settings/_components/day-selection-handler";
import { getShopDays } from "@/app/admin/settings/_actions/server-actions";
import { auth } from "@spike/auth";

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
