import { Card, CardContent } from '@spike/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  number: number;
  label: string;
  icon: LucideIcon;
}

export function StatCard({ number, label, icon: Icon }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 px-6">
        <div className="rounded-lg bg-yellow-100 p-2">
          <Icon className="h-6 w-6 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">{number}</h3>
          <p className="text-muted-foreground text-sm">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
