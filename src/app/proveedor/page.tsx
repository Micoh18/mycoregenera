'use client';

import { useState } from 'react';
import {
  GraduationCap,
  Star,
  Briefcase,
  TrendingUp,
  DollarSign,
  Award,
  MapPin,
  FlaskConical,
  Leaf,
  Search,
  Upload,
  MapPinned,
  FileText,
  Send,
  ChevronDown,
  CheckCircle2,
  Clock,
  Circle,
  ArrowRight,
  Beaker,
} from 'lucide-react';
import { cn, formatUSDC, getStatusLabel, getContaminantLabel } from '@/lib/utils';
import { providers } from '@/data/providers';
import { projects } from '@/data/projects';

import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ProgressBar from '@/components/ui/ProgressBar';
import WalletAddress from '@/components/stellar/WalletAddress';
import USDCAmount from '@/components/stellar/USDCAmount';
import StellarBadge from '@/components/stellar/StellarBadge';
import StatCard from '@/components/dashboard/StatCard';

const provider = providers[0];

// Find projects where this provider is assigned
const providerProjects = projects.filter(
  (p) => p.provider && p.provider.id === provider.id
);

// Hardcoded available projects
const availableProjects = [
  {
    id: 'avail-001',
    title: 'Limpieza de Hidrocarburos — Coronel',
    zone: 'Coronel',
    region: 'Biobio',
    contaminants: ['hidrocarburos', 'mercurio'],
    budget: 35000,
    requiredFungi: ['Trametes versicolor', 'Phanerochaete chrysosporium'],
    areaHectares: 45,
    description:
      'Remediacion de suelos contaminados con hidrocarburos en zona portuaria de Coronel.',
  },
  {
    id: 'avail-002',
    title: 'Remediacion de Cobre en Suelos Mineros — Calama',
    zone: 'Calama',
    region: 'Antofagasta',
    contaminants: ['cobre', 'arsenico'],
    budget: 52000,
    requiredFungi: ['Aspergillus niger', 'Pleurotus ostreatus'],
    areaHectares: 200,
    description:
      'Tratamiento de 200 hectareas de suelo con altos niveles de cobre y arsenico cercanos a faenas mineras.',
  },
  {
    id: 'avail-003',
    title: 'Descontaminacion de Mercurio — Tocopilla',
    zone: 'Tocopilla',
    region: 'Antofagasta',
    contaminants: ['arsenico', 'plomo', 'mercurio'],
    budget: 41000,
    requiredFungi: ['Pleurotus ostreatus', 'Trametes versicolor'],
    areaHectares: 60,
    description:
      'Proyecto de biorremediacion para suelos contaminados con multiples metales pesados en zona costera.',
  },
];

// Tabs
type TabKey = 'disponibles' | 'activos' | 'evidencia';

export default function ProveedorPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('disponibles');

  const tabs: { key: TabKey; label: string; count?: number }[] = [
    {
      key: 'disponibles',
      label: 'Proyectos Disponibles',
      count: availableProjects.length,
    },
    {
      key: 'activos',
      label: 'Mis Proyectos Activos',
      count: providerProjects.length,
    },
    { key: 'evidencia', label: 'Subir Evidencia' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ====== Header ====== */}
      <section className="relative bg-gradient-to-br from-stellar-900 via-stellar-800 to-stellar-700 text-white">
        <div className="absolute inset-0 bg-[url('/images/mycelium-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-10">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
              <GraduationCap size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)]">
                  {provider.name}
                </h1>
                <Badge
                  variant="info"
                  size="md"
                  className="capitalize bg-white/10 text-white border-white/20"
                >
                  Universidad
                </Badge>
              </div>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-stellar-200">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  {provider.rating} / 5
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  Region de la {provider.region}
                </span>
                <WalletAddress
                  address={provider.stellarAddress}
                  showCopy
                  showLink
                  className="text-stellar-200"
                />
              </div>
              {/* Specializations */}
              <div className="flex flex-wrap gap-2 mt-3">
                {provider.specialization.map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex items-center gap-1 bg-white/10 border border-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    <FlaskConical size={11} />
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Stats Row ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={Briefcase}
            label="Proyectos Completados"
            value={provider.completedProjects}
            sublabel="Historico total"
            color="green"
          />
          <StatCard
            icon={TrendingUp}
            label="En Progreso"
            value={providerProjects.filter((p) => p.status === 'activo').length}
            sublabel="Proyectos activos"
            color="blue"
          />
          <StatCard
            icon={DollarSign}
            label="Ingresos Totales"
            value="28.000 USDC"
            sublabel="Acumulado historico"
            color="amber"
          />
          <StatCard
            icon={Award}
            label="Rating"
            value={`${provider.rating} / 5`}
            sublabel="Basado en verificaciones"
            color="green"
          />
        </div>
      </section>

      {/* ====== Tabs ====== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pb-16">
        {/* Tab Navigation */}
        <div className="flex gap-1 border-b border-slate-200 mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                'px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer',
                activeTab === tab.key
                  ? 'border-stellar-600 text-stellar-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              )}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold',
                    activeTab === tab.key
                      ? 'bg-stellar-100 text-stellar-700'
                      : 'bg-slate-100 text-slate-500'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'disponibles' && (
          <div className="space-y-4">
            <p className="text-sm text-slate-500 mb-4">
              Proyectos que buscan proveedores de micorremediacion. Postula para
              ser seleccionado.
            </p>

            {availableProjects.map((proj) => (
              <Card key={proj.id} padding="md" hover>
                <div className="flex flex-col gap-4">
                  {/* Title */}
                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Badge variant="warning" size="sm">
                        Buscando proveedor
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800 font-[family-name:var(--font-heading)]">
                      {proj.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {proj.description}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {proj.zone}, {proj.region}
                    </span>
                    <span className="flex items-center gap-1">
                      <Search size={14} />
                      {proj.areaHectares} hectareas
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {proj.contaminants.map((c) => (
                      <Badge key={c} variant="danger" size="sm">
                        {getContaminantLabel(c)}
                      </Badge>
                    ))}
                    {proj.requiredFungi.map((f) => (
                      <Badge key={f} variant="success" size="sm">
                        <Leaf size={10} className="mr-0.5" />
                        {f}
                      </Badge>
                    ))}
                  </div>

                  {/* Budget & CTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-xs text-slate-400 uppercase tracking-wide font-semibold">
                        Presupuesto
                      </span>
                      <div className="mt-0.5">
                        <USDCAmount amount={proj.budget} size="lg" />
                      </div>
                    </div>
                    <Button variant="secondary" size="md">
                      <Send size={14} />
                      Postular
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'activos' && (
          <div className="space-y-4">
            {providerProjects.length === 0 ? (
              <Card padding="lg">
                <div className="text-center py-8 text-slate-400">
                  <Briefcase
                    size={40}
                    className="mx-auto mb-3 text-slate-300"
                  />
                  <p className="font-medium">No tienes proyectos activos</p>
                  <p className="text-sm mt-1">
                    Postula a un proyecto disponible para comenzar
                  </p>
                </div>
              </Card>
            ) : (
              providerProjects.map((project) => {
                const completedMs = project.milestones.filter(
                  (m) => m.status === 'completado'
                ).length;
                const totalMs = project.milestones.length;
                const progressPct =
                  totalMs > 0
                    ? Math.round((completedMs / totalMs) * 100)
                    : 0;

                return (
                  <Card key={project.id} padding="md" hover>
                    <div className="flex flex-col gap-4">
                      {/* Title */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-semibold text-slate-800 font-[family-name:var(--font-heading)]">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1">
                              <MapPin size={13} />
                              {project.zone.name}, {project.zone.region}
                            </span>
                          </div>
                        </div>
                        <Badge
                          variant={
                            project.status === 'activo' ? 'success' : 'default'
                          }
                          size="sm"
                        >
                          {getStatusLabel(project.status)}
                        </Badge>
                      </div>

                      {/* Milestone progress */}
                      <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-slate-500">
                            Progreso de hitos
                          </span>
                          <span className="font-semibold text-slate-700">
                            {completedMs}/{totalMs}
                          </span>
                        </div>
                        <ProgressBar
                          value={progressPct}
                          max={100}
                          color="blue"
                          size="md"
                          showLabel
                        />
                      </div>

                      {/* Milestones list */}
                      <div className="space-y-2">
                        {project.milestones.map((ms) => {
                          let StatusIcon = Circle;
                          let iconColor = 'text-slate-300';
                          if (ms.status === 'completado') {
                            StatusIcon = CheckCircle2;
                            iconColor = 'text-myco-600';
                          } else if (
                            ms.status === 'en_progreso' ||
                            ms.status === 'verificando'
                          ) {
                            StatusIcon = Clock;
                            iconColor = 'text-amber-500';
                          }

                          return (
                            <div
                              key={ms.id}
                              className="flex items-center gap-3 text-sm"
                            >
                              <StatusIcon
                                size={16}
                                className={iconColor}
                              />
                              <span
                                className={cn(
                                  'flex-1',
                                  ms.status === 'completado'
                                    ? 'text-slate-500 line-through'
                                    : ms.status === 'en_progreso'
                                    ? 'text-slate-800 font-medium'
                                    : 'text-slate-400'
                                )}
                              >
                                Hito {ms.number}: {ms.title}
                              </span>
                              <USDCAmount
                                amount={ms.amount}
                                size="sm"
                                className="text-slate-500"
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <USDCAmount
                          amount={project.totalBudget}
                          size="md"
                        />
                        <Button
                          href={`/proyecto/${project.id}`}
                          variant="outline"
                          size="sm"
                        >
                          Ver detalle
                          <ArrowRight size={14} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        )}

        {activeTab === 'evidencia' && (
          <Card padding="lg">
            <h3 className="text-lg font-bold text-slate-800 font-[family-name:var(--font-heading)] mb-1">
              Registrar Evidencia
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Sube fotos, documentos y resultados de laboratorio. La evidencia
              queda registrada de forma inmutable en la blockchain de Stellar.
            </p>

            <div className="space-y-5">
              {/* Project selector */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Proyecto
                </label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-stellar-500 focus:border-stellar-500 pr-10">
                    <option>Seleccionar proyecto...</option>
                    {providerProjects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Milestone selector */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Hito
                </label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-stellar-500 focus:border-stellar-500 pr-10">
                    <option>Seleccionar hito...</option>
                    <option>Hito 1 — Caracterizacion inicial del suelo</option>
                    <option>
                      Hito 2 — Preparacion e inoculacion fungica
                    </option>
                    <option>Hito 3 — Monitoreo intermedio (3 meses)</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Photo upload dropzone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Fotografias o documentos
                </label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-stellar-400 hover:bg-stellar-50/30 transition-colors cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                    <Upload size={24} className="text-slate-400" />
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    Arrastra archivos aqui o haz clic para subir
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    JPG, PNG o PDF — Maximo 10 MB por archivo
                  </p>
                </div>
              </div>

              {/* Geolocation display */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Geolocalizacion
                </label>
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                  <MapPinned size={18} className="text-stellar-500" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 font-medium">
                      -32.7833, -71.5167
                    </p>
                    <p className="text-xs text-slate-400">
                      Quintero-Puchuncavi, Valparaiso — Precision: alta
                    </p>
                  </div>
                  <Badge variant="success" size="sm">
                    GPS activo
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  Descripcion de la evidencia
                </label>
                <textarea
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-stellar-500 focus:border-stellar-500 resize-none"
                  rows={4}
                  placeholder="Describe que muestra esta evidencia, las condiciones del sitio, observaciones relevantes..."
                />
              </div>

              {/* Submit */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <StellarBadge size="sm" />
                  <span>La evidencia se registrara de forma inmutable</span>
                </div>
                <Button variant="secondary" size="lg">
                  <FileText size={16} />
                  Registrar en Blockchain
                </Button>
              </div>
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}
