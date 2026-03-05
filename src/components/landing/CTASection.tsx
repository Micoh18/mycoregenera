import Image from 'next/image';
import Button from '@/components/ui/Button';
import { landscapeImages } from '@/lib/images';

export default function CTASection() {
  return (
    <section className="relative py-16 overflow-hidden">
      <Image
        src={landscapeImages.chile}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-red-900/80" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h2 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-white mb-1">
            Explora los proyectos activos en Chile
          </h2>
          <p className="text-red-200 text-sm">
            1.300+ sitios contaminados. La remediación con hongos puede empezar ahora.
          </p>
        </div>
        <Button href="/mapa" size="lg" className="bg-white text-red-700 hover:bg-red-50 flex-shrink-0">
          Ver mapa de remediación
        </Button>
      </div>
    </section>
  );
}
