'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Building2,
  Microscope,
  Target,
  Leaf,
} from 'lucide-react';
import { cn, formatDate, getStatusColor, getStatusLabel } from '@/lib/utils';
import { projects } from '@/data/projects';
import { transactions as allTransactions } from '@/data/transactions';

import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';

import EscrowCard from '@/components/project/EscrowCard';
import MilestoneTimeline from '@/components/project/MilestoneTimeline';
import TransactionHistory from '@/components/project/TransactionHistory';
import VerificationBadge from '@/components/project/VerificationBadge';
import StellarBadge from '@/components/stellar/StellarBadge';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  // Filter transactions related to this project
  const projectMilestoneIds = project.milestones.map((m) => m.id);
  const projectTransactions = allTransactions.filter(
    (tx) =>
      tx.hash === project.transactionHash ||
      (tx.milestoneId && projectMilestoneIds.includes(tx.milestoneId))
  );

  // Calculate progress
  const completedMilestones = project.milestones.filter(
    (m) => m.status === 'completado'
  ).length;
  const totalMilestones = project.milestones.length;
  const progressPercentage =
    totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

  // Find current active milestone
  const currentMilestone = project.milestones.find(
    (m) => m.status === 'en_progreso' || m.status === 'verificando'
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ====== Project Header Banner ====== */}
      <section className="relative bg-gradient-to-br from-myco-900 via-myco-800 to-myco-700 text-white">
        <div className="absolute inset-0 bg-[url('/images/mycelium-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-10">
          {/* Back button */}
          <Button href="/" variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10 mb-4">
            <ArrowLeft size={16} />
            Volver al inicio
          </Button>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              {/* Status + Stellar badge */}
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span
                  className={cn(
                    'inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full',
                    getStatusColor(project.status)
                  )}
                >
                  {getStatusLabel(project.status)}
                </span>
                <StellarBadge size="sm" />
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-heading)] leading-tight mb-3">
                {project.title}
              </h1>

              {/* Meta info row */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-myco-100">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  <span>{project.zone.name}, {project.zone.region}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 size={14} />
                  <span>{project.company.name}</span>
                </div>
                {project.provider && (
                  <div className="flex items-center gap-1.5">
                    <Microscope size={14} />
                    <span>{project.provider.name}</span>
                  </div>
                )}
              </div>

              {/* Fungi species tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.fungiSpecies.map((species) => (
                  <span
                    key={species}
                    className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    <Leaf size={12} />
                    <em>{species}</em>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Three-column Summary Row ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Escrow Card */}
          <EscrowCard
            totalBudget={project.totalBudget}
            escrowBalance={project.escrowBalance}
            releasedAmount={project.releasedAmount}
            stellarEscrowAddress={project.stellarEscrowAddress}
          />

          {/* Column 2: Progress Overview */}
          <Card padding="md">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-myco-50 flex items-center justify-center">
                <Target size={16} className="text-myco-600" />
              </div>
              <h3 className="font-semibold text-slate-800 font-[family-name:var(--font-heading)]">
                Progreso General
              </h3>
            </div>

            <div className="text-center mb-4">
              <span className="text-4xl font-bold text-myco-700 font-[family-name:var(--font-heading)]">
                {progressPercentage}%
              </span>
              <p className="text-sm text-slate-500 mt-1">completado</p>
            </div>

            <ProgressBar
              value={progressPercentage}
              max={100}
              color="green"
              size="lg"
              showLabel={false}
              className="mb-4"
            />

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Hitos completados</span>
                <span className="font-semibold text-slate-700">
                  {completedMilestones} / {totalMilestones}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Inicio</span>
                <span className="text-slate-700 flex items-center gap-1">
                  <Calendar size={13} className="text-slate-400" />
                  {formatDate(project.startDate)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Fin estimado</span>
                <span className="text-slate-700 flex items-center gap-1">
                  <Calendar size={13} className="text-slate-400" />
                  {formatDate(project.estimatedEndDate)}
                </span>
              </div>
            </div>
          </Card>

          {/* Column 3: Current Milestone Verification */}
          <Card padding="md">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <Microscope size={16} className="text-amber-600" />
              </div>
              <h3 className="font-semibold text-slate-800 font-[family-name:var(--font-heading)]">
                Verificación Actual
              </h3>
            </div>

            {currentMilestone ? (
              <>
                <div className="mb-4">
                  <Badge
                    variant={
                      currentMilestone.status === 'en_progreso' ? 'info' : 'warning'
                    }
                    size="sm"
                  >
                    {getStatusLabel(currentMilestone.status)}
                  </Badge>
                  <h4 className="text-sm font-semibold text-slate-800 mt-2 font-[family-name:var(--font-heading)]">
                    Hito {currentMilestone.number}: {currentMilestone.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-3">
                  Triple verificación
                </p>

                <VerificationBadge
                  verifications={currentMilestone.verifications}
                  size="md"
                  className="mb-4"
                />

                <div className="space-y-2">
                  {currentMilestone.verifications.map((v) => {
                    const labels: Record<string, string> = {
                      laboratorio: 'Laboratorio',
                      geolocalizacion: 'Geolocalización',
                      comunidad: 'Comunidad',
                    };
                    const statusLabels: Record<string, string> = {
                      aprobado: 'Aprobado',
                      pendiente: 'Pendiente',
                      rechazado: 'Rechazado',
                    };
                    const statusVariant: Record<string, 'success' | 'warning' | 'danger'> = {
                      aprobado: 'success',
                      pendiente: 'warning',
                      rechazado: 'danger',
                    };
                    return (
                      <div
                        key={v.type}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-slate-600">
                          {labels[v.type] || v.type}
                        </span>
                        <Badge variant={statusVariant[v.status] || 'default'} size="sm">
                          {statusLabels[v.status] || v.status}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                {project.status === 'completado' ? (
                  <>
                    <div className="w-12 h-12 rounded-full bg-myco-100 flex items-center justify-center mb-3">
                      <Target size={24} className="text-myco-600" />
                    </div>
                    <p className="text-sm text-slate-600 font-medium">
                      Proyecto completado
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Todos los hitos han sido verificados
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                      <Target size={24} className="text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-600 font-medium">
                      Sin hito activo
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      No hay hitos en progreso actualmente
                    </p>
                  </>
                )}
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* ====== Description ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Card padding="md">
          <h2 className="text-lg font-bold text-slate-800 font-[family-name:var(--font-heading)] mb-3">
            Descripción del Proyecto
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">{project.description}</p>
        </Card>
      </section>

      {/* ====== Milestone Timeline ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Card padding="lg">
          <h2 className="text-lg font-bold text-slate-800 font-[family-name:var(--font-heading)] mb-6">
            Hitos del Proyecto
          </h2>
          {project.milestones.length > 0 ? (
            <MilestoneTimeline milestones={project.milestones} />
          ) : (
            <div className="text-center py-8 text-slate-400 text-sm">
              Este proyecto no tiene hitos definidos.
            </div>
          )}
        </Card>
      </section>

      {/* ====== Transaction History ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-16">
        <Card padding="lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800 font-[family-name:var(--font-heading)]">
              Historial de Transacciones
            </h2>
            <StellarBadge size="sm" />
          </div>
          <TransactionHistory transactions={projectTransactions} />
        </Card>
      </section>
    </div>
  );
}
