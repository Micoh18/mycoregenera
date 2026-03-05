import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  size?: 'sm' | 'md';
  className?: string;
}

const variantClasses: Record<string, string> = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-myco-100 text-myco-700',
  warning: 'bg-amber-500/10 text-amber-600',
  danger: 'bg-danger-500/10 text-danger-600',
  info: 'bg-stellar-100 text-stellar-700',
  outline: 'bg-transparent border border-slate-200 text-slate-600',
};

export default function Badge({ children, variant = 'default', size = 'sm', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
