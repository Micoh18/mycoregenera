import { formatUSDC } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface USDCAmountProps {
  amount: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-xl font-semibold',
  xl: 'text-3xl font-bold',
};

export default function USDCAmount({ amount, size = 'md', className }: USDCAmountProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5', sizeClasses[size], className)}>
      <span className="inline-flex items-center justify-center w-5 h-5 bg-stellar-500 text-white rounded-full text-[10px] font-bold flex-shrink-0">
        $
      </span>
      <span>{formatUSDC(amount)}</span>
      <span className="text-slate-400 font-normal text-sm">USDC</span>
    </span>
  );
}
