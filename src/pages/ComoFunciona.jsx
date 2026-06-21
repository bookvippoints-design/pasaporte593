import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

const STEPS = [
  {
    icon: '🗺️',
    title: 'Descubre',
    desc: 'Encuentra restaurantes, cafeterías, comercios y servicios participantes cerca de ti. Cada establecimiento es una parada oficial de Pasaporte593.',
    detail: 'Usa el directorio en línea para explorar las paradas disponibles en tu ciudad.',
  },
  {
    icon: '🚶',
    title: 'Visita',
    desc: 'Acércate al establecimiento participante y disfruta de sus productos o servicios.',
    detail: 'No necesitas hacer nada especial para acceder. Simplemente visita el lugar y disfruta.',
  },
  {
    icon: '📲',
    title: 'Sella tu pasaporte',
    desc: 'Abre BookVipPoints, escanea el QR del local y listo. Los puntos se acreditan al instante, sin trámites.',
    detail: 'Cada establecimiento tiene un código QR mensual. Lo escaneas desde la app BookVipPoints y los puntos se acreditan inmediatamente — sin trámites, sin intervención del personal del local.',
  },
  {
    icon: '⭐',
    title: 'Acumula puntos',
    desc: 'Los puntos se acreditan automáticamente en tu cuenta BookVipPoints.',
    detail: 'Tu cuenta BookVipPoints es donde se concentran todos los puntos que acumulas en la red Pasaporte593.',
  },
  {
    icon: '🏨',
    title: 'Hospédate',
    desc: 'Utiliza tus puntos para ahorrar en futuros hospedajes nacionales e internacionales.',
    detail: 'Los puntos funcionan como parte de pago parcial de noches de hotel. Cada visita te acerca a tu próximo hospedaje.',
  },
]

export default function ComoFunciona() {
  return (
    <div>
      {/* Header */}
      <section className="bg-brand-navy py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest">El proceso</span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl mt-2 mb-4">
            Cómo funciona Pasaporte593
          </h1>
          <p className="font-body text-white/70 text-base max-w-xl mx-auto leading-relaxed">
            Visita, escanea y acumula. Es así de simple. Cada parada te acerca a tu próximo hospedaje.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-3xl mx-auto px-4">
          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <div key={i} className="flex gap-6">
                {/* Left: number + line */}
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-2xl flex-shrink-0">
                    {step.icon}
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-px flex-1 bg-brand-orange/20 mt-3" />
                  )}
                </div>
                {/* Right: content */}
                <div className="pb-10 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-heading font-bold text-brand-orange text-xs">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h2 className="font-heading font-extrabold text-brand-navy text-xl">
                      {step.title}
                    </h2>
                  </div>
                  <p className="font-body text-gray-700 text-base leading-relaxed mb-2">
                    {step.desc}
                  </p>
                  <p className="font-body text-gray-400 text-sm leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Clarification */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-heading font-extrabold text-brand-navy text-2xl md:text-3xl mb-8 text-center">
            Preguntas frecuentes
          </h2>
          <div className="space-y-5">
            {[
              {
                q: '¿Los puntos son transferibles?',
                a: 'Los puntos se acreditan en tu cuenta personal BookVipPoints. Consulta las condiciones específicas en la plataforma BookVipPoints.',
              },
              {
                q: '¿Puedo sellar mi pasaporte más de una vez en el mismo establecimiento?',
                a: 'Sí, puedes obtener más puntos en establecimientos premium que recompensan el 100% de tu compra con puntos.',
              },
              {
                q: '¿Los puntos se pueden usar para pagar hoteles al 100%?',
                a: 'Los puntos funcionan como parte de pago parcial de noches de hotel, no como pago total. Siempre representan un ahorro en tu reserva.',
              },
              {
                q: '¿Necesito una app para escanear el QR?',
                a: 'Puedes escanear el código QR con la cámara de tu teléfono. No se requiere descargar ninguna app adicional.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-warm-bg rounded-2xl p-5 border border-gray-100">
                <h3 className="font-heading font-bold text-brand-navy text-base mb-2">{faq.q}</h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brand-navy">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-heading font-extrabold text-white text-2xl md:text-3xl mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="font-body text-white/70 text-base mb-8">
            Explora los establecimientos participantes y sella tu primera parada.
          </p>
          <Link
            to="/establecimientos"
            className="inline-flex items-center gap-2 bg-brand-orange text-white font-heading font-bold text-base px-8 py-4 rounded-2xl hover:bg-orange-500 transition-colors"
          >
            🛂 Explorar establecimientos
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
