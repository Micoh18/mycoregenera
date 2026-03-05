'use client';

import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Check,
  Clock,
  Loader2,
  Circle,
  ExternalLink,
  Image as ImageIcon,
  FlaskConical,
  MapPin,
  Users,
  X,
} from 'lucide-react';
import { cn, formatDate, formatUSDC, getStatusLabel } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import USDCAmount from '@/components/stellar/USDCAmount';
import type { Milestone, Verification } from '@/types';

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

const milestoneStatusConfig: Record<string, { icon: typeof Check; variant: 'success' | 'warning' | 'info' | 'default'; lineColor: string; dotColor: string }> = {
  completado: {
    icon: Check,
    variant: 'success',
    lineColor: 'bg-myco-500',
    dotColor: 'bg-myco-500 text-white border-myco-500',
  },
  en_progreso: {
    icon: Loader2,
    variant: 'info',
    lineColor: 'bg-stellar-300',
    dotColor: 'bg-stellar-500 text-white border-stellar-500',
  },
  verificando: {
    icon: Clock,
    variant: 'warning',
    lineColor: 'bg-amber-300',
    dotColor: 'bg-amber-500 text-white border-amber-500',
  },
  pendiente: {
    icon: Circle,
    variant: 'default',
    lineColor: 'bg-slate-200',
    dotColor: 'bg-white text-slate-400 border-slate-300',
  },
};

const verificationTypeConfig: Record<string, { icon: typeof FlaskConical; label: string }> = {
  laboratorio: { icon: FlaskConical, label: 'Laboratorio' },
  geolocalizacion: { icon: MapPin, label: 'Geolocalización' },
  comunidad: { icon: Users, label: 'Comunidad' },
};

const verificationStatusConfig: Record<string, { icon: typeof Check; color: string; label: string }> = {
  aprobado: { icon: Check, color: 'text-myco-600', label: 'Aprobado' },
  pendiente: { icon: Clock, color: 'text-amber-500', label: 'Pendiente' },
  rechazado: { icon: X, color: 'text-danger-500', label: 'Rechazado' },
};

function VerificationRow({ verification }: { verification: Verification }) {
  const typeConf = verificationTypeConfig[verification.type];
  const statusConf = verificationStatusConfig[verification.status];
  if (!typeConf || !statusConf) return null;

  const TypeIcon = typeConf.icon;
  const StatusIcon = statusConf.icon;

  return (
    <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
      <div className="flex items-center gap-2">
        <TypeIcon size={14} className="text-slate-500" />
        <span className="text-sm text-slate-700">{typeConf.label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <StatusIcon size={14} className={statusConf.color} />
        <span className={cn('text-xs font-medium', statusConf.color)}>
          {statusConf.label}
        </span>
      </div>
    </div>
  );
}

function MilestoneItem({ milestone, isLast }: { milestone: Milestone; isLast: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const config = milestoneStatusConfig[milestone.status] || milestoneStatusConfig.pendiente;
  const StatusIcon = config.icon;

  return (
    <div className="relative flex gap-4">
      {/* Timeline line and dot */}
      <div className="flex flex-col items-center">
        <div
          className={cn(
            'w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10',
            config.dotColor
          )}
        >
          <StatusIcon
            size={16}
            className={milestone.status === 'en_progreso' ? 'animate-spin' : ''}
          />
        </div>
        {!isLast && (
          <div className={cn('w-0.5 flex-1 min-h-[24px]', config.lineColor)} />
        )}
      </div>

      {/* Content */}
      <div className={cn('flex-1 pb-8', isLast && 'pb-0')}>
        {/* Header - clickable */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left group cursor-pointer"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Hito {milestone.number}
                </span>
                <Badge variant={config.variant}>
                  {getStatusLabel(milestone.status)}
                </Badge>
              </div>
              <h4 className="text-base font-semibold text-slate-800 mt-1 group-hover:text-myco-700 transition-colors font-[family-name:var(--font-heading)]">
                {milestone.title}
              </h4>
              <div className="flex items-center gap-4 mt-1">
                <USDCAmount amount={milestone.amount} size="sm" />
                <span className="text-xs text-slate-500">
                  {milestone.completedDate
                    ? `Completado: ${formatDate(milestone.completedDate)}`
                    : `Fecha límite: ${formatDate(milestone.dueDate)}`}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 mt-1">
              {expanded ? (
                <ChevronUp size={18} className="text-slate-400" />
              ) : (
                <ChevronDown size={18} className="text-slate-400" />
              )}
            </div>
          </div>
        </button>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 space-y-4 border-t border-slate-100 pt-4">
            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {milestone.description}
            </p>

            {/* Evidence gallery */}
            {milestone.evidence.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Evidencia ({milestone.evidence.length})
                </p>
                <div className="flex gap-2 flex-wrap">
                  {milestone.evidence.map((ev) => (
                    <div
                      key={ev.id}
                      className="w-20 h-20 rounded-lg bg-slate-100 border border-slate-200 flex flex-col items-center justify-center gap-1 overflow-hidden relative group"
                      title={ev.title}
                    >
                      <ImageIcon size={20} className="text-slate-400" />
                      <span className="text-[9px] text-slate-500 text-center px-1 leading-tight truncate w-full">
                        {ev.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Verification statuses */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Triple verificación
              </p>
              <div className="space-y-1.5">
                {milestone.verifications.map((v) => (
                  <VerificationRow key={v.type} verification={v} />
                ))}
              </div>
            </div>

            {/* Transaction hash for completed milestones */}
            {milestone.transactionHash && (
              <div className="bg-stellar-50 rounded-lg p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs text-stellar-600 font-medium">Hash de transacción</p>
                  <code className="text-xs font-mono text-stellar-700 mt-0.5 block">
                    {milestone.transactionHash.slice(0, 16)}...{milestone.transactionHash.slice(-8)}
                  </code>
                </div>
                <a
                  href={`https://stellar.expert/explorer/testnet/tx/${milestone.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stellar-500 hover:text-stellar-700 transition-colors"
                  title="Ver transacción en Stellar Explorer"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  const sortedMilestones = [...milestones].sort((a, b) => a.number - b.number);

  return (
    <div className="space-y-0">
      {sortedMilestones.map((ms, idx) => (
        <MilestoneItem
          key={ms.id}
          milestone={ms}
          isLast={idx === sortedMilestones.length - 1}
        />
      ))}
    </div>
  );
}
