import Image from 'next/image';
import Button from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { fungiImages } from '@/lib/images';

export default function HeroSection() {
  return (
    <section className="relative bg-red-950 overflow-hidden">
      {/* Background image with overlay */}
      <Image
        src={fungiImages.mycelium}
        alt=""
        fill
        className="object-cover opacity-40"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-red-950 via-red-950/60 to-red-950/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-red-400 tracking-wide uppercase mb-4">
            Build on Stellar Chile 2026
          </p>
          <h1 className="font-[family-name:var(--font-heading)] text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-6">
            Los suelos contaminados de Chile necesitan remediación verificable. Los hongos pueden hacerlo.
          </h1>
          <p className="text-lg text-red-200 leading-relaxed mb-8 max-w-2xl">
            MycoRegen conecta a las empresas obligadas a remediar con proveedores de micorremediación,
            usando Stellar como capa de confianza. Las comunidades ven el progreso en tiempo real.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/mapa" size="lg">
              Ver mapa de remediación
            </Button>
            <Button href="#como-funciona" variant="ghost" size="lg" className="text-red-200 hover:text-white hover:bg-white/5">
              Cómo funciona
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        {/* Data strip */}
        <div className="mt-16 pt-8 border-t border-red-800 flex flex-wrap gap-x-12 gap-y-4">
          <div>
            <span className="text-2xl font-semibold text-white">1.300+</span>
            <p className="text-sm text-red-300">sitios contaminados en Chile</p>
          </div>
          <div>
            <span className="text-2xl font-semibold text-white">45.000 USDC</span>
            <p className="text-sm text-red-300">en escrow en Stellar</p>
          </div>
          <div>
            <span className="text-2xl font-semibold text-white">3</span>
            <p className="text-sm text-red-300">proyectos activos</p>
          </div>
        </div>
      </div>
    </section>
  );
}
