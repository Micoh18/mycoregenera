'use client';

import { FlaskConical, MapPin, Users, Check, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Verification } from '@/types';

interface VerificationBadgeProps {
  verifications: Verification[];
  size?: 'sm' | 'md';
  className?: string;
}

const typeConfig: Record<string, { icon: typeof FlaskConical; label: string }> = {
  laboratorio: { icon: FlaskConical, label: 'Laboratorio' },
  geolocalizacion: { icon: MapPin, label: 'Geolocalización' },
  comunidad: { icon: Users, label: 'Comunidad' },
};

const statusConfig: Record<string, { icon: typeof Check; color: string; bg: string; label: string }> = {
  aprobado: {
    icon: Check,
    color: 'text-myco-600',
    bg: 'bg-myco-50 border-myco-200',
    label: 'Aprobado',
  },
  pendiente: {
    icon: Clock,
    color: 'text-amber-500',
    bg: 'bg-amber-50 border-amber-200',
    label: 'Pendiente',
  },
  rechazado: {
    icon: X,
    color: 'text-danger-500',
    bg: 'bg-danger-50 border-danger-200',
    label: 'Rechazado',
  },
};

export default function VerificationBadge({ verifications, size = 'sm', className }: VerificationBadgeProps) {
  const iconSize = size === 'sm' ? 14 : 18;
  const statusIconSize = size === 'sm' ? 10 : 12;

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      {verifications.map((v) => {
        const typeConf = typeConfig[v.type];
        const statusConf = statusConfig[v.status];
        if (!typeConf || !statusConf) return null;

        const TypeIcon = typeConf.icon;
        const StatusIcon = statusConf.icon;

        return (
          <div
            key={v.type}
            className={cn(
              'relative inline-flex items-center justify-center rounded-full border',
              statusConf.bg,
              size === 'sm' ? 'w-8 h-8' : 'w-10 h-10'
            )}
            title={`${typeConf.label}: ${statusConf.label}`}
          >
            <TypeIcon size={iconSize} className={statusConf.color} />
            <span
              className={cn(
                'absolute -bottom-0.5 -right-0.5 rounded-full flex items-center justify-center',
                v.status === 'aprobado' && 'bg-myco-500 text-white',
                v.status === 'pendiente' && 'bg-amber-500 text-white',
                v.status === 'rechazado' && 'bg-danger-500 text-white',
                size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
              )}
            >
              <StatusIcon size={statusIconSize} strokeWidth={3} />
            </span>
          </div>
        );
      })}
    </div>
  );
}
