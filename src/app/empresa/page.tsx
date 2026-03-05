'use client';

import {
  Building2,
  FolderOpen,
  Wallet,
  Lock,
  Unlock,
  MapPin,
  ArrowRight,
  Clock,
  CheckCircle2,
  UserPlus,
  FileCheck,
  AlertCircle,
  Leaf,
} from 'lucide-react';
import { cn, formatUSDC, getStatusColor, getStatusLabel, getContaminantLabel } from '@/lib/utils';
import { companies } from '@/data/companies';
import { projects } from '@/data/projects';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import WalletAddress from '@/components/stellar/WalletAddress';
import EscrowMeter from '@/components/stellar/EscrowMeter';
import USDCAmount from '@/components/stellar/USDCAmount';
import StatCard from '@/components/dashboard/StatCard';

const company = companies[0];
const companyProjects = projects.filter((p) => p.company.id === company.id);

const totalBudget = companyProjects.reduce((sum, p) => sum + p.totalBudget, 0);
const totalEscrow = companyProjects.reduce((sum, p) => sum + p.escrowBalance, 0);
const totalReleased = companyProjects.reduce((sum, p) => sum + p.releasedAmount, 0);

const recentActivity = [
  {
    icon: CheckCircle2,
    text: 'Hito 2 verificado en proyecto Quintero',
    time: 'Hace 2 días',
    color: 'text-myco-600',
  },
  {
    icon: UserPlus,
    text: 'Nuevo proveedor postuló para Antofagasta',
    time: 'Hace 3 días',
    color: 'text-stellar-600',
  },
  {
    icon: FileCheck,
    text: 'Evidencia registrada en blockchain — Hito 3',
    time: 'Hace 5 días',
    color: 'text-myco-600',
  },
  {
    icon: Unlock,
    text: '10.000 USDC liberados — Hito 2 Quintero',
    time: 'Hace 1 semana',
  },
  {
    icon: AlertCircle,
    text: 'Monitoreo intermedio iniciado en Quintero',
    time: 'Hace 1 semana',
    color: 'text-amber-600',
  },
  {
    icon: CheckCircle2,
    text: 'Hito 1 completado en Til-Til',
    time: 'Hace 2 semanas',
    color: 'text-myco-600',
  },
];

export default function EmpresaDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ====== Header ====== */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white">
        <div className="absolute inset-0 bg-[url('/images/mycelium-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
              <Building2 size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)]">
                  {company.name}
                </h1>
                <Badge variant="info" size="md">
                  {company.industry}
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-300">
                <span>RUT: {company.rut}</span>
                <WalletAddress address={company.stellarAddress} showCopy showLink className="text-slate-300" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Stats Row ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={FolderOpen}
            label="Proyectos Activos"
            value={companyProjects.filter((p) => p.status === 'activo').length}
            sublabel={`${companyProjects.length} total`}
            color="green"
          />
          <StatCard
            icon={Wallet}
            label="Presupuesto Total"
            value={`${formatUSDC(totalBudget)} USDC`}
            sublabel="En todos los proyectos"
            color="blue"
          />
          <StatCard
            icon={Lock}
            label="En Escrow"
            value={`${formatUSDC(totalEscrow)} USDC`}
            sublabel="Fondos asegurados"
            color="amber"
          />
          <StatCard
            icon={Unlock}
            label="Liberado"
            value={`${formatUSDC(totalReleased)} USDC`}
            sublabel="Por hitos completados"
            color="green"
          />
        </div>
      </section>

      {/* ====== Main Content ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mis Proyectos */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <FolderOpen size={20} className="text-myco-600" />
              <h2 className="text-xl font-bold text-slate-800 font-[family-name:var(--font-heading)]">
                Mis Proyectos
              </h2>
            </div>

            <div className="space-y-4">
              {companyProjects.map((project) => {
                const completedMs = project.milestones.filter(
                  (m) => m.status === 'completado'
                ).length;
                const totalMs = project.milestones.length;
                const progressPct =
                  totalMs > 0
                    ? Math.round((completedMs / totalMs) * 100)
                    : project.status === 'completado'
                    ? 100
                    : 0;

                return (
                  <Card key={project.id} padding="md" hover>
                    <div className="flex flex-col gap-4">
                      {/* Title row */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-semibold text-slate-800 font-[family-name:var(--font-heading)]">
                              {project.title}
                            </h3>
                            <span
                              className={cn(
                                'inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full',
                                getStatusColor(project.status)
                              )}
                            >
                              {getStatusLabel(project.status)}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <MapPin size={13} />
                              {project.zone.name}, {project.zone.region}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Contaminants */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.contaminants.map((c) => (
                          <Badge key={c} variant="warning" size="sm">
                            {getContaminantLabel(c)}
                          </Badge>
                        ))}
                        {project.fungiSpecies.map((f) => (
                          <Badge key={f} variant="success" size="sm">
                            <Leaf size={10} className="mr-0.5" />
                            {f}
                          </Badge>
                        ))}
                      </div>

                      {/* Progress */}
                      <div>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="text-slate-500">
                            Progreso: {completedMs}/{totalMs} hitos
                          </span>
                          <span className="font-semibold text-slate-700">
                            {progressPct}%
                          </span>
                        </div>
                        <ProgressBar
                          value={progressPct}
                          max={100}
                          color="green"
                          size="sm"
                        />
                      </div>

                      {/* Budget & CTA */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100">
                        <div className="flex-1">
                          <EscrowMeter
                            total={project.totalBudget}
                            released={project.releasedAmount}
                            inEscrow={project.escrowBalance}
                          />
                        </div>
                        <Button
                          href={`/proyecto/${project.id}`}
                          variant="primary"
                          size="sm"
                        >
                          Ver Proyecto
                          <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar: Actividad Reciente */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Clock size={20} className="text-slate-500" />
              <h2 className="text-xl font-bold text-slate-800 font-[family-name:var(--font-heading)]">
                Actividad Reciente
              </h2>
            </div>

            <Card padding="none">
              <div className="divide-y divide-slate-100">
                {recentActivity.map((event, idx) => {
                  const EventIcon = event.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 p-4">
                      <div
                        className={cn(
                          'w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0',
                        )}
                      >
                        <EventIcon
                          size={16}
                          className={event.color || 'text-slate-500'}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 leading-snug">
                          {event.text}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {event.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
