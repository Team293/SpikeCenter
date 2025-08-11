import { Card, CardContent } from "@spike/ui/card";

interface StatusIndicatorProps {
  isCheckedIn: boolean;
}

export function StatusIndicator({ isCheckedIn }: StatusIndicatorProps) {
  return (
    <Card>
      <CardContent className="flex flex-col space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${isCheckedIn ? "bg-green-500" : "bg-gray-300"}`}
          ></div>
          <span className="text-sm text-gray-600">
            Status: {isCheckedIn ? "Active" : "Inactive"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
