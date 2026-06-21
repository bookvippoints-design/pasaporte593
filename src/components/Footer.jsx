import { Link } from 'react-router-dom'
import { BVP_URL } from '../config'

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <span className="text-brand-orange font-heading font-bold text-xs">P</span>
              </div>
              <span className="font-heading font-bold text-white text-lg">
                Pasaporte<span className="text-brand-orange">593</span>
              </span>
            </div>
            <p className="font-body text-white/70 text-sm leading-relaxed">
              Red de establecimientos participantes en Ecuador. Visita, sella tu pasaporte y acumula puntos para futuros hospedajes.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-3 text-sm uppercase tracking-wider">Plataforma</h4>
            <ul className="space-y-2">
              {[
                { to: '/establecimientos', label: 'Establecimientos' },
                { to: '/como-funciona', label: 'Cómo funciona' },
                { to: '/para-negocios', label: 'Para negocios' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="font-body text-white/70 text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* BookVipPoints */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-3 text-sm uppercase tracking-wider">Tus puntos</h4>
            <p className="font-body text-white/70 text-sm mb-4 leading-relaxed">
              Los puntos se acreditan en tu cuenta BookVipPoints y los usas para ahorrar en hospedajes.
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-body text-white/50 text-xs">
            © {new Date().getFullYear()} Pasaporte593 · Ecuador
          </p>
          <p className="font-body text-white/50 text-xs">
            Sistema de puntos operado por <span className="text-white/70">BookVipPoints</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
