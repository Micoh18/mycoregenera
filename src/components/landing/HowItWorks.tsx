import Image from 'next/image';
import { remediationImages } from '@/lib/images';

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
            Cómo funciona
          </h2>
          <p className="text-slate-500">
            El dinero de remediación ya existe — las empresas están obligadas por ley a remediar.
            MycoRegen hace que ese proceso sea transparente y verificable.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: process steps */}
          <ol className="space-y-8">
            {[
              {
                step: '01',
                title: 'La empresa deposita en escrow',
                detail: 'El presupuesto de remediación entra a un smart contract en Soroban. Ni la empresa ni la plataforma pueden retirarlo unilateralmente.',
              },
              {
                step: '02',
                title: 'El proveedor ejecuta con hongos',
                detail: 'Universidades o cooperativas especializadas en micorremediación trabajan el sitio contaminado, dividido en hitos verificables.',
              },
              {
                step: '03',
                title: 'Triple verificación por hito',
                detail: 'Laboratorio certificado + fotos geolocalizadas + validación de la comunidad. Las tres fuentes deben coincidir.',
              },
              {
                step: '04',
                title: 'El contrato libera el pago',
                detail: 'Solo cuando la verificación se completa, Soroban libera automáticamente los fondos al proveedor. Todo queda registrado en Stellar.',
              },
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-100 text-slate-900 font-mono text-sm font-semibold flex items-center justify-center">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          {/* Right: before/after + escrow diagram */}
          <div className="space-y-6">
            {/* Before / After */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="relative w-full h-36 rounded-lg overflow-hidden">
                  <Image
                    src={remediationImages.contaminatedSoil}
                    alt="Suelo contaminado antes de remediación"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <p className="text-xs font-medium text-slate-500 text-center">Antes</p>
              </div>
              <div className="space-y-2">
                <div className="relative w-full h-36 rounded-lg overflow-hidden">
                  <Image
                    src={remediationImages.descontaminatedSoil}
                    alt="Suelo después de micorremediación"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <p className="text-xs font-medium text-slate-500 text-center">Después</p>
              </div>
            </div>

            {/* Escrow diagram */}
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-6">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-4">Flujo de fondos en Stellar</p>
              <div className="space-y-3">
                {/* Deposit */}
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />
                  <div className="flex-1 text-sm">
                    <span className="font-medium text-slate-900">Empresa</span>
                    <span className="text-slate-400 mx-2">&rarr;</span>
                    <span className="font-medium text-slate-900">Escrow Soroban</span>
                  </div>
                  <span className="text-sm font-mono text-slate-500">45.000 USDC</span>
                </div>
                {/* Milestone 1 release */}
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-myco-500 flex-shrink-0" />
                  <div className="flex-1 text-sm">
                    <span className="font-medium text-slate-900">Escrow</span>
                    <span className="text-slate-400 mx-2">&rarr;</span>
                    <span className="font-medium text-slate-900">Proveedor (Hito 1)</span>
                  </div>
                  <span className="text-sm font-mono text-slate-500">5.000 USDC</span>
                </div>
                {/* Milestone 2 release */}
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                  <div className="w-2 h-2 rounded-full bg-myco-500 flex-shrink-0" />
                  <div className="flex-1 text-sm">
                    <span className="font-medium text-slate-900">Escrow</span>
                    <span className="text-slate-400 mx-2">&rarr;</span>
                    <span className="font-medium text-slate-900">Proveedor (Hito 2)</span>
                  </div>
                  <span className="text-sm font-mono text-slate-500">10.000 USDC</span>
                </div>
                {/* Remaining */}
                <div className="flex items-center gap-3 p-3 bg-stellar-50 rounded-lg border border-stellar-200">
                  <div className="w-2 h-2 rounded-full bg-stellar-500 flex-shrink-0" />
                  <div className="flex-1 text-sm">
                    <span className="font-medium text-slate-900">En escrow</span>
                    <span className="text-slate-400 mx-2">&mdash;</span>
                    <span className="text-slate-500">esperando verificación</span>
                  </div>
                  <span className="text-sm font-mono text-stellar-600 font-medium">30.000 USDC</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 mt-4">
                Datos del proyecto Quintero-001. Verificable en la red Stellar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
