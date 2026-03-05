export default function WhyStellar() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-slate-900 mb-3">
            Por qué Stellar y no otra blockchain
          </h2>
          <p className="text-slate-500">
            El problema central es confianza entre partes que no confían entre sí. Una base de datos
            la controla alguien. Con Stellar, la confianza está en el código.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left column: cost + speed */}
          <div className="space-y-6">
            <div className="p-5 rounded-lg border border-slate-200">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-semibold text-slate-900">Costo por transacción</h3>
                <span className="font-mono text-sm text-myco-600 font-medium">$0.00001</span>
              </div>
              <p className="text-sm text-slate-500">
                Con 1 USD se registran miles de hitos y verificaciones.
                En Ethereum, una sola transacción puede costar $2-50. El presupuesto
                de remediación debe ir a remediar, no a pagar gas.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-semibold text-slate-900">Tiempo de confirmación</h3>
                <span className="font-mono text-sm text-myco-600 font-medium">3-5 segundos</span>
              </div>
              <p className="text-sm text-slate-500">
                Cuando se verifica un hito, el proveedor recibe su pago en segundos.
                Para el terapeuta o técnico de campo, la experiencia es idéntica a usar una web normal.
              </p>
            </div>
          </div>

          {/* Right column: soroban + USDC */}
          <div className="space-y-6">
            <div className="p-5 rounded-lg border border-slate-200">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-semibold text-slate-900">Escrow programático con Soroban</h3>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Smart Contract</span>
              </div>
              <p className="text-sm text-slate-500">
                Nadie puede liberar fondos sin que la triple verificación se cumpla.
                Ni la plataforma, ni la empresa, ni el proveedor. El contrato sigue reglas
                que nadie puede saltarse.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-slate-200">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-semibold text-slate-900">Pagos cross-border en USDC</h3>
                <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">Stablecoin</span>
              </div>
              <p className="text-sm text-slate-500">
                Muchas mineras operan desde Canadá, Australia o China. Stellar permite
                pagos internacionales instantáneos sin intermediarios bancarios ni demoras
                de semanas en transferencias.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
