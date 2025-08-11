import React from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AdminHeader } from "@/app/admin/dashboard/_components/admin-header";
import {
  TableUser,
  UserTable,
} from "@/app/admin/dashboard/_components/user-table";
import { Card, CardContent, CardHeader } from "@spike/ui/card";
import FloatingSettings from "@/app/admin/dashboard/_components/floating-settings";
import { calculateHours } from "@/app/admin/dashboard/_actions/server-actions";
import { auth } from "@spike/auth";

async function AdminPage(props: any) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user || session.user.role !== "admin") {
    redirect("/");
  }

  const users: TableUser[] = [];

  const rawUsers = await auth.api.listUsers({
    query: {},
    headers: await headers(),
  });

  for (const user of rawUsers.users) {
    let hoursWorked = await calculateHours(user.id);

    if (hoursWorked === null || isNaN(hoursWorked)) {
      hoursWorked = 0;
    }

    if (hoursWorked < 0) {
      hoursWorked = 0;
    }

    hoursWorked = Math.round((hoursWorked + Number.EPSILON) * 100) / 100;

    users.push({
      id: user.id,
      userName: user.name || user.email || "Unknown",
      hours: hoursWorked,
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-md sm:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto space-y-6">
        <FloatingSettings />
        <AdminHeader userName={session.user.name} backUrl="/" />

        <Card className="shadow-lg">
          <CardHeader className="pb-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              User Attendance Overview
            </h2>
          </CardHeader>
          <CardContent className="pt-0">
            <UserTable users={users} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminPage;
