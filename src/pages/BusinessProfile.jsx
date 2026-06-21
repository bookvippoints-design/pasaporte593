import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import Footer from '../components/Footer'
import businesses from '../data/businesses.json'
import { WA_URL } from '../config'

export default function BusinessProfile() {
  const { slug } = useParams()
  const business = businesses.find(b => b.slug === slug)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(() => {
    if (!business) return
    setLightboxIndex(i => (i - 1 + business.gallery.length) % business.gallery.length)
  }, [business])
  const nextImage = useCallback(() => {
    if (!business) return
    setLightboxIndex(i => (i + 1) % business.gallery.length)
  }, [business])

  useEffect(() => {
    const handler = (e) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIndex, closeLightbox, prevImage, nextImage])

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-bg">
        <div className="text-center">
          <div className="text-5xl mb-4">🗺️</div>
          <h2 className="font-heading font-bold text-brand-navy text-xl mb-2">Establecimiento no encontrado</h2>
          <Link to="/establecimientos" className="font-body text-brand-orange hover:underline text-sm">
            ← Volver al directorio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Hero image */}
      <div className="relative h-72 md:h-96 bg-brand-navy overflow-hidden">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 max-w-6xl mx-auto">
          <Link
            to="/establecimientos"
            className="inline-flex items-center gap-1 font-body text-white/70 text-sm hover:text-white mb-4 transition-colors"
          >
            ← Directorio
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-body text-xs font-medium text-brand-orange bg-white/10 px-2.5 py-1 rounded-full">
              {business.category}
            </span>
            <span className="font-body text-white/60 text-xs">📌 {business.city}</span>
          </div>
          <h1 className="font-heading font-extrabold text-white text-3xl md:text-4xl">
            {business.name}
          </h1>
        </div>
      </div>

      {/* Content */}
      <section className="py-12 bg-warm-bg">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Stamp badge */}
            <div className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 border border-gray-100 shadow-sm mb-8">
              <span className="text-3xl">🛂</span>
              <div>
                <p className="font-heading font-bold text-brand-navy text-sm">Sella tu pasaporte aquí</p>
                <p className="font-body text-gray-400 text-xs">Abre BookVipPoints, escanea el QR del local y los puntos se acreditan al instante.</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
              <h2 className="font-heading font-bold text-brand-navy text-lg mb-3">Sobre este establecimiento</h2>
              <p className="font-body text-gray-600 text-sm leading-relaxed">{business.description}</p>
            </div>

            {/* Gallery */}
            {business.gallery && business.gallery.length > 0 && (
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h2 className="font-heading font-bold text-brand-navy text-lg mb-4">Galería</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {business.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIndex(i)}
                      className="rounded-xl overflow-hidden aspect-video bg-gray-100 hover:opacity-90 transition-opacity"
                    >
                      <img src={img} alt={`${business.name} ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Points card */}
            <div className="bg-brand-navy rounded-2xl p-6 text-white">
              <div className="text-3xl mb-3">⭐</div>
              <h3 className="font-heading font-bold text-white text-base mb-2">Acumula puntos aquí</h3>
              <p className="font-body text-white/70 text-sm leading-relaxed mb-4">
                Visita este establecimiento, escanea el QR y los puntos se acreditan en tu cuenta BookVipPoints.
              </p>
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <p className="font-body text-white/60 text-xs">Cada visita te acerca a tu próximo hospedaje</p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-heading font-bold text-brand-navy text-base mb-4">¿Tienes preguntas?</h3>
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full justify-center bg-[#25D366] text-white font-heading font-semibold text-sm px-4 py-3 rounded-xl hover:bg-green-500 transition-colors"
              >
                💬 Escribir por WhatsApp
              </a>
            </div>

            {/* Back */}
            <Link
              to="/establecimientos"
              className="flex items-center justify-center gap-2 w-full bg-warm-bg text-brand-navy font-heading font-semibold text-sm px-4 py-3 rounded-xl border border-gray-200 hover:border-brand-navy transition-colors"
            >
              ← Ver más establecimientos
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && business.gallery && business.gallery.length > 0 && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white text-3xl font-light"
            onClick={closeLightbox}
          >
            ×
          </button>
          {business.gallery.length > 1 && (
            <>
              <button
                className="absolute left-4 text-white/60 hover:text-white text-3xl px-3 py-2"
                onClick={e => { e.stopPropagation(); prevImage() }}
              >
                ‹
              </button>
              <button
                className="absolute right-4 text-white/60 hover:text-white text-3xl px-3 py-2"
                onClick={e => { e.stopPropagation(); nextImage() }}
              >
                ›
              </button>
            </>
          )}
          <img
            src={business.gallery[lightboxIndex]}
            alt=""
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
            onClick={e => e.stopPropagation()}
          />
          <p className="absolute bottom-4 text-white/50 text-sm">
            {lightboxIndex + 1} / {business.gallery.length}
          </p>
        </div>
      )}

      <Footer />
    </div>
  )
}
