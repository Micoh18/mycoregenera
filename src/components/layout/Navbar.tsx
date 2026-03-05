'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Building2, Users, FlaskConical, ChevronDown } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/mapa', label: 'Mapa' },
];

const roleLinks = [
  { href: '/empresa', label: 'Empresa', icon: Building2 },
  { href: '/proveedor', label: 'Proveedor', icon: FlaskConical },
  { href: '/comunidad', label: 'Comunidad', icon: Users },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <Logo size="md" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Role dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleOpen(!roleOpen)}
                className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Entrar como
                <ChevronDown size={14} className={`transition-transform ${roleOpen ? 'rotate-180' : ''}`} />
              </button>
              {roleOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border border-slate-200 shadow-lg py-1">
                  {roleLinks.map((role) => (
                    <Link
                      key={role.href}
                      href={role.href}
                      onClick={() => setRoleOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      <role.icon size={16} />
                      {role.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-slate-600 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2 text-sm font-medium text-slate-600"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <p className="text-xs text-slate-400 mb-2">Entrar como:</p>
              {roleLinks.map((role) => (
                <Link
                  key={role.href}
                  href={role.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 py-2 text-sm text-slate-600"
                >
                  <role.icon size={16} />
                  {role.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
