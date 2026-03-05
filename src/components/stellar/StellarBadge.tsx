import { ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StellarBadgeProps {
  size?: 'sm' | 'md';
  className?: string;
}

export default function StellarBadge({ size = 'sm', className }: StellarBadgeProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 bg-stellar-50 border border-stellar-200 rounded-full',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        className
      )}
    >
      <ShieldCheck size={size === 'sm' ? 14 : 16} className="text-stellar-500" />
      <span className="font-medium text-stellar-700">Verificado en Stellar</span>
    </div>
  );
}
