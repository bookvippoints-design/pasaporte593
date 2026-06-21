import { Link } from 'react-router-dom'

export default function BusinessCard({ business }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
      {/* Image */}
      <div className="relative">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-48 object-cover"
        />
        {/* Stamp badge */}
        <div className="absolute top-3 right-3 bg-brand-orange text-white text-xs font-heading font-semibold px-2.5 py-1 rounded-full shadow-sm">
          📍 Parada oficial
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-heading font-bold text-brand-navy text-base leading-snug">
            {business.name}
          </h3>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-body font-medium text-brand-orange bg-orange-50 px-2 py-0.5 rounded-full">
            {business.category}
          </span>
          <span className="text-xs font-body text-gray-400 flex items-center gap-1">
            📌 {business.city}
          </span>
        </div>

        <p className="font-body text-gray-500 text-sm leading-relaxed mb-4 flex-1">
          {business.description}
        </p>

        {/* Stamp CTA */}
        <div className="flex items-center gap-2 bg-brand-navy/5 rounded-xl px-3 py-2 mb-4">
          <span className="text-lg">🛂</span>
          <div>
            <p className="font-heading font-semibold text-brand-navy text-sm leading-none">Sella tu pasaporte aquí</p>
            <p className="font-body text-gray-400 text-xs mt-0.5">Escanea con BookVipPoints · Puntos al instante</p>
          </div>
        </div>

        <Link
          to={`/negocio/${business.slug}`}
          className="block w-full text-center bg-brand-orange text-white font-heading font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-orange-500 transition-colors"
        >
          Ver establecimiento
        </Link>
      </div>
    </div>
  )
}
