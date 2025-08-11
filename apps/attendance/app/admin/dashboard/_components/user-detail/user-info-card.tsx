import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@spike/ui/card";
import { Mail, Clock, User } from "lucide-react";

interface UserInfoCardProps {
  email: string;
  hoursInShop: number;
}

export function UserInfoCard({ email, hoursInShop }: UserInfoCardProps) {
  return (
    <Card className="border-0 shadow-sm bg-white">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <User className="h-5 w-5 text-blue-600" />
          User Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="h-4 w-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <Clock className="h-4 w-4 text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Total Hours in Shop</p>
            <p className="font-medium text-gray-900">
              {hoursInShop.toFixed(1)} hours
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
