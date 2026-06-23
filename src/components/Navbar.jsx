import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BVP_URL, PANEL_URL } from '../config'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Inicio' },
    { to: '/establecimientos', label: 'Paradas Oficiales' },
    { to: '/como-funciona', label: 'Cómo funciona' },
    { to: '/para-negocios', label: 'Para negocios' },
  ]

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-navy flex items-center justify-center">
            <span className="text-brand-orange font-heading font-bold text-xs leading-none">P</span>
          </div>
          <span className="font-heading font-bold text-brand-navy text-lg tracking-tight">
            Pasaporte<span className="text-brand-orange">593</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-body text-sm font-medium transition-colors ${
                pathname === l.to
                  ? 'text-brand-orange'
                  : 'text-gray-600 hover:text-brand-navy'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={BVP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-medium text-brand-navy hover:text-brand-orange transition-colors flex items-center gap-1.5"
          >
            ✈️ Consultar mis puntos
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-600"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`font-body text-sm font-medium py-2 border-b border-gray-50 ${
                pathname === l.to ? 'text-brand-orange' : 'text-gray-700'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={BVP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-sm font-medium text-brand-navy py-2 flex items-center gap-1.5"
          >
            ✈️ Consultar mis puntos
          </a>
        </div>
      )}
    </nav>
  )
}
