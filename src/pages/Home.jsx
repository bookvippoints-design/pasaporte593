import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BusinessCard from '../components/BusinessCard'
import Footer from '../components/Footer'
import { supabase } from '../supabase'
import { WA_URL, BVP_URL } from '../config'

const HOW_STEPS = [
  {
    icon: '🗺️',
    number: '01',
    title: 'Descubre',
    desc: 'Encuentra restaurantes, cafeterías, hoteles y comercios participantes cerca de ti.',
  },
  {
    icon: '🚶',
    number: '02',
    title: 'Visita',
    desc: 'Acércate a la Parada Oficial y disfruta de sus productos o servicios.',
  },
  {
    icon: '📲',
    number: '03',
    title: 'Sella tu pasaporte',
    desc: 'Escanea el QR mensual del local con BookVipPoints. Los puntos se acreditan al instante.',
  },
  {
    icon: '⭐',
    number: '04',
    title: 'Acumula puntos',
    desc: 'Cada sellado suma puntos en tu cuenta BookVipPoints automáticamente.',
  },
  {
    icon: '🏨',
    number: '05',
    title: 'Hospédate',
    desc: 'Usa tus puntos para ahorrar en hospedajes nacionales e internacionales.',
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

const FAQS = [
  {
    q: '¿Qué es Pasaporte593?',
    a: 'Pasaporte593 es una red nacional de establecimientos donde los clientes sellan digitalmente su pasaporte de viaje cada vez que visitan una Parada Oficial. Cada sello genera puntos canjeables en hospedajes a través de BookVipPoints.',
  },
  {
    q: '¿Cómo acumulo puntos?',
    a: 'Al visitar cualquier Parada Oficial, escaneas el código QR mensual del establecimiento con la app BookVipPoints. Los puntos se acreditan automáticamente en tu cuenta sin ningún trámite adicional.',
  },
  {
    q: '¿Para qué sirven los puntos?',
    a: 'Los puntos se acreditan en tu cuenta BookVipPoints y puedes utilizarlos como parte de pago en hoteles nacionales e internacionales afiliados a la red.',
  },
  {
    q: '¿Por qué el QR cambia cada mes?',
    a: 'El código QR se renueva mensualmente para crear una razón adicional de retorno. Cada nuevo mes es una nueva oportunidad de sellar tu pasaporte y seguir acumulando puntos.',
  },
  {
    q: '¿Cómo puede afiliarse mi establecimiento?',
    a: 'Completa el formulario de información en nuestra sección "Para negocios" o escríbenos por WhatsApp. El proceso de afiliación es simple y el plan anual tiene un costo de $50.',
  },
  {
    q: '¿Necesito una app para participar?',
    a: 'Los clientes usan la plataforma BookVipPoints para escanear el QR y acumular puntos. Los establecimientos gestionan su perfil y promociones desde el Panel de Negocios de Pasaporte593.',
  },
]

export default function Home() {
  const [businesses, setBusinesses] = useState([])
  const [loading, setLoading] = useState(true)
  const [openFaq, setOpenFaq] = useState(null)

  useEffect(() => {
    async function fetchBusinesses() {
      const { data } = await supabase
        .from('businesses')
        .select('*, categories(name, icon), promotions(id, title, type, value, valid_until, active)')
        .eq('active', true)
        .order('created_at', { ascending: false })
        .limit(6)
      setBusinesses(data || [])
      setLoading(false)
    }
    fetchBusinesses()
  }, [])

  return (
    <div>
      {/* ── HERO ── */}
      <section className="w-full">
        <img
          src="/hero-pasaporte.png"
          alt="Pasaporte593 — Descubre establecimientos. Sella tu pasaporte. Acumula puntos y viaja."
          className="w-full h-auto block"
        />
      </section>

      {/* ── FRASE ── */}
      <section className="bg-brand-navy py-5">
        <p className="text-center font-heading font-semibold text-white text-lg md:text-xl tracking-wide">
          Cada visita cuenta una historia.{' '}
          <span className="text-brand-orange">Cada sello acerca una experiencia.</span>
        </p>
      </section>

      {/* ── CÓMO FUNCIONA ── */}
      <section id="como-funciona" className="py-20 bg-warm-bg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <span className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest">El proceso</span>
            <h2 className="font-heading font-extrabold text-brand-navy text-3xl md:text-4xl mt-2">
              Así funciona Pasaporte593
            </h2>
            <p className="font-body text-gray-500 text-base mt-3 max-w-xl mx-auto">
              Visita, escanea y acumula. Cada parada te acerca a tu próximo hospedaje.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {HOW_STEPS.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center group">
                {i < HOW_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-brand-orange/20 z-0" />
                )}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-3xl mb-3 group-hover:shadow-md group-hover:border-brand-orange/30 transition-all">
                  {step.icon}
                </div>
                <span className="font-heading font-bold text-brand-orange text-xs mb-1">{step.number}</span>
                <h3 className="font-heading font-bold text-brand-navy text-sm mb-1.5">{step.title}</h3>
                <p className="font-body text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESTABLECIMIENTOS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest">Red de paradas</span>
            <h2 className="font-heading font-extrabold text-brand-navy text-3xl md:text-4xl mt-2">
              Paradas Oficiales
            </h2>
            <p className="font-body text-gray-500 text-base mt-3 max-w-xl mx-auto">
              Descubre nuevos lugares mientras acumulas puntos. Cada parada es una oportunidad de sellar tu pasaporte.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl h-72 animate-pulse" />
              ))}
            </div>
          ) : businesses.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🗺️</div>
              <p className="font-heading font-semibold text-brand-navy text-lg">Próximamente más establecimientos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {businesses.map(b => <BusinessCard key={b.id} business={b} />)}
            </div>
          )}

          <div className="text-center mt-10">
            <Link
              to="/establecimientos"
              className="inline-flex items-center gap-2 font-heading font-semibold text-sm bg-brand-navy text-white px-6 py-3 rounded-xl hover:bg-brand-navy/90 transition-colors"
            >
              Ver todas las Paradas Oficiales →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BOOKVIPPOINTS ── */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-brand-navy rounded-3xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="p-10 md:p-12">
                <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 font-body text-xs px-3 py-1.5 rounded-full mb-6">
                  ✈️ Sistema de puntos
                </div>
                <h2 className="font-heading font-extrabold text-white text-2xl md:text-3xl mb-4 leading-tight">
                  Tus puntos se acreditan en BookVipPoints
                </h2>
                <p className="font-body text-white/75 text-sm leading-relaxed mb-6">
                  Pasaporte593 conecta los establecimientos participantes con BookVipPoints. Cada vez que sellas tu pasaporte, los puntos se acreditan en tu cuenta para utilizarlos como parte de pago en hoteles nacionales e internacionales.
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
              <div className="bg-white/5 flex items-center justify-center p-10 md:p-12">
                <div className="text-center">
                  <div className="text-7xl mb-4">🏨</div>
                  <div className="flex items-center gap-3 justify-center mb-4">
                    {[
                      { value: 'QR', label: 'escaneo' },
                      { value: '★', label: 'puntos' },
                      { value: '🏨', label: 'hospedaje' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="bg-white/10 rounded-xl px-4 py-3 text-center">
                          <p className="text-brand-orange font-heading font-bold text-xl">{item.value}</p>
                          <p className="text-white/60 font-body text-xs">{item.label}</p>
                        </div>
                        {i < 2 && <span className="text-white/40 text-xl">→</span>}
                      </div>
                    ))}
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
            <div>
              <span className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest">Para establecimientos</span>
              <h2 className="font-heading font-extrabold text-brand-navy text-3xl md:text-4xl mt-2 mb-4 leading-tight">
                Conviértete en una Parada Oficial de Pasaporte593
              </h2>
              <p className="font-body text-gray-600 text-base leading-relaxed mb-6">
                Forma parte de la red donde los clientes sellan su pasaporte, acumulan puntos y tienen una razón real para volver cada mes.
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
                href="https://form.jotform.com/261601289777063"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-brand-orange text-white font-heading font-bold text-base px-6 py-4 rounded-2xl hover:bg-orange-500 transition-colors shadow-sm"
              >
                Quiero más información
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

      {/* ── FAQ ── */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest">Preguntas frecuentes</span>
            <h2 className="font-heading font-extrabold text-brand-navy text-3xl md:text-4xl mt-2">
              ¿Tienes dudas?
            </h2>
            <p className="font-body text-gray-500 text-base mt-3">
              Resolvemos las preguntas más comunes sobre Pasaporte593.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className="font-heading font-semibold text-brand-navy text-sm pr-4">{faq.q}</span>
                  <span className={`text-brand-orange text-xl font-light flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="font-body text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="font-body text-gray-500 text-sm mb-4">¿No encontraste tu respuesta?</p>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-emerald text-white font-heading font-semibold text-sm px-6 py-3 rounded-xl hover:bg-emerald-600 transition-colors"
            >
              💬 Escríbenos por WhatsApp
            </a>
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
            🛂 Explorar Paradas Oficiales
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
