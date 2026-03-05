export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function formatUSDC(amount: number): string {
  return new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    activo: 'bg-myco-500 text-white',
    completado: 'bg-stellar-500 text-white',
    pendiente: 'bg-amber-500 text-white',
    en_revision: 'bg-amber-400 text-slate-900',
    en_progreso: 'bg-myco-400 text-white',
    verificando: 'bg-stellar-400 text-white',
    aprobado: 'bg-myco-500 text-white',
    rechazado: 'bg-danger-500 text-white',
  };
  return colors[status] || 'bg-slate-400 text-white';
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    activo: 'Activo',
    completado: 'Completado',
    pendiente: 'Pendiente',
    en_revision: 'En Revisión',
    en_progreso: 'En Progreso',
    verificando: 'Verificando',
    aprobado: 'Aprobado',
    rechazado: 'Rechazado',
  };
  return labels[status] || status;
}

export function getContaminantLabel(contaminant: string): string {
  const labels: Record<string, string> = {
    arsenico: 'Arsénico',
    plomo: 'Plomo',
    cobre: 'Cobre',
    mercurio: 'Mercurio',
    hidrocarburos: 'Hidrocarburos',
  };
  return labels[contaminant] || contaminant;
}

export function getContaminantColor(contaminant: string): string {
  const colors: Record<string, string> = {
    arsenico: 'bg-danger-500/10 text-danger-600 border-danger-500/20',
    plomo: 'bg-slate-500/10 text-slate-600 border-slate-500/20',
    cobre: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    mercurio: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    hidrocarburos: 'bg-earth-600/10 text-earth-600 border-earth-600/20',
  };
  return colors[contaminant] || 'bg-slate-100 text-slate-600';
}
