'use client';

import { ExternalLink, Lock } from 'lucide-react';
import Card from '@/components/ui/Card';
import EscrowMeter from '@/components/stellar/EscrowMeter';
import WalletAddress from '@/components/stellar/WalletAddress';
import USDCAmount from '@/components/stellar/USDCAmount';
import StellarBadge from '@/components/stellar/StellarBadge';

interface EscrowCardProps {
  totalBudget: number;
  escrowBalance: number;
  releasedAmount: number;
  stellarEscrowAddress: string;
  className?: string;
}

export default function EscrowCard({
  totalBudget,
  escrowBalance,
  releasedAmount,
  stellarEscrowAddress,
  className,
}: EscrowCardProps) {
  return (
    <Card padding="md" className={className}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-stellar-50 flex items-center justify-center">
            <Lock size={16} className="text-stellar-500" />
          </div>
          <h3 className="font-semibold text-slate-800 font-[family-name:var(--font-heading)]">
            Escrow del Proyecto
          </h3>
        </div>
        <StellarBadge size="sm" />
      </div>

      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-1">Presupuesto total</p>
        <USDCAmount amount={totalBudget} size="lg" />
      </div>

      <EscrowMeter
        total={totalBudget}
        released={releasedAmount}
        inEscrow={escrowBalance}
        className="mb-4"
      />

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-myco-50 rounded-lg p-3">
          <p className="text-xs text-myco-600 mb-1">Liberado</p>
          <USDCAmount amount={releasedAmount} size="sm" />
        </div>
        <div className="bg-stellar-50 rounded-lg p-3">
          <p className="text-xs text-stellar-600 mb-1">En Escrow</p>
          <USDCAmount amount={escrowBalance} size="sm" />
        </div>
      </div>

      <div className="border-t border-slate-100 pt-3">
        <p className="text-xs text-slate-500 mb-1.5">Dirección escrow Stellar</p>
        <WalletAddress address={stellarEscrowAddress} showCopy showLink />
        <a
          href={`https://stellar.expert/explorer/testnet/account/${stellarEscrowAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-xs text-stellar-600 hover:text-stellar-700 transition-colors"
        >
          <ExternalLink size={12} />
          Ver en Stellar Explorer
        </a>
      </div>
    </Card>
  );
}
