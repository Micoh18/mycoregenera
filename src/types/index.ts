export type ProjectStatus = 'activo' | 'pendiente' | 'completado' | 'en_revision';
export type MilestoneStatus = 'pendiente' | 'en_progreso' | 'verificando' | 'completado';
export type VerificationType = 'laboratorio' | 'geolocalizacion' | 'comunidad';
export type ContaminantType = 'arsenico' | 'plomo' | 'cobre' | 'mercurio' | 'hidrocarburos';
export type UserRole = 'empresa' | 'proveedor' | 'comunidad';

export interface Zone {
  id: string;
  name: string;
  region: string;
  coordinates: [number, number];
  contaminants: ContaminantType[];
  riskLevel: 'alto' | 'medio' | 'bajo';
  status: ProjectStatus;
  projectId?: string;
  areaHectares?: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  zoneId: string;
  zone: Zone;
  company: Company;
  provider?: Provider;
  status: ProjectStatus;
  contaminants: ContaminantType[];
  fungiSpecies: string[];
  totalBudget: number;
  escrowBalance: number;
  releasedAmount: number;
  milestones: Milestone[];
  startDate: string;
  estimatedEndDate: string;
  stellarEscrowAddress: string;
  transactionHash: string;
  createdAt: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  number: number;
  title: string;
  description: string;
  status: MilestoneStatus;
  amount: number;
  dueDate: string;
  completedDate?: string;
  verifications: Verification[];
  evidence: Evidence[];
  transactionHash?: string;
}

export interface Verification {
  type: VerificationType;
  status: 'pendiente' | 'aprobado' | 'rechazado';
  verifiedBy: string;
  verifiedAt?: string;
  details: string;
  documentHash?: string;
}

export interface Evidence {
  id: string;
  milestoneId: string;
  type: 'foto' | 'documento' | 'resultado_lab';
  title: string;
  description: string;
  imageUrl: string;
  geoLocation?: { lat: number; lng: number };
  timestamp: string;
  blockchainHash: string;
}

export interface Company {
  id: string;
  name: string;
  rut: string;
  industry: string;
  logoUrl: string;
  stellarAddress: string;
  activeProjects: number;
  totalBudget: number;
}

export interface Provider {
  id: string;
  name: string;
  type: 'universidad' | 'cooperativa' | 'laboratorio' | 'consultora';
  specialization: string[];
  region: string;
  logoUrl: string;
  stellarAddress: string;
  rating: number;
  completedProjects: number;
}

export interface Transaction {
  id: string;
  hash: string;
  type: 'escrow_deposit' | 'milestone_release' | 'evidence_register';
  amount?: number;
  from: string;
  to: string;
  timestamp: string;
  status: 'confirmada' | 'pendiente';
  milestoneId?: string;
  memo?: string;
}
