import { Button } from "@spike/ui/button";
import { Card, CardContent } from "@spike/ui/card";
import { Clock } from "lucide-react";
import { TimeDisplay } from "./time-display";

interface AttendanceStatusProps {
  isCheckedIn: boolean;
  checkInTime: string | null;
  checkOutTime: string | null;
  onCheckInOut: (status: string) => void;
  loading?: boolean;
}

export function AttendanceStatus({
  isCheckedIn,
  checkInTime,
  checkOutTime,
  onCheckInOut,
  loading = false,
}: AttendanceStatusProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <Clock className="w-10 h-10 text-white" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {isCheckedIn ? "Checked In" : "Not Checked In"}
            </h2>
            <p className="text-gray-600">
              {isCheckedIn
                ? "You are currently in session"
                : "Ready to start your session?"}
            </p>
          </div>

          <TimeDisplay checkInTime={checkInTime} checkOutTime={checkOutTime} />

          <Button
            onClick={() => onCheckInOut(isCheckedIn ? "check-out" : "check-in")}
            disabled={loading}
            className={`w-full text-lg py-6 ${
              isCheckedIn
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {loading
              ? isCheckedIn
                ? "Checking Out..."
                : "Checking In..."
              : isCheckedIn
                ? "Check Out"
                : "Check In"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
