'use client';

import {
  MapPin,
  CheckCircle2,
  Clock,
  Circle,
  Camera,
  ThumbsUp,
  Shield,
  DollarSign,
  TreePine,
  Leaf,
  FlaskConical,
  Users,
  FileText,
} from 'lucide-react';
import { cn, formatUSDC } from '@/lib/utils';
import { projects } from '@/data/projects';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import StellarBadge from '@/components/stellar/StellarBadge';

const project = projects.find((p) => p.id === 'proj-001')!;
const zone = project.zone;

const completedMilestones = project.milestones.filter(
  (m) => m.status === 'completado'
).length;
const totalMilestones = project.milestones.length;
const progressPercentage = Math.round(
  (completedMilestones / totalMilestones) * 100
);

// Simplified milestone descriptions for community
const milestonesCommunity = [
  {
    number: 1,
    title: 'Analizamos el suelo de tu zona',
    description:
      'Se tomaron muestras del terreno para saber exactamente que contaminantes hay y en que cantidad.',
    status: 'completado' as const,
    icon: FlaskConical,
  },
  {
    number: 2,
    title: 'Se plantaron los hongos remediadores',
    description:
      'Se colocaron hongos especiales (Pleurotus ostreatus) que absorben los metales pesados del suelo de forma natural.',
    status: 'completado' as const,
    icon: Leaf,
  },
  {
    number: 3,
    title: 'Revisando como van los hongos',
    description:
      'Estamos midiendo si los hongos estan creciendo bien y absorbiendo los contaminantes. Este paso toma unos meses.',
    status: 'en_progreso' as const,
    icon: TreePine,
  },
  {
    number: 4,
    title: 'Medicion final del suelo',
    description:
      'Se va a analizar el suelo de nuevo para ver cuanto se redujeron los contaminantes despues del tratamiento.',
    status: 'pendiente' as const,
    icon: FlaskConical,
  },
  {
    number: 5,
    title: 'Certificacion oficial',
    description:
      'Un laboratorio certificado va a confirmar los resultados y se entregara un informe oficial.',
    status: 'pendiente' as const,
    icon: FileText,
  },
];

// Evidence items from completed milestones
const evidenceItems = [
  {
    title: 'Toma de muestras en terreno',
    caption: 'Equipo de UFRO realizando muestreo de suelo — Nov 2025',
    imageUrl: '/images/evidence/soil-sample-01.jpg',
  },
  {
    title: 'Resultados de laboratorio',
    caption: 'Analisis certificado de metales pesados en el suelo',
    imageUrl: '/images/evidence/lab-result-01.jpg',
  },
  {
    title: 'Hongos plantados en tu zona',
    caption: 'Inoculacion de Pleurotus ostreatus — Ene 2026',
    imageUrl: '/images/evidence/inoculation-01.jpg',
  },
  {
    title: 'La comunidad participando',
    caption: 'Vecinos de Quintero en jornada de inoculacion comunitaria',
    imageUrl: '/images/evidence/field-work-01.jpg',
  },
  {
    title: 'Crecimiento del micelio',
    caption: 'Los hongos estan creciendo y limpiando el suelo — Feb 2026',
    imageUrl: '/images/evidence/soil-sample-02.jpg',
  },
  {
    title: 'Mapa de contaminacion',
    caption: 'Puntos de muestreo verificados con GPS',
    imageUrl: '/images/evidence/map-contamination.jpg',
  },
];

function getMilestoneStatusIcon(status: string) {
  switch (status) {
    case 'completado':
      return { Icon: CheckCircle2, color: 'text-myco-600', bg: 'bg-myco-100' };
    case 'en_progreso':
      return { Icon: Clock, color: 'text-amber-600', bg: 'bg-amber-100' };
    default:
      return { Icon: Circle, color: 'text-slate-300', bg: 'bg-slate-100' };
  }
}

export default function ComunidadPage() {
  const spent = project.releasedAmount;
  const remaining = project.escrowBalance;
  const total = project.totalBudget;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ====== Header ====== */}
      <section className="relative bg-gradient-to-br from-myco-800 via-myco-700 to-myco-600 text-white">
        <div className="absolute inset-0 bg-[url('/images/mycelium-pattern.svg')] opacity-5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <MapPin size={20} className="text-myco-200" />
            <span className="text-myco-100 text-sm font-medium">
              {zone.region}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-heading)] mb-2">
            Mi Zona: {zone.name}
          </h1>
          <p className="text-myco-100 text-base max-w-lg mx-auto">
            Aqui puedes ver como avanza la limpieza del suelo en tu zona y
            participar verificando el trabajo.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ====== Big Progress Card ====== */}
        <section className="-mt-6 relative z-10">
          <Card padding="lg">
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-[family-name:var(--font-heading)] mb-2">
                La remediacion de tu zona esta al {progressPercentage}%
              </h2>
              <p className="text-slate-500 mb-6">
                Se han completado{' '}
                <span className="font-semibold text-myco-700">
                  {completedMilestones} de {totalMilestones}
                </span>{' '}
                etapas del proyecto
              </p>

              {/* Large visual progress bar with gradient feel */}
              <div className="relative w-full h-10 bg-gradient-to-r from-amber-100 via-lime-100 to-myco-100 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-myco-600 via-myco-500 to-myco-400 rounded-full transition-all duration-1000 flex items-center justify-end pr-3"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <span className="text-white text-sm font-bold">
                    {progressPercentage}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-400" />
                  Suelo contaminado
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-myco-500" />
                  Suelo limpio
                </span>
              </div>
            </div>
          </Card>
        </section>

        {/* ====== Simplified Timeline ====== */}
        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-800 font-[family-name:var(--font-heading)] mb-5 flex items-center gap-2">
            <TreePine size={22} className="text-myco-600" />
            Etapas del proyecto
          </h2>

          <div className="space-y-4">
            {milestonesCommunity.map((ms) => {
              const { Icon: StatusIcon, color, bg } = getMilestoneStatusIcon(
                ms.status
              );
              const MsIcon = ms.icon;

              return (
                <Card key={ms.number} padding="md" hover>
                  <div className="flex items-start gap-4">
                    {/* Status circle */}
                    <div
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0',
                        bg
                      )}
                    >
                      <StatusIcon size={24} className={color} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-semibold text-slate-400 uppercase">
                          Etapa {ms.number}
                        </span>
                        {ms.status === 'completado' && (
                          <Badge variant="success" size="sm">
                            Completado
                          </Badge>
                        )}
                        {ms.status === 'en_progreso' && (
                          <Badge variant="warning" size="sm">
                            En curso
                          </Badge>
                        )}
                        {ms.status === 'pendiente' && (
                          <Badge variant="default" size="sm">
                            Pendiente
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-slate-800 text-base font-[family-name:var(--font-heading)]">
                        {ms.title}
                      </h3>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        {ms.description}
                      </p>
                    </div>

                    {/* Milestone icon */}
                    <div className="hidden sm:flex w-10 h-10 rounded-lg bg-slate-50 items-center justify-center flex-shrink-0">
                      <MsIcon size={18} className="text-slate-400" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ====== Evidence Section ====== */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-800 font-[family-name:var(--font-heading)] mb-5 flex items-center gap-2">
            <Camera size={22} className="text-stellar-600" />
            Evidencia del trabajo
          </h2>
          <p className="text-sm text-slate-500 mb-5">
            Estas fotos y documentos fueron registrados en blockchain para que
            nadie pueda alterarlos.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {evidenceItems.map((item, idx) => (
              <Card key={idx} padding="none" hover>
                {/* Placeholder image area */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-t-xl flex items-center justify-center overflow-hidden">
                  <div className="flex flex-col items-center text-slate-300">
                    <Camera size={32} />
                    <span className="text-xs mt-1">Foto verificada</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-sm text-slate-800">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{item.caption}</p>
                  <div className="mt-2">
                    <StellarBadge size="sm" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ====== Validation Section ====== */}
        <section className="mt-10">
          <Card padding="lg" className="border-myco-200 bg-myco-50/30">
            <div className="text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-myco-100 flex items-center justify-center mx-auto mb-4">
                <ThumbsUp size={32} className="text-myco-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-800 font-[family-name:var(--font-heading)] mb-3">
                Tu opinion importa
              </h2>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Como vecino/a de {zone.name}, puedes confirmar que el
                trabajo de limpieza del suelo se esta realizando en tu zona.
                Tu validacion queda registrada en blockchain y es parte
                importante del proceso de verificacion.
              </p>

              <Button
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Users size={18} />
                Confirmar que el trabajo se esta realizando
              </Button>

              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                Tu validacion es importante — ayuda a verificar que la
                remediacion esta ocurriendo en tu zona.
              </p>
            </div>
          </Card>
        </section>

        {/* ====== Transparency Section ====== */}
        <section className="mt-10 pb-16">
          <h2 className="text-xl font-bold text-slate-800 font-[family-name:var(--font-heading)] mb-5 flex items-center gap-2">
            <Shield size={22} className="text-stellar-600" />
            Los fondos de este proyecto
          </h2>

          <Card padding="lg">
            <p className="text-sm text-slate-500 mb-6">
              El dinero del proyecto esta protegido en un contrato inteligente en
              Stellar. Solo se libera cuando se verifica que el trabajo se hizo
              correctamente.
            </p>

            {/* Simplified bar */}
            <div className="space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign
                    size={16}
                    className="text-slate-400"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    Presupuesto total
                  </span>
                </div>
                <span className="text-lg font-bold text-slate-800 font-[family-name:var(--font-heading)]">
                  {formatUSDC(total)} USDC
                </span>
              </div>

              {/* Visual bar */}
              <div className="w-full h-8 bg-slate-100 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-myco-500 transition-all duration-700 flex items-center justify-center"
                  style={{
                    width: `${(spent / total) * 100}%`,
                  }}
                >
                  {(spent / total) * 100 > 12 && (
                    <span className="text-xs font-semibold text-white">
                      Usado
                    </span>
                  )}
                </div>
                <div
                  className="h-full bg-stellar-500 transition-all duration-700 flex items-center justify-center"
                  style={{
                    width: `${(remaining / total) * 100}%`,
                  }}
                >
                  {(remaining / total) * 100 > 15 && (
                    <span className="text-xs font-semibold text-white">
                      Protegido
                    </span>
                  )}
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center gap-2 bg-myco-50 rounded-lg p-3">
                  <div className="w-3 h-3 rounded-full bg-myco-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Ya se uso</p>
                    <p className="text-sm font-bold text-myco-700">
                      {formatUSDC(spent)} USDC
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-stellar-50 rounded-lg p-3">
                  <div className="w-3 h-3 rounded-full bg-stellar-500 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Protegido en escrow</p>
                    <p className="text-sm font-bold text-stellar-700">
                      {formatUSDC(remaining)} USDC
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div className="w-3 h-3 rounded-full bg-slate-300 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-slate-500">Total del proyecto</p>
                    <p className="text-sm font-bold text-slate-700">
                      {formatUSDC(total)} USDC
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <StellarBadge size="md" />
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
