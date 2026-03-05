'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Link from 'next/link';
import type { Zone, ProjectStatus } from '@/types';
import { getStatusLabel, getContaminantLabel } from '@/lib/utils';

interface ChileMapProps {
  zones: Zone[];
  selectedZoneId?: string | null;
}

const statusColors: Record<ProjectStatus, string> = {
  activo: '#22c55e',
  pendiente: '#f59e0b',
  completado: '#3b82f6',
  en_revision: '#d97706',
};

function createCircleIcon(status: ProjectStatus) {
  const color = statusColors[status];
  return L.divIcon({
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -14],
    html: `
      <div style="
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: ${color};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        position: relative;
      ">
        <div style="
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: ${color};
          opacity: 0.3;
          animation: pulse-marker 2s ease-in-out infinite;
        "></div>
      </div>
    `,
  });
}

const statusBadgeColors: Record<ProjectStatus, string> = {
  activo: 'background:#22c55e;color:white;',
  pendiente: 'background:#f59e0b;color:white;',
  completado: 'background:#3b82f6;color:white;',
  en_revision: 'background:#d97706;color:white;',
};

export default function ChileMap({ zones, selectedZoneId }: ChileMapProps) {
  useEffect(() => {
    // Fix default Leaflet marker icon issue in Next.js/webpack
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer
      center={[-35.675, -71.543]}
      zoom={5}
      className="h-full w-full z-0"
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />
      {zones.map((zone) => (
        <Marker
          key={zone.id}
          position={zone.coordinates}
          icon={createCircleIcon(zone.status)}
          opacity={selectedZoneId && selectedZoneId !== zone.id ? 0.5 : 1}
        >
          <Popup>
            <div style={{ padding: '12px', minWidth: '220px', fontFamily: 'Inter, sans-serif' }}>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a' }}>
                {zone.name}
              </h3>
              <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#64748b' }}>
                {zone.region}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <span style={{
                  display: 'inline-block',
                  padding: '2px 10px',
                  borderRadius: '9999px',
                  fontSize: '12px',
                  fontWeight: 600,
                  ...Object.fromEntries(
                    statusBadgeColors[zone.status].split(';').filter(Boolean).map(s => {
                      const [k, v] = s.split(':');
                      return [k.trim(), v.trim()];
                    })
                  ),
                }}>
                  {getStatusLabel(zone.status)}
                </span>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Contaminantes
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {zone.contaminants.map((c) => (
                    <span
                      key={c}
                      style={{
                        display: 'inline-block',
                        padding: '1px 8px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 500,
                        background: '#f1f5f9',
                        color: '#475569',
                      }}
                    >
                      {getContaminantLabel(c)}
                    </span>
                  ))}
                </div>
              </div>

              {zone.areaHectares && (
                <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#64748b' }}>
                  Superficie: <strong>{zone.areaHectares} ha</strong>
                </p>
              )}

              {zone.projectId && (
                <Link
                  href={`/proyecto/${zone.projectId}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: '#16a34a',
                    color: 'white',
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                >
                  Ver Proyecto
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
