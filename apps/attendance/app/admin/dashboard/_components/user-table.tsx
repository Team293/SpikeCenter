"use client";

import { ColumnDef } from "@tanstack/table-core";
import React, { useState } from "react";
import { Eye, Download } from "lucide-react";
import { Button } from "@spike/ui/button";
import UserDetailSheet from "./user-detail/user-detail-sheet";
import { useDataTable } from "~/hooks/use-data-table";
import { DataTable } from "~/components/data-table/data-table";

export interface TableUser {
  id: string;
  userName: string;
  hours: number;
}

export function UserTable({ users }: { users: TableUser[] }) {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const exportToCSV = () => {
    // Create CSV content
    const headers = ["ID", "Name", "Hours"];
    const csvContent = [
      headers.join(","),
      ...users.map((user) =>
        [
          user.id,
          `"${user.userName}"`, // Wrap name in quotes to handle commas
          user.hours,
        ].join(","),
      ),
    ].join("\n");

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute(
        "download",
        `user-attendance-${new Date().toISOString().split("T")[0]}.csv`,
      );
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const columns = React.useMemo<ColumnDef<TableUser>[]>(
    () => [
      {
        id: "name",
        accessorKey: "userName",
        header: "User Name",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "hours",
        header: "Hours In Shop",
        cell: (info) => info.getValue(),
      },
      {
        id: "actions",
        cell: function Cell({ row }) {
          return (
            <Button
              onClick={() => {
                const userRow = row.original;
                setSelectedUser(userRow.id);
                setOpen(true);
              }}
              variant="ghost"
            >
              <Eye />
            </Button>
          );
        },
        size: 32,
      },
    ],
    [],
  );

  const { table } = useDataTable({
    data: users,
    columns,
    pageCount: 1,
    initialState: {
      sorting: [{ id: "hours", desc: true }],
      columnPinning: { right: ["actions"] },
    },
    // @ts-expect-error - getRowId is not defined in the type
    getRowId: (row) => row.id,
  });

  return (
    <div className="data-table-container">
      <div className="flex items-center justify-between pb-4">
        <h3 className="text-lg font-semibold">Users</h3>
        <Button
          onClick={exportToCSV}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <DataTable table={table}>
        <UserDetailSheet
          // @ts-expect-error - user will never be null here
          userId={selectedUser}
          open={open}
          onOpenChange={setOpen}
        />
      </DataTable>
    </div>
  );
}
