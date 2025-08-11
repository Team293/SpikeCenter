interface TimeDisplayProps {
    checkInTime: string | null
    checkOutTime: string | null
}

export function TimeDisplay({ checkInTime, checkOutTime }: TimeDisplayProps) {
    if (!checkInTime) return null

    return (
        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-600">Check In:</span>
                <span className="text-sm font-bold text-green-600">{checkInTime}</span>
            </div>
            {checkOutTime && (
                <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Check Out:</span>
                    <span className="text-sm font-bold text-red-600">{checkOutTime}</span>
                </div>
            )}
        </div>
    )
}
