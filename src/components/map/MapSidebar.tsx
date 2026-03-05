'use client';

import { useState, useMemo } from 'react';
import type { Zone, ProjectStatus } from '@/types';
import Badge from '@/components/ui/Badge';
import {
  cn,
  getStatusLabel,
  getStatusColor,
  getContaminantLabel,
  getContaminantColor,
} from '@/lib/utils';
import { Search, Filter, MapPin, AlertTriangle } from 'lucide-react';

interface MapSidebarProps {
  zones: Zone[];
  selectedZoneId: string | null;
  onZoneClick: (zoneId: string) => void;
}

const allStatuses: { value: '' | ProjectStatus; label: string }[] = [
  { value: '', label: 'Todos los estados' },
  { value: 'activo', label: 'Activo' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'completado', label: 'Completado' },
  { value: 'en_revision', label: 'En Revision' },
];

const riskConfig: Record<string, { label: string; variant: 'danger' | 'warning' | 'success' }> = {
  alto: { label: 'Alto', variant: 'danger' },
  medio: { label: 'Medio', variant: 'warning' },
  bajo: { label: 'Bajo', variant: 'success' },
};

export default function MapSidebar({ zones, selectedZoneId, onZoneClick }: MapSidebarProps) {
  const [statusFilter, setStatusFilter] = useState<'' | ProjectStatus>('');
  const [regionFilter, setRegionFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const regions = useMemo(() => {
    const unique = Array.from(new Set(zones.map((z) => z.region)));
    return unique.sort();
  }, [zones]);

  const filteredZones = useMemo(() => {
    return zones.filter((zone) => {
      if (statusFilter && zone.status !== statusFilter) return false;
      if (regionFilter && zone.region !== regionFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          zone.name.toLowerCase().includes(q) ||
          zone.region.toLowerCase().includes(q) ||
          zone.contaminants.some((c) => getContaminantLabel(c).toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [zones, statusFilter, regionFilter, searchQuery]);

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-[family-name:var(--font-heading)] font-bold text-lg text-slate-900 mb-1">
          Zonas de Remediacion
        </h2>
        <p className="text-sm text-slate-500">
          {filteredZones.length} de {zones.length} zonas
        </p>
      </div>

      {/* Search & Filters */}
      <div className="p-4 space-y-3 border-b border-slate-200">
        {/* Search */}
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar zona, region..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-myco-500/30 focus:border-myco-500 transition-colors placeholder:text-slate-400"
          />
        </div>

        {/* Filters row */}
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as '' | ProjectStatus)}
            className="flex-1 text-sm border border-slate-200 rounded-lg px-2 py-1.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-myco-500/30 focus:border-myco-500 text-slate-700 cursor-pointer"
          >
            {allStatuses.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <select
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
          className="w-full text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-myco-500/30 focus:border-myco-500 text-slate-700 cursor-pointer"
        >
          <option value="">Todas las regiones</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      {/* Zone List */}
      <div className="flex-1 overflow-y-auto">
        {filteredZones.length === 0 ? (
          <div className="p-8 text-center">
            <MapPin size={32} className="mx-auto text-slate-300 mb-2" />
            <p className="text-sm text-slate-500">No se encontraron zonas con los filtros seleccionados.</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {filteredZones.map((zone) => (
              <li key={zone.id}>
                <button
                  onClick={() => onZoneClick(zone.id)}
                  className={cn(
                    'w-full text-left p-4 transition-colors cursor-pointer hover:bg-myco-50/50',
                    selectedZoneId === zone.id && 'bg-myco-50 border-l-4 border-l-myco-500'
                  )}
                >
                  {/* Name + Status */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-slate-900 leading-tight">
                      {zone.name}
                    </h3>
                    <span
                      className={cn(
                        'shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                        getStatusColor(zone.status)
                      )}
                    >
                      {getStatusLabel(zone.status)}
                    </span>
                  </div>

                  {/* Region */}
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin size={12} className="text-slate-400" />
                    <span className="text-xs text-slate-500">{zone.region}</span>
                    {zone.areaHectares && (
                      <>
                        <span className="text-slate-300 mx-1">|</span>
                        <span className="text-xs text-slate-500">{zone.areaHectares} ha</span>
                      </>
                    )}
                  </div>

                  {/* Risk level */}
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle size={12} className={cn(
                      zone.riskLevel === 'alto' ? 'text-danger-500' :
                      zone.riskLevel === 'medio' ? 'text-amber-500' :
                      'text-myco-500'
                    )} />
                    <Badge variant={riskConfig[zone.riskLevel].variant} size="sm">
                      Riesgo {riskConfig[zone.riskLevel].label}
                    </Badge>
                  </div>

                  {/* Contaminant tags */}
                  <div className="flex flex-wrap gap-1">
                    {zone.contaminants.map((c) => (
                      <span
                        key={c}
                        className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border',
                          getContaminantColor(c)
                        )}
                      >
                        {getContaminantLabel(c)}
                      </span>
                    ))}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Leyenda</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { status: 'activo', color: '#22c55e', label: 'Activo' },
            { status: 'pendiente', color: '#f59e0b', label: 'Pendiente' },
            { status: 'completado', color: '#3b82f6', label: 'Completado' },
            { status: 'en_revision', color: '#d97706', label: 'En Revision' },
          ].map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0 border-2 border-white shadow-sm"
                style={{ background: item.color }}
              />
              <span className="text-xs text-slate-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
