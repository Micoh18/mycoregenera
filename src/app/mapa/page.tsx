'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import MapSidebar from '@/components/map/MapSidebar';
import { zones } from '@/data/zones';
import { Map, PanelLeftClose, PanelLeft } from 'lucide-react';

const ChileMap = dynamic(() => import('@/components/map/ChileMap'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-myco-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-500">Cargando mapa...</p>
      </div>
    </div>
  ),
});

export default function MapaPage() {
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleZoneClick = (zoneId: string) => {
    setSelectedZoneId((prev) => (prev === zoneId ? null : zoneId));
  };

  return (
    <div className="h-[calc(100vh-64px)] flex relative">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-80 shrink-0 border-r border-slate-200 flex-col h-full">
        <MapSidebar
          zones={zones}
          selectedZoneId={selectedZoneId}
          onZoneClick={handleZoneClick}
        />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Sidebar panel */}
          <aside className="relative z-50 w-80 max-w-[85vw] h-full shadow-xl">
            <MapSidebar
              zones={zones}
              selectedZoneId={selectedZoneId}
              onZoneClick={(zoneId) => {
                handleZoneClick(zoneId);
                setSidebarOpen(false);
              }}
            />
          </aside>
        </div>
      )}

      {/* Map */}
      <div className="flex-1 relative h-full">
        <ChileMap zones={zones} selectedZoneId={selectedZoneId} />

        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden absolute top-4 left-4 z-30 bg-white shadow-lg rounded-lg p-2.5 border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
          aria-label={sidebarOpen ? 'Cerrar panel' : 'Abrir panel de zonas'}
        >
          {sidebarOpen ? (
            <PanelLeftClose size={20} className="text-slate-700" />
          ) : (
            <PanelLeft size={20} className="text-slate-700" />
          )}
        </button>

        {/* Map header badge */}
        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm border border-slate-200 px-3 py-2 flex items-center gap-2">
          <Map size={16} className="text-myco-600" />
          <span className="text-sm font-semibold text-slate-700">
            {zones.length} zonas monitoreadas
          </span>
        </div>
      </div>
    </div>
  );
}
