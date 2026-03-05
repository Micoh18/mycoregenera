import Image from 'next/image';
import { fungiImages } from '@/lib/images';

const species = [
  {
    name: 'Pleurotus ostreatus',
    common: 'Hongo ostra',
    ability: 'Degrada hidrocarburos, absorbe plomo y cadmio',
    image: fungiImages.pleurotus,
  },
  {
    name: 'Trametes versicolor',
    common: 'Cola de pavo',
    ability: 'Descompone compuestos tóxicos orgánicos y PCBs',
    image: fungiImages.trametes,
  },
  {
    name: 'Aspergillus niger',
    common: 'Moho negro',
    ability: 'Biosorción de plomo, cobre y cadmio en suelos mineros',
    image: fungiImages.aspergillusNiger,
  },
];

export default function WhyFungi() {
  return (
    <section className="py-20 bg-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: context */}
          <div className="lg:col-span-2">
            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
              Por qué hongos
            </h2>
            <p className="text-slate-500 mb-6">
              La micorremediación usa hongos para degradar o absorber contaminantes del suelo.
              Es ciencia probada con investigación activa en la UFRO y la USACH.
            </p>
            <div className="space-y-3 mb-8">
              {[
                ['3-10x más barato', 'que la remediación química convencional'],
                ['No invasivo', 'sin excavar ni transportar toneladas de tierra'],
                ['Regenerativo', 'los hongos mejoran la estructura del suelo, no solo limpian'],
                ['Local', 'se cultivan en la zona, generando empleo directo'],
              ].map(([label, detail]) => (
                <div key={label} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-myco-600 mt-2 flex-shrink-0" />
                  <p className="text-sm text-slate-600">
                    <span className="font-medium text-slate-900">{label}</span> — {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: species with photos */}
          <div className="lg:col-span-3 space-y-4">
            {species.map((s) => (
              <div key={s.name} className="flex gap-4 bg-white rounded-lg border border-slate-200 overflow-hidden">
                <div className="relative w-28 h-28 flex-shrink-0">
                  <Image
                    src={s.image}
                    alt={s.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                  />
                </div>
                <div className="py-3 pr-4">
                  <h3 className="text-sm font-medium text-slate-900 italic">{s.name}</h3>
                  <p className="text-xs text-myco-600 font-medium mb-1.5">{s.common}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.ability}</p>
                </div>
              </div>
            ))}
            <p className="text-xs text-slate-400 mt-3">
              Fuentes: Lab. Micología Aplicada UFRO, Departamento de Ingeniería Química USACH.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
