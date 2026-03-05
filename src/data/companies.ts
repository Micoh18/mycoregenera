import { Company } from '@/types';

export const companies: Company[] = [
  {
    id: 'comp-001',
    name: 'Minera Copper Chile S.A.',
    rut: '76.123.456-7',
    industry: 'Minería',
    logoUrl: '/images/companies/copper-chile.png',
    stellarAddress: 'GBZX4HRCNQPE5YKMLGTO3GQJSM7V3GHGAKQEG4BNPMWFXJCEL2OSTAR',
    activeProjects: 2,
    totalBudget: 95000,
  },
  {
    id: 'comp-002',
    name: 'Energía del Norte Ltda.',
    rut: '76.987.654-3',
    industry: 'Energía',
    logoUrl: '/images/companies/energia-norte.png',
    stellarAddress: 'GDQNY3PBOJOKYZSRMK2S7LHHGWZIUISD4QORETLMXEWXBI7KFZZMKTL3',
    activeProjects: 1,
    totalBudget: 45000,
  },
  {
    id: 'comp-003',
    name: 'Industrial Pacífico S.A.',
    rut: '76.555.333-1',
    industry: 'Manufactura',
    logoUrl: '/images/companies/pacifico.png',
    stellarAddress: 'GCKFBEIYV2U22IO2BJ4KVJOIP7XPWQGQFKKWXR6DOSJBV7MVB5DP7CKL',
    activeProjects: 1,
    totalBudget: 28000,
  },
];
