import { Link } from 'react-router-dom'
import BusinessCard from '../components/BusinessCard'
import Footer from '../components/Footer'
import businesses from '../data/businesses.json'
import { WA_URL, REGISTRO_URL, BVP_URL } from '../config'

const HOW_STEPS = [
  {
    icon: '🗺️',
    number: '01',
    title: 'Descubre',
    desc: 'Encuentra restaurantes, cafeterías, comercios y servicios participantes cerca de ti.',
  },
  {
    icon: '🚶',
    number: '02',
    title: 'Visita',
    desc: 'Acércate al establecimiento participante y disfruta de sus productos o servicios.',
  },
  {
    icon: '📲',
    number: '03',
    title: 'Sella tu pasaporte',
    desc: 'Abre BookVipPoints, escanea el QR del local y listo. Los puntos se acreditan al instante, sin trámites.',
  },
  {
    icon: '⭐',
    number: '04',
    title: 'Acumula puntos',
    desc: 'Los puntos se acreditan automáticamente en tu cuenta BookVipPoints.',
  },
  {
    icon: '🏨',
    number: '05',
    title: 'Hospédate',
    desc: 'Utiliza tus puntos para ahorrar en futuros hospedajes nacionales e internacionales.',
  },
]

const BUSINESS_BENEFITS = [
  { icon: '📋', text: 'Perfil del negocio dentro de Pasaporte593' },
  { icon: '📍', text: 'Presencia en el directorio de establecimientos participantes' },
  { icon: '📲', text: 'Código QR mensual para registrar visitas de clientes' },
  { icon: '🎯', text: 'Participación en campañas de recompensas' },
  { icon: '🧠', text: 'Mayor recordación de marca' },
  { icon: '🔄', text: 'Una razón adicional para que el cliente vuelva cada mes' },
  { icon: '✈️', text: 'Vinculación con el ecosistema BookVipPoints' },
]

export default function Home() {
  const featured = businesses.filter(b => b.featured)

  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1600&q=80"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-navy/80" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 font-body text-sm px-4 py-1.5 rounded-full mb-6">
            <span>🛂</span>
            <span>Tu pasaporte de recompensas empieza aquí</span>
          </div>

          {/* Title */}
          <h1 className="font-heading font-extrabold text-white text-5xl md:text-7xl mb-4 tracking-tight">
            Pasaporte<span className="text-brand-orange">593</span>
          </h1>

          {/* Tagline */}
          <p className="font-heading font-semibold text-white/90 text-xl md:text-2xl mb-6 max-w-2xl mx-auto leading-snug">
            Descubre establecimientos. Sella tu pasaporte. Acumula puntos y viaja.
          </p>

          {/* Support text */}
          <p className="font-body text-white/70 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Visita establecimientos participantes, escanea el código QR y acumula puntos en tu cuenta BookVipPoints para utilizarlos en hoteles nacionales e internacionales.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/como-funciona"
              className="w-full sm:w-auto font-heading font-bold text-base bg-brand-orange text-white px-8 py-4 rounded-2xl hover:bg-orange-500 transition-colors shadow-lg"
            >
              Cómo funciona
            </Link>
            <Link
              to="/establecimientos"
              className="w-full sm:w-auto font-heading font-semibold text-base bg-white/10 text-white border border-white/20 px-8 py-4 rounded-2xl hover:bg-white/20 transition-colors"
            >
              Ver establecimientos
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { value: 'QR mensual', label: 'por establecimiento' },
              { value: 'Puntos reales', label: 'en BookVipPoints' },
              { value: 'Hoteles', label: 'nacionales e internacionales' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-heading font-bold text-brand-orange text-sm md:text-base">{s.value}</p>
                <p className="font-body text-white/50 text-xs leading-tight mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section id="como-funciona" className="py-20 bg-warm-bg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest">El proceso</span>
            <h2 className="font-heading font-extrabold text-brand-navy text-3xl md:text-4xl mt-2">
              Cómo funciona Pasaporte593
            </h2>
            <p className="font-body text-gray-500 text-base mt-3 max-w-xl mx-auto">
              Visita, escanea y acumula. Cada visita te acerca a tu próximo hospedaje.
            </p>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {HOW_STEPS.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {/* Connector line */}
                {i < HOW_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-brand-orange/20 z-0" />
                )}
                {/* Icon circle */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-3xl mb-3">
                  {step.icon}
                </div>
                <span className="font-heading font-bold text-brand-orange text-xs mb-1">{step.number}</span>
                <h3 className="font-heading font-bold text-brand-navy text-sm mb-1.5">{step.title}</h3>
                <p className="font-body text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/como-funciona"
              className="font-heading font-semibold text-sm text-brand-orange hover:text-orange-600 transition-colors inline-flex items-center gap-1"
            >
              Ver detalles completos →
            </Link>
          </div>
        </div>
      </section>

      {/* ── ESTABLECIMIENTOS PARTICIPANTES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest">Red de paradas</span>
            <h2 className="font-heading font-extrabold text-brand-navy text-3xl md:text-4xl mt-2">
              Establecimientos participantes
            </h2>
            <p className="font-body text-gray-500 text-base mt-3 max-w-xl mx-auto">
              Descubre nuevos lugares mientras acumulas puntos. Cada parada es una oportunidad de sellar tu pasaporte.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(b => (
              <BusinessCard key={b.id} business={b} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/establecimientos"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm bg-brand-navy text-white px-6 py-3 rounded-xl hover:bg-brand-navy/90 transition-colors"
            >
              Ver todos los establecimientos →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOOKVIPPOINTS ── */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-brand-navy rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Text side */}
              <div className="p-10 md:p-12">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 font-body text-xs px-3 py-1.5 rounded-full mb-6">
                  ✈️ Sistema de puntos
                </div>
                <h2 className="font-heading font-extrabold text-white text-2xl md:text-3xl mb-4 leading-tight">
                  Tus puntos se acreditan en BookVipPoints
                </h2>
                <p className="font-body text-white/75 text-sm leading-relaxed mb-6">
                  Pasaporte593 conecta los establecimientos participantes con BookVipPoints. Cada vez que sellas tu pasaporte mediante un código QR válido, los puntos se acreditan en tu cuenta para utilizarlos como parte de pago en hoteles nacionales e internacionales.
                </p>
                <div className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 mb-8">
                  <p className="font-body text-white/90 text-sm">
                    💡 <strong>Importante:</strong> Los puntos funcionan como parte de pago parcial de noches de hotel.
                  </p>
                </div>
                <a
                  href={BVP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-orange text-white font-heading font-bold text-sm px-6 py-3 rounded-xl hover:bg-orange-500 transition-colors"
                >
                  ✈️ Ir a BookVipPoints
                </a>
              </div>

              {/* Visual side */}
              <div className="bg-white/5 flex items-center justify-center p-10 md:p-12">
                <div className="text-center">
                  <div className="text-7xl mb-4">🏨</div>
                  <div className="flex items-center gap-3 justify-center mb-4">
                    <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
                      <p className="text-brand-orange font-heading font-bold text-xl">QR</p>
                      <p className="text-white/60 font-body text-xs">escaneo</p>
                    </div>
                    <span className="text-white/40 text-xl">→</span>
                    <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
                      <p className="text-brand-orange font-heading font-bold text-xl">★</p>
                      <p className="text-white/60 font-body text-xs">puntos</p>
                    </div>
                    <span className="text-white/40 text-xl">→</span>
                    <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
                      <p className="text-brand-orange font-heading font-bold text-xl">🏨</p>
                      <p className="text-white/60 font-body text-xs">hospedaje</p>
                    </div>
                  </div>
                  <p className="font-body text-white/50 text-xs max-w-[200px] mx-auto leading-relaxed">
                    Tus consumos pueden acercarte a nuevas experiencias de hospedaje.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARA NEGOCIOS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <span className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest">Para establecimientos</span>
              <h2 className="font-heading font-extrabold text-brand-navy text-3xl md:text-4xl mt-2 mb-4 leading-tight">
                Conviértete en una parada oficial de Pasaporte593
              </h2>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-6">
                Forma parte de la red de establecimientos donde los clientes pueden sellar su pasaporte, acumular puntos y acercarse a su próximo hospedaje.
              </p>
              <ul className="space-y-3 mb-8">
                {BUSINESS_BENEFITS.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-lg leading-none mt-0.5">{b.icon}</span>
                    <span className="font-body text-gray-600 text-sm leading-relaxed">{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — pricing card */}
            <div className="bg-warm-bg rounded-3xl p-8 border border-gray-100 shadow-sm">
              <div className="text-center mb-6">
                <span className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest">Plan Fundador</span>
                <div className="flex items-end justify-center gap-1 mt-3 mb-1">
                  <span className="font-heading font-extrabold text-brand-navy text-5xl">$50</span>
                  <span className="font-body text-gray-400 text-base mb-2">/ año</span>
                </div>
                <p className="font-body text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">
                  Por solo $50 al año, tu establecimiento puede formar parte de Pasaporte593 y ofrecer a sus clientes una recompensa diferente: puntos para futuros hospedajes.
                </p>
              </div>

              <div className="space-y-2.5 mb-8">
                {BUSINESS_BENEFITS.slice(0, 4).map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-brand-emerald/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-brand-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-body text-gray-600 text-sm">{b.text}</span>
                  </div>
                ))}
              </div>

              <a
                href={REGISTRO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-brand-orange text-white font-heading font-bold text-base px-6 py-4 rounded-2xl hover:bg-orange-500 transition-colors shadow-sm"
              >
                Quiero afiliar mi establecimiento
              </a>
              <p className="text-center font-body text-gray-400 text-xs mt-3">
                También puedes escribirnos por{' '}
                <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="text-brand-emerald hover:underline">
                  WhatsApp
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="py-16 bg-brand-orange">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="font-heading font-extrabold text-white text-3xl md:text-4xl mb-4">
            Una red de establecimientos que recompensa tus visitas.
          </h2>
          <p className="font-body text-white/85 text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Descubre nuevos lugares mientras acumulas puntos. Cada visita te acerca a tu próximo hospedaje.
          </p>
          <Link
            to="/establecimientos"
            className="inline-flex items-center gap-2 bg-white text-brand-orange font-heading font-bold text-base px-8 py-4 rounded-2xl hover:bg-orange-50 transition-colors shadow-lg"
          >
            🛂 Explorar establecimientos
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
