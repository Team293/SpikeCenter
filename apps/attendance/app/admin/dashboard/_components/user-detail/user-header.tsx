import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@spike/ui/avatar";
import { Button } from "@spike/ui/button";
import { SheetDescription, SheetTitle } from "@spike/ui/sheet";
import { Edit, X, UserCheck } from "lucide-react";
import { authClient } from "@spike/auth/client";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface UserHeaderProps {
  userName: string;
  userId: string;
  userRole?: string;
  isEditMode?: boolean;
  onToggleEditMode?: () => void;
  onRoleUpdated?: () => void;
}

export function UserHeader({
  userName,
  userId,
  userRole,
  isEditMode = false,
  onToggleEditMode,
  onRoleUpdated,
}: UserHeaderProps) {
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  const handleMakeAdmin = async () => {
    if (!confirm(`Are you sure you want to make ${userName} an administrator?`))
      return;

    setIsUpdatingRole(true);
    try {
      const { data, error } = await authClient.admin.setRole({
        userId: userId,
        role: "admin",
      });

      if (error) {
        console.error("Error setting admin role:", error);
        alert("Failed to update user role. Please try again.");
      } else {
        console.log("Successfully updated user role:", data);
        alert(`${userName} is now an administrator!`);
        onRoleUpdated?.();
      }
    } catch (error) {
      console.error("Error making user admin:", error);
      alert("Failed to update user role. Please try again.");
    } finally {
      setIsUpdatingRole(false);
    }
  };

  const isAlreadyAdmin = userRole === "admin";

  return (
    <div className="px-6 py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-lg font-semibold">
              {getInitials(userName)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <SheetTitle className="text-xl font-bold text-gray-900">
              {userName}
              {isAlreadyAdmin && (
                <span className="ml-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
                  Admin
                </span>
              )}
            </SheetTitle>
            <SheetDescription className="text-gray-600 mt-1">
              {isEditMode
                ? "Editing Attendance Records"
                : "Member Attendance Details"}
            </SheetDescription>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isAlreadyAdmin && (
            <Button
              onClick={handleMakeAdmin}
              disabled={isUpdatingRole}
              variant="secondary"
              size="sm"
              className="bg-purple-100 hover:bg-purple-200 text-purple-800"
            >
              <UserCheck className="h-4 w-4 mr-2" />
              {isUpdatingRole ? "Making Admin..." : "Make Admin"}
            </Button>
          )}

          {onToggleEditMode && (
            <Button
              onClick={onToggleEditMode}
              variant={isEditMode ? "destructive" : "outline"}
              size="sm"
            >
              {isEditMode ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Exit
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
