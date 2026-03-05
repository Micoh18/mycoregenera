import { formatUSDC, cn } from '@/lib/utils';

interface EscrowMeterProps {
  total: number;
  released: number;
  inEscrow: number;
  className?: string;
}

export default function EscrowMeter({ total, released, inEscrow, className }: EscrowMeterProps) {
  const releasedPct = (released / total) * 100;
  const escrowPct = (inEscrow / total) * 100;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between text-xs text-slate-500 mb-2">
        <span>0 USDC</span>
        <span>{formatUSDC(total)} USDC</span>
      </div>
      <div className="w-full h-6 bg-slate-100 rounded-full overflow-hidden flex">
        <div
          className="h-full bg-myco-500 transition-all duration-700 flex items-center justify-center"
          style={{ width: `${releasedPct}%` }}
        >
          {releasedPct > 15 && (
            <span className="text-[10px] font-semibold text-white">Liberado</span>
          )}
        </div>
        <div
          className="h-full bg-stellar-500 transition-all duration-700 flex items-center justify-center"
          style={{ width: `${escrowPct}%` }}
        >
          {escrowPct > 15 && (
            <span className="text-[10px] font-semibold text-white">En Escrow</span>
          )}
        </div>
      </div>
      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-myco-500" />
          <span className="text-xs text-slate-600">Liberado: {formatUSDC(released)} USDC</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-stellar-500" />
          <span className="text-xs text-slate-600">En Escrow: {formatUSDC(inEscrow)} USDC</span>
        </div>
      </div>
    </div>
  );
}
