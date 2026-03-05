import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const variantClasses: Record<string, string> = {
  primary: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  secondary: 'bg-stellar-600 hover:bg-stellar-700 text-white shadow-sm',
  outline: 'border border-slate-200 hover:bg-slate-50 text-slate-700',
  ghost: 'hover:bg-slate-100 text-slate-600',
  danger: 'bg-danger-500 hover:bg-danger-600 text-white shadow-sm',
};

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className,
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors cursor-pointer',
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
