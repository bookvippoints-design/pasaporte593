import Footer from '../components/Footer'
import { WA_URL, REGISTRO_URL, PANEL_URL } from '../config'

const BENEFITS = [
  { icon: '📋', title: 'Perfil en la red', desc: 'Tu establecimiento aparece en el directorio de Pasaporte593 con imagen, descripción y categoría.' },
  { icon: '📲', title: 'Código QR mensual', desc: 'Recibes un código QR mensual para que tus clientes registren su visita y acumulen puntos.' },
  { icon: '🎯', title: 'Campañas de recompensas', desc: 'Participa en campañas especiales que incentivan visitas y generan tráfico al local.' },
  { icon: '🧠', title: 'Mayor recordación', desc: 'El sistema de sellos genera que los clientes recuerden tu establecimiento mes a mes.' },
  { icon: '🔄', title: 'Recurrencia', desc: 'Una razón adicional para que el cliente vuelva cada mes a buscar su sello.' },
  { icon: '✈️', title: 'Ecosistema BookVipPoints', desc: 'Vinculación directa con la plataforma de puntos y hospedajes BookVipPoints.' },
]

export default function ForBusinesses() {
  return (
    <div>
      {/* Header */}
      <section className="bg-brand-navy py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest">Para establecimientos</span>
          <h1 className="font-heading font-extrabold text-white text-4xl md:text-5xl mt-2 mb-4 leading-tight">
            Conviértete en una parada oficial de Pasaporte593
          </h1>
          <p className="font-body text-white/70 text-base max-w-xl mx-auto leading-relaxed">
            Forma parte de la red de establecimientos donde los clientes pueden sellar su pasaporte, acumular puntos y acercarse a su próximo hospedaje.
          </p>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-20 bg-warm-bg">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-extrabold text-brand-navy text-3xl">
              Beneficios para tu establecimiento
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{b.icon}</div>
                <h3 className="font-heading font-bold text-brand-navy text-base mb-2">{b.title}</h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <span className="font-body text-brand-orange font-semibold text-sm uppercase tracking-widest">Plan Fundador</span>
          <div className="flex items-end justify-center gap-1 mt-4 mb-2">
            <span className="font-heading font-extrabold text-brand-navy text-6xl">$50</span>
            <span className="font-body text-gray-400 text-xl mb-3">/ año</span>
          </div>
          <p className="font-body text-gray-600 text-base leading-relaxed max-w-md mx-auto mb-10">
            Por solo $50 al año, tu establecimiento puede formar parte de Pasaporte593 y ofrecer a sus clientes una recompensa diferente: puntos para futuros hospedajes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={PANEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto font-heading font-bold text-base bg-brand-navy text-white px-8 py-4 rounded-2xl hover:bg-brand-navy/90 transition-colors shadow-sm"
            >
              Panel de Negocios
            </a>
            <a
              href="https://panel-bvpoints.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto font-heading font-bold text-base bg-brand-emerald text-white px-8 py-4 rounded-2xl hover:bg-emerald-600 transition-colors shadow-sm"
            >
              Pasaporte Nuevo
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto font-heading font-semibold text-base bg-white text-brand-navy border-2 border-brand-navy px-8 py-4 rounded-2xl hover:bg-gray-50 transition-colors"
            >
              💬 Quiero afiliar mi establecimiento
            </a>
          </div>
        </div>
      </section>

      {/* How it works for businesses */}
      <section className="py-16 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-heading font-extrabold text-brand-navy text-2xl md:text-3xl text-center mb-10">
            ¿Cómo funciona para mi establecimiento?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '✍️', step: '01', title: 'Te afilias', desc: 'Completas el proceso de afiliación y tu establecimiento queda registrado en la red.' },
              { icon: '📲', step: '02', title: 'Recibes tu QR', desc: 'Cada mes recibes un código QR renovado para colocar en tu local.' },
              { icon: '👥', step: '03', title: 'Clientes regresan', desc: 'Los clientes escanean el QR para sellar su pasaporte y acumular puntos. Esto los motiva a volver.' },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                <div className="text-4xl mb-3">{s.icon}</div>
                <span className="font-heading font-bold text-brand-orange text-xs">{s.step}</span>
                <h3 className="font-heading font-bold text-brand-navy text-base mt-1 mb-2">{s.title}</h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
