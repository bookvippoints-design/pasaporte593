import { Link } from 'react-router-dom'

export default function BusinessCard({ business }) {
  const activePromos = business.promotions?.filter(p => p.active) || []

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
      <div className="relative">
        <img
          src={business.image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80'}
          alt={business.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-brand-orange text-white text-xs font-heading font-semibold px-2.5 py-1 rounded-full shadow-sm">
          📍 Parada oficial
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-heading font-bold text-brand-navy text-base leading-snug mb-1">{business.name}</h3>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-body font-medium text-brand-orange bg-orange-50 px-2 py-0.5 rounded-full">
            {business.categories?.icon} {business.categories?.name}
          </span>
          {business.city && <span className="text-xs font-body text-gray-400 flex items-center gap-1">📌 {business.city}</span>}
        </div>
        <p className="font-body text-gray-500 text-sm leading-relaxed mb-3 flex-1 line-clamp-2">{business.description}</p>

        {activePromos.length > 0 && (
          <div className="mb-3 space-y-1">
            {activePromos.slice(0, 2).map(p => (
              <div key={p.id} className="flex items-center gap-1.5 bg-orange-50 rounded-lg px-2.5 py-1.5">
                <span className="text-sm">{p.type === 'puntos_extra' ? '⭐' : '🏷️'}</span>
                <span className="font-body text-xs text-brand-navy font-medium truncate">{p.title}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 bg-brand-navy/5 rounded-xl px-3 py-2 mb-4">
          <span className="text-lg">🛂</span>
          <div>
            <p className="font-heading font-semibold text-brand-navy text-sm leading-none">Sella tu pasaporte aquí</p>
            <p className="font-body text-gray-400 text-xs mt-0.5">Escanea con BookVipPoints · Puntos al instante</p>
          </div>
        </div>
        <Link to={`/negocio/${business.slug}`} className="block w-full text-center bg-brand-orange text-white font-heading font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-orange-500 transition-colors">
          Ver establecimiento
        </Link>
      </div>
    </div>
  )
}