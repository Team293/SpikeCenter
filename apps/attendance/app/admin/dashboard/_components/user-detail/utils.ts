import type { UserDetail, WeeklyAttendance } from './types';

export const getInitials = (name: string) => {
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
};

export const formatTime = (timeString: string | null) => {
    if (!timeString) return '--:--';
    return timeString;
};

export const getAttendanceStatus = (checkIn: string | null, checkOut: string | null) => {
    if (checkIn && checkOut) return 'complete';
    return 'absent';
};

export const getWeekStart = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day;
    return new Date(d.setDate(diff));
};

export const getWeekEnd = (weekStart: Date) => {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    return weekEnd;
};

export const formatWeekRange = (start: Date, end: Date) => {
    const startStr = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const endStr = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `${startStr} - ${endStr}`;
};

export const groupAttendanceByWeek = (user: UserDetail): WeeklyAttendance[] => {
    const weekMap = new Map<string, WeeklyAttendance>();

    user.attendanceRecords.forEach(record => {
        const recordDate = new Date(record.date);
        const weekStart = getWeekStart(recordDate);
        const weekEnd = getWeekEnd(weekStart);
        const weekKey = weekStart.toISOString().split('T')[0];

        if (!weekMap.has(weekKey)) {
            weekMap.set(weekKey, {
                weekStart,
                weekEnd,
                weekLabel: formatWeekRange(weekStart, weekEnd),
                records: [],
                summary: { present: 0, absent: 0, total: 0 }
            });
        }

        const week = weekMap.get(weekKey)!;
        week.records.push(record);

        const status = getAttendanceStatus(record.checkInTime, record.checkOutTime);
        week.summary.total++;
        if (status === 'complete') week.summary.present++;
        else week.summary.absent++;
    });

    return Array.from(weekMap.values()).sort((a, b) => b.weekStart.getTime() - a.weekStart.getTime());
};