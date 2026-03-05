'use client';

import { ExternalLink, ArrowDownToLine, ArrowUpFromLine, FileCheck } from 'lucide-react';
import { cn, formatDate, truncateAddress } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import USDCAmount from '@/components/stellar/USDCAmount';
import type { Transaction } from '@/types';

interface TransactionHistoryProps {
  transactions: Transaction[];
  className?: string;
}

const typeConfig: Record<string, { label: string; variant: 'info' | 'success' | 'default'; icon: typeof ArrowDownToLine }> = {
  escrow_deposit: {
    label: 'Depósito Escrow',
    variant: 'info',
    icon: ArrowDownToLine,
  },
  milestone_release: {
    label: 'Liberación Hito',
    variant: 'success',
    icon: ArrowUpFromLine,
  },
  evidence_register: {
    label: 'Registro Evidencia',
    variant: 'default',
    icon: FileCheck,
  },
};

export default function TransactionHistory({ transactions, className }: TransactionHistoryProps) {
  const sorted = [...transactions].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Fecha
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Monto
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Desde
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Hacia
            </th>
            <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Hash
            </th>
            <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Estado
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {sorted.map((tx) => {
            const conf = typeConfig[tx.type] || typeConfig.evidence_register;
            const TypeIcon = conf.icon;

            return (
              <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                  {formatDate(tx.timestamp)}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <TypeIcon size={14} className="text-slate-400" />
                    <Badge variant={conf.variant} size="sm">
                      {conf.label}
                    </Badge>
                  </div>
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  {tx.amount ? (
                    <USDCAmount amount={tx.amount} size="sm" />
                  ) : (
                    <span className="text-slate-400">—</span>
                  )}
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                    {truncateAddress(tx.from, 4)}
                  </code>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">
                    {truncateAddress(tx.to, 4)}
                  </code>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <code className="font-mono text-xs text-stellar-600">
                      {tx.hash.slice(0, 8)}...{tx.hash.slice(-4)}
                    </code>
                    <a
                      href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stellar-500 hover:text-stellar-700 transition-colors"
                      title="Ver en Stellar Explorer"
                    >
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </td>
                <td className="py-3 px-4 text-center whitespace-nowrap">
                  <Badge
                    variant={tx.status === 'confirmada' ? 'success' : 'warning'}
                    size="sm"
                  >
                    {tx.status === 'confirmada' ? 'Confirmada' : 'Pendiente'}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {sorted.length === 0 && (
        <div className="text-center py-8 text-slate-400 text-sm">
          No hay transacciones registradas para este proyecto.
        </div>
      )}
    </div>
  );
}
