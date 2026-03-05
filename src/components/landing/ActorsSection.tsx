import Image from 'next/image';
import Button from '@/components/ui/Button';
import { actorImages } from '@/lib/images';

const actors = [
  {
    title: 'Para empresas',
    description: 'Dashboard con proyectos activos, presupuesto en escrow y prueba de cumplimiento ante la SMA.',
    href: '/empresa',
    tag: 'El que paga',
    image: actorImages.industrial,
  },
  {
    title: 'Para proveedores',
    description: 'Marketplace de proyectos disponibles, postulación directa y pagos automáticos por hito verificado.',
    href: '/proveedor',
    tag: 'El que ejecuta',
    image: actorImages.cultivating,
  },
  {
    title: 'Para comunidades',
    description: 'Mapa de tu zona con el avance de la remediación, evidencia visible y botón de validación.',
    href: '/comunidad',
    tag: 'El que vigila',
    image: actorImages.community,
  },
];

export default function ActorsSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
            Tres vistas, tres roles
          </h2>
          <p className="text-slate-500">
            Cada participante tiene una experiencia diseñada para lo que necesita hacer.
            No se requiere saber de blockchain para usar la plataforma.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {actors.map((actor) => (
            <div key={actor.title} className="bg-white rounded-lg border border-slate-200 border-t-2 border-t-red-500 overflow-hidden flex flex-col">
              <div className="relative w-full h-40">
                <Image
                  src={actor.image}
                  alt={actor.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-medium text-red-600 uppercase tracking-wider mb-3">
                  {actor.tag}
                </span>
                <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-slate-900 mb-2">
                  {actor.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">
                  {actor.description}
                </p>
                <Button href={actor.href} variant="outline" size="sm" className="w-fit">
                  Ver demo
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
