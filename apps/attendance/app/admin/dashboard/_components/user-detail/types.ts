export interface UserDetail {
    id: string;
    userName: string;
    email: string;
    role?: string;
    hoursInShop: number;
    attendanceRecords: Array<{
        id: number;
        date: string;
        checkInTime: string | null;
        checkOutTime: string | null;
    }>;
}

export interface AttendanceRecord {
    id: number;
    date: string;
    checkInTime: string | null;
    checkOutTime: string | null;
}

export interface WeeklyAttendance {
    weekStart: Date;
    weekEnd: Date;
    weekLabel: string;
    records: AttendanceRecord[];
    summary: {
        present: number;
        absent: number;
        total: number;
    };
}

export interface UserDetailSheetProps {
    userId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}