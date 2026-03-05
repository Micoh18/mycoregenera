import { cn } from '@/lib/utils';
import Card from '@/components/ui/Card';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  sublabel?: string;
  color?: 'green' | 'blue' | 'amber' | 'red';
}

const iconBgClasses: Record<string, string> = {
  green: 'bg-myco-50 text-myco-600',
  blue: 'bg-stellar-50 text-stellar-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-danger-50 text-danger-600',
};

const valueColorClasses: Record<string, string> = {
  green: 'text-myco-700',
  blue: 'text-stellar-700',
  amber: 'text-amber-700',
  red: 'text-danger-700',
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  sublabel,
  color = 'green',
}: StatCardProps) {
  return (
    <Card padding="md" hover>
      <div className="flex items-start gap-4">
        <div
          className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
            iconBgClasses[color]
          )}
        >
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p
            className={cn(
              'text-2xl font-bold font-[family-name:var(--font-heading)] mt-0.5',
              valueColorClasses[color]
            )}
          >
            {value}
          </p>
          {sublabel && (
            <p className="text-xs text-slate-400 mt-1">{sublabel}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
