import { Provider } from '@/types';

export const providers: Provider[] = [
  {
    id: 'prov-001',
    name: 'Universidad de la Frontera (UFRO)',
    type: 'universidad',
    specialization: ['Pleurotus ostreatus', 'Trametes versicolor', 'Metales pesados'],
    region: 'Araucanía',
    logoUrl: '/images/providers/ufro.png',
    stellarAddress: 'GCQR4YLTGRCXYZ2DJYMMPMHGR7K3RBTLDSRBIGW2IDHJ3GKMXOASTER',
    rating: 4.9,
    completedProjects: 8,
  },
  {
    id: 'prov-002',
    name: 'Cooperativa MicoSur',
    type: 'cooperativa',
    specialization: ['Aspergillus niger', 'Hidrocarburos', 'Suelos agrícolas'],
    region: 'Biobío',
    logoUrl: '/images/providers/micosur.png',
    stellarAddress: 'GBTCBCWLE6YVTR5Y5RRZLGM764T7NWPFCYH5NQ47GKRY7CVMF2DLSTAR',
    rating: 4.7,
    completedProjects: 5,
  },
  {
    id: 'prov-003',
    name: 'Lab Ambiental USACH',
    type: 'laboratorio',
    specialization: ['Análisis de suelos', 'Verificación de remediación', 'Metales pesados'],
    region: 'Metropolitana',
    logoUrl: '/images/providers/usach.png',
    stellarAddress: 'GDLPMFRKQN2Z3JVT5IAYML7XBXCQHKV2TOJ5YAXR2DPGJ6GVTFASTAR',
    rating: 4.8,
    completedProjects: 12,
  },
];
