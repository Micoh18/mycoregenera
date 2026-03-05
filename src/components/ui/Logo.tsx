import Image from 'next/image';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  className?: string;
}

const sizes = {
  sm: { icon: 28, text: 'text-base' },
  md: { icon: 32, text: 'text-lg' },
  lg: { icon: 40, text: 'text-xl' },
};

export function LogoIcon({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <Image
      src="/logo.svg"
      alt="MycoRegen"
      width={size}
      height={size}
      className={className}
    />
  );
}

export default function Logo({ size = 'md', variant = 'dark', className }: LogoProps) {
  const s = sizes[size];
  const textColor = variant === 'dark' ? 'text-slate-900' : 'text-white';
  const accentColor = variant === 'dark' ? 'text-brand-600' : 'text-brand-400';

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <LogoIcon size={s.icon} />
      <span className={cn('font-[family-name:var(--font-heading)] font-bold', s.text, textColor)}>
        Myco<span className={accentColor}>Regen</span>
      </span>
    </div>
  );
}
