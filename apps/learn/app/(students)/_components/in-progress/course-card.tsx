import { course } from '@spike/db';

interface CourseCardProps {
  course: typeof course.$inferSelect;
}

export function CourseCard({ course }: CourseCardProps) {}
