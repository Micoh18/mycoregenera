import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="text-brand-200" style={{ backgroundColor: '#3b0d0d' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <Logo size="md" variant="light" />
            </div>
            <p className="text-sm text-brand-300 max-w-md mb-4">
              Plataforma de remediación ambiental con hongos, verificada y transparente sobre la blockchain Stellar.
              Conectamos empresas, proveedores y comunidades para regenerar los suelos de Chile.
            </p>
            <div className="inline-flex items-center gap-1.5 border rounded-full px-3 py-1.5" style={{ backgroundColor: '#601414', borderColor: '#7f1d1d' }}>
              <ShieldCheck size={14} className="text-stellar-400" />
              <span className="text-xs font-medium text-stellar-400">Construido sobre Stellar</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Plataforma</h4>
            <ul className="space-y-2">
              <li><Link href="/mapa" className="text-sm text-brand-300 hover:text-white transition-colors">Mapa de Remediación</Link></li>
              <li><Link href="/empresa" className="text-sm text-brand-300 hover:text-white transition-colors">Para Empresas</Link></li>
              <li><Link href="/proveedor" className="text-sm text-brand-300 hover:text-white transition-colors">Para Proveedores</Link></li>
              <li><Link href="/comunidad" className="text-sm text-brand-300 hover:text-white transition-colors">Para Comunidades</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-3">Recursos</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-brand-300">Documentación</span></li>
              <li><span className="text-sm text-brand-300">API Stellar</span></li>
              <li><span className="text-sm text-brand-300">Soroban Smart Contracts</span></li>
              <li><span className="text-sm text-brand-300">Contacto</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid #7f1d1d' }}>
          <p className="text-xs text-brand-400">
            © 2026 MycoRegen. Proyecto para Build on Stellar Chile Ideatón.
          </p>
          <p className="text-xs text-brand-400">
            #BuildOnStellarChile
          </p>
        </div>
      </div>
    </footer>
  );
}
